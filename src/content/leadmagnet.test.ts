import { describe, expect, it } from "vitest";
import {
  checklistItems,
  howToUseSteps,
  improvementPrompts,
  pageCopy,
  projects,
  safetyRules,
  services,
} from "./leadmagnet";

describe("leadmagnet content", () => {
  it("uses the approved concise copy on the first screen", () => {
    expect(pageCopy.header.brand).toBe("Вайб-кодинг с\u00A0нуля");
    expect(pageCopy.hero.eyebrow).toBe("Первый проект с\u00A0ИИ");
    expect(pageCopy.hero.lead).toBe(
      "5 готовых промптов для первого сайта или веб-сервиса. Опыт программирования не\u00A0нужен.",
    );
    expect(pageCopy.hero.paragraphs).toEqual([
      "Выберите проект, откройте карточку и\u00A0вставьте промпт в\u00A0Qwen, Google AI Studio или GLM. Сервис соберёт первую рабочую версию.",
    ]);
    expect(pageCopy.hero.note).toBe(
      "Для старта нужны браузер, аккаунт в\u00A0одном из\u00A0сервисов и\u00A020–70 минут.",
    );
    expect(pageCopy.projects.title).toBe("Выберите первый проект");
    expect(pageCopy.projects.description).toBe(
      "Выберите один из\u00A0пяти проектов — этого достаточно для первого результата.",
    );
    expect(pageCopy.resources.title).toBe("Материалы для первого запуска");
    expect(pageCopy.resources.description).toBe(
      "Откройте сервисы, чек-лист или правила безопасности, когда они понадобятся.",
    );
    expect(pageCopy.resources.servicesRecommendation).toBe(
      "Если не\u00A0знаете, что выбрать, начните с\u00A0Google AI Studio.",
    );
    expect(pageCopy.telegram).toEqual({
      title: "Новые промпты и\u00A0разборы проектов — в\u00A0Telegram",
      text: "В\u00A0канале я\u00A0публикую новые промпты и\u00A0показываю, как с\u00A0помощью ИИ создавать сайты, приложения, Telegram-ботов и\u00A0веб-сервисы.",
      note: "Собрали проект? Пришлите ссылку, скриншот или запись экрана — часть работ разберу в\u00A0канале.",
      buttonLabel: "Открыть Telegram-канал",
    });
    expect(pageCopy.footer.note).toBe("Возможности и\u00A0лимиты нейросетей могут меняться.");
  });

  it("contains exactly five source projects with complete modal content", () => {
    expect(projects).toHaveLength(5);
    expect(projects.map((project) => project.id)).toEqual([
      "project-page",
      "calculator",
      "quiz",
      "idea-generator",
      "habit-tracker",
    ]);
    expect(projects.map((project) => project.cardTitle)).toEqual([
      "Страница проекта",
      "Интерактивный калькулятор",
      "Тест с\u00A0результатом",
      "Генератор идей",
      "Трекер привычек",
    ]);
    expect(projects.map((project) => project.coverImage)).toEqual([
      "/images/project-covers/project-page.webp",
      "/images/project-covers/calculator.webp",
      "/images/project-covers/quiz.webp",
      "/images/project-covers/idea-generator.webp",
      "/images/project-covers/habit-tracker.webp",
    ]);
    expect(new Set(projects.map((project) => project.coverImage)).size).toBe(projects.length);

    for (const project of projects) {
      expect(project.cardDescription.length).toBeGreaterThan(20);
      expect(project.description.length).toBeGreaterThan(40);
      expect(project.prompt.length).toBeGreaterThan(1_000);
      expect(project.services).toEqual(["Qwen", "Google AI Studio", "GLM"]);
      expect(project.coverImage.endsWith(".webp")).toBe(true);
    }
  });

  it("contains five projects and compact launch resources", () => {
    expect(services.map((service) => service.name)).toEqual(["Google AI Studio", "Qwen", "GLM"]);
    expect(services.map((service) => service.url)).toEqual([
      "https://aistudio.google.com/",
      "https://qwen.ai/qwenchat",
      "https://chat.z.ai/",
    ]);
    expect(improvementPrompts).toHaveLength(5);
    expect(improvementPrompts.every((prompt) => prompt.text.length > 100)).toBe(true);
    expect(checklistItems).toHaveLength(10);
    expect(checklistItems[7]).toBe("в\u00A0проекте нет технических заглушек");
    expect(checklistItems[9]).toBe("результат можно показать другому человеку");
    expect(safetyRules.items).toHaveLength(8);
    expect(safetyRules.items.at(-1)).toBe("сведения, публикация которых может причинить вред.");
    expect(howToUseSteps).toHaveLength(3);
  });

  it("presents improvement prompts as a dedicated next step", () => {
    expect(pageCopy.improvementPrompts).toEqual({
      eyebrow: "После первой версии",
      title: "5 промптов для улучшения проекта",
      description:
        "Отправляйте промпты в\u00A0том же диалоге по\u00A0одному: сначала проверьте работу приложения, затем мобильную версию, дизайн и\u00A0понятность интерфейса.",
      copyLabel: "Скопировать промпт",
      copiedStatus: "Промпт скопирован",
      copyErrorStatus: "Не удалось скопировать промпт",
    });
  });

  it("provides compact Hero copy for phone screens", () => {
    expect(pageCopy.hero.mobile).toEqual({
      eyebrow: "Первый проект с\u00A0ИИ",
      meta: "Один проект · один сервис · 20–70 минут",
    });
  });

  it("provides approved copy for the YouTube channel and idea bot", () => {
    expect(pageCopy.usefulLinks).toEqual({
      eyebrow: "Бесплатные материалы",
      title: "Выберите, что создать дальше",
      description:
        "Посмотрите бесплатные уроки на\u00A0YouTube или получите пять идей для своей ниши в\u00A0Telegram-боте.",
      youtube: {
        metaLabel: "YouTube",
        title: "Уроки и\u00A0прямые эфиры о\u00A0вайб-кодинге",
        description:
          "На\u00A0YouTube я\u00A0показываю, как создавать сайты, приложения и\u00A0Telegram-ботов с\u00A0помощью ИИ, и\u00A0провожу прямые эфиры по\u00A0вайб-кодингу.",
        buttonLabel: "Перейти на\u00A0YouTube",
      },
      ideaBot: {
        metaLabel: "Telegram-бот",
        title: "Пять идей для вашей ниши",
        description: "Опишите свою нишу, и\u00A0бот предложит пять проектов для старта.",
        buttonLabel: "Получить идеи в\u00A0Telegram",
      },
    });
  });

  it("keeps modal labels and completion copy in the shared dictionary", () => {
    expect(pageCopy.projectModal).toEqual(
      expect.objectContaining({
        openLabel: "Открыть промпт",
        copyLabel: "Скопировать промпт",
        copiedStatus: "Промпт скопирован",
        copyErrorStatus: "Не удалось скопировать промпт",
      }),
    );
    expect(pageCopy.resources.completeStatus).toBe(
      "Готово: вы\u00A0проверили первый проект по\u00A0всем пунктам.",
    );
  });

  it("keeps user-facing copy free from rejected typography and terminology", () => {
    const collectText = (value: unknown): string[] => {
      if (typeof value === "string") return [value];
      if (Array.isArray(value)) return value.flatMap(collectText);
      if (value && typeof value === "object") return Object.values(value).flatMap(collectText);
      return [];
    };
    const allCopy = collectText({
      pageCopy,
      services,
      projects,
      improvementPrompts,
      safetyRules,
      checklistItems,
      howToUseSteps,
    }).join("\n");

    expect(allCopy).not.toMatch(/\bпромт(?:а|е|ом|у|ы|ов|ами|ах)?\b/iu);
    expect(allCopy).not.toContain("...");
    expect(allCopy).not.toMatch(/\s-\s/u);
    expect(pageCopy.hero.mobile.meta).not.toContain("30–60");
  });

  it("replaces subjective prompt wording with observable requirements", () => {
    const prompts = Object.fromEntries(projects.map((project) => [project.id, project.prompt]));
    const allPrompts = projects.map((project) => project.prompt).join("\n");

    expect(prompts["project-page"]).toContain(
      "светлый фон, тёмный текст, один акцентный цвет",
    );
    expect(prompts.calculator).toContain("кнопки «Рассчитать»");
    expect(prompts.calculator).toContain("формулу, которая соответствует выбранной теме");
    expect(prompts.quiz).toContain(
      "стартовый экран с\u00A0названием, короткой инструкцией и\u00A0кнопкой «Начать»",
    );
    expect(prompts["habit-tracker"]).toContain(
      "уведомления, которые называют выполненное действие или объясняют, как исправить ошибку",
    );
    expect(allPrompts).not.toMatch(
      /красивый стартовый экран|современный и удобный дизайн|понятная кнопка расчёта|аккуратные уведомления|разумная формула/iu,
    );
  });

  it("keeps project ids unique and replacement markers source-accurate", () => {
    expect(new Set(projects.map((project) => project.id)).size).toBe(projects.length);
    expect(projects.map((project) => project.replace)).toEqual([
      "[ВПИШИТЕ ТЕМУ]",
      "[ВПИШИТЕ, ЧТО ОН ДОЛЖЕН РАССЧИТЫВАТЬ]",
      "[ВПИШИТЕ ТЕМУ ТЕСТА]",
      "[ВПИШИТЕ ТЕМУ]",
      "",
    ]);
  });
});
