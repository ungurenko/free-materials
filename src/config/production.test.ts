import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

const productionUrl = "https://free.ungurenko.ru";

describe("production discovery files", () => {
  it("publishes only the approved canonical URL", () => {
    expect(sitemap()).toEqual([
      expect.objectContaining({
        url: productionUrl,
        priority: 1,
      }),
    ]);
    expect(robots()).toEqual(
      expect.objectContaining({
        host: productionUrl,
        sitemap: `${productionUrl}/sitemap.xml`,
      }),
    );
  });

  it("redirects the old public hostname to the canonical domain", () => {
    const vercelConfig = JSON.parse(
      readFileSync(new URL("../../vercel.json", import.meta.url), "utf8"),
    ) as {
      redirects?: Array<{
        source: string;
        destination: string;
        permanent?: boolean;
        has?: Array<{ type: string; value?: string }>;
      }>;
    };

    expect(vercelConfig.redirects).toContainEqual({
      source: "/:path*",
      destination: `${productionUrl}/:path*`,
      permanent: true,
      has: [{ type: "host", value: "free-materials.vercel.app" }],
    });
  });
});
