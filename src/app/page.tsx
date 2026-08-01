import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import CtaTelegram from "@/components/CtaTelegram";
import SectionHeading from "@/components/leadmagnet/SectionHeading";
import Callout from "@/components/leadmagnet/Callout";
import ServicesSection from "@/components/leadmagnet/ServicesSection";
import ComparisonTable from "@/components/leadmagnet/ComparisonTable";
import ProjectsSection from "@/components/leadmagnet/ProjectsSection";
import CommandsSection from "@/components/leadmagnet/CommandsSection";
import Checklist from "@/components/leadmagnet/Checklist";
import ExamplesSection from "@/components/leadmagnet/ExamplesSection";
import CasesCta from "@/components/leadmagnet/CasesCta";
import {
  instructionSteps,
  instructionWarning,
  marketingIdea,
  safetyRules,
  vibeCodingExplanation,
} from "@/content/leadmagnet";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* 1. Короткое объяснение вайб-кодинга */}
      <section className="container-x scroll-mt-24 pt-16 sm:pt-20 lg:pt-24">
        <Reveal>
          <SectionHeading
            pill="Что это"
            title="Что такое вайб-кодинг"
          />
          <div className="mt-8 max-w-3xl space-y-4 text-[15.5px] leading-relaxed text-ink-soft sm:text-base">
            {vibeCodingExplanation.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 2. Инструкция перед использованием промптов */}
      <section className="container-x scroll-mt-24 pt-16 sm:pt-20 lg:pt-24">
        <Reveal>
          <SectionHeading
            pill="Как пользоваться"
            title="Инструкция перед использованием промптов"
          />
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {instructionSteps.map((step, i) => (
              <li
                key={step}
                className="flex items-start gap-3 rounded-2xl border border-line bg-paper p-4 sm:p-5"
              >
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-moss-900 font-display text-xs font-semibold text-lime-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] leading-snug text-ink sm:text-[15.5px]">
                  {step}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-8">
            <Callout
              tone="warning"
              title={instructionWarning.title}
              intro={instructionWarning.intro}
              items={instructionWarning.items}
            />
          </div>
        </Reveal>
      </section>

      {/* 3. Три сервиса */}
      <section id="services" className="container-x scroll-mt-24 pt-16 sm:pt-20 lg:pt-24">
        <Reveal>
          <SectionHeading
            pill="Сервисы"
            title="Три сервиса для прохождения лидмагнита"
            description="Не нужно регистрироваться сразу во всех трёх. Для первого эксперимента достаточно выбрать один сервис."
          />
        </Reveal>
        <ServicesSection />
      </section>

      {/* 4. Сравнительная таблица */}
      <section className="container-x scroll-mt-24 pt-16 sm:pt-20 lg:pt-24">
        <Reveal>
          <SectionHeading
            pill="Сравнение"
            title="Как выбрать сервис"
            description="Если вы пока не уверены, какая нейросеть подойдёт, ориентируйтесь на задачу."
          />
        </Reveal>
        <ComparisonTable />
      </section>

      {/* 5. Пять проектов */}
      <section id="projects" className="container-x scroll-mt-24 pt-16 sm:pt-20 lg:pt-24">
        <Reveal>
          <SectionHeading
            pill="Проекты"
            title="Пять проектов для первого знакомства"
            description="Выберите один проект, скопируйте промпт целиком, замените текст в квадратных скобках и отправьте без дополнительных пояснений."
          />
        </Reveal>
        <ProjectsSection />
      </section>

      {/* 6. Универсальные команды */}
      <section id="commands" className="container-x scroll-mt-24 pt-16 sm:pt-20 lg:pt-24">
        <Reveal>
          <SectionHeading
            pill="Команды"
            title="Универсальные команды для улучшения проекта"
            description="После первой генерации используйте эти команды в том же диалоге — они подходят для Qwen, Google AI Studio и GLM."
          />
        </Reveal>
        <CommandsSection />
      </section>

      {/* 7. Правила безопасного первого запуска */}
      <section className="container-x scroll-mt-24 pt-16 sm:pt-20 lg:pt-24">
        <Reveal>
          <SectionHeading pill="Безопасность" title="Правила безопасного первого запуска" />
          <div className="mt-8">
            <Callout
              tone="warning"
              intro={safetyRules.intro}
              items={safetyRules.items}
              note={safetyRules.note}
            />
          </div>
        </Reveal>
      </section>

      {/* 8. Финальный чек-лист */}
      <section id="checklist" className="container-x scroll-mt-24 pt-16 sm:pt-20 lg:pt-24">
        <Reveal>
          <SectionHeading
            pill="Чек-лист"
            title="Финальная проверка перед показом"
            description="Перед тем как показать проект другому человеку, пройдитесь по этим пунктам."
          />
        </Reveal>
        <Checklist />
      </section>

      {/* 9. Примеры готовых проектов */}
      <section id="examples" className="container-x scroll-mt-24 pt-16 sm:pt-20 lg:pt-24">
        <Reveal>
          <SectionHeading
            pill="Примеры"
            title="Примеры готовых результатов"
            description="Скриншоты и записи экрана появятся после того, как примеры будут собраны на реальных сервисах."
          />
        </Reveal>
        <ExamplesSection />
      </section>

      {/* 10. Маркетинговая цитата — заключение перед CTA */}
      <section className="container-x scroll-mt-24 pt-16 sm:pt-20 lg:pt-24">
        <Reveal>
          <figure className="mx-auto max-w-3xl text-center">
            <svg
              viewBox="0 0 40 40"
              className="mx-auto size-10 text-lime-400"
              fill="currentColor"
              aria-hidden
            >
              <path d="M11.5 23c0-5 3.5-9 8-10.5l1 2c-3 1.2-5 4-5 7h3v8h-7v-6.5Zm14 0c0-5 3.5-9 8-10.5l1 2c-3 1.2-5 4-5 7h3v8h-7v-6.5Z" />
            </svg>
            <blockquote className="mt-5 font-display text-[1.4rem] font-medium leading-snug tracking-[-0.01em] text-ink sm:text-[1.7rem]">
              «{marketingIdea.quote}»
            </blockquote>
            <figcaption className="mt-5 text-[14.5px] leading-relaxed text-ink-soft">
              {marketingIdea.note}
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* 11. Переход в Telegram-канал */}
      <div className="pt-16 sm:pt-20 lg:pt-24">
        <CtaTelegram />
      </div>

      {/* 12. Сбор кейсов */}
      <div className="pt-8 sm:pt-10">
        <div className="container-x">
          <CasesCta />
        </div>
      </div>
    </>
  );
}
