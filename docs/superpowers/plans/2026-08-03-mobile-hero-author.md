# Mobile Hero Author Row Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Пересобрать мобильный Hero так, чтобы заголовок занимал всю ширину, а фото стало частью компактной авторской строки.

**Architecture:** Изменение ограничено мобильной веткой `Hero`. Имя, роль и фото по-прежнему берутся из `siteConfig`; новые типы и зависимости не нужны.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Vitest.

## Global Constraints

- Планшетная и десктопная ветки Hero остаются без изменений.
- Видимые тексты и данные автора не дублируются в компоненте.
- Новые пакеты и CSS-правила не добавляются.
- Проверка мобильного вида: 320, 375 и 430 px.

---

### Task 1: Пересобрать мобильную композицию Hero

**Files:**
- Create: `src/components/Hero.test.ts`
- Modify: `src/components/Hero.tsx`
- Modify: `vitest.config.ts`

**Interfaces:**
- Consumes: `siteConfig.author.photo`, `photoAlt`, `name`, `role`; `pageCopy.hero`.
- Produces: мобильный `Hero` с полноширинным заголовком и маркером `mobile-author` на авторской строке.

- [x] **Step 1: Включить JSX-трансформацию Vitest и написать падающий тест готовой HTML-разметки**

```ts
export default defineConfig({
  oxc: {
    jsx: {
      runtime: "automatic",
      importSource: "react",
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
  // existing resolve config
});
```

```ts
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Hero from "./Hero";

describe("mobile Hero composition", () => {
  it("renders the mobile headline before a complete author identity", () => {
    const html = renderToStaticMarkup(Hero());
    const headlinePosition = html.indexOf('data-mobile-headline="true"');
    const authorPosition = html.indexOf('data-mobile-author="true"');

    expect(headlinePosition).toBeGreaterThan(-1);
    expect(authorPosition).toBeGreaterThan(headlinePosition);
    expect(html).toContain("Александр Унгуренко");
    expect(html).toContain("Практик AI-разработки и AI-агентов");
  });
});
```

- [x] **Step 2: Подтвердить, что тест падает на текущей композиции**

Run: `npm test -- src/components/Hero.test.ts`

Expected: FAIL на проверке маркеров, потому что сейчас заголовок и фото стоят в одной grid-строке, а полная авторская строка отсутствует.

- [x] **Step 3: Заменить тесную grid-строку на вертикальную композицию**

```tsx
<h1 data-mobile-headline="true" className="mt-5 font-display text-[clamp(1.7rem,8vw,2rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
  {pageCopy.hero.title}
</h1>

<p className="mt-4 text-[1rem] leading-relaxed text-ink-soft">
  {pageCopy.hero.lead}
</p>

<figure data-mobile-author="true" className="mobile-author mt-5 flex items-center gap-3">
  <div className="relative size-14 shrink-0 overflow-hidden rounded-full border border-line-strong bg-paper shadow-[0_12px_26px_-18px_rgba(38,40,31,0.5)]">
    <Image
      src={author.photo}
      alt={author.photoAlt}
      fill
      priority
      sizes="56px"
      className="object-cover object-center"
    />
  </div>
  <figcaption className="min-w-0">
    <span className="block text-sm font-semibold leading-tight text-ink">{author.name}</span>
    <span className="mt-1 block text-xs leading-snug text-ink-soft">{author.role}</span>
  </figcaption>
</figure>
```

Сохранить текущую плашку над этим кодом и текущую мета-строку под ним.

- [x] **Step 4: Запустить автотесты и статические проверки**

Run: `npm test && npm run typecheck && npm run lint`

Expected: все тесты проходят; TypeScript и lint завершаются без новых ошибок.

- [x] **Step 5: Проверить вид во встроенном браузере**

Run: `npm run dev`

Check at 320×568, 375×812 and 430×932:
- заголовок не конфликтует с фото;
- авторская строка читается целиком;
- нет горизонтальной прокрутки;
- мета-строка остаётся в первом экране на 375×812;
- планшетный и десктопный Hero визуально не изменились.

- [x] **Step 6: Проверить diff и сохранить целевые изменения**

Run: `git diff --check && git status --short`

Expected: изменены только `Hero.tsx`, `Hero.test.ts`, `vitest.config.ts` и документ плана.

Commit:

```bash
git add src/components/Hero.tsx src/components/Hero.test.ts vitest.config.ts docs/superpowers/plans/2026-08-03-mobile-hero-author.md
git commit -m "feat: улучшить мобильный Hero"
```
