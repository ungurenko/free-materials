import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import UsefulLinksSection from "./UsefulLinksSection";

const markup = renderToStaticMarkup(UsefulLinksSection());

describe("useful links section", () => {
  it("renders three prominent external resource links", () => {
    expect(markup.match(/target="_blank"/g)).toHaveLength(3);
    expect(markup).toContain('href="https://www.youtube.com/@ungurenkos"');
    expect(markup).toContain('href="https://t.me/Vibecoding_Ideas_Bot"');
    expect(markup).toContain('href="https://t.me/ungurenko_adout_digital"');
  });

  it("keeps a clear purpose for each next step", () => {
    expect(markup).toContain("Бесплатные уроки и\u00A0прямые эфиры о\u00A0вайб-кодинге");
    expect(markup).toContain("Пять идей для вашей ниши");
    expect(markup).toContain("Перейти на\u00A0YouTube");
    expect(markup).toContain("Получить идеи в\u00A0Telegram");
    expect(markup).toContain("YouTube");
    expect(markup).toContain("Telegram-бот");
    expect(markup).toContain("Новые промпты и\u00A0разборы");
    expect(markup).toContain("На\u00A0YouTube я\u00A0показываю, как создавать сайты");
    expect(markup).toContain("%2Fimages%2Fresources%2Fyoutube-play.webp");
  });
});
