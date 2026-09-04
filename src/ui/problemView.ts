import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

import type { Problem } from "../types";
import { problemById, problemsByMethod, chainGroups } from "../data/problems";
import { methodById } from "../data/methods";
import { runExpression, formatOutput, formatContext, type RunResult } from "../runner";
import { markSolved, isSolved } from "../progress";
import { refreshShellStats } from "./shell";

function draftKey(problemId: string): string {
  return `array-methods-practice:draft:${problemId}`;
}

function loadDraft(problem: Problem): string {
  try {
    return localStorage.getItem(draftKey(problem.id)) ?? problem.starterExpression;
  } catch {
    return problem.starterExpression;
  }
}

function saveDraft(problemId: string, code: string): void {
  try {
    localStorage.setItem(draftKey(problemId), code);
  } catch {
    // ignore quota / unavailable storage
  }
}

function siblingProblems(problem: Problem): Problem[] {
  if (problem.chainGroup) {
    return chainGroups().find((g) => g.id === problem.chainGroup)?.steps ?? [problem];
  }
  return problemsByMethod(problem.methodId);
}

export function mountProblem(root: HTMLElement, problemId: string): void {
  const problem = problemById.get(problemId);
  if (!problem) {
    root.innerHTML = `<p>Problem not found. <a href="#/">Go home</a></p>`;
    return;
  }

  const info = methodById.get(problem.methodId);
  const siblings = siblingProblems(problem);
  const idx = siblings.findIndex((p) => p.id === problem.id);
  const prev = idx > 0 ? siblings[idx - 1] : undefined;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : undefined;

  let hintsShown = 0;
  let sawSolution = false;
  let attempts = 0;
  let alreadySolved = isSolved(problem.id);

  const backHref = `#/method/${problem.methodId}`;
  const backLabel = problem.chainGroup ? problem.chainTitle ?? "Chaining Challenges" : `${info?.name}()`;
  const chainBadge = problem.chainGroup ? `<div class="chain-progress">${problem.chainTitle} &middot; step ${idx + 1} of ${siblings.length}</div>` : "";

  root.innerHTML = `
    <a class="back-link" href="${backHref}">&larr; ${backLabel}</a>
    ${chainBadge}

    <div class="problem-header">
      <div><h1>${problem.title}</h1></div>
      <span class="badge ${problem.difficulty}">${problem.difficulty}</span>
    </div>
    <div class="problem-meta" id="problem-meta">${alreadySolved ? '<span class="celebrate">&#10003; solved</span>' : "Not solved yet"}</div>

    <div class="prompt-text" id="prompt-text"></div>

    <div class="data-block">
      <div class="data-block-label">Given</div>
      <pre id="context-code"></pre>
    </div>

    <div class="editor-wrap">
      <div class="editor-toolbar">
        <span>Your expression</span>
        <button class="btn subtle" id="reset-code" type="button">Reset to starter</button>
      </div>
      <div class="cm-editor-host" id="editor-host"></div>
    </div>

    <div class="action-row">
      <button class="btn primary" id="run-btn" type="button">Run</button>
      <button class="btn" id="hint-btn" type="button">Show hint (${problem.hints.length} available)</button>
      <button class="btn" id="solution-btn" type="button">Show solution</button>
    </div>

    <div id="output-area"></div>
    <div id="hints-area"></div>
    <div id="solution-area"></div>

    <div class="nav-row">
      <span>${prev ? `<a href="#/problem/${prev.id}">&larr; ${prev.title}</a>` : ""}</span>
      <span id="next-slot">${
        next
          ? `<a href="#/problem/${next.id}" class="${alreadySolved ? "" : "nav-locked"}">${problem.chainGroup ? "Chain next step" : next.title} &rarr;</a>`
          : `<a href="${backHref}">Back to list &rarr;</a>`
      }</span>
    </div>
  `;

  root.querySelector<HTMLElement>("#prompt-text")!.innerHTML = renderPromptWithCode(problem.prompt);
  root.querySelector<HTMLElement>("#context-code")!.textContent = formatContext(problem);

  const hintBtn = root.querySelector<HTMLButtonElement>("#hint-btn")!;
  const hintsArea = root.querySelector<HTMLElement>("#hints-area")!;
  const solutionBtn = root.querySelector<HTMLButtonElement>("#solution-btn")!;
  const solutionArea = root.querySelector<HTMLElement>("#solution-area")!;
  const outputArea = root.querySelector<HTMLElement>("#output-area")!;
  const resetBtn = root.querySelector<HTMLButtonElement>("#reset-code")!;
  const runBtn = root.querySelector<HTMLButtonElement>("#run-btn")!;
  const metaEl = root.querySelector<HTMLElement>("#problem-meta")!;

  if (problem.hints.length === 0) hintBtn.style.display = "none";

  hintBtn.addEventListener("click", () => {
    if (hintsShown >= problem.hints.length) return;
    const hint = problem.hints[hintsShown];
    hintsShown += 1;
    const div = document.createElement("div");
    div.className = "hint-box";
    div.innerHTML = `<span class="hint-num">Hint ${hintsShown}</span>${escapeHtml(hint)}`;
    hintsArea.appendChild(div);
    hintBtn.textContent = hintsShown >= problem.hints.length ? "No more hints" : `Show hint (${problem.hints.length - hintsShown} left)`;
    if (hintsShown >= problem.hints.length) hintBtn.disabled = true;
  });

  solutionBtn.addEventListener("click", () => {
    sawSolution = true;
    solutionArea.innerHTML = `
      <div class="solution-box">
        <h5 class="solution-label">Reference solution</h5>
        <pre>${escapeHtml(problem.solutionExpression)}</pre>
      </div>`;
    solutionBtn.disabled = true;
  });

  // ---- CodeMirror setup ----
  const startingCode = loadDraft(problem);
  const editorHost = root.querySelector<HTMLElement>("#editor-host")!;

  const state = EditorState.create({
    doc: startingCode,
    extensions: [
      basicSetup,
      javascript(),
      oneDark,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) saveDraft(problem.id, view.state.doc.toString());
      }),
      EditorView.theme({ "&": { height: "100%" } }),
    ],
  });

  const view = new EditorView({ state, parent: editorHost });

  resetBtn.addEventListener("click", () => {
    view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: problem.starterExpression } });
    saveDraft(problem.id, problem.starterExpression);
  });

  runBtn.addEventListener("click", () => {
    attempts += 1;
    const code = view.state.doc.toString();
    const result = runExpression(problem, code);
    renderOutput(outputArea, result);

    if (result.correct) {
      markSolved(problem.id, { attempts, hintsUsed: hintsShown, sawSolution });
      refreshShellStats(problem.methodId);
      if (!alreadySolved) {
        alreadySolved = true;
        metaEl.innerHTML = '<span class="celebrate">&#10003; solved</span>';
        const nextLink = root.querySelector<HTMLAnchorElement>("#next-slot a");
        nextLink?.classList.remove("nav-locked");
      }
    }
  });
}

function renderOutput(container: HTMLElement, result: RunResult): void {
  if (result.error) {
    container.innerHTML = `
      <div class="output-panel">
        <div class="output-panel-label">Output</div>
        <pre class="output-error">${escapeHtml(result.error)}</pre>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div class="output-panel ${result.correct ? "correct" : "incorrect"}">
      <div class="output-panel-label">
        Output
        <span class="output-status">${result.correct ? "&#10003; Correct!" : "Not quite yet"}</span>
      </div>
      <pre class="output-value">${escapeHtml(formatOutput(result.value))}</pre>
    </div>`;
}

function renderPromptWithCode(text: string): string {
  const escaped = escapeHtml(text);
  return escaped.replace(/`([^`]+)`/g, "<code>$1</code>");
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c] as string));
}
