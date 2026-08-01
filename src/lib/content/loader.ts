import type { Material } from "./schema";
import { MaterialSchema } from "./schema";
import * as materialModules from "@/content/materials/index";

// ============================================================
//  Content Loader: загрузка, валидация, сортировка материалов
// ============================================================

export function validateMaterials(rawMaterials: unknown[]): Material[] {
  const materials: Material[] = [];
  const slugs = new Set<string>();

  for (const raw of rawMaterials) {
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

    const promptIds = new Set<string>();
    for (const block of material.blocks) {
      if (block.type === "prompt" && promptIds.has(block.id)) {
        throw new Error(
          `\n\n❌ Дубликат prompt.id: "${block.id}" в материале "${material.slug}"\n\n` +
            `Каждый промпт в материале должен иметь уникальный id.\n`
        );
      }
      if (block.type === "prompt") {
        promptIds.add(block.id);
      }
    }

    materials.push(material);
  }

  return materials
    .filter((m) => m.published)
    .sort((a, b) => a.order - b.order);
}

function loadAndValidateMaterials(): Material[] {
  const modules = Object.values(materialModules);
  return validateMaterials(modules);
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
