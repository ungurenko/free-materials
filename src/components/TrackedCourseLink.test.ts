import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("tracked course links", () => {
  it("tracks the two approved placements with one analytics event", () => {
    const linkSource = readFileSync(new URL("./TrackedCourseLink.tsx", import.meta.url), "utf8");
    const heroSource = readFileSync(new URL("./Hero.tsx", import.meta.url), "utf8");
    const promoSource = readFileSync(new URL("./PromoBanner.tsx", import.meta.url), "utf8");

    expect(linkSource).toContain('"hero" | "after_prompts"');
    expect(linkSource).toContain('track("course_click", { placement })');
    expect(heroSource).toContain('placement="hero"');
    expect(promoSource).toContain('placement="after_prompts"');
  });
});
