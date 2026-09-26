import { streamText, type LanguageModel } from "ai";
import { z } from "zod";
import { profile } from "@/data/profile";
import type { KnowledgeBase, KnowledgeChunk } from "./knowledge";

export type AssistantDependencies = {
  model: LanguageModel;
  knowledge: KnowledgeBase;
};

const chatRequestSchema = z.object({
  messages: z
    .array(
      z.union([
        z.object({ role: z.literal("user"), content: z.string() }),
        z.object({ role: z.literal("assistant"), content: z.string() }),
      ]),
    )
    .min(1),
});

type ChatMessage = z.infer<typeof chatRequestSchema>["messages"][number];

/**
 * Answers one chat request about Sam as a streamed response.
 *
 * Accepts only user and assistant messages, so a client can't inject its own
 * system prompt. Returns 400 for a malformed request and 500 if the model call
 * can't start. Provider errors during streaming become readable messages in
 * the stream.
 */
export async function respond(
  request: Request,
  { model, knowledge }: AssistantDependencies,
): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      {
        error:
          "Invalid payload: 'messages' must be a non-empty array of user and assistant messages.",
      },
      { status: 400 },
    );
  }

  const { messages } = parsed.data;
  const system = buildSystemPrompt(
    knowledge.retrieve(latestUserQuestion(messages)),
  );

  try {
    const result = streamText({
      model,
      system,
      messages,
      onError: ({ error }) => {
        console.error("Assistant: model stream error", error);
      },
    });

    return result.toDataStreamResponse({ getErrorMessage: describeModelError });
  } catch (error) {
    console.error("Assistant: failed to start model request", error);
    return Response.json(
      { error: "Failed to start chat response." },
      { status: 500 },
    );
  }
}

function latestUserQuestion(messages: ChatMessage[]): string {
  return messages.findLast((message) => message.role === "user")?.content ?? "";
}

function describeModelError(error: unknown): string {
  const message =
    error instanceof Error ? error.message : "Unknown model error.";
  const lower = message.toLowerCase();

  if (lower.includes("api key") || lower.includes("unauthorized")) {
    return "OpenAI authentication failed. Check OPENAI_API_KEY.";
  }
  if (lower.includes("429") || lower.includes("rate limit")) {
    return "OpenAI rate limit reached. Please try again in a moment.";
  }
  if (lower.includes("insufficient_quota") || lower.includes("quota")) {
    return "OpenAI quota exceeded. Check your billing/usage.";
  }
  return "The model request failed. Please try again.";
}

function formatKnowledge(chunks: KnowledgeChunk[]): string {
  if (chunks.length === 0) {
    return "No retrieved knowledge files were available.";
  }

  return chunks
    .map(
      (chunk, index) =>
        `${index + 1}. [${chunk.source} :: ${chunk.section}] ${chunk.text.slice(0, 380)}`,
    )
    .join("\n");
}

function buildSystemPrompt(chunks: KnowledgeChunk[]): string {
  return `You are ${profile.identity.name}'s AI assistant.

Your role is to help visitors understand Sam's technical expertise, experience, and working style with high accuracy.

Behavior requirements:
- Be concise, direct, and technically specific.
- If asked about fit for a role or project, map requirements to concrete evidence.
- Lead with outcomes and what was built before listing tools or frameworks.
- Mention tools as supporting implementation detail, not the headline.
- For each skill, strength, or capability you mention, include at least one concrete example of how Sam applied it or made progress in that area.
- If there is not enough evidence for a claimed skill, say that directly instead of giving a generic claim.
- When details are missing, state assumptions explicitly.
- Do not invent employers, certifications, dates, or outcomes not present in profile or retrieved context.
- When describing what Sam works on now, use currentFocus from the profile.
- Stay focused on Sam's technical profile and professional topics.

Profile (structured source of truth):
${JSON.stringify(profile, null, 2)}

Retrieved context for current user question:
${formatKnowledge(chunks)}`;
}
