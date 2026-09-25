"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { useAnimationLoop, usePrefersReducedMotion } from "@/lib/motion";

// Наклейки-инструменты, которые летают по кольцу вокруг фото. Порядок = порядок на орбите.
const stickers = [
  {
    id: "prompt",
    className: "bg-moss-900 text-lime-300",
    tilt: -8,
    icon: <path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4 3v-3H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm3 5h8m-8 3h5" />,
  },
  {
    id: "code",
    className: "bg-lime-300 text-moss-950",
    tilt: 6,
    icon: <path d="m9 7.5-4.5 4.5L9 16.5m6-9 4.5 4.5-4.5 4.5M13 6l-2 12" />,
  },
  {
    id: "mobile",
    className: "border border-blush-border bg-blush-surface text-blush-text",
    tilt: -4,
    icon: (
      <>
        <rect x="7" y="3" width="10" height="18" rx="2.5" />
        <path d="M11 18h2" />
      </>
    ),
  },
  {
    id: "launch",
    className: "bg-moss-900 text-lime-300",
    tilt: 10,
    icon: (
      <>
        <path d="M12 3c3 2 4.5 5 4.5 9l-2 3h-5l-2-3c0-4 1.5-7 4.5-9Z" />
        <circle cx="12" cy="9.5" r="1.5" />
        <path d="M9.5 15 8 19.5l2.5-1.5m3.5-3 1.5 4.5-2.5-1.5" />
      </>
    ),
  },
  {
    id: "done",
    className: "bg-lime-500 text-moss-950",
    tilt: -10,
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m8.5 12.2 2.4 2.3 4.6-5" />
      </>
    ),
  },
  {
    id: "ai",
    className: "border border-line bg-paper text-lime-700",
    tilt: 4,
    icon: <path d="M12 3.5 13.8 10l6.7 2-6.7 2L12 20.5 10.2 14l-6.7-2 6.7-2L12 3.5Z" />,
  },
];

const ORBIT_SECONDS = 46;
const RING_TILT = -0.24; // наклон кольца, радианы
const INTRO_MS = 1400;
const REPEL_RADIUS = 130;

interface Body {
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
}

interface Drag {
  index: number;
  grabX: number;
  grabY: number;
}

const ringGeometry = (w: number, h: number) => ({ cx: w / 2, cy: h * 0.6, rx: w * 0.6, ry: h * 0.17 });

export default function HeroOrbit({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const stickerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tetherRefs = useRef<(SVGLineElement | null)[]>([]);
  const backRingRef = useRef<SVGEllipseElement>(null);
  const frontRingRef = useRef<SVGPathElement>(null);
  const sim = useRef({
    w: 0,
    h: 0,
    time: 0,
    intro: 0,
    pointer: null as { x: number; y: number } | null,
    drag: null as Drag | null,
    bodies: stickers.map((): Body => ({ ox: 0, oy: 0, vx: 0, vy: 0, x: 0, y: 0 })),
  });

  // Раскладывает наклейки на кольце; physics=false — статичная раскладка без пружин.
  const layout = (physics: boolean) => {
    const s = sim.current;
    if (!s.w) return;
    const { cx, cy, rx, ry } = ringGeometry(s.w, s.h);
    const cosT = Math.cos(RING_TILT);
    const sinT = Math.sin(RING_TILT);

    stickers.forEach((sticker, index) => {
      const body = s.bodies[index];
      const angle = (index / stickers.length) * Math.PI * 2 + (s.time / 1000) * ((Math.PI * 2) / ORBIT_SECONDS);
      const ex = Math.cos(angle) * rx;
      const ey = Math.sin(angle) * ry;
      const local = Math.min(1, Math.max(0, s.intro * 1.5 - index * 0.08));
      const eased = 1 - Math.pow(1 - local, 3);
      const slotX = cx + (ex * cosT - ey * sinT) * eased;
      const slotY = cy + (ex * sinT + ey * cosT) * eased;
      const depth = Math.sin(angle); // >0 — передняя половина кольца

      if (physics) {
        const drag = s.drag;
        if (drag?.index === index && s.pointer) {
          const nextOx = s.pointer.x - drag.grabX - slotX;
          const nextOy = s.pointer.y - drag.grabY - slotY;
          body.vx = nextOx - body.ox;
          body.vy = nextOy - body.oy;
          body.ox = nextOx;
          body.oy = nextOy;
        } else {
          if (s.pointer && !drag) {
            const dx = slotX + body.ox - s.pointer.x;
            const dy = slotY + body.oy - s.pointer.y;
            const distance = Math.hypot(dx, dy) || 1;
            if (distance < REPEL_RADIUS) {
              const push = (1 - distance / REPEL_RADIUS) * 2.2;
              body.vx += (dx / distance) * push;
              body.vy += (dy / distance) * push;
            }
          }
          body.vx = (body.vx - body.ox * 0.05) * 0.86;
          body.vy = (body.vy - body.oy * 0.05) * 0.86;
          body.ox += body.vx;
          body.oy += body.vy;
        }
      }

      body.x = slotX + body.ox;
      body.y = slotY + body.oy;

      const element = stickerRefs.current[index];
      if (element) {
        const scale = 0.86 + 0.16 * ((depth + 1) / 2);
        const spin = sticker.tilt + body.vx * 1.4;
        element.style.transform = `translate3d(${body.x}px, ${body.y}px, 0) translate(-50%, -50%) rotate(${spin}deg) scale(${scale})`;
        element.style.zIndex = depth > 0 || s.drag?.index === index ? "3" : "0";
        element.style.opacity = String(eased * (0.72 + 0.28 * ((depth + 1) / 2)));
      }

      const tether = tetherRefs.current[index];
      if (tether) {
        const stretch = Math.min(1, Math.hypot(body.ox, body.oy) / 90);
        tether.setAttribute("x1", String(slotX));
        tether.setAttribute("y1", String(slotY));
        tether.setAttribute("x2", String(body.x));
        tether.setAttribute("y2", String(body.y));
        tether.style.opacity = String(stretch);
      }
    });

    const ringTransform = `rotate(${(RING_TILT * 180) / Math.PI} ${cx} ${cy})`;
    const backRing = backRingRef.current;
    if (backRing) {
      backRing.setAttribute("cx", String(cx));
      backRing.setAttribute("cy", String(cy));
      backRing.setAttribute("rx", String(rx));
      backRing.setAttribute("ry", String(ry));
      backRing.setAttribute("transform", ringTransform);
      backRing.style.opacity = String(s.intro);
    }
    // Нижняя половина кольца рисуется поверх фото, чтобы наклейки «облетали» его.
    const frontRing = frontRingRef.current;
    if (frontRing) {
      frontRing.setAttribute("d", `M ${cx + rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx - rx} ${cy}`);
      frontRing.setAttribute("transform", ringTransform);
      frontRing.style.opacity = String(s.intro);
    }
  };

  useAnimationLoop(
    rootRef,
    (dt) => {
      const s = sim.current;
      s.time += dt;
      s.intro = Math.min(1, s.intro + dt / INTRO_MS);
      layout(true);
    },
    !reducedMotion,
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const s = sim.current;

    const measure = () => {
      s.w = root.offsetWidth;
      s.h = root.offsetHeight;
      if (reducedMotion) {
        s.intro = 1;
        layout(false);
      }
    };
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(root);
    measure();

    const toLocal = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" && !s.drag) return;
      s.pointer = toLocal(event);
    };
    const onUp = () => {
      s.drag = null;
      s.pointer = null;
      root.dataset.dragging = "false";
    };
    const onLeave = () => {
      if (!s.drag) s.pointer = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reducedMotion]);

  const startDrag = (index: number, event: ReactPointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !rootRef.current) return;
    const s = sim.current;
    const rect = rootRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const body = s.bodies[index];
    s.pointer = { x, y };
    s.drag = { index, grabX: x - body.x, grabY: y - body.y };
    rootRef.current.dataset.dragging = "true";
    event.preventDefault();
  };

  return (
    <div ref={rootRef} className="hero-orbit relative" data-dragging="false">
      <svg className="pointer-events-none absolute inset-0 z-0 size-full overflow-visible" aria-hidden>
        <ellipse ref={backRingRef} className="orbit-ring" fill="none" />
      </svg>

      <div className="relative z-[1]">{children}</div>

      <svg className="pointer-events-none absolute inset-0 z-[2] size-full overflow-visible" aria-hidden>
        <path ref={frontRingRef} className="orbit-ring" fill="none" />
        {stickers.map((sticker, index) => (
          <line key={sticker.id} ref={(node) => { tetherRefs.current[index] = node; }} className="orbit-tether" />
        ))}
      </svg>

      {stickers.map((sticker, index) => (
        <div
          key={sticker.id}
          ref={(node) => { stickerRefs.current[index] = node; }}
          onPointerDown={(event) => startDrag(index, event)}
          className={`orbit-sticker absolute left-0 top-0 grid size-14 place-items-center rounded-2xl shadow-[0_16px_30px_-16px_rgba(27,33,19,0.55)] ${sticker.className}`}
          style={{ opacity: 0 }}
          aria-hidden
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="size-6">
            {sticker.icon}
          </svg>
        </div>
      ))}
    </div>
  );
}
