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

interface PromoMedia {
  src: string;
  alt: string;
}

interface PromoBannerConfig {
  enabled: boolean;
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  meta: string;
  buttonLabel: string;
  url: string;
  logo: PromoMedia;
  image: PromoMedia;
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
  promoBanner: PromoBannerConfig;
  socials: {
    telegram: SocialLink;
    instagram: SocialLink;
    youtube: SocialLink;
    ideaBot: SocialLink;
  };
  analytics: AnalyticsConfig;
}

export const siteConfig: SiteConfig = {
  siteName: "Вайб-кодинг с нуля",
  siteDescription:
    "5 готовых промптов для создания первого сайта, калькулятора, теста, генератора идей или трекера привычек с помощью Qwen, Google AI Studio и GLM.",
  siteUrl: "https://example.com", // TODO: заменить на production-домен

  author: {
    name: "Александр Унгуренко",
    role: "Показываю, как создавать сайты, приложения и\u00A0ИИ-агентов",
    initials: "АУ",
    heroIntro:
      "Я Александр Унгуренко. Пришёл в AI-разработку без классического опыта программирования и показываю, как с помощью ИИ создавать сайты, приложения, Telegram-ботов и цифровые сервисы.",
    photo: "/images/author.webp",
    photoAlt: "Александр Унгуренко",
  },

  promoBanner: {
    enabled: true,
    id: "vibes-course",
    eyebrow: "Курс по\u00A0вайб-кодингу",
    title: "Создайте свой проект с\u00A0ИИ на\u00A0курсе ВАЙБС",
    description:
      "На\u00A0курсе вы\u00A0соберёте и\u00A0запустите сайт, сервис, Telegram-бота или приложение. Программа рассчитана на\u00A0новичков без опыта в\u00A0программировании.",
    meta: "Доступ сразу · от\u00A09\u202F990\u00A0₽ · материалы остаются навсегда",
    buttonLabel: "Посмотреть программу курса",
    url: "https://vibes.ungurenko.ru",
    logo: {
      src: "/images/vibes-logo.webp",
      alt: "ВАЙБС",
    },
    image: {
      src: "/images/vibes-platform.webp",
      alt: "Учебная платформа курса ВАЙБС",
    },
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
    ideaBot: {
      label: "Бот с идеями",
      handle: "@Vibecoding_Ideas_Bot",
      url: "https://t.me/Vibecoding_Ideas_Bot",
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
