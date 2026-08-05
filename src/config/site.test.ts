import { describe, expect, it } from "vitest";
import { siteConfig } from "./site";

describe("site promo banner configuration", () => {
  it("keeps the VIBES promotion editable from one configuration object", () => {
    expect(siteConfig.promoBanner).toEqual(
      expect.objectContaining({
        enabled: true,
        id: "vibes-course",
        url: "https://vibes.ungurenko.ru",
        buttonLabel: "Посмотреть программу",
      }),
    );
    expect(siteConfig.promoBanner.title).toContain("ВАЙБС");
    expect(siteConfig.promoBanner.logo.src).toBe("/images/vibes-logo.webp");
    expect(siteConfig.promoBanner.image.src).toBe("/images/vibes-platform.webp");
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
      label: "Бот с идеями",
      handle: "@Vibecoding_Ideas_Bot",
      url: "https://t.me/Vibecoding_Ideas_Bot",
    });
  });
});
