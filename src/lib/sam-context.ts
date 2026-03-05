import { promises as fs } from "fs";
import path from "path";
import type { CoreMessage } from "ai";

type SamProfile = {
  identity: {
    name: string;
    title: string;
    location: string;
  };
  summary: string;
  core_stack: string[];
  expertise_areas: string[];
  experience_highlights: Array<{ theme: string; detail: string }>;
  engineering_values: string[];
  communication_prefs: {
    style: string;
    fit_assessment: string;
    uncertainty: string;
  };
  do_not_claim: string[];
  [key: string]: unknown;
};

type KnowledgeChunk = {
  source: string;
  section: string;
  text: string;
};

type RankedChunk = KnowledgeChunk & {
  score: number;
};

const PROFILE_PATH = path.join(process.cwd(), "src", "data", "sam-profile.json");
const KNOWLEDGE_DIR = path.join(process.cwd(), "src", "knowledge");

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2);
}

function splitMarkdownIntoChunks(source: string, content: string): KnowledgeChunk[] {
  const lines = content.split(/\r?\n/);
  const chunks: KnowledgeChunk[] = [];

  let currentHeading = "General";
  let buffer: string[] = [];

  const flush = () => {
    const text = buffer.join(" ").trim().replace(/\s+/g, " ");
    if (text.length < 40) {
      buffer = [];
      return;
    }

    chunks.push({
      source,
      section: currentHeading,
      text,
    });

    buffer = [];
  };

  for (const line of lines) {
    if (line.startsWith("#")) {
      flush();
      currentHeading = line.replace(/^#+\s*/, "").trim() || "General";
      continue;
    }

    if (line.trim() === "") {
      flush();
      continue;
    }

    buffer.push(line.trim());
  }

  flush();

  return chunks;
}

async function loadProfile(): Promise<SamProfile> {
  const raw = await fs.readFile(PROFILE_PATH, "utf-8");
  return JSON.parse(raw) as SamProfile;
}

async function loadKnowledgeChunks(): Promise<KnowledgeChunk[]> {
  const files = await fs.readdir(KNOWLEDGE_DIR);
  const allowed = files.filter((file) => file.endsWith(".md") || file.endsWith(".txt"));

  const chunksByFile = await Promise.all(
    allowed.map(async (fileName) => {
      const fullPath = path.join(KNOWLEDGE_DIR, fileName);
      const raw = await fs.readFile(fullPath, "utf-8");
      return splitMarkdownIntoChunks(fileName, raw);
    })
  );

  return chunksByFile.flat();
}

function scoreChunk(queryTokens: string[], chunk: KnowledgeChunk): number {
  if (queryTokens.length === 0) {
    return 0;
  }

  const text = chunk.text.toLowerCase();
  const section = chunk.section.toLowerCase();

  let score = 0;
  for (const token of queryTokens) {
    if (text.includes(token)) {
      score += 2;
    }

    if (section.includes(token)) {
      score += 1;
    }
  }

  return score;
}

export function extractLatestUserQuery(messages: CoreMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (message.role !== "user") {
      continue;
    }

    if (typeof message.content === "string") {
      return message.content;
    }

    if (Array.isArray(message.content)) {
      const textParts = message.content
        .filter((part) => typeof part === "object" && part !== null && "text" in part)
        .map((part) => String((part as { text?: string }).text ?? ""))
        .join(" ")
        .trim();

      if (textParts) {
        return textParts;
      }
    }
  }

  return "";
}

async function retrieveRelevantChunks(query: string, limit = 4): Promise<RankedChunk[]> {
  const queryTokens = tokenize(query);
  const chunks = await loadKnowledgeChunks();

  const ranked = chunks
    .map((chunk) => ({
      ...chunk,
      score: scoreChunk(queryTokens, chunk),
    }))
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (ranked.length > 0) {
    return ranked;
  }

  return chunks.slice(0, Math.min(limit, chunks.length)).map((chunk) => ({
    ...chunk,
    score: 0,
  }));
}

function formatRetrievedContext(chunks: RankedChunk[]): string {
  if (chunks.length === 0) {
    return "No retrieved knowledge files were available.";
  }

  return chunks
    .map((chunk, index) => {
      const text = chunk.text.slice(0, 380);
      return `${index + 1}. [${chunk.source} :: ${chunk.section}] ${text}`;
    })
    .join("\n");
}

export async function buildSamSystemPrompt(query: string): Promise<string> {
  const [profile, retrievedChunks] = await Promise.all([
    loadProfile(),
    retrieveRelevantChunks(query),
  ]);

  return `You are ${profile.identity.name}'s AI assistant.

Your role is to help visitors understand Sam's technical expertise, experience, and working style with high accuracy.

Behavior requirements:
- Be concise, direct, and technically specific.
- If asked about fit for a role or project, map requirements to concrete evidence.
- Lead with outcomes and what was built before listing tools or frameworks.
- Mention tools as supporting implementation detail, not the headline.
- When details are missing, state assumptions explicitly.
- Do not invent employers, certifications, dates, or outcomes not present in profile or retrieved context.
- Stay focused on Sam's technical profile and professional topics.

Profile (structured source of truth):
${JSON.stringify(profile, null, 2)}

Retrieved context for current user question:
${formatRetrievedContext(retrievedChunks)}`;
}
