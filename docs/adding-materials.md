# Инструкция по добавлению материалов

## Быстрый старт

1. Создайте файл в `src/content/materials/[slug].ts`
2. Скопируйте шаблон из существующего материала
3. Заполните все обязательные поля
4. Запустите `npm run build` — валидация автоматически проверит материал

## Структура материала

```typescript
import type { Material } from "@/lib/content/schema";

const material: Material = {
  // === Обязательные поля ===
  slug: "unikalnyy-slug-v-kebab-case",
  title: "Название материала (макс 100 символов)",
  summary: "Краткое описание для карточки (макс 200 символов)",
  formatLabel: "Промпт-пак", // Метка формата
  coverImage: "/images/cover.jpg", // Путь к обложке
  coverAlt: "Описание обложки для accessibility",
  publishedAt: "2026-07-29", // Формат YYYY-MM-DD
  order: 1, // Порядок отображения в каталоге
  published: true, // false = материал не публикуется

  // === SEO ===
  seo: {
    title: "SEO заголовок (макс 60 символов)",
    description: "SEO описание (макс 160 символов)",
    ogImage: "/images/og-cover.jpg", // Опционально, иначе используется coverImage
  },

  // === Блоки контента ===
  blocks: [
    // См. раздел "Типы блоков" ниже
  ],
};

export default material;
```

## Типы блоков

### 1. Rich Text

```typescript
{
  type: "richText",
  content: "Текст с **жирным** и *курсивом*. [Ссылка](https://example.com)",
}
```

### 2. Heading

```typescript
{
  type: "heading",
  level: 2, // 2 или 3
  content: "Заголовок раздела",
}
```

### 3. Image

```typescript
{
  type: "image",
  src: "/images/screenshot.jpg",
  alt: "Описание изображения",
  aspectRatio: "16/9", // Опционально
}
```

### 4. YouTube

```typescript
{
  type: "youtube",
  videoId: "dQw4w9WgXcQ", // 11 символов
  title: "Название видео",
  description: "Описание видео (опционально)",
  startAt: 42, // Начать с 42 секунды (опционально)
}
```

### 5. Prompt (с кнопкой копирования)

```typescript
{
  type: "prompt",
  id: "prompt-1", // Уникальный ID
  title: "Название промпта",
  description: "Описание промпта (опционально)",
  prompt: `Текст промпта
Многострочный текст`,
}
```

### 6. Link

```typescript
{
  type: "link",
  url: "https://example.com",
  label: "Текст ссылки",
  description: "Описание ссылки (опционально)",
}
```

### 7. Note

```typescript
{
  type: "note",
  content: "Важное примечание или подсказка",
}
```

### 8. Divider

```typescript
{
  type: "divider",
}
```

## Правила валидации

### Slug
- Только латинские буквы в нижнем регистре, цифры и дефисы
- Формат: `kebab-case`
- Должен быть уникальным
- Примеры: `kak-sobrat-bota`, `prompty-dlya-lendinga`

### SEO
- `seo.title`: максимум 60 символов
- `seo.description`: максимум 160 символов
- Оба поля обязательны

### YouTube
- `videoId`: ровно 11 символов (латинские буквы, цифры, `-`, `_`)
- Пример: `dQw4w9WgXcQ`

### Изображения
- Все изображения должны иметь `alt` текст
- Обложка обязательна
- Путь начинается с `/images/`

### Блоки
- Минимум один блок в материале
- `prompt.id` должен быть уникальным в рамках материала

## Порядок публикации

1. Создайте файл материала
2. Установите `published: false` для черновика
3. Запустите `npm run dev` и проверьте материал локально
4. Убедитесь, что `npm run build` проходит без ошибок
5. Установите `published: true`
6. Закоммитьте изменения

## Скрытие материала из каталога

Установите `published: false` — материал не будет отображаться в каталоге и sitemap, но страница останется доступной по прямому URL.

## Изменение порядка материалов

Измените поле `order` — материалы сортируются по возрастанию этого поля.

## Пример полного материала

См. `src/content/materials/prompty-dlya-prodayushchego-lendinga.ts`

## Чеклист перед публикацией

- [ ] Slug уникален и в формате kebab-case
- [ ] Все обязательные поля заполнены
- [ ] SEO title ≤ 60 символов
- [ ] SEO description ≤ 160 символов
- [ ] Обложка имеет alt текст
- [ ] YouTube ID валиден (11 символов)
- [ ] Все prompt.id уникальны
- [ ] `npm run build` проходит без ошибок
- [ ] Материал проверен локально через `npm run dev`
