import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const footerSource = readFileSync(new URL("./Footer.tsx", import.meta.url), "utf8");

describe("footer resource links", () => {
  it("keeps Telegram, YouTube, and the idea bot linked from the shared configuration", () => {
    expect(footerSource).toContain("siteConfig.socials.telegram.url");
    expect(footerSource).toContain("siteConfig.socials.youtube.url");
    expect(footerSource).toContain("siteConfig.socials.ideaBot.url");
  });

  it("opens every external footer link safely in a new tab", () => {
    expect(footerSource.match(/target="_blank"/g)).toHaveLength(3);
    expect(footerSource.match(/rel="noopener noreferrer"/g)).toHaveLength(3);
  });
});
