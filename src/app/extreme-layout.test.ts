import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const appDirectory = new URL("./", import.meta.url);
const sourceRoot = new URL("../", import.meta.url);

const readSource = (path: string) => readFileSync(new URL(path, sourceRoot), "utf8");

const collectInterfaceSources = (directory: string): string[] => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const path = join(directory, entry.name);
  if (entry.isDirectory()) return collectInterfaceSources(path);
  return /\.(css|tsx)$/.test(entry.name) ? [path] : [];
});

describe("extreme interface conditions", () => {
  it("keeps horizontal overflow visible and uses scalable text units", () => {
    const globals = readSource("app/globals.css");
    const interfaceSource = collectInterfaceSources(fileURLToPath(appDirectory))
      .concat(collectInterfaceSources(fileURLToPath(new URL("../components/", appDirectory))))
      .map((path) => readFileSync(path, "utf8"))
      .join("\n");

    expect(globals).not.toContain("overflow-x: hidden");
    expect(globals).toContain("--spacing: min(0.25rem, 4px)");
    expect(globals).toContain("padding-inline: min(1.25rem, 20px)");
    expect(interfaceSource).not.toMatch(/text-\[[0-9.]+px\]/);
  });

  it("allows narrow Hero and resource actions to wrap without widening cards", () => {
    const hero = readSource("components/Hero.tsx");
    const resources = readSource("components/leadmagnet/ResourcesSection.tsx");

    expect(hero).toContain('className="relative z-10 min-w-0');
    expect(hero).not.toContain("min-w-[310px]");
    expect(hero).toContain("whitespace-normal");
    expect(resources).toContain("min-w-0");
    expect(resources).toContain("h-auto min-h-11");
    expect(resources).toContain("whitespace-normal");
  });

  it("delays the useful-links split and protects long translated words", () => {
    const usefulLinks = readSource("components/UsefulLinksSection.tsx");

    expect(usefulLinks).toContain("xl:grid-cols-");
    expect(usefulLinks).not.toContain("sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]");
    expect(usefulLinks).toContain("hyphens-auto");
    expect(usefulLinks).toContain("break-words");
  });

  it("uses logical alignment in interactive RTL-sensitive components", () => {
    const resources = readSource("components/leadmagnet/ResourcesSection.tsx");
    const prompts = readSource("components/leadmagnet/ImprovementPromptsSection.tsx");
    const projects = readSource("components/leadmagnet/ProjectGallery.tsx");

    expect(resources).not.toContain("text-left");
    expect(resources).not.toContain("pl-5");
    expect(prompts).not.toContain("text-left");
    expect(prompts).not.toContain("border-r");
    expect(projects).not.toContain("text-left");
    expect(prompts).toContain("rtl:");
  });

  it("publishes light and dark browser colors with accessible palette tokens", () => {
    const globals = readSource("app/globals.css");
    const layout = readSource("app/layout.tsx");

    expect(globals).toContain("color-scheme: light dark");
    expect(globals).toContain("--color-ink-faint: #6e7362");
    expect(globals).toContain("--color-lime-700: #5f7629");
    expect(globals).toContain("@media (prefers-color-scheme: dark)");
    expect(globals).toContain("--color-milk: #171913");
    expect(globals).toContain("--color-paper: #20241b");
    expect(globals).toContain("--color-ink: #f4f5ec");
    expect(globals).toContain("--color-on-accent: #f4f5ec");
    expect(layout).toContain("export const viewport: Viewport");
    expect(layout).toContain("(prefers-color-scheme: light)");
    expect(layout).toContain("(prefers-color-scheme: dark)");
  });
});
