// ============================================================
//  КОНФИГУРАЦИЯ САЙТА
//  Здесь меняются: автор, соцсети, SEO, аналитика.
// ============================================================

interface SocialLink {
  label: string;
  handle: string;
  url: string;
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
  socialPreviewImage: string;
  socialPreviewAlt: string;
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
}

export const siteConfig: SiteConfig = {
  siteName: "Стартовый набор для вайб-кодинга",
  siteDescription:
    "10 готовых промптов, чтобы без опыта в коде собрать первый сайт или веб-приложение и довести его до рабочей версии.",
  siteUrl: "https://free.ungurenko.ru",
  socialPreviewImage: "/social-preview.png",
  socialPreviewAlt:
    "Стартовый набор для вайб-кодинга — 10 готовых промптов от Александра Унгуренко",

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
    eyebrow: "Следующий шаг — ВАЙБС",
    title: "Пройдите тот же путь на\u00A0двух своих проектах",
    description:
      "Стартовый набор помогает попробовать процесс на\u00A0готовом промпте. На\u00A0ВАЙБС вы\u00A0соберёте и\u00A0опубликуете свой лендинг и\u00A0веб-сервис — с\u00A0уроками, готовыми инструментами и\u00A0поддержкой.",
    meta: "Старт сразу · два проекта · от\u00A09\u202F990\u00A0₽ · доступ навсегда",
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
};
