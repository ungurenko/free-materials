import { z } from "zod";

// ============================================================
//  Схема контента: валидация материалов и блоков
// ============================================================

// ---------- Блоки контента (discriminated union по type) ----------

export const RichTextBlockSchema = z.object({
  type: z.literal("richText"),
  content: z.string().min(1, "richText: content обязателен"),
});

export const HeadingBlockSchema = z.object({
  type: z.literal("heading"),
  level: z.union([z.literal(2), z.literal(3)]).default(2),
  content: z.string().min(1, "heading: content обязателен"),
});

export const ImageBlockSchema = z.object({
  type: z.literal("image"),
  src: z.string().min(1, "image: src обязателен"),
  alt: z.string().min(1, "image: alt обязателен"),
  aspectRatio: z.string().regex(/^\d+\/\d+$/, "image: aspectRatio должен быть в формате W/H").optional(),
});

export const YouTubeBlockSchema = z.object({
  type: z.literal("youtube"),
  videoId: z.string().min(1, "youtube: videoId обязателен"),
  title: z.string().min(1, "youtube: title обязателен"),
  description: z.string().optional(),
  startAt: z.number().int().nonnegative().optional(),
});

export const PromptBlockSchema = z.object({
  type: z.literal("prompt"),
  id: z.string().min(1, "prompt: id обязателен"),
  title: z.string().optional(),
  description: z.string().optional(),
  prompt: z.string().min(1, "prompt: prompt обязателен"),
});

export const LinkBlockSchema = z.object({
  type: z.literal("link"),
  url: z.string().url("link: url должен быть валидным URL"),
  label: z.string().min(1, "link: label обязателен"),
  description: z.string().optional(),
});

export const NoteBlockSchema = z.object({
  type: z.literal("note"),
  content: z.string().min(1, "note: content обязателен"),
});

export const DividerBlockSchema = z.object({
  type: z.literal("divider"),
});

export const ContentBlockSchema = z.discriminatedUnion("type", [
  RichTextBlockSchema,
  HeadingBlockSchema,
  ImageBlockSchema,
  YouTubeBlockSchema,
  PromptBlockSchema,
  LinkBlockSchema,
  NoteBlockSchema,
  DividerBlockSchema,
]);

export type ContentBlock = z.infer<typeof ContentBlockSchema>;

// ---------- SEO материала ----------

export const MaterialSeoSchema = z.object({
  title: z.string().min(1, "seo.title обязателен").max(60, "seo.title макс 60 символов"),
  description: z.string().min(1, "seo.description обязателен").max(160, "seo.description макс 160 символов"),
  ogImage: z.string().optional(),
});

// ---------- Материал ----------

export const MaterialSchema = z.object({
  slug: z
    .string()
    .min(1, "slug обязателен")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug должен быть в формате kebab-case"),
  title: z.string().min(1, "title обязателен").max(100, "title макс 100 символов"),
  summary: z.string().min(1, "summary обязателен").max(200, "summary макс 200 символов"),
  formatLabel: z.string().min(1, "formatLabel обязателен"),
  coverImage: z.string().min(1, "coverImage обязателен"),
  coverAlt: z.string().min(1, "coverAlt обязателен"),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "publishedAt должен быть в формате YYYY-MM-DD"),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "updatedAt должен быть в формате YYYY-MM-DD").optional(),
  order: z.number().int().nonnegative(),
  published: z.boolean().default(true),
  seo: MaterialSeoSchema,
  blocks: z.array(ContentBlockSchema).min(1, "blocks: минимум один блок"),
});

export type Material = z.infer<typeof MaterialSchema>;

// ---------- SiteConfig ----------

export const SocialLinkSchema = z.object({
  label: z.string().min(1),
  handle: z.string().min(1),
  url: z.string().url(),
});

export const PromoConfigSchema = z.object({
  enabled: z.boolean().default(true),
  label: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  buttonLabel: z.string().optional(),
  url: z.string().url().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

export const AnalyticsConfigSchema = z.object({
  umami: z.object({
    enabled: z.boolean().default(false),
    websiteId: z.string().optional(),
    src: z.string().url().optional(),
  }).default({ enabled: false }),
});

export const SiteConfigSchema = z.object({
  siteName: z.string().min(1),
  siteDescription: z.string().min(1),
  siteUrl: z.string().url("siteUrl должен быть валидным URL"),
  author: z.object({
    name: z.string().min(1),
    role: z.string().min(1),
    initials: z.string().min(1).max(3),
    heroIntro: z.string().min(1),
    photo: z.string().min(1),
    photoAlt: z.string().min(1),
  }),
  socials: z.object({
    telegram: SocialLinkSchema,
    instagram: SocialLinkSchema,
    youtube: SocialLinkSchema,
  }),
  promo: PromoConfigSchema,
  analytics: AnalyticsConfigSchema,
});

export type SiteConfig = z.infer<typeof SiteConfigSchema>;
export type SocialLink = z.infer<typeof SocialLinkSchema>;
export type PromoConfig = z.infer<typeof PromoConfigSchema>;
export type AnalyticsConfig = z.infer<typeof AnalyticsConfigSchema>;
