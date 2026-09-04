import type { Problem, TestCase } from "./types";

export interface TestResult {
  label: string;
  pass: boolean;
  args: unknown[];
  expected: unknown;
  actual: unknown;
  error?: string;
}

export interface RunResult {
  results: TestResult[];
  allPassed: boolean;
  compileError?: string;
  usedTargetMethod: boolean;
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

function formatValue(v: unknown): string {
  if (v === undefined) return "undefined";
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

/**
 * Compiles the learner's code and extracts the named function.
 * Runs client-side only, in the learner's own browser tab, against
 * their own hand-written practice code — the same trust model as any
 * browser-based coding playground.
 */
function compileUserFunction(code: string, functionName: string): { fn?: (...args: unknown[]) => unknown; error?: string } {
  try {
    const factory = new Function(
      `${code}\nif (typeof ${functionName} !== "function") { throw new Error(${JSON.stringify(
        `No function named "${functionName}" was found. Did you rename it?`
      )}); }\nreturn ${functionName};`
    );
    const fn = factory();
    return { fn };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export function runTests(problem: Problem, code: string): RunResult {
  const { fn, error } = compileUserFunction(code, problem.functionName);
  if (!fn) {
    return { results: [], allPassed: false, compileError: error, usedTargetMethod: false };
  }

  const results: TestResult[] = problem.testCases.map((tc: TestCase) => {
    const expected = problem.reference(...tc.args);
    try {
      const actual = fn(...structuredCloneArgs(tc.args));
      return {
        label: tc.label,
        pass: deepEqual(actual, expected),
        args: tc.args,
        expected,
        actual,
      };
    } catch (err) {
      return {
        label: tc.label,
        pass: false,
        args: tc.args,
        expected,
        actual: undefined,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  });

  const usedTargetMethod = problem.methodId !== "chaining" && new RegExp(`\\.${problem.methodId}\\s*\\(`).test(code);

  return {
    results,
    allPassed: results.length > 0 && results.every((r) => r.pass),
    usedTargetMethod,
  };
}

function structuredCloneArgs(args: unknown[]): unknown[] {
  // Guard against a buggy solution mutating shared test-case data between calls.
  return args.map((a) => (typeof a === "object" && a !== null ? JSON.parse(JSON.stringify(a)) : a));
}

export { formatValue };
