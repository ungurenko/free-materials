export function parseChecklistState(value: string | null, itemCount: number): number[] {
  if (!value) return [];

  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];

    return [...new Set(parsed)].filter(
      (item): item is number => Number.isInteger(item) && Number(item) >= 0 && Number(item) < itemCount,
    );
  } catch {
    return [];
  }
}

export function getChecklistProgress(checkedIndexes: number[], itemCount: number) {
  const count = checkedIndexes.length;
  return {
    count,
    percent: itemCount > 0 ? (count / itemCount) * 100 : 0,
    complete: itemCount > 0 && count === itemCount,
  };
}

export function getProjectIdFromHash(hash: string, projectIds: string[]): string | null {
  try {
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    return projectIds.includes(id) ? id : null;
  } catch {
    return null;
  }
}
