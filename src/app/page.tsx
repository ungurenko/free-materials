import Hero from "@/components/Hero";
import PromptToSite from "@/components/hero/PromptToSite";
import PromoBanner from "@/components/PromoBanner";
import ImprovementPromptsSection from "@/components/leadmagnet/ImprovementPromptsSection";
import ProjectGallery from "@/components/leadmagnet/ProjectGallery";
import ResourcesSection from "@/components/leadmagnet/ResourcesSection";
import StageConnector from "@/components/StageConnector";
import UsefulLinksSection from "@/components/UsefulLinksSection";
import { pageCopy } from "@/content/leadmagnet";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromptToSite />

      <section id="projects" className="container-x scroll-mt-24 pt-16 sm:pt-20" aria-labelledby="projects-title">
        <div className="max-w-2xl">
          <p className="pill w-fit border border-lime-300 bg-lime-100 px-3.5 py-2 text-lime-700">{pageCopy.projects.eyebrow}</p>
          <h2 id="projects-title" className="mt-5 font-display text-[1.65rem] font-semibold leading-tight tracking-[-0.015em] text-ink sm:text-[2.15rem]">
            {pageCopy.projects.title}
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft sm:text-base">{pageCopy.projects.description}</p>
        </div>
        <ProjectGallery />
      </section>

      <StageConnector />
      <ImprovementPromptsSection />
      <PromoBanner />
      <ResourcesSection />
      <UsefulLinksSection />
    </>
  );
}
