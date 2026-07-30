import type { SiteConfig } from "@/lib/content/schema";

// ============================================================
//  КОНФИГУРАЦИЯ САЙТА
//  Здесь меняются: автор, соцсети, рекламный баннер, SEO, аналитика.
// ============================================================

export const siteConfig: SiteConfig = {
  siteName: "Артём Волков — бесплатные материалы",
  siteDescription:
    "Бесплатная база практических материалов по нейросетям, маркетингу, контенту и вайб-кодингу: промпты, гайды и разборы.",
  siteUrl: "https://example.com", // TODO: заменить на production-домен

  author: {
    name: "Артём Волков", // TODO: финальное имя автора
    role: "Эксперт по нейросетям, маркетингу, продажам и вайб-кодингу",
    initials: "АВ",
    heroIntro:
      "Меня зовут Артём. Восемь лет в маркетинге и продажах, три года — в нейросетях. Здесь я собираю то, что реально использую в проектах: без теории ради теории.",
    photo: "/images/author.jpg", // TODO: заменить на реальное фото
    photoAlt: "Артём Волков — автор базы материалов",
  },

  socials: {
    telegram: {
      label: "Telegram",
      handle: "@artemvolkov_ai",
      url: "https://t.me/artemvolkov_ai", // TODO: реальная ссылка
    },
    instagram: {
      label: "Instagram",
      handle: "@artemvolkov.ai",
      url: "https://www.instagram.com/artemvolkov.ai", // TODO: реальная ссылка
    },
    youtube: {
      label: "YouTube",
      handle: "Артём Волков · AI и маркетинг",
      url: "https://www.youtube.com/@artemvolkov_ai", // TODO: реальная ссылка
    },
  },

  promo: {
    enabled: true,
    label: "Мой основной проект",
    title: "Все продукты и практические программы в одном месте",
    description:
      "Курсы, гайды и готовые AI-решения с обратной связью. База материалов — бесплатная витрина, а вся глубина живёт на платформе.",
    buttonLabel: "Посмотреть продукты",
    url: "https://example.com/products", // TODO: реальная ссылка
    image: "/images/promo.jpg", // TODO: заменить на реальное изображение
    imageAlt: "Платформа с продуктами Артёма Волкова",
  },

  analytics: {
    umami: {
      enabled: false, // TODO: включить при деплое
      websiteId: undefined, // TODO: Umami website ID
      src: "https://cloud.umami.is/script.js",
    },
  },
};
