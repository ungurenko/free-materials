import { describe, expect, it } from "vitest";
import { allMaterials } from "./loader";
import { getPromptBlocks, groupPromptLibraryBlocks } from "./prompt-library";

describe("prompt library grouping", () => {
  it("собирает базу в семь навигационных разделов", () => {
    const material = allMaterials.find((item) => item.slug === "baza-promtov-vibe-kodinga");
    const groups = groupPromptLibraryBlocks(material?.blocks || []);

    expect(material?.layout).toBe("promptLibrary");
    expect(groups.sections.map((section) => section.id)).toEqual([
      "vizitki",
      "lendingi",
      "instrumenty",
      "igry",
      "otkrytki",
      "socseti",
      "styles",
    ]);
    expect(groups.sections.map((section) => getPromptBlocks(section).length)).toEqual([
      5, 5, 6, 5, 5, 5, 13,
    ]);
  });
});
