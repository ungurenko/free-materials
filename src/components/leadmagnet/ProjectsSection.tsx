import { projects } from "@/content/leadmagnet";
import PromptBlock from "@/components/PromptBlock";
import Reveal from "@/components/Reveal";

export default function ProjectsSection() {
  return (
    <div className="mt-10 space-y-6 sm:mt-12 sm:space-y-7">
      {projects.map((project, i) => (
        <Reveal key={project.id} delay={(i % 2) * 110}>
          <article className="overflow-hidden rounded-[26px] border border-line bg-paper shadow-[0_24px_56px_-36px_rgba(38,40,31,0.28)]">
            <header className="grid gap-4 p-5 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-5 sm:p-7">
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-moss-900 font-display text-base font-semibold text-lime-300 sm:size-14 sm:text-lg">
                {String(project.number).padStart(2, "0")}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="pill border border-lime-300/70 bg-lime-100 px-3 py-1.5 text-lime-700">
                    <span className="size-1.5 rounded-full bg-lime-600" aria-hidden />
                    {project.level}
                  </span>
                  <span className="pill border border-line bg-milk px-3 py-1.5 text-ink-soft">
                    <span className="size-1.5 rounded-full bg-ink-faint" aria-hidden />
                    {project.time}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-[1.3rem] font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-[1.55rem]">
                  {project.title}
                </h3>

                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft sm:text-[15px]">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-faint">
                    Что получится
                  </span>
                  <br />
                  {project.result}
                </p>

                <p className="mt-2 text-[13px] leading-relaxed text-ink-faint">
                  Сервисы: {project.services}
                </p>
              </div>
            </header>

            <div className="border-t border-line/80 bg-milk/40 p-5 sm:p-7">
              <PromptBlock
                id={project.id}
                index={i}
                title="Промпт для нейросети"
                prompt={project.prompt}
                collapsed={false}
                materialSlug="leadmagnet"
              />

              {project.whatToReplace.length > 0 && (
                <div className="mt-5 rounded-2xl border border-line/80 bg-paper p-4 sm:p-5">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-faint">
                    Что заменить перед отправкой
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.whatToReplace.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-lime-300/70 bg-lime-100 px-3 py-1.5 font-mono text-[12px] text-lime-700"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.examples.length > 0 && (
                <div className="mt-3 rounded-2xl border border-line/80 bg-paper p-4 sm:p-5">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-faint">
                    Примеры тем
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.examples.map((example) => (
                      <li
                        key={example}
                        className="rounded-full border border-line bg-milk px-3 py-1.5 text-[12.5px] text-ink-soft"
                      >
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
