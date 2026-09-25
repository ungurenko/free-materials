"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { projects } from "@/content/leadmagnet";
import { IconArrowRight } from "@/components/icons";
import { useAnimationLoop, usePrefersReducedMotion } from "@/lib/motion";
import { getProjectStartMs, getSceneState, type ScenePhase } from "./sceneTimeline";

const promptFor = (title: string) => `Сделай ${title.charAt(0).toLowerCase()}${title.slice(1)}. Понятно, красиво и сразу с мобильной версией`;

const BLOCK_COUNT = 8;
const MAX_PARTICLES = 140;

interface Particle {
  sx: number;
  sy: number;
  cx: number;
  cy: number;
  tx: number;
  ty: number;
  t: number;
  duration: number;
  size: number;
  px: number;
  py: number;
}

const builtCountFor = (phase: ScenePhase, progress: number) => {
  if (phase === "typing") return 0;
  if (phase === "building") return Math.min(BLOCK_COUNT, Math.floor(progress * (BLOCK_COUNT + 1)));
  return BLOCK_COUNT;
};

export default function PromptToSite() {
  const reducedMotion = usePrefersReducedMotion();
  const [view, setView] = useState<{ projectIndex: number; phase: ScenePhase }>({ projectIndex: 0, phase: "typing" });
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const blockRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sim = useRef({
    elapsed: 0,
    emitTimer: 0,
    typed: -1,
    built: -1,
    pointer: null as { x: number; y: number } | null,
    particles: [] as Particle[],
  });

  const project = projects[view.projectIndex];
  const phase: ScenePhase = reducedMotion ? "done" : view.phase;
  const prompt = promptFor(project.cardTitle);

  const setTyped = (text: string, count: number) => {
    const s = sim.current;
    if (s.typed === count || !typedRef.current) return;
    typedRef.current.textContent = text.slice(0, count);
    s.typed = count;
  };

  const setBuilt = (count: number) => {
    const s = sim.current;
    if (s.built === count) return;
    blockRefs.current.forEach((block, index) => {
      if (block) block.dataset.built = String(index < count);
    });
    s.built = count;
  };

  const emitParticle = (targetIndex: number) => {
    const stage = stageRef.current;
    const caret = caretRef.current;
    const block = blockRefs.current[targetIndex];
    if (!stage || !caret || !block) return;
    const s = sim.current;
    if (s.particles.length >= MAX_PARTICLES) return;

    const origin = stage.getBoundingClientRect();
    const from = caret.getBoundingClientRect();
    const to = block.getBoundingClientRect();
    const sx = from.left - origin.left + (Math.random() - 0.5) * 10;
    const sy = from.top - origin.top + from.height / 2 + (Math.random() - 0.5) * 10;
    const tx = to.left - origin.left + Math.random() * to.width;
    const ty = to.top - origin.top + Math.random() * to.height;
    const dx = tx - sx;
    const dy = ty - sy;
    const bend = (Math.random() - 0.3) * 0.55;

    s.particles.push({
      sx,
      sy,
      tx,
      ty,
      cx: sx + dx / 2 - dy * bend,
      cy: sy + dy / 2 + dx * bend - 40,
      t: 0,
      duration: 850 + Math.random() * 550,
      size: 1.8 + Math.random() * 2.2,
      px: sx,
      py: sy,
    });
  };

  const drawParticles = (dt: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const s = sim.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    context.globalCompositeOperation = "lighter";
    context.lineCap = "round";

    s.particles = s.particles.filter((particle) => {
      particle.t += dt / particle.duration;
      if (particle.t >= 1) return false;

      const t = particle.t < 0.5 ? 2 * particle.t * particle.t : 1 - Math.pow(-2 * particle.t + 2, 2) / 2;
      const inv = 1 - t;
      let x = inv * inv * particle.sx + 2 * inv * t * particle.cx + t * t * particle.tx;
      let y = inv * inv * particle.sy + 2 * inv * t * particle.cy + t * t * particle.ty;

      // Частицы в полёте тянутся к курсору, но всё равно прилетают в свой блок.
      if (s.pointer) {
        const dx = s.pointer.x - x;
        const dy = s.pointer.y - y;
        const distance = Math.hypot(dx, dy);
        if (distance < 170) {
          const pull = (1 - distance / 170) * Math.sin(Math.PI * particle.t) * 0.45;
          x += dx * pull;
          y += dy * pull;
        }
      }

      const fade = Math.sin(Math.PI * particle.t);
      context.strokeStyle = `rgba(202, 221, 151, ${0.5 * fade})`;
      context.lineWidth = particle.size * 1.8;
      context.beginPath();
      context.moveTo(particle.px, particle.py);
      context.lineTo(x, y);
      context.stroke();

      context.fillStyle = `rgba(178, 201, 110, ${0.18 * fade})`;
      context.beginPath();
      context.arc(x, y, particle.size * 3.2, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = `rgba(240, 244, 223, ${0.95 * fade})`;
      context.beginPath();
      context.arc(x, y, particle.size, 0, Math.PI * 2);
      context.fill();

      particle.px = x;
      particle.py = y;
      return true;
    });
  };

  useAnimationLoop(
    stageRef,
    (dt) => {
      const s = sim.current;
      s.elapsed += dt;
      const state = getSceneState(s.elapsed, projects.length);
      const text = promptFor(projects[state.projectIndex].cardTitle);

      if (state.projectIndex !== view.projectIndex || state.phase !== view.phase) {
        setView({ projectIndex: state.projectIndex, phase: state.phase });
      }

      setTyped(text, state.phase === "typing" ? Math.ceil(state.progress * text.length) : text.length);
      const built = builtCountFor(state.phase, state.progress);
      setBuilt(built);

      if (state.phase === "typing" || state.phase === "building") {
        s.emitTimer += dt;
        const interval = state.phase === "typing" ? 40 : 18;
        while (s.emitTimer > interval) {
          s.emitTimer -= interval;
          emitParticle(Math.min(built, BLOCK_COUNT - 1));
        }
      }

      drawParticles(dt);
    },
    !reducedMotion,
  );

  // Размер холста повторяет сцену; без анимации сцена сразу показывает готовый результат.
  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(stage.offsetWidth * dpr);
      canvas.height = Math.round(stage.offsetHeight * dpr);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    resize();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!reducedMotion) return;
    setTyped(prompt, prompt.length);
    setBuilt(BLOCK_COUNT);
  }, [reducedMotion, prompt]);

  const showProject = (index: number) => {
    const s = sim.current;
    s.elapsed = getProjectStartMs(index);
    s.emitTimer = 0;
    s.particles = [];
    s.typed = -1;
    setView({ projectIndex: index, phase: reducedMotion ? "done" : "typing" });
  };

  const trackPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    sim.current.pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const block = (index: number, className: string) => (
    <span ref={(node) => { blockRefs.current[index] = node; }} className={`scene-block block ${className}`} data-built="false" />
  );

  return (
    <section className="container-x pt-8 sm:pt-12" aria-label="Как промпт превращается в сайт">
      <div
        ref={stageRef}
        data-phase={phase}
        onPointerMove={trackPointer}
        onPointerLeave={() => { sim.current.pointer = null; }}
        className="prompt-scene relative isolate overflow-hidden rounded-[28px] border border-white/10 bg-moss-950 p-4 text-on-dark shadow-[0_34px_80px_-42px_rgba(27,33,19,0.75)] sm:rounded-[36px] sm:p-8 lg:p-12"
      >
        <div className="dot-grid-light dot-drift pointer-events-none absolute inset-0 opacity-30" aria-hidden />
        <div className="blob-drift pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-lime-400/15 blur-3xl" aria-hidden />
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-[2] size-full" aria-hidden />

        <div className="relative z-[1] grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div className="scene-chat min-w-0 rounded-[20px] border border-white/10 bg-moss-900/90 p-4 sm:p-5">
            <p className="flex items-center gap-2 text-sm font-medium text-on-dark/60">
              <span className="anim-pulse-dot size-2 rounded-full bg-lime-400" aria-hidden />
              Чат с ИИ
            </p>
            <div className="mt-4 flex min-h-44 flex-col gap-3">
              <p className="scene-fade ms-auto w-fit max-w-[92%] rounded-2xl rounded-ee-md bg-lime-300 px-4 py-3 text-[0.9375rem] font-medium leading-snug text-moss-950">
                <span ref={typedRef} aria-hidden />
                <span ref={caretRef} className="scene-caret" aria-hidden />
                <span className="sr-only">{prompt}</span>
              </p>
              {phase !== "typing" && (
                <p className="scene-reply scene-fade w-fit max-w-[92%] rounded-2xl rounded-es-md bg-white/10 px-4 py-3 text-sm leading-snug text-on-dark/85">
                  {phase === "building" ? (
                    <>
                      Собираю интерфейс
                      <span className="scene-dots" aria-hidden><span>.</span><span>.</span><span>.</span></span>
                    </>
                  ) : (
                    <>Готово: первая версия собрана и работает на телефоне</>
                  )}
                </p>
              )}
            </div>
          </div>

          <div className="scene-browser scene-fade min-w-0 overflow-hidden rounded-[18px] border border-white/15 bg-paper text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.65)]" aria-hidden>
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="size-2.5 rounded-full bg-blush-strong" />
              <span className="size-2.5 rounded-full bg-lime-300" />
              <span className="size-2.5 rounded-full bg-line-strong" />
              <span className="ms-2 min-w-0 truncate rounded-full bg-milk px-3 py-1 font-mono text-xs text-ink-faint">мой-первый-проект.app</span>
            </div>
            <div className="relative aspect-[16/10]">
              <div className="absolute inset-0 grid grid-rows-[auto_1fr_auto] gap-3 p-3 sm:gap-4 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  {block(0, "h-4 w-20 rounded-full bg-moss-900 sm:h-5 sm:w-24")}
                  <span className="flex gap-2">
                    {block(1, "h-2 w-24 rounded-full bg-line-strong sm:h-2.5 sm:w-32")}
                  </span>
                </div>
                <div className="grid min-h-0 grid-cols-[1.1fr_0.9fr] items-center gap-4">
                  <div className="grid gap-2 sm:gap-3">
                    {block(2, "h-3 w-11/12 rounded-full bg-ink/80 sm:h-4")}
                    {block(3, "h-2 w-full rounded-full bg-line-strong sm:h-2.5")}
                    {block(4, "h-6 w-24 rounded-full bg-lime-500 sm:h-8 sm:w-28")}
                  </div>
                  {block(5, "h-full min-h-12 rounded-xl bg-lime-200")}
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {block(6, "col-span-2 h-8 rounded-lg border border-line bg-milk sm:h-12")}
                  {block(7, "h-8 rounded-lg border border-line bg-milk sm:h-12")}
                </div>
              </div>
              <div className="scene-cover absolute inset-0">
                <Image key={project.id} src={project.coverImage} alt="" fill sizes="(min-width: 1024px) 560px, calc(100vw - 64px)" className="object-cover object-top" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-[3] mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-col-reverse items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex shrink-0 gap-2">
              {projects.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => showProject(index)}
                  aria-label={`Показать проект: ${item.cardTitle}`}
                  aria-pressed={index === view.projectIndex}
                  className="scene-dot grid size-8 place-items-center rounded-full"
                >
                  <span className="block size-2.5 rounded-full" />
                </button>
              ))}
            </div>
            <p className="min-w-0 break-normal font-display text-sm font-semibold text-on-dark sm:text-base">{project.cardTitle}</p>
          </div>
          <a href={`#${project.id}`} className="btn-on-dark h-auto min-h-11 w-full whitespace-normal px-5 py-3 text-center text-sm sm:w-fit sm:whitespace-nowrap">
            Открыть промпт этого проекта
            <IconArrowRight className="size-4 shrink-0 rtl:-scale-x-100" />
          </a>
        </div>
      </div>
    </section>
  );
}
