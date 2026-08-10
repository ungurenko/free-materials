# Вайб-кодинг с нуля

Публичный лид-магнит Александра Унгуренко: пять готовых промптов, с которыми можно собрать первый сайт или веб-сервис с помощью ИИ.

Production: [free.ungurenko.ru](https://free.ungurenko.ru)

## Стек

- **Next.js 16** (App Router, статический экспорт)
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS 4**
- **Vercel Analytics**
- **Vercel**

## Быстрый старт

```bash
npm install
npm run dev
```

Локальный адрес: `http://localhost:3000`.

## Структура проекта

```text
src/
├── app/                 # страницы, SEO, sitemap, robots и social preview
├── components/          # интерфейс сайта
├── config/site.ts       # домен, автор, ссылки и SEO
├── content/leadmagnet.ts # проекты, промпты и тексты
└── lib/                 # копирование, URL-состояние и social preview
public/images/         # фото автора, обложки и баннер
```

## Конфигурация

Основные данные сайта находятся в `src/config/site.ts`: production-домен, SEO, автор, соцсети и баннер. Контент лид-магнита редактируется в `src/content/leadmagnet.ts`.

Базовая веб-аналитика подключена через Vercel Analytics. Отдельные ключи или переменные окружения для неё не нужны.

## Проверки

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

Готовая статическая версия появляется в `out/`. Для локального просмотра: `npx serve out`.

## Деплой

Сайт публикуется в Vercel из ветки `main`. Старый адрес `free-materials.vercel.app` после деплоя перенаправляет посетителя на `https://free.ungurenko.ru`.

## Лицензия

Материалы можно брать, применять и делиться ссылкой с коллегами.
