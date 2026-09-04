export type Difficulty = "easy" | "medium" | "hard";

export interface MethodInfo {
  id: string;
  name: string;
  category: string;
  tagline: string;
  syntax: string;
  description: string;
  example: {
    code: string;
    result: string;
  };
  gotchas?: string[];
}

export interface TestCase {
  /** Human readable description of this case, e.g. "empty array" */
  label: string;
  /** Arguments passed to the user's `solution` function */
  args: unknown[];
}

export interface Problem {
  id: string;
  methodId: string; // matches MethodInfo.id, or "chaining"
  title: string;
  difficulty: Difficulty;
  prompt: string;
  /** Name of the function the user must implement */
  functionName: string;
  /** Starter code shown in the editor */
  starterCode: string;
  /** Reference solution, revealed on request */
  solutionCode: string;
  /** Progressive hints, revealed one at a time */
  hints: string[];
  testCases: TestCase[];
  /** Reference implementation used to compute expected output for each test case */
  reference: (...args: any[]) => unknown;
}

export interface ProgressState {
  solved: Record<string, { attempts: number; hintsUsed: number; sawSolution: boolean; solvedAt: number }>;
  streak: number;
  lastSolvedDay?: string;
}
