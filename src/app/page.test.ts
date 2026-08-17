import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("home page promotion", () => {
  it("places the VIBES promotion after both prompt stages", () => {
    const pageSource = readFileSync(new URL("./page.tsx", import.meta.url), "utf8");
    const promoPosition = pageSource.indexOf("<PromoBanner");
    const projectsPosition = pageSource.indexOf('aria-labelledby="projects-title"');
    const improvementsPosition = pageSource.indexOf("<ImprovementPromptsSection");

    expect(promoPosition).toBeGreaterThan(-1);
    expect(promoPosition).toBeGreaterThan(projectsPosition);
    expect(promoPosition).toBeGreaterThan(improvementsPosition);
    expect(pageSource).toContain('import PromoBanner from "@/components/PromoBanner"');
  });

  it("uses a full-width promotion button on mobile", () => {
    const componentSource = readFileSync(new URL("../components/PromoBanner.tsx", import.meta.url), "utf8");

    expect(componentSource).toMatch(/className="[^"]*w-full[^"]*sm:w-fit[^"]*"/);
  });

  it("places compact free resource links after the course and guide materials", () => {
    const pageSource = readFileSync(new URL("./page.tsx", import.meta.url), "utf8");
    const promoPosition = pageSource.indexOf("<PromoBanner");
    const resourcesPosition = pageSource.indexOf("<ResourcesSection");
    const usefulLinksPosition = pageSource.indexOf("<UsefulLinksSection");

    expect(pageSource).toContain('import UsefulLinksSection from "@/components/UsefulLinksSection"');
    expect(resourcesPosition).toBeGreaterThan(promoPosition);
    expect(usefulLinksPosition).toBeGreaterThan(resourcesPosition);
    expect(pageSource).not.toContain("<CtaTelegram");
  });
});
