import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("home page promotion", () => {
  it("places the VIBES promotion before the project materials", () => {
    const pageSource = readFileSync(new URL("./page.tsx", import.meta.url), "utf8");
    const promoPosition = pageSource.indexOf("<PromoBanner");
    const projectsPosition = pageSource.indexOf('aria-labelledby="projects-title"');

    expect(promoPosition).toBeGreaterThan(-1);
    expect(promoPosition).toBeLessThan(projectsPosition);
    expect(pageSource).toContain('import PromoBanner from "@/components/PromoBanner"');
  });

  it("uses a full-width promotion button on mobile", () => {
    const componentSource = readFileSync(new URL("../components/PromoBanner.tsx", import.meta.url), "utf8");

    expect(componentSource).toMatch(/className="[^"]*w-full[^"]*sm:w-fit[^"]*"/);
  });
});
