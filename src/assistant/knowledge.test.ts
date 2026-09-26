// @vitest-environment node
import { describe, expect, it } from "vitest";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { createKnowledgeBase, loadKnowledgeDocuments } from "./knowledge";

const documents = [
  {
    source: "projects.md",
    content: [
      "# Payments",
      "Sam modernised a payments platform handling thousands of transactions a minute.",
      "",
      "# Carbon accounting",
      "Sam built carbon accounting tools used by private equity firms across portfolios.",
    ].join("\n"),
  },
  {
    source: "style.md",
    content: [
      "# Testing",
      "Sam prefers test-driven development and behaviour-focused tests over mocks.",
      "",
      "Too short to keep.",
    ].join("\n"),
  },
];

describe("knowledge base", () => {
  it("returns the sections that match the question, best match first", () => {
    const knowledge = createKnowledgeBase(documents);

    const [best] = knowledge.retrieve("Tell me about carbon accounting work");

    expect(best).toMatchObject({
      source: "projects.md",
      section: "Carbon accounting",
    });
  });

  it("falls back to the first sections when nothing matches", () => {
    const knowledge = createKnowledgeBase(documents);

    const chunks = knowledge.retrieve("zzz qqq", 2);

    expect(chunks.map((chunk) => chunk.section)).toEqual([
      "Payments",
      "Carbon accounting",
    ]);
  });

  it("ignores fragments too short to be useful", () => {
    const knowledge = createKnowledgeBase(documents);

    const chunks = knowledge.retrieve("sam", 10);

    expect(chunks).toHaveLength(3);
    expect(chunks.some((chunk) => chunk.text.includes("Too short"))).toBe(
      false,
    );
  });

  it("loads Markdown and text files from a directory", async () => {
    const directory = await fs.mkdtemp(path.join(os.tmpdir(), "knowledge-"));
    await fs.writeFile(path.join(directory, "a.md"), "# A\nMarkdown content");
    await fs.writeFile(path.join(directory, "b.txt"), "Plain text content");
    await fs.writeFile(path.join(directory, "c.json"), "{}");

    const loaded = await loadKnowledgeDocuments(directory);

    expect(loaded.map((doc) => doc.source).sort()).toEqual(["a.md", "b.txt"]);
    await fs.rm(directory, { recursive: true });
  });
});
