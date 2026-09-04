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

export interface Problem {
  id: string;
  methodId: string; // matches MethodInfo.id, or "chaining"
  title: string;
  difficulty: Difficulty;
  prompt: string;
  /** Variables available to the learner's expression, e.g. { nums: [1,2,3] } */
  context: Record<string, unknown>;
  /** Override for how `context` is displayed as code (auto-generated when omitted). */
  contextCode?: string;
  /** Expression pre-filled in the editor. For a chain step, this is the previous step's solution. */
  starterExpression: string;
  /** Reference expression, shown as the solution and used as the next step's starter in a chain. */
  solutionExpression: string;
  /** Computes the correct output from `context`. */
  reference: (context: Record<string, unknown>) => unknown;
  /** Progressive hints, revealed one at a time. */
  hints: string[];
  /** Groups sequential chain-building problems together, in array order. */
  chainGroup?: string;
  chainTitle?: string;
}

export interface ProgressState {
  solved: Record<string, { attempts: number; hintsUsed: number; sawSolution: boolean; solvedAt: number }>;
  streak: number;
  lastSolvedDay?: string;
}
