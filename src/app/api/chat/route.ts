import { openai } from "@ai-sdk/openai";
import { CoreMessage, streamText } from "ai";
import { buildSamSystemPrompt, extractLatestUserQuery } from "@/lib/sam-context";

export const runtime = "nodejs";

function isValidMessageRole(role: unknown): role is CoreMessage["role"] {
  return (
    role === "system" ||
    role === "user" ||
    role === "assistant" ||
    role === "tool"
  );
}

function parseCoreMessages(input: unknown): CoreMessage[] | null {
  if (!Array.isArray(input)) {
    return null;
  }

  const parsed = input.filter((message) => {
    if (!message || typeof message !== "object") {
      return false;
    }

    const candidate = message as { role?: unknown; content?: unknown };
    if (!isValidMessageRole(candidate.role)) {
      return false;
    }

    if (typeof candidate.content === "string") {
      return true;
    }

    return Array.isArray(candidate.content);
  });

  if (parsed.length !== input.length) {
    return null;
  }

  return parsed as CoreMessage[];
}

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      {
        error:
          "Missing OPENAI_API_KEY. Add it to .env.local and restart the dev server.",
      },
      { status: 500 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch (error) {
    console.error("Chat API: invalid JSON body", error);
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = parseCoreMessages(
    body && typeof body === "object" && "messages" in body
      ? (body as { messages?: unknown }).messages
      : null
  );

  if (!messages) {
    return Response.json(
      { error: "Invalid payload: 'messages' must be an array." },
      { status: 400 }
    );
  }

  try {
    const latestUserQuery = extractLatestUserQuery(messages);
    const systemPrompt = await buildSamSystemPrompt(latestUserQuery);

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages,
      onError: ({ error }) => {
        console.error("Chat API: streamText error", error);
      },
    });

    return result.toDataStreamResponse({
      getErrorMessage: (error) => {
        const message =
          error instanceof Error ? error.message : "Unknown model error.";
        const lower = message.toLowerCase();

        console.error("Chat API: streaming provider error", error);

        if (lower.includes("api key") || lower.includes("unauthorized")) {
          return "OpenAI authentication failed. Check OPENAI_API_KEY.";
        }

        if (lower.includes("429") || lower.includes("rate limit")) {
          return "OpenAI rate limit reached. Please try again in a moment.";
        }

        if (lower.includes("insufficient_quota") || lower.includes("quota")) {
          return "OpenAI quota exceeded. Check your billing/usage.";
        }

        return `Model request failed: ${message}`;
      },
    });
  } catch (error) {
    console.error("Chat API: failed to initialize model request", error);

    return Response.json(
      {
        error: "Failed to start chat response.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
