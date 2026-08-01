import { describe, expect, it } from "vitest";
import { allMaterials, validateMaterials } from "./loader";

const baseMaterial = {
  slug: "test-material",
  title: "Тестовый материал",
  summary: "Краткое описание",
  formatLabel: "Гайд",
  coverImage: "/images/cover.jpg",
  coverAlt: "Обложка",
  publishedAt: "2026-07-29",
  order: 1,
  published: true,
  seo: {
    title: "SEO заголовок",
    description: "SEO описание",
  },
  blocks: [{ type: "richText", content: "Текст" }],
};

describe("validateMaterials", () => {
  it("сортирует по order и отбрасывает неопубликованные", () => {
    const result = validateMaterials([
      { ...baseMaterial, slug: "second", order: 2 },
      { ...baseMaterial, slug: "draft", order: 1, published: false },
      { ...baseMaterial, slug: "first", order: 0 },
    ]);
    expect(result.map((m) => m.slug)).toEqual(["first", "second"]);
  });

  it("бросает ошибку на невалидный материал", () => {
    expect(() => validateMaterials([{ ...baseMaterial, slug: "Bad Slug!" }])).toThrow(
      /Валидация/
    );
  });

  it("бросает ошибку на дубликат slug", () => {
    expect(() => validateMaterials([baseMaterial, { ...baseMaterial }])).toThrow(
      /Дубликат slug/
    );
  });

  it("бросает ошибку на дубликат prompt.id внутри материала", () => {
    const withDuplicatePrompts = {
      ...baseMaterial,
      blocks: [
        { type: "prompt", id: "p1", prompt: "текст" },
        { type: "prompt", id: "p1", prompt: "текст" },
      ],
    };
    expect(() => validateMaterials([withDuplicatePrompts])).toThrow(/Дубликат prompt.id/);
  });
});

describe("allMaterials", () => {
  it("загружает реальные материалы из каталога", () => {
    expect(allMaterials.length).toBeGreaterThan(0);
    expect(allMaterials.every((m) => m.published)).toBe(true);
  });
});
