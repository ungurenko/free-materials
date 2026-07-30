import type { Material } from "./schema";
import { MaterialSchema } from "./schema";
import * as materialModules from "@/content/materials/index";

// ============================================================
//  Content Loader: загрузка, валидация, сортировка материалов
// ============================================================

function loadAndValidateMaterials(): Material[] {
  const materials: Material[] = [];
  const slugs = new Set<string>();

  const modules = Object.values(materialModules) as Material[];

  for (const raw of modules) {
    const result = MaterialSchema.safeParse(raw);

    if (!result.success) {
      const errors = result.error.issues
        .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
        .join("\n");
      throw new Error(
        `\n\n❌ Валидация материала не удалась\n\n${errors}\n\n` +
          `Исправьте ошибки в файле материала и повторите сборку.\n`
      );
    }

    const material = result.data;

    if (slugs.has(material.slug)) {
      throw new Error(
        `\n\n❌ Дубликат slug: "${material.slug}"\n\n` +
          `Каждый материал должен иметь уникальный slug.\n`
      );
    }
    slugs.add(material.slug);

    materials.push(material);
  }

  return materials
    .filter((m) => m.published)
    .sort((a, b) => a.order - b.order);
}

export const allMaterials: Material[] = loadAndValidateMaterials();

export function getMaterialBySlug(slug: string): Material | undefined {
  return allMaterials.find((m) => m.slug === slug);
}

export function getAllMaterialSlugs(): string[] {
  return allMaterials.map((m) => m.slug);
}

export function getPublishedMaterials(): Material[] {
  return allMaterials.filter((m) => m.published);
}
