import { useEffect, useRef, useSyncExternalStore, type RefObject } from "react";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia(reducedMotionQuery).matches;
}

const subscribeReducedMotion = (onChange: () => void) => {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false);
}

/**
 * Кадровый цикл, который работает только пока элемент на экране и вкладка видима.
 * onFrame получает шаг времени в мс (не больше 50, чтобы после паузы не было рывка).
 */
export function useAnimationLoop(targetRef: RefObject<Element | null>, onFrame: (dt: number) => void, enabled = true) {
  const frameRef = useRef(onFrame);

  useEffect(() => {
    frameRef.current = onFrame;
  });

  useEffect(() => {
    const target = targetRef.current;
    if (!target || !enabled) return;

    let raf = 0;
    let last = 0;
    let inView = false;

    const tick = (time: number) => {
      const dt = last ? Math.min(time - last, 50) : 16;
      last = time;
      frameRef.current(dt);
      raf = requestAnimationFrame(tick);
    };

    const sync = () => {
      const shouldRun = inView && document.visibilityState === "visible";
      if (shouldRun && !raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      } else if (!shouldRun && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(target);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      cancelAnimationFrame(raf);
    };
  }, [targetRef, enabled]);
}
