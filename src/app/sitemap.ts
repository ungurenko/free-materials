import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getPublishedMaterials } from "@/lib/content/loader";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteConfig.siteUrl;
  const materials = getPublishedMaterials();

  const materialEntries = materials.map((material) => ({
    url: `${siteUrl}/materials/${material.slug}`,
    lastModified: material.updatedAt || material.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...materialEntries,
  ];
}
