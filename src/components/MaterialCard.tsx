import Link from "next/link";
import type { Material } from "@/lib/content/schema";
import { IconArrowRight, IconArrowUpRight } from "./icons";

export default function MaterialCard({ material }: { material: Material }) {
  return (
    <Link
      href={`/materials/${material.slug}`}
      className="group block overflow-hidden rounded-3xl border border-line bg-paper transition-all duration-300 hover:-translate-y-1.5 hover:border-lime-400 hover:shadow-[0_30px_64px_-34px_rgba(38,40,31,0.4)] active:translate-y-0 active:scale-[0.995]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-lime-100">
        <img
          src={material.coverImage}
          alt={material.coverAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="pill absolute left-4 top-4 border border-line bg-paper/90 px-3.5 py-2 text-ink backdrop-blur-sm">
          {material.formatLabel}
        </span>
        <span className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full border border-line bg-paper/90 text-ink backdrop-blur-sm transition-all duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <IconArrowUpRight className="size-5" />
        </span>
      </div>

      <div className="p-6 sm:p-7">
        <h3 className="font-display text-lg font-medium leading-snug transition-colors duration-200 group-hover:text-lime-700 sm:text-xl">
          {material.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{material.summary}</p>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
            {new Date(material.publishedAt).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
            })}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-lime-700">
            Открыть
            <IconArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
