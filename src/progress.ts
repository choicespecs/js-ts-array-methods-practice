import type { ProgressState } from "./types";

const STORAGE_KEY = "array-methods-practice:progress:v1";

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { solved: {}, streak: 0 };
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return { solved: {}, streak: 0, ...parsed };
  } catch {
    return { solved: {}, streak: 0 };
  }
}

function save(state: ProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable (private browsing, quota) — progress just won't persist.
  }
}

export function getProgress(): ProgressState {
  return load();
}

export function isSolved(problemId: string): boolean {
  return Boolean(load().solved[problemId]);
}

export function markSolved(problemId: string, opts: { attempts: number; hintsUsed: number; sawSolution: boolean }): ProgressState {
  const state = load();
  const already = state.solved[problemId];
  const today = todayKey();

  if (!already) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (state.lastSolvedDay === today) {
      // same day, streak unchanged
    } else if (state.lastSolvedDay === yesterday) {
      state.streak += 1;
    } else {
      state.streak = 1;
    }
    state.lastSolvedDay = today;
  }

  state.solved[problemId] = {
    attempts: (already?.attempts ?? 0) + opts.attempts,
    hintsUsed: Math.max(already?.hintsUsed ?? 0, opts.hintsUsed),
    sawSolution: (already?.sawSolution ?? false) || opts.sawSolution,
    solvedAt: already?.solvedAt ?? Date.now(),
  };
  save(state);
  return state;
}

export function recordAttempt(problemId: string): void {
  const state = load();
  if (!state.solved[problemId]) return;
  save(state);
}

export function solvedCount(): number {
  return Object.keys(load().solved).length;
}

export function resetProgress(): void {
  save({ solved: {}, streak: 0 });
}
