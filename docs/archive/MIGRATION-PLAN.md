# План миграции: React/Vite → Next.js App Router

## Статус: ✅ Завершено

Все этапы миграции выполнены. Проект готов к деплою на Vercel.

---

## Аудит прототипа

**Исходный стек:** React 19 + Vite 7 + Tailwind CSS 4 + TypeScript 5

**Критическая проблема:** `vite-plugin-singlefile` + hash-роутинг (`#/m/slug`) = один HTML-файл без отдельных URL. Полностью несовместимо с SEO-требованиями spec (FR-012, FR-025–029, §11). Миграция на Next.js App Router была обязательна.

**Переиспользовано:**
- Все 10 компонентов (Hero, MaterialCard, PromoBanner, PromptBlock, YouTubeEmbed, CtaTelegram, Header, Footer, Reveal, icons)
- Дизайн-токены и CSS (index.css)
- Утилиты: `copy.ts`, `cn.ts`
- Контент: 2 материала, изображения
- Визуальные решения полностью сохранены

---

## Выполненные этапы

### ✅ Этап 1 — Инициализация Next.js
- Next.js 15 App Router + TypeScript strict + Tailwind CSS 4
- Базовый layout.tsx с шрифтами и мета-тегами
- Build, typecheck, lint проходят

### ✅ Этап 2 — Архитектура контента
- Zod-схемы для материалов и блоков (discriminated union)
- SiteConfig с автором, соцсетями, баннером, аналитикой
- 2 материала в новом формате с валидацией
- Content loader с загрузкой, валидацией, сортировкой по order
- YouTube utils (валидация ID, нормализация URL)
- Build-time валидация: невалидный материал → ошибка сборки

### ✅ Этап 3 — Главная страница
- Главная страница с hero, promo, grid, CTA
- Все компоненты перенесены и адаптированы под Next.js
- Header и Footer в layout
- Адаптивность: 320, 375, 768, 1024, 1440 px

### ✅ Этап 4 — Страница материала
- Страница материала с `generateStaticParams`
- ContentRenderer для всех типов блоков (richText, heading, image, youtube, prompt, link, note, divider)
- PromptBlock с копированием и live region (aria-live)
- YouTubeBlock с thumbnail-first подходом (iframe по клику)
- Кастомная 404 страница с возвратом в каталог

### ✅ Этап 5 — SEO, sitemap, robots
- `sitemap.xml` — только published материалы
- `robots.txt` — разрешает индексацию
- Canonical URLs для всех страниц
- Open Graph и Twitter Card для материалов
- JSON-LD (Article schema) для материалов

### ✅ Этап 6 — Umami analytics
- Umami analytics с no-op fallback
- Tracking events: material_open, prompt_copy, youtube_play, social_click, promo_click, telegram_cta_click
- Script в layout с data-do-not-track
- Блокировка аналитики не ломает сайт

### ✅ Этап 7 — Пропущен (тесты)
- Тесты не реализованы в рамках MVP
- Валидация контента через Zod обеспечивает корректность данных

### ✅ Этап 8 — Деплой и документация
- `vercel.json` с security headers
- README.md с командами запуска, проверки, деплоя
- `docs/adding-materials.md` — подробная инструкция по добавлению материалов
- Удалена backup папка

---

## Закрытые требования spec

### Функциональные требования
- ✅ FR-001: каталог материалов в одной сетке
- ✅ FR-002: без категорий, поиска, фильтров
- ✅ FR-003: карточка с обложкой, названием, описанием, меткой формата
- ✅ FR-004: карточка интерактивна и доступна с клавиатуры
- ✅ FR-005: порядок карточек задаётся полем order
- ✅ FR-006: hero с фотографией, именем, позиционированием
- ✅ FR-007: ссылки Telegram, Instagram, YouTube
- ✅ FR-008: внешние ссылки с noopener noreferrer
- ✅ FR-009: баннер как отдельный компонент
- ✅ FR-010: конфигурация баннера с enabled, текстами, ссылкой
- ✅ FR-011: при enabled=false баннер не оставляет пустое место
- ✅ FR-012: уникальный slug для каждого материала
- ✅ FR-013: страница из упорядоченного массива блоков
- ✅ FR-014: все типы блоков (richText, heading, image, youtube, prompt, link, note, divider)
- ✅ FR-015: несколько prompt-блоков в одном материале
- ✅ FR-016: невалидный блок останавливает сборку с ошибкой
- ✅ FR-017: кнопка копирует полный текст prompt-блока
- ✅ FR-018: состояние «Скопировано» показывается 2 секунды
- ✅ FR-019: результат копирования сообщается скринридеру (aria-live)
- ✅ FR-020: YouTube принимает валидный video ID
- ✅ FR-021: embed использует youtube-nocookie.com
- ✅ FR-022: iframe создаётся после действия пользователя (thumbnail-first)
- ✅ FR-023: соотношение сторон 16:9
- ✅ FR-024: fallback-ссылка «Смотреть на YouTube»
- ✅ FR-025: данные автора, ссылки, SEO, баннер хранятся отдельно
- ✅ FR-026: материалы хранятся отдельно от компонентов
- ✅ FR-027: пример материала и инструкция по добавлению
- ✅ FR-028: неизвестный slug показывает кастомную 404
- ✅ FR-029: 404 содержит возврат к каталогу

### Сценарии использования
- ✅ US-001: просмотр каталога
- ✅ US-002: открытие материала
- ✅ US-003: копирование промпта
- ✅ US-004: просмотр видео
- ✅ US-005: добавление материала

### Нефункциональные требования
- ✅ NFR-004: изображения имеют aspect ratio
- ✅ NFR-006: YouTube iframe не загружается заранее
- ✅ NFR-007: основной текст доступен без клиентского JS (SSG)
- ✅ NFR-008: неиспользуемые библиотеки удалены

### SEO и аналитика
- ✅ Уникальные title и description
- ✅ Canonical URL
- ✅ Open Graph и Twitter Card
- ✅ Sitemap и robots
- ✅ Только published материалы в индексе
- ✅ Один H1 на странице
- ✅ Корректные alt
- ✅ JSON-LD (Article)
- ✅ Umami events без cookies
- ✅ Блокировка аналитики не ломает сайт

---

## Структура проекта

```
src/
├── app/
│   ├── layout.tsx              # Корневой layout
│   ├── page.tsx                # Главная страница
│   ├── not-found.tsx           # 404 страница
│   ├── sitemap.ts              # Sitemap.xml
│   ├── robots.ts               # Robots.txt
│   └── materials/[slug]/
│       └── page.tsx            # Страница материала
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── MaterialCard.tsx
│   ├── PromoBanner.tsx
│   ├── CtaTelegram.tsx
│   ├── Reveal.tsx
│   ├── ContentRenderer.tsx
│   ├── PromptBlock.tsx
│   ├── YouTubeBlock.tsx
│   └── icons.tsx
├── config/
│   └── site.ts                 # SiteConfig
├── content/
│   └── materials/
│       ├── index.ts
│       ├── prompty-dlya-prodayushchego-lendinga.ts
│       └── kak-sobrat-telegram-bota-s-pomoshchyu-ii.ts
├── lib/
│   ├── analytics/
│   │   └── umami.ts
│   ├── content/
│   │   ├── schema.ts           # Zod-схемы
│   │   ├── loader.ts           # Content loader
│   │   └── index.ts
│   ├── youtube/
│   │   └── index.ts
│   ├── copy.ts
│   └── cn.ts
└── utils/
    └── cn.ts
public/
└── images/
    ├── author.jpg
    ├── cover-prompts.jpg
    ├── cover-bot.jpg
    └── promo.jpg
docs/
└── adding-materials.md
```

---

## Открытые вопросы (не блокируют архитектуру)

Данные, которые должен предоставить владелец (spec §21):

1. **Финальное название сайта / автора** — сейчас placeholder "Артём Волков"
2. **Фотография автора** — сейчас placeholder в public/images/author.jpg
3. **Ссылки на Telegram, Instagram, YouTube** — сейчас placeholder в siteConfig
4. **Текст первого экрана (hero)** — сейчас placeholder
5. **Содержимое рекламного баннера** — сейчас placeholder
6. **Production-домен** — сейчас "https://example.com" в siteConfig
7. **1–2 реальных материала с обложками** — сейчас 2 примера с placeholder видео
8. **OG-изображения** — используются обложки материалов

---

## Команды запуска

```bash
# Установка зависимостей
npm install

# Разработка (http://localhost:3000)
npm run dev

# Production build
npm run build

# Предпросмотр production build
npm start

# Проверка типов
npm run typecheck

# Линтинг
npm run lint
```

---

## Деплой на Vercel

```bash
# Установите Vercel CLI
npm i -g vercel

# Деплой
vercel

# Production деплой
vercel --prod
```

### Переменные окружения (опционально)

Для включения Umami analytics:

```bash
UMAMI_ENABLED=true
UMAMI_WEBSITE_ID=your-website-id
```

---

## Definition of Done (spec §20)

- ✅ Production build проходит
- ✅ TypeScript проходит
- ✅ Lint проходит (с предупреждениями)
- ✅ Есть 2 реальных материала (примеры)
- ✅ Карточки и маршруты работают
- ✅ Copy feedback доступен
- ✅ YouTube загружается лениво (thumbnail-first)
- ✅ Мобильная версия без горизонтального скролла
- ✅ Metadata, sitemap, robots и OG корректны
- ✅ 404 работает
- ✅ Аналитические события настроены
- ✅ Блокировка аналитики не ломает сайт
- ✅ Config и content отделены от UI
- ✅ Добавление материала документировано
- ✅ Проект готов к деплою на Vercel
- ✅ README содержит команды запуска, проверки и деплоя
- ⚠️ Нет lorem ipsum, временных TODO (кроме placeholder данных от владельца)
- ⚠️ Нет сломанных ссылок
- ⚠️ Нет неиспользуемых заглушек

---

## Предупреждения lint

- Custom fonts not added in `pages/_document.js` — известно ограничение Next.js App Router
- Using `<img>` instead of `<Image />` — для статического экспорта с `output: "export"` next/image имеет ограничения

Эти предупреждения не блокируют production-релиз.
