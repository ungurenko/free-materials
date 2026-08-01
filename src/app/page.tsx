import { getPublishedMaterials } from "@/lib/content/loader";
import { siteConfig } from "@/config/site";
import Hero from "@/components/Hero";
import PromoBanner from "@/components/PromoBanner";
import MaterialCard from "@/components/MaterialCard";
import CtaTelegram from "@/components/CtaTelegram";
import Reveal from "@/components/Reveal";

export default function HomePage() {
  const limit = siteConfig.homepageMaxMaterials;
  const materials = getPublishedMaterials().slice(0, limit);

  return (
    <>
      <Hero />

      <PromoBanner />

      <section id="materials" className="container-x scroll-mt-24 pt-16 sm:pt-20 lg:pt-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <div className="max-w-xl">
              <p className="pill border border-line bg-paper px-3.5 py-2 text-ink-soft">
                <span className="size-1.5 rounded-full bg-lime-500" aria-hidden />
                Каталог
              </p>
              <h2 className="mt-5 font-display text-[clamp(1.5rem,3.4vw,2.4rem)] font-semibold leading-tight tracking-[-0.01em]">
                Бесплатные материалы
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                База небольшая и растёт по мере выхода новых разборов. Каждый материал
                самодостаточен: открыли — и сразу применили.
              </p>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-faint">
              {String(materials.length).padStart(2, "0")} / {String(limit).padStart(2, "0")}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 md:grid-cols-2">
          {materials.map((material, i) => (
            <Reveal key={material.slug} delay={(i % 2) * 110}>
              <MaterialCard material={material} />
            </Reveal>
          ))}
        </div>
      </section>

      <div className="pt-16 sm:pt-20 lg:pt-24">
        <CtaTelegram />
      </div>
    </>
  );
}
