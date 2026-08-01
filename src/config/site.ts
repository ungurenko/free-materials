import type { SiteConfig } from "@/lib/content/schema";

// ============================================================
//  КОНФИГУРАЦИЯ САЙТА
//  Здесь меняются: автор, соцсети, рекламный баннер, SEO, аналитика.
// ============================================================

export const siteConfig: SiteConfig = {
  siteName: "Александр Унгуренко — бесплатные материалы",
  siteDescription:
    "Практические инструкции, промпты и разборы по AI-разработке: сайты, приложения, Telegram-боты и AI-агенты для людей без опыта программирования.",
  siteUrl: "https://example.com", // TODO: заменить на production-домен
  homepageMaxMaterials: 2, // Сколько материалов показывать на главной

  author: {
    name: "Александр Унгуренко",
    role: "Практик AI-разработки и AI-агентов",
    initials: "АУ",
    heroIntro:
      "Я Александр Унгуренко. Пришёл в AI-разработку без классического опыта программирования и показываю, как с помощью ИИ создавать сайты, приложения, Telegram-ботов и цифровые сервисы.",
    photo: "/images/author.webp",
    photoAlt: "Александр Унгуренко — практик AI-разработки",
  },

  socials: {
    telegram: {
      label: "Telegram",
      handle: "@ungurenko_adout_digital",
      url: "https://t.me/ungurenko_adout_digital",
    },
    instagram: {
      label: "Instagram",
      handle: "@ungurenko",
      url: "https://www.instagram.com/ungurenko",
    },
    youtube: {
      label: "YouTube",
      handle: "@ungurenkos",
      url: "https://www.youtube.com/@ungurenkos",
    },
  },

  promo: {
    enabled: true,
    label: "ВАЙБС",
    title: "Создавайте цифровые продукты с помощью ИИ",
    description:
      "Практический курс для людей без опыта программирования: от идеи до лендинга, веб-сервиса, Telegram-бота или приложения.",
    buttonLabel: "Перейти на VIBES",
    url: "https://vibes.ungurenko.ru",
    image: "/images/promo.webp",
    imageAlt: "Скриншот платформы VIBES для создания цифровых продуктов с помощью ИИ",
  },

  analytics: {
    umami: {
      enabled: false, // TODO: включить при деплое
      websiteId: undefined, // TODO: Umami website ID
      src: "https://cloud.umami.is/script.js",
    },
  },
};
