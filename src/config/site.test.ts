import { describe, expect, it } from "vitest";
import { siteConfig } from "./site";

describe("production site identity", () => {
  it("uses the approved public domain instead of a placeholder", () => {
    expect(siteConfig.siteUrl).toBe("https://free.ungurenko.ru");
    expect(JSON.stringify(siteConfig)).not.toContain("example.com");
  });
});

describe("site promo banner configuration", () => {
  it("keeps the VIBES promotion editable from one configuration object", () => {
    expect(siteConfig.promoBanner).toEqual(
      expect.objectContaining({
        enabled: true,
        id: "vibes-course",
        url: "https://vibes.ungurenko.ru",
        eyebrow: "Следующий шаг — ВАЙБС",
        title: "Пройдите тот же путь на\u00A0двух своих проектах",
        description:
          "Стартовый набор помогает попробовать процесс на\u00A0готовом промпте. На\u00A0ВАЙБС вы\u00A0соберёте и\u00A0опубликуете свой лендинг и\u00A0веб-сервис — с\u00A0уроками, готовыми инструментами и\u00A0поддержкой.",
        meta: "Старт сразу · два проекта · от\u00A09\u202F990\u00A0₽ · доступ навсегда",
        buttonLabel: "Посмотреть программу курса",
      }),
    );
    expect(siteConfig.promoBanner.eyebrow).toContain("ВАЙБС");
    expect(siteConfig.promoBanner.logo.src).toBe("/images/vibes-logo.webp");
    expect(siteConfig.promoBanner.image.src).toBe("/images/vibes-platform.webp");
  });
});

describe("site author copy", () => {
  it("uses clear Russian positioning", () => {
    expect(siteConfig.author.role).toBe(
      "Показываю, как создавать сайты, приложения и\u00A0ИИ-агентов",
    );
    expect(siteConfig.author.photoAlt).toBe("Александр Унгуренко");
  });
});

describe("site free resource links", () => {
  it("keeps the YouTube channel and idea bot editable from the shared social configuration", () => {
    expect(siteConfig.socials.youtube).toEqual({
      label: "YouTube",
      handle: "@ungurenkos",
      url: "https://www.youtube.com/@ungurenkos",
    });
    expect(siteConfig.socials.ideaBot).toEqual({
      label: "Бот с\u00A0идеями",
      handle: "@Vibecoding_Ideas_Bot",
      url: "https://t.me/Vibecoding_Ideas_Bot",
    });
  });
});
