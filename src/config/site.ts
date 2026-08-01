// ============================================================
//  КОНФИГУРАЦИЯ САЙТА
//  Здесь меняются: автор, соцсети, SEO, аналитика.
// ============================================================

interface SocialLink {
  label: string;
  handle: string;
  url: string;
}

interface AnalyticsConfig {
  umami: {
    enabled: boolean;
    websiteId?: string;
    src: string;
  };
}

interface SiteConfig {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  author: {
    name: string;
    role: string;
    initials: string;
    heroIntro: string;
    photo: string;
    photoAlt: string;
  };
  socials: {
    telegram: SocialLink;
    instagram: SocialLink;
    youtube: SocialLink;
  };
  analytics: AnalyticsConfig;
}

export const siteConfig: SiteConfig = {
  siteName: "Вайб-кодинг с нуля",
  siteDescription:
    "5 готовых промптов для создания первого сайта, калькулятора, теста, генератора идей или трекера привычек с помощью Qwen, Google AI Studio и GLM.",
  siteUrl: "https://example.com", // TODO: заменить на production-домен

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

  analytics: {
    umami: {
      enabled: false, // TODO: включить при деплое
      websiteId: undefined, // TODO: Umami website ID
      src: "https://cloud.umami.is/script.js",
    },
  },
};
