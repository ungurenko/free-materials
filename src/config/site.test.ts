import { describe, expect, it } from "vitest";
import { siteConfig } from "./site";

describe("site promo banner configuration", () => {
  it("keeps the VIBES promotion editable from one configuration object", () => {
    expect(siteConfig.promoBanner).toEqual(
      expect.objectContaining({
        enabled: true,
        id: "vibes-course",
        url: "https://vibes.ungurenko.ru",
        eyebrow: "Курс по\u00A0вайб-кодингу",
        title: "Создайте свой проект с\u00A0ИИ на\u00A0курсе ВАЙБС",
        description:
          "На\u00A0курсе вы\u00A0соберёте и\u00A0запустите сайт, сервис, Telegram-бота или приложение. Программа рассчитана на\u00A0новичков без опыта в\u00A0программировании.",
        meta: "Доступ сразу · от\u00A09\u202F990\u00A0₽ · материалы остаются навсегда",
        buttonLabel: "Посмотреть программу курса",
      }),
    );
    expect(siteConfig.promoBanner.title).toContain("ВАЙБС");
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
