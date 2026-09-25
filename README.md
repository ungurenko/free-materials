# Вайб-кодинг с нуля

Публичный лид-магнит Александра Унгуренко: пять готовых промптов, с которыми можно собрать первый сайт или веб-сервис с помощью ИИ.

Production: [free.ungurenko.ru](https://free.ungurenko.ru)

## Стек

- **Next.js 16** (App Router, статический экспорт)
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS 4**
- **Zod** (валидация контента)
- **Vercel Analytics**
- **Railway + Caddy** (деплой статического сайта)
- **Cloudflare Web Analytics** (статистика посещений)

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

Базовая веб-аналитика подключена через Vercel Analytics. Cloudflare Web Analytics включается
и настраивается в `src/config/site.ts`; сайт статический, поэтому конфигурация добавляется во время сборки.

## Деплой на Railway

Сайт работает по адресу [https://free.ungurenko.ru](https://free.ungurenko.ru).

Railway собирает проект через `Dockerfile`. Next.js создаёт статическую версию сайта в папке
`out/`, после чего Caddy раздаёт готовые файлы и отвечает `ok` по адресу `/health`.

Домен `free.ungurenko.ru` направлен на Railway через DNS-запись в Cloudflare.

## Статистика Cloudflare Web Analytics

Для `free.ungurenko.ru` создан отдельный сайт в Cloudflare Web Analytics. Счётчик подключён
в `src/app/layout.tsx`, а его настройка хранится в `src/config/site.ts`.

### Как открыть статистику

1. Откройте [Cloudflare Dashboard](https://dash.cloudflare.com/) и войдите в аккаунт Александра.
2. В левом меню выберите **Web Analytics**.
3. Откройте сайт **free.ungurenko.ru**.
4. В правом верхнем углу выберите нужный период: последние сутки, неделю или месяц.

В отчёте доступны:

- **Visits** — количество посещений;
- **Page views** — сколько страниц просмотрели;
- **Referrers** — откуда пришли посетители;
- **Paths** — какие страницы смотрели;
- страны, устройства, браузеры и операционные системы;
- скорость загрузки и показатели Core Web Vitals.

Новые посещения могут появляться в отчёте с задержкой в несколько минут. Техническую нагрузку
сайта — процессор, память, сеть и ответы сервера — нужно смотреть отдельно в метриках Railway.

## Проверки

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

Готовая статическая версия появляется в `out/`. Для локального просмотра: `npx serve out`.

## Деплой

Основной сайт публикуется в Railway из ветки `main` через `Dockerfile` и Caddy.
Конфигурация Vercel сохраняет перенаправление со старого адреса
`free-materials.vercel.app` на `https://free.ungurenko.ru`.

## Лицензия

Материалы можно брать, применять и делиться ссылкой с коллегами.
