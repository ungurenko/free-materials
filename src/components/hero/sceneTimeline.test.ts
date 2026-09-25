import { describe, expect, it } from "vitest";
import { getProjectStartMs, getSceneState, SCENE_CYCLE_MS } from "./sceneTimeline";

describe("prompt-to-site scene timeline", () => {
  it("walks one project through typing, building, done and fade", () => {
    expect(getSceneState(0, 5)).toEqual({ projectIndex: 0, phase: "typing", progress: 0 });
    expect(getSceneState(1100, 5)).toMatchObject({ phase: "typing", progress: 0.5 });
    expect(getSceneState(2200, 5)).toMatchObject({ phase: "building", progress: 0 });
    expect(getSceneState(4800, 5)).toMatchObject({ phase: "done", progress: 0 });
    expect(getSceneState(SCENE_CYCLE_MS - 1, 5)).toMatchObject({ projectIndex: 0, phase: "fade" });
  });

  it("moves to the next project and loops back after the last one", () => {
    expect(getSceneState(SCENE_CYCLE_MS, 5)).toMatchObject({ projectIndex: 1, phase: "typing", progress: 0 });
    expect(getSceneState(getProjectStartMs(4) + 10, 5)).toMatchObject({ projectIndex: 4, phase: "typing" });
    expect(getSceneState(SCENE_CYCLE_MS * 5, 5)).toMatchObject({ projectIndex: 0, phase: "typing", progress: 0 });
  });
});
