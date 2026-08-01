import { describe, expect, it } from "vitest";
import { getChecklistProgress, getProjectIdFromHash, parseChecklistState } from "./leadmagnet-state";

describe("leadmagnet browser state", () => {
  it("restores only unique valid checklist indexes", () => {
    expect(parseChecklistState("[0,2,2,9,-1,10,\"3\"]", 10)).toEqual([0, 2, 9]);
  });

  it("falls back to an empty checklist for invalid storage", () => {
    expect(parseChecklistState("not json", 10)).toEqual([]);
    expect(parseChecklistState('{"unexpected":true}', 10)).toEqual([]);
    expect(parseChecklistState(null, 10)).toEqual([]);
  });

  it("calculates checklist progress and completion", () => {
    expect(getChecklistProgress([0, 4, 9], 10)).toEqual({ count: 3, percent: 30, complete: false });
    expect(getChecklistProgress([0, 1], 2)).toEqual({ count: 2, percent: 100, complete: true });
  });

  it("accepts only hashes that identify a known project", () => {
    const ids = ["project-page", "calculator", "quiz"];
    expect(getProjectIdFromHash("#calculator", ids)).toBe("calculator");
    expect(getProjectIdFromHash("#unknown", ids)).toBeNull();
    expect(getProjectIdFromHash("", ids)).toBeNull();
    expect(getProjectIdFromHash("#%E0%A4%A", ids)).toBeNull();
  });
});
