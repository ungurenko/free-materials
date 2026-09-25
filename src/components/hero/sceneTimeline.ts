// Сценарий сцены «промпт → сайт»: один проект проходит четыре фазы, затем сцена переходит к следующему.
export type ScenePhase = "typing" | "building" | "done" | "fade";

const phaseDurations: [ScenePhase, number][] = [
  ["typing", 2200],
  ["building", 2600],
  ["done", 2800],
  ["fade", 500],
];

export const SCENE_CYCLE_MS = phaseDurations.reduce((total, [, duration]) => total + duration, 0);

export interface SceneState {
  projectIndex: number;
  phase: ScenePhase;
  /** Прогресс внутри текущей фазы, от 0 до 1. */
  progress: number;
}

export function getSceneState(elapsedMs: number, projectCount: number): SceneState {
  const total = SCENE_CYCLE_MS * projectCount;
  const wrapped = ((elapsedMs % total) + total) % total;
  const projectIndex = Math.floor(wrapped / SCENE_CYCLE_MS);
  let local = wrapped - projectIndex * SCENE_CYCLE_MS;

  for (const [phase, duration] of phaseDurations) {
    if (local < duration) return { projectIndex, phase, progress: local / duration };
    local -= duration;
  }
  return { projectIndex, phase: "fade", progress: 1 };
}

/** Момент, с которого сцена показывает проект с нуля — для переключателей. */
export const getProjectStartMs = (projectIndex: number) => projectIndex * SCENE_CYCLE_MS;
