import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import NotFound from "./not-found";

describe("not found copy", () => {
  it("returns the reader to the lead magnet without marketing jargon", () => {
    const markup = renderToStaticMarkup(NotFound());

    expect(markup).toContain("Такой страницы нет");
    expect(markup).toContain(
      "Возможно, ссылка устарела. На\u00A0главной — «Вайб-кодинг с\u00A0нуля» и\u00A0пять готовых промптов.",
    );
    expect(markup).not.toContain("лидмагнит");
  });
});
