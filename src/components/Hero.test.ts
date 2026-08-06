import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Hero from "./Hero";

describe("mobile Hero composition", () => {
  it("renders the mobile headline before a complete author identity", () => {
    const html = renderToStaticMarkup(Hero());
    const headlinePosition = html.indexOf('data-mobile-headline="true"');
    const authorPosition = html.indexOf('data-mobile-author="true"');

    expect(headlinePosition).toBeGreaterThan(-1);
    expect(authorPosition).toBeGreaterThan(headlinePosition);
    expect(html).toContain('<span class="block">Вайб-кодинг</span><span class="block">с\u00A0нуля</span>');
    expect(html).toContain("Александр Унгуренко");
    expect(html).toContain("Показываю, как создавать сайты, приложения и\u00A0ИИ-агентов");
  });

  it("keeps the desktop headline on two explicit lines", () => {
    const html = renderToStaticMarkup(Hero());
    const desktopHeadline = html.slice(html.indexOf('data-desktop-headline="true"'));

    expect(desktopHeadline).toContain('<span class="block">Вайб-кодинг</span><span class="block">с\u00A0нуля</span>');
  });
});
