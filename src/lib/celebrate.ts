import { prefersReducedMotion } from "./motion";

const palette = ["#b2c96e", "#cadd97", "#7c9838", "#efb5ab", "#f0f4df", "#38422a"];
const pick = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

/** Искры разлетаются от кнопки — подтверждение, что промпт скопирован. */
export function sparkBurst(element: HTMLElement) {
  if (prefersReducedMotion()) return;
  const rect = element.getBoundingClientRect();
  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  layer.style.cssText = `position:fixed;left:${rect.left + rect.width / 2}px;top:${rect.top + rect.height / 2}px;z-index:95;pointer-events:none;`;
  // Модальное окно лежит в верхнем слое браузера, поэтому искры кладём внутрь него.
  (element.closest("dialog") ?? document.body).appendChild(layer);

  const count = 16;
  let longest = 0;
  for (let index = 0; index < count; index += 1) {
    const spark = document.createElement("span");
    const size = 4 + Math.random() * 4;
    const star = index % 3 === 0;
    spark.style.cssText = `position:absolute;left:${-size / 2}px;top:${-size / 2}px;width:${size}px;height:${size}px;background:${pick(palette)};border-radius:${star ? "1px" : "999px"};`;
    if (star) spark.style.clipPath = "polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%)";
    layer.appendChild(spark);

    const angle = (index / count) * Math.PI * 2 + Math.random() * 0.4;
    const distance = rect.width / 2 + 18 + Math.random() * 40;
    const duration = 550 + Math.random() * 350;
    longest = Math.max(longest, duration);
    spark.animate(
      [
        { transform: "translate(0, 0) scale(1.4)", opacity: 1 },
        { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance * 0.7}px) scale(0) rotate(180deg)`, opacity: 0 },
      ],
      { duration, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)", fill: "forwards" },
    );
  }
  window.setTimeout(() => layer.remove(), longest + 50);
}

/** Конфетти на весь экран — празднуем полностью пройденный чек-лист. */
export function confettiBurst() {
  if (prefersReducedMotion()) return;
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = "position:fixed;inset:0;width:100vw;height:100vh;z-index:95;pointer-events:none;";
  document.body.appendChild(canvas);
  const context = canvas.getContext("2d");
  if (!context) {
    canvas.remove();
    return;
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  context.scale(dpr, dpr);

  const pieces = Array.from({ length: 140 }, (_, index) => {
    const fromLeft = index % 2 === 0;
    return {
      x: fromLeft ? -10 : width + 10,
      y: height * (0.55 + Math.random() * 0.3),
      vx: (fromLeft ? 1 : -1) * (6 + Math.random() * 9),
      vy: -(11 + Math.random() * 10),
      w: 6 + Math.random() * 6,
      h: 3 + Math.random() * 4,
      angle: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.4,
      color: pick(palette),
    };
  });

  const duration = 2400;
  let start = 0;
  let last = 0;
  const frame = (time: number) => {
    if (!start) start = last = time;
    const step = Math.min(time - last, 40) / 16;
    last = time;
    const elapsed = time - start;
    context.clearRect(0, 0, width, height);
    context.globalAlpha = elapsed > duration - 500 ? Math.max(0, (duration - elapsed) / 500) : 1;

    for (const piece of pieces) {
      piece.vy += 0.38 * step;
      piece.vx *= Math.pow(0.985, step);
      piece.x += piece.vx * step;
      piece.y += piece.vy * step;
      piece.angle += piece.spin * step;
      context.save();
      context.translate(piece.x, piece.y);
      context.rotate(piece.angle);
      context.scale(1, Math.cos(piece.angle * 2));
      context.fillStyle = piece.color;
      context.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
      context.restore();
    }

    if (elapsed < duration) requestAnimationFrame(frame);
    else canvas.remove();
  };
  requestAnimationFrame(frame);
}
