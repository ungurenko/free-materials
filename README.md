# База бесплатных материалов Александра

Публичный русскоязычный сайт-каталог бесплатных материалов по нейросетям, маркетингу, продажам, контенту и вайб-кодингу.

## Стек

- **Next.js 15** (App Router, статическая генерация)
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS 4**
- **Zod** (валидация контента)
- **Vercel** (деплой)

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Разработка (http://localhost:3000)
npm run dev

# Production build
npm run build

# Предпросмотр production build
npm run preview

# Проверка типов
npm run typecheck

# Линтинг
npm run lint
```

## Структура проекта

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Корневой layout
│   ├── page.tsx           # Главная страница
│   ├── not-found.tsx      # 404 страница
│   ├── sitemap.ts         # Sitemap.xml
│   ├── robots.ts          # Robots.txt
│   └── materials/[slug]/  # Страницы материалов
├── components/            # UI-компоненты
├── config/
│   └── site.ts           # Конфигурация сайта (автор, соцсети, баннер)
├── content/
│   └── materials/        # Файлы материалов (каждый материал — отдельный файл)
├── lib/
│   ├── analytics/        # Umami analytics
│   ├── content/          # Zod-схемы и loader
│   ├── youtube/          # YouTube utils
│   ├── copy.ts           # Копирование в буфер
│   └── ...
└── utils/
    └── cn.ts             # Утилита для классов
public/
└── images/               # Изображения (обложки, фото автора)
docs/
└── adding-materials.md   # Инструкция по добавлению материалов
```

## Добавление материала

1. Создайте файл в `src/content/materials/[slug].ts`
2. Скопируйте шаблон из существующего материала
3. Заполните все обязательные поля
4. Убедитесь, что `slug` уникален
5. Установите `published: true` для публикации
6. Запустите `npm run build` — валидация автоматически проверит материал

Подробная инструкция: [docs/adding-materials.md](docs/adding-materials.md)

## Конфигурация

Все настройки сайта находятся в `src/config/site.ts`:

- **Автор:** имя, роль, фото, описание
- **Соцсети:** Telegram, Instagram, YouTube
- **Рекламный баннер:** тексты, ссылка, изображение
- **SEO:** название сайта, описание
- **Аналитика:** Umami website ID

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

## Требования к материалам

- Уникальный `slug` в формате kebab-case
- Минимум один блок контента
- Валидные YouTube ID (11 символов)
- Все изображения должны иметь `alt` текст
- SEO: title (макс 60 символов), description (макс 160 символов)

## Проверки перед коммитом

```bash
npm run typecheck  # Проверка типов
npm run lint       # Линтинг
npm run build      # Production build
```

## Лицензия

Все материалы базы бесплатны — берите, применяйте и делитесь ссылкой с коллегами.

## Открытые вопросы

Перед production-релизом необходимо предоставить:

1. Финальное название сайта / автора
2. Фотография автора
3. Ссылки на Telegram, Instagram, YouTube
4. Текст первого экрана (hero)
5. Содержимое рекламного баннера
6. Production-домен
7. 1–2 реальных материала с обложками
8. OG-изображения
