import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import UsefulLinksSection from "./UsefulLinksSection";

const markup = renderToStaticMarkup(UsefulLinksSection());

describe("useful links section", () => {
  it("makes the full YouTube and idea bot cards external links", () => {
    expect(markup.match(/<article/g)).toHaveLength(2);
    expect(markup).toMatch(/<article[^>]*><a[^>]*href="https:\/\/www\.youtube\.com\/@ungurenkos"[^>]*target="_blank"[^>]*rel="noopener noreferrer"[^>]*>/);
    expect(markup).toMatch(/<article[^>]*><a[^>]*href="https:\/\/t\.me\/Vibecoding_Ideas_Bot"[^>]*target="_blank"[^>]*rel="noopener noreferrer"[^>]*>/);
  });

  it("keeps a clear purpose for each next step", () => {
    expect(markup).toContain("Бесплатные уроки и прямые эфиры");
    expect(markup).toContain("Что можно создать для вашей ниши");
    expect(markup).toContain("Смотреть YouTube-канал");
    expect(markup).toContain("Получить 5 идей в Telegram");
  });
});
