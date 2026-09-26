import { promises as fs } from "fs";
import path from "path";

export type KnowledgeDocument = {
  source: string;
  content: string;
};

export type KnowledgeChunk = {
  source: string;
  section: string;
  text: string;
};

export type KnowledgeBase = {
  /**
   * Chunks most relevant to the question, best first. When nothing matches,
   * returns the first chunks so the model always gets some context.
   */
  retrieve(question: string, limit?: number): KnowledgeChunk[];
};

const DEFAULT_LIMIT = 4;
const MIN_CHUNK_LENGTH = 40;
const DEFAULT_DIRECTORY = path.join(process.cwd(), "src", "knowledge");

/** Splits the documents into sections once, then answers questions in memory. */
export function createKnowledgeBase(
  documents: KnowledgeDocument[],
): KnowledgeBase {
  const chunks = documents.flatMap(splitIntoChunks);

  return {
    retrieve(question, limit = DEFAULT_LIMIT) {
      const tokens = tokenize(question);
      const ranked = chunks
        .map((chunk) => ({ chunk, score: score(tokens, chunk) }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(({ chunk }) => chunk);

      return ranked.length > 0 ? ranked : chunks.slice(0, limit);
    },
  };
}

/** Reads every Markdown and plain-text file in the directory. */
export async function loadKnowledgeDocuments(
  directory = DEFAULT_DIRECTORY,
): Promise<KnowledgeDocument[]> {
  const files = await fs.readdir(directory);
  const readable = files.filter(
    (file) => file.endsWith(".md") || file.endsWith(".txt"),
  );

  return Promise.all(
    readable.map(async (source) => ({
      source,
      content: await fs.readFile(path.join(directory, source), "utf-8"),
    })),
  );
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2);
}

function score(tokens: string[], chunk: KnowledgeChunk): number {
  const text = chunk.text.toLowerCase();
  const section = chunk.section.toLowerCase();

  return tokens.reduce(
    (total, token) =>
      total +
      (text.includes(token) ? 2 : 0) +
      (section.includes(token) ? 1 : 0),
    0,
  );
}

function splitIntoChunks({
  source,
  content,
}: KnowledgeDocument): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];
  let section = "General";
  let buffer: string[] = [];

  const flush = () => {
    const text = buffer.join(" ").trim().replace(/\s+/g, " ");
    if (text.length >= MIN_CHUNK_LENGTH) {
      chunks.push({ source, section, text });
    }
    buffer = [];
  };

  for (const line of content.split(/\r?\n/)) {
    if (line.startsWith("#")) {
      flush();
      section = line.replace(/^#+\s*/, "").trim() || "General";
    } else if (line.trim() === "") {
      flush();
    } else {
      buffer.push(line.trim());
    }
  }
  flush();

  return chunks;
}
