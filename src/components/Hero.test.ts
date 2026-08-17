import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Hero from "./Hero";

describe("mobile Hero composition", () => {
  it("renders the starter-kit headline before a compact author identity", () => {
    const html = renderToStaticMarkup(Hero());
    const headlinePosition = html.indexOf('data-hero-headline="true"');
    const authorPosition = html.indexOf('data-hero-author="true"');

    expect(headlinePosition).toBeGreaterThan(-1);
    expect(authorPosition).toBeGreaterThan(headlinePosition);
    expect(html).toContain("Стартовый набор");
    expect(html).toContain("для вайб-кодинга");
    expect(html).toContain("Александр Унгуренко");
    expect(html).toContain("Показываю, как создавать сайты, приложения и\u00A0ИИ-агентов");
  });

  it("shows a large author photo and both next actions", () => {
    const html = renderToStaticMarkup(Hero());

    expect(html).toContain('data-hero-photo="true"');
    expect(html).not.toContain('data-hero-collage="true"');
    expect(html).toContain('href="#projects"');
    expect(html).toContain('href="https://vibes.ungurenko.ru"');
  });
});
