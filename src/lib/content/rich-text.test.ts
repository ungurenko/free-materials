import { describe, expect, it } from "vitest";
import { formatRichText } from "./rich-text";

describe("formatRichText", () => {
  it("разбивает абзацы по двойному переносу строки", () => {
    expect(formatRichText("Первый абзац\n\nВторой абзац")).toBe(
      "<p>Первый абзац</p><p>Второй абзац</p>"
    );
  });

  it("поддерживает жирный и курсив", () => {
    expect(formatRichText("**жирный** и *курсив*")).toBe(
      "<p><strong>жирный</strong> и <em>курсив</em></p>"
    );
  });

  it("превращает безопасные ссылки в кликабельные", () => {
    expect(formatRichText("[текст](https://example.com)")).toBe(
      '<p><a href="https://example.com" target="_blank" rel="noopener noreferrer">текст</a></p>'
    );
  });

  it("оставляет внутренние ссылки в текущей вкладке", () => {
    expect(formatRichText("[база](/materials/baza-promtov-vibe-kodinga)")).toBe(
      '<p><a href="/materials/baza-promtov-vibe-kodinga">база</a></p>'
    );
  });

  it("экранирует HTML в тексте", () => {
    expect(formatRichText("<script>alert(1)</script>")).toBe(
      "<p>&lt;script&gt;alert(1)&lt;/script&gt;</p>"
    );
  });

  it("не превращает javascript: ссылки в кликабельные", () => {
    expect(formatRichText("[клик](javascript:alert(1))")).toBe(
      "<p>[клик](javascript:alert(1))</p>"
    );
  });

  it("экранирует кавычки в адресах ссылок", () => {
    expect(formatRichText('[текст](https://example.com/?a=1" onclick="x)')).toBe(
      '<p><a href="https://example.com/?a=1&quot; onclick=&quot;x" target="_blank" rel="noopener noreferrer">текст</a></p>'
    );
  });
});
