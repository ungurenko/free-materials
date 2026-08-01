import { describe, expect, it } from "vitest";
import {
  checklistItems,
  commands,
  comparisonRows,
  examples,
  instructionSteps,
  instructionWarning,
  leadmagnetHero,
  marketingIdea,
  projects,
  safetyRules,
  services,
  telegramCta,
  vibeCodingExplanation,
} from "./leadmagnet";

describe("leadmagnet content", () => {
  it("hero has all required fields", () => {
    expect(leadmagnetHero.title).toBe("Вайб-кодинг с нуля");
    expect(leadmagnetHero.subtitle.length).toBeGreaterThan(10);
    expect(leadmagnetHero.promise.length).toBeGreaterThan(10);
    expect(leadmagnetHero.callout.length).toBeGreaterThan(10);
  });

  it("vibe-coding explanation has 3 paragraphs", () => {
    expect(vibeCodingExplanation).toHaveLength(3);
  });

  it("instruction has 7 steps and 7 warning items", () => {
    expect(instructionSteps).toHaveLength(7);
    expect(instructionWarning.items).toHaveLength(7);
  });

  it("services has exactly 3 entries with required fields", () => {
    expect(services).toHaveLength(3);
    for (const s of services) {
      expect(s.id).toBeTruthy();
      expect(s.name).toBeTruthy();
      expect(s.url).toMatch(/^https?:\/\//);
      expect(s.suitableFor.length).toBeGreaterThan(0);
      expect(s.howToStart.length).toBeGreaterThan(0);
      expect(s.feature.length).toBeGreaterThan(0);
    }
  });

  it("comparison table has 6 rows", () => {
    expect(comparisonRows).toHaveLength(6);
  });

  it("projects has exactly 5 entries with valid prompts and ids", () => {
    expect(projects).toHaveLength(5);
    const ids = new Set<string>();
    for (let i = 0; i < projects.length; i++) {
      const p = projects[i];
      expect(p.id).toBeTruthy();
      expect(ids.has(p.id)).toBe(false);
      ids.add(p.id);
      expect(p.number).toBe(i + 1);
      expect(p.prompt.length).toBeGreaterThan(100);
      expect(["Простой", "Средний"]).toContain(p.level);
    }
  });

  it("commands has exactly 5 entries", () => {
    expect(commands).toHaveLength(5);
    for (const c of commands) {
      expect(c.prompt.length).toBeGreaterThan(50);
    }
  });

  it("safety rules and checklist have expected sizes", () => {
    expect(safetyRules.items).toHaveLength(8);
    expect(checklistItems).toHaveLength(10);
  });

  it("examples and telegram CTA are well-formed", () => {
    expect(examples.items).toHaveLength(5);
    expect(telegramCta.main.buttonLabel.length).toBeGreaterThan(0);
    expect(telegramCta.cases.benefits.length).toBeGreaterThan(0);
  });

  it("marketing idea has quote and note", () => {
    expect(marketingIdea.quote.length).toBeGreaterThan(20);
    expect(marketingIdea.note.length).toBeGreaterThan(20);
  });
});
