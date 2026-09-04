import type { Problem } from "./types";

export interface RunResult {
  ranAt: number;
  value?: unknown;
  error?: string;
  correct: boolean;
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return false;
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    return a.every((v, i) => deepEqual(v, (b as unknown[])[i]));
  }
  if (typeof a === "object" && typeof b === "object") {
    const ak = Object.keys(a as object);
    const bk = Object.keys(b as object);
    if (ak.length !== bk.length) return false;
    return ak.every((k) => deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]));
  }
  return false;
}

/** Pretty-prints a value the way you'd want it to look in a console panel. */
export function formatOutput(value: unknown): string {
  if (value === undefined) return "undefined";
  if (typeof value === "function") return value.toString();
  if (typeof value === "number" && Number.isNaN(value)) return "NaN";
  if (typeof value === "string") return JSON.stringify(value);
  if (Array.isArray(value) && value.every((v) => typeof v !== "object" || v === null)) {
    // A flat array of primitives reads better as one line than JSON.stringify's one-per-line default.
    return `[${value.map((v) => formatOutput(v)).join(", ")}]`;
  }
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

/** Deep-clones context values before each run so a mutating solution can't corrupt the source data. */
function cloneContext(context: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(context)) {
    // structuredClone (unlike a JSON round-trip) correctly preserves NaN, which some problems rely on.
    out[k] = typeof v === "object" && v !== null ? structuredClone(v) : v;
  }
  return out;
}

/**
 * Evaluates the learner's expression against the problem's context and checks it
 * against the reference implementation. Runs client-side only, in the learner's own
 * browser tab, against their own hand-written practice code — the same trust model
 * as any browser-based coding playground / REPL.
 */
export function runExpression(problem: Problem, code: string): RunResult {
  const ranAt = Date.now();
  const runContext = cloneContext(problem.context);
  const paramNames = Object.keys(runContext);
  const paramValues = paramNames.map((k) => runContext[k]);

  let value: unknown;
  try {
    const factory = new Function(...paramNames, `"use strict";\nreturn (\n${code}\n);`);
    value = factory(...paramValues);
  } catch (err) {
    return { ranAt, error: err instanceof Error ? err.message : String(err), correct: false };
  }

  let expected: unknown;
  try {
    expected = problem.reference(cloneContext(problem.context));
  } catch (err) {
    return { ranAt, value, error: `Internal error computing expected result: ${String(err)}`, correct: false };
  }

  return { ranAt, value, correct: deepEqual(value, expected) };
}

/** Renders a problem's `context` as the `const x = ...;` block shown above the editor. */
export function formatContext(problem: Problem): string {
  if (problem.contextCode) return problem.contextCode;
  return Object.entries(problem.context)
    .map(([k, v]) => `const ${k} = ${formatOutput(v)};`)
    .join("\n");
}
