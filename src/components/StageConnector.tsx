"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

// Волна от этапа 1 к этапу 2: дорисовывается по мере прокрутки, по ней едет светящаяся точка.
const VIEW_W = 1000;
const VIEW_H = 80;
const PATH = "M 140 0 C 140 44, 360 20, 500 40 S 860 36, 860 80";

export default function StageConnector() {
  const rootRef = useRef<HTMLDivElement>(null);
  const litRef = useRef<SVGPathElement>(null);
  const cometRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const lit = litRef.current;
    const comet = cometRef.current;
    if (!root || !lit || !comet) return;

    const length = lit.getTotalLength();
    let raf = 0;

    const render = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = prefersReducedMotion() ? 1 : Math.min(1, Math.max(0, (viewport * 0.9 - rect.top) / (viewport * 0.45)));
      lit.style.strokeDashoffset = String(1 - progress);

      const point = lit.getPointAtLength(length * progress);
      comet.style.transform = `translate(${(point.x / VIEW_W) * rect.width}px, ${(point.y / VIEW_H) * rect.height}px) translate(-50%, -50%)`;
      comet.style.opacity = progress > 0.02 && progress < 0.98 ? "1" : "0";
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div ref={rootRef} className="stage-connector container-x relative h-16 sm:h-20" aria-hidden>
      <div className="relative size-full">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
          <path d={PATH} className="stage-connector-track" fill="none" />
          <path ref={litRef} d={PATH} pathLength={1} className="stage-connector-lit" fill="none" />
        </svg>
        <span ref={cometRef} className="stage-connector-comet absolute left-0 top-0" />
      </div>
    </div>
  );
}
