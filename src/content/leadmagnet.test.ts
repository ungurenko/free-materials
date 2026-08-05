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
  it("matches the source HTML page structure and primary copy", () => {
    expect(pageCopy.header.brand).toBe("Вайб-кодинг с нуля");
    expect(pageCopy.hero.eyebrow).toBe("Практическая база для новичка");
    expect(pageCopy.hero.lead).toBe(
      "5 готовых промптов, с которыми можно собрать первый сайт или веб-сервис без знания программирования.",
    );
    expect(pageCopy.projects.title).toBe("Выберите первый проект");
    expect(pageCopy.resources.title).toBe("Материалы для первого запуска");
    expect(pageCopy.telegram.title).toBe("Продолжайте создавать проекты с помощью ИИ");
    expect(pageCopy.footer.note).toBe("Возможности и лимиты нейросетей могут меняться.");
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
      "Тест с результатом",
      "Генератор идей",
      "Трекер привычек",
    ]);

    for (const project of projects) {
      expect(project.cardDescription.length).toBeGreaterThan(20);
      expect(project.description.length).toBeGreaterThan(40);
      expect(project.prompt.length).toBeGreaterThan(1_000);
      expect(project.services).toEqual(["Qwen", "Google AI Studio", "GLM"]);
      expect(["web", "calculator", "quiz", "ideas", "habits"]).toContain(project.cover);
    }
  });

  it("contains the exact compact resources from the source HTML", () => {
    expect(services.map((service) => service.name)).toEqual(["Google AI Studio", "Qwen", "GLM"]);
    expect(services.map((service) => service.url)).toEqual([
      "https://aistudio.google.com/",
      "https://qwen.ai/qwenchat",
      "https://chat.z.ai/",
    ]);
    expect(improvementPrompts).toHaveLength(5);
    expect(improvementPrompts.every((prompt) => prompt.text.length > 100)).toBe(true);
    expect(checklistItems).toHaveLength(10);
    expect(checklistItems[7]).toBe("в проекте нет технических заглушек");
    expect(checklistItems[9]).toBe("результат можно показать другому человеку");
    expect(safetyRules.items).toHaveLength(8);
    expect(safetyRules.items.at(-1)).toBe("сведения, публикация которых может причинить вред.");
    expect(howToUseSteps).toHaveLength(3);
  });

  it("presents improvement prompts as a dedicated next step", () => {
    expect(pageCopy.improvementPrompts).toEqual({
      eyebrow: "После первой версии",
      title: "5 промтов для улучшения проекта",
      description:
        "Получили первую версию — отправляйте эти промты в том же диалоге по одному. Они помогут проверить работу, улучшить мобильную версию, дизайн и понятность.",
      copyLabel: "Скопировать промт",
      copiedStatus: "Промт скопирован",
      copyErrorStatus: "Не удалось скопировать промт",
    });
  });

  it("provides compact Hero copy for phone screens", () => {
    expect(pageCopy.hero.mobile).toEqual({
      eyebrow: "Практическая база",
      meta: "Один проект · один сервис · 30–60 минут",
    });
  });

  it("provides approved copy for the YouTube channel and idea bot", () => {
    expect(pageCopy.usefulLinks).toEqual({
      title: "Одну идею вы уже собрали. Время для следующей.",
      description: "Два бесплатных маршрута, чтобы двигаться дальше и собирать новые проекты с ИИ.",
      youtube: {
        title: "Бесплатные уроки и прямые эфиры",
        description:
          "На YouTube я показываю, как создавать сайты, приложения и Telegram-ботов с помощью ИИ, и провожу прямые эфиры по вайб-кодингу.",
        buttonLabel: "Смотреть YouTube-канал",
      },
      ideaBot: {
        title: "Что можно создать для вашей ниши",
        description:
          "Опишите свою нишу — бот предложит пять идей проектов, которые можно собрать с помощью вайб-кодинга.",
        buttonLabel: "Получить 5 идей в Telegram",
      },
    });
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
