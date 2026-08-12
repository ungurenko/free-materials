"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects, howToUseSteps, pageCopy, type Project } from "@/content/leadmagnet";
import { copyText } from "@/lib/copy";
import { getProjectIdFromHash } from "@/lib/leadmagnet-state";
import { IconCheck, IconCopy } from "@/components/icons";

const projectIds = projects.map((project) => project.id);

function ProjectCover({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] border border-line/80 bg-lime-100">
      <Image
        src={project.coverImage}
        alt=""
        fill
        sizes="(max-width: 639px) calc(100vw - 64px), (max-width: 1023px) calc(50vw - 48px), 352px"
        className="object-cover"
      />
    </div>
  );
}

export default function ProjectGallery() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState("");
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const modal = useRef<HTMLDialogElement | null>(null);
  const copyTimer = useRef<number | undefined>(undefined);
  const activeProject = projects.find((project) => project.id === activeId) ?? null;
  const copy = pageCopy.projectModal;

  const openProject = useCallback((id: string, updateHistory = true) => {
    if (document.activeElement instanceof HTMLElement) lastFocusedElement.current = document.activeElement;
    setActiveId(id);
    if (updateHistory && window.location.hash !== `#${id}`) history.pushState({ projectId: id }, "", `#${id}`);
  }, []);

  const closeProject = useCallback((updateHistory = true) => {
    setActiveId(null);
    if (updateHistory && window.location.hash) {
      history.replaceState({}, "", `${window.location.pathname}${window.location.search}`);
    }
  }, []);

  useEffect(() => {
    const syncFromLocation = () => setActiveId(getProjectIdFromHash(window.location.hash, projectIds));
    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);
    window.addEventListener("hashchange", syncFromLocation);
    return () => {
      window.removeEventListener("popstate", syncFromLocation);
      window.removeEventListener("hashchange", syncFromLocation);
      window.clearTimeout(copyTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!activeProject) return;

    const dialog = modal.current;
    if (!dialog) return;

    const scrollY = window.scrollY;
    const body = document.body;
    const root = document.documentElement;
    const scrollbarWidth = Math.max(0, window.innerWidth - root.clientWidth);
    const bodyPaddingRight = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;
    const originalBodyStyles = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    };
    const originalScrollBehavior = root.style.scrollBehavior;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    if (scrollbarWidth > 0) body.style.paddingRight = `${bodyPaddingRight + scrollbarWidth}px`;
    if (!dialog.open) dialog.showModal();
    requestAnimationFrame(() => closeButton.current?.focus());
    return () => {
      body.style.position = originalBodyStyles.position;
      body.style.top = originalBodyStyles.top;
      body.style.width = originalBodyStyles.width;
      body.style.paddingRight = originalBodyStyles.paddingRight;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollY);
      root.style.scrollBehavior = originalScrollBehavior;
      requestAnimationFrame(() => lastFocusedElement.current?.focus({ preventScroll: true }));
    };
  }, [activeProject]);

  const handleCopy = async (project: Project) => {
    const copied = await copyText(project.prompt);
    setCopyStatus(copied ? copy.copiedStatus : copy.copyErrorStatus);
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopyStatus(""), 2100);
  };

  return (
    <>
      <div className="project-grid mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => openProject(project.id)}
            aria-label={`${copy.openAriaPrefix}: ${project.cardTitle}`}
            className="group flex h-full flex-col rounded-[26px] border border-line bg-paper p-3 text-left shadow-[0_22px_52px_-38px_rgba(38,40,31,0.4)] transition duration-300 hover:-translate-y-1 hover:border-lime-400 hover:shadow-[0_28px_58px_-34px_rgba(38,40,31,0.45)]"
          >
            <ProjectCover project={project} />
            <span className="flex flex-1 flex-col px-2 pb-2 pt-5">
              <span className="font-display text-[1.05rem] font-semibold leading-tight text-ink">{project.cardTitle}</span>
              <span className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{project.cardDescription}</span>
              <span className="mt-4 flex flex-wrap gap-2">
                <span className="pill border border-lime-300 bg-lime-100 px-2.5 py-1.5 text-[9.5px] text-lime-700">{copy.levelLabel}: {project.level}</span>
                <span className="pill border border-line bg-milk px-2.5 py-1.5 text-[9.5px] text-ink-soft">{project.time}</span>
              </span>
              <span className="open-hint mt-4 text-sm font-semibold text-lime-700 underline decoration-lime-300 underline-offset-4">{copy.openLabel}</span>
            </span>
          </button>
        ))}
      </div>

      {activeProject && (
        <dialog
          ref={modal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          className="modal-overlay fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none place-items-center overflow-hidden border-0 bg-transparent p-3 backdrop:bg-moss-950/55 backdrop:backdrop-blur-sm open:grid sm:p-6"
          onMouseDown={(event) => { if (event.target === event.currentTarget) closeProject(); }}
          onCancel={(event) => {
            event.preventDefault();
            closeProject();
          }}
        >
          <section
            className="modal-scroll-region max-h-[calc(100dvh-24px)] w-full max-w-3xl overscroll-contain overflow-y-auto rounded-[26px] border border-line bg-paper shadow-[0_35px_90px_-30px_rgba(27,33,19,0.8)] sm:max-h-[calc(100dvh-48px)]"
          >
            <div className="sticky top-0 z-10 flex justify-end border-b border-line bg-paper/90 px-4 py-3 backdrop-blur-xl">
              <button ref={closeButton} type="button" onClick={() => closeProject()} aria-label={copy.closeLabel} className="grid size-10 place-items-center rounded-full border border-line bg-milk text-2xl leading-none text-ink transition-colors hover:border-lime-500 hover:bg-lime-100">×</button>
            </div>

            <div className="px-5 pb-7 pt-5 sm:px-8 sm:pb-9">
              <div className="flex flex-wrap gap-2">
                <span className="pill border border-lime-300 bg-lime-100 px-3 py-1.5 text-lime-700">{activeProject.emoji} {activeProject.level}</span>
                <span className="pill border border-line bg-milk px-3 py-1.5 text-ink-soft">{activeProject.time}</span>
              </div>
              <h2 id="modal-title" className="mt-5 font-display text-[1.55rem] font-semibold leading-tight tracking-[-0.015em] text-ink sm:text-[2rem]">{activeProject.title}</h2>
              <p id="modal-description" className="mt-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">{activeProject.description}</p>

              <section className="mt-8 border-t border-line pt-6">
                <h3 className="font-display text-base font-semibold text-ink">{copy.servicesTitle}</h3>
                <div className="mt-3 flex flex-wrap gap-2">{activeProject.services.map((service) => <span key={service} className="rounded-full border border-line bg-milk px-3 py-1.5 text-sm text-ink-soft">{service}</span>)}</div>
              </section>

              {activeProject.examples.length > 0 && (
                <section className="mt-7 border-t border-line pt-6">
                  <h3 className="font-display text-base font-semibold text-ink">{copy.examplesTitle}</h3>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">{activeProject.examples.map((example) => <li key={example} className="rounded-xl bg-milk px-3 py-2 text-sm text-ink-soft">{example}</li>)}</ul>
                </section>
              )}

              {activeProject.replace && (
                <section className="mt-7 border-t border-line pt-6">
                  <h3 className="font-display text-base font-semibold text-ink">{copy.replaceTitle}</h3>
                  <code className="mt-3 block w-fit rounded-xl border border-lime-300 bg-lime-100 px-3 py-2 font-mono text-xs text-lime-700">{activeProject.replace}</code>
                </section>
              )}

              <section className="mt-7 border-t border-line pt-6">
                <h3 className="font-display text-base font-semibold text-ink">{copy.promptTitle}</h3>
                <div className="mt-3 overflow-hidden rounded-2xl border border-line bg-[#f1f2e9]">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-paper/80 px-4 py-3">
                    <span className="font-mono text-xs uppercase tracking-[0.1em] text-ink-faint">{copy.promptLabel}</span>
                    <button type="button" onClick={() => handleCopy(activeProject)} className="btn-primary h-10 px-4 text-sm">
                      {copyStatus === copy.copiedStatus ? <IconCheck className="size-4" /> : <IconCopy className="size-4" />}
                      {copy.copyLabel}
                    </button>
                  </div>
                  <pre className="overflow-x-auto whitespace-pre-wrap break-words px-4 py-5 font-mono text-[12.5px] leading-[1.72] text-ink/85 sm:px-6 sm:text-[13px]">{activeProject.prompt}</pre>
                </div>
              </section>

              <section className="mt-7 border-t border-line pt-6">
                <h3 className="font-display text-base font-semibold text-ink">{copy.howToUseTitle}</h3>
                <ol className="mt-3 space-y-3">{howToUseSteps.map((step, index) => <li key={step} className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-moss-900 font-mono text-[10px] text-lime-300">{index + 1}</span><span>{step}</span></li>)}</ol>
              </section>
            </div>
          </section>
        </dialog>
      )}

      <p className={`fixed bottom-5 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-moss-950 px-4 py-2.5 text-sm text-paper shadow-xl transition ${copyStatus ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`} role="status" aria-live="polite">{copyStatus}</p>
    </>
  );
}
