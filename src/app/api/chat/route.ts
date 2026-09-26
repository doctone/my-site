import { openai } from "@ai-sdk/openai";
import {
  createKnowledgeBase,
  loadKnowledgeDocuments,
  type KnowledgeBase,
} from "@/assistant/knowledge";
import { respond } from "@/assistant/respond";

export const runtime = "nodejs";

let knowledgeBase: Promise<KnowledgeBase> | undefined;

/** Reads the knowledge files once per server process, retrying after a failure. */
function getKnowledgeBase(): Promise<KnowledgeBase> {
  knowledgeBase ??= loadKnowledgeDocuments()
    .then(createKnowledgeBase)
    .catch((error: unknown) => {
      knowledgeBase = undefined;
      throw error;
    });
  return knowledgeBase;
}

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      {
        error:
          "Missing OPENAI_API_KEY. Add it to .env.local and restart the dev server.",
      },
      { status: 500 },
    );
  }

  let knowledge: KnowledgeBase;
  try {
    knowledge = await getKnowledgeBase();
  } catch (error) {
    console.error("Chat API: failed to load knowledge files", error);
    return Response.json(
      { error: "Failed to start chat response." },
      { status: 500 },
    );
  }

  return respond(request, { model: openai("gpt-4o-mini"), knowledge });
}
