import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ImprovementPromptsSection from "./ImprovementPromptsSection";

describe("improvement prompts panel", () => {
  it("renders five ordered steps with the first prompt selected", () => {
    const html = renderToStaticMarkup(createElement(ImprovementPromptsSection));

    expect(html.match(/role="tab"/g)).toHaveLength(5);
    expect(html).toContain('aria-selected="true"');
    expect(html).toContain("Шаг 1 из 5");
    expect(html).toContain("Проверка и\u00A0исправление");
    expect(html).toContain("Проверь приложение как тестировщик");
  });

  it("keeps the mobile accordion and desktop tab panel accessible", () => {
    const html = renderToStaticMarkup(createElement(ImprovementPromptsSection));

    expect(html).toContain('aria-expanded="true"');
    expect(html).toContain('role="tabpanel"');
    expect(html).toContain('aria-label="Пять промптов для доводки проекта"');
  });
});
