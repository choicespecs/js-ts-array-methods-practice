import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

import { problemById, problemsByMethod } from "../data/problems";
import { methodById } from "../data/methods";
import { runTests, formatValue, type RunResult } from "../runner";
import { markSolved, isSolved } from "../progress";
import { refreshShellStats } from "./shell";

function draftKey(problemId: string): string {
  return `array-methods-practice:draft:${problemId}`;
}

function loadDraft(problem: { id: string; starterCode: string }): string {
  try {
    return localStorage.getItem(draftKey(problem.id)) ?? problem.starterCode;
  } catch {
    return problem.starterCode;
  }
}

function saveDraft(problemId: string, code: string): void {
  try {
    localStorage.setItem(draftKey(problemId), code);
  } catch {
    // ignore quota / unavailable storage
  }
}

function siblingProblems(methodId: string) {
  return methodId === "chaining" ? problemsByMethod("chaining") : problemsByMethod(methodId);
}

export function mountProblem(root: HTMLElement, problemId: string): void {
  const problem = problemById.get(problemId);
  if (!problem) {
    root.innerHTML = `<p>Problem not found. <a href="#/">Go home</a></p>`;
    return;
  }

  const info = methodById.get(problem.methodId);
  const siblings = siblingProblems(problem.methodId);
  const idx = siblings.findIndex((p) => p.id === problem.id);
  const prev = idx > 0 ? siblings[idx - 1] : undefined;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : undefined;

  let hintsShown = 0;
  let sawSolution = false;
  let attempts = 0;
  let alreadySolved = isSolved(problem.id);

  root.innerHTML = `
    <a class="back-link" href="#/method/${problem.methodId}">&larr; ${
    problem.methodId === "chaining" ? "Chaining Challenges" : `${info?.name}()`
  }</a>

    <div class="problem-header">
      <div>
        <h1>${problem.title}</h1>
      </div>
      <span class="badge ${problem.difficulty}">${problem.difficulty}</span>
    </div>
    <div class="problem-meta">Implement <code>${problem.functionName}()</code>${
    alreadySolved ? ' &middot; <span class="celebrate">&#10003; solved</span>' : ""
  }</div>

    <div class="prompt-text" id="prompt-text"></div>

    <div class="editor-wrap">
      <div class="editor-toolbar">
        <span>JavaScript</span>
        <button class="btn subtle" id="reset-code" type="button">Reset to starter code</button>
      </div>
      <div class="cm-editor-host" id="editor-host"></div>
    </div>

    <div class="action-row">
      <button class="btn primary" id="run-btn" type="button">Run tests</button>
      <button class="btn" id="hint-btn" type="button">Show hint (${problem.hints.length} available)</button>
      <button class="btn" id="solution-btn" type="button">Show solution</button>
    </div>

    <div id="hints-area"></div>
    <div id="results-area"></div>
    <div id="solution-area"></div>

    <div class="nav-row">
      <span>${prev ? `<a href="#/problem/${prev.id}">&larr; ${prev.title}</a>` : ""}</span>
      <span>${next ? `<a href="#/problem/${next.id}">${next.title} &rarr;</a>` : `<a href="#/method/${problem.methodId}">Back to list &rarr;</a>`}</span>
    </div>
  `;

  // Prompt text can safely use textContent-based building since it's plain text with occasional inline code.
  const promptEl = root.querySelector<HTMLElement>("#prompt-text")!;
  promptEl.innerHTML = renderPromptWithCode(problem.prompt);

  const hintBtn = root.querySelector<HTMLButtonElement>("#hint-btn")!;
  const hintsArea = root.querySelector<HTMLElement>("#hints-area")!;
  const solutionBtn = root.querySelector<HTMLButtonElement>("#solution-btn")!;
  const solutionArea = root.querySelector<HTMLElement>("#solution-area")!;
  const resultsArea = root.querySelector<HTMLElement>("#results-area")!;
  const resetBtn = root.querySelector<HTMLButtonElement>("#reset-code")!;
  const runBtn = root.querySelector<HTMLButtonElement>("#run-btn")!;

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
        <h5 style="margin:18px 0 8px;font-size:12px;color:var(--text-dimmer);text-transform:uppercase;letter-spacing:.04em;">Reference solution</h5>
        <pre>${escapeHtml(problem.solutionCode)}</pre>
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
        if (update.docChanged) {
          saveDraft(problem.id, view.state.doc.toString());
        }
      }),
      EditorView.theme({ "&": { height: "100%" } }),
    ],
  });

  const view = new EditorView({ state, parent: editorHost });

  resetBtn.addEventListener("click", () => {
    view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: problem.starterCode } });
    saveDraft(problem.id, problem.starterCode);
  });

  runBtn.addEventListener("click", () => {
    attempts += 1;
    const code = view.state.doc.toString();
    const result = runTests(problem, code);
    renderResults(resultsArea, result);

    if (result.allPassed) {
      markSolved(problem.id, { attempts, hintsUsed: hintsShown, sawSolution });
      refreshShellStats(problem.methodId);
      if (!alreadySolved) {
        alreadySolved = true;
        const meta = root.querySelector<HTMLElement>(".problem-meta")!;
        if (!meta.querySelector(".celebrate")) {
          meta.insertAdjacentHTML("beforeend", ' &middot; <span class="celebrate">&#10003; solved</span>');
        }
      }
    }
  });
}

function renderResults(container: HTMLElement, result: RunResult): void {
  if (result.compileError) {
    container.innerHTML = `
      <div class="results-panel">
        <div class="results-summary fail">Couldn't run your code</div>
        <div class="compile-error">${escapeHtml(result.compileError)}</div>
      </div>`;
    return;
  }

  const cases = result.results
    .map(
      (r) => `
        <div class="result-case ${r.pass ? "pass" : "fail"}">
          <div class="line"><span class="status">${r.pass ? "PASS" : "FAIL"}</span> &mdash; ${escapeHtml(r.label)}</div>
          <div class="line">input: <strong>${escapeHtml(r.args.map(formatValue).join(", "))}</strong></div>
          <div class="line">expected: <strong>${escapeHtml(formatValue(r.expected))}</strong>${
        r.pass ? "" : ` &nbsp;got: <strong>${escapeHtml(r.error ? `threw: ${r.error}` : formatValue(r.actual))}</strong>`
      }</div>
        </div>`
    )
    .join("");

  const passCount = result.results.filter((r) => r.pass).length;

  container.innerHTML = `
    <div class="results-panel">
      <div class="results-summary ${result.allPassed ? "pass" : "fail"}">
        ${result.allPassed ? "All tests passed!" : `${passCount}/${result.results.length} tests passed`}
      </div>
      ${cases}
      ${
        result.allPassed && !result.usedTargetMethod
          ? `<div class="method-usage-note">Tip: this problem is meant to practice a specific method — check the prompt above to see if there's a more direct way to write this.</div>`
          : ""
      }
    </div>`;
}

function renderPromptWithCode(text: string): string {
  const escaped = escapeHtml(text);
  return escaped.replace(/`([^`]+)`/g, "<code>$1</code>");
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c] as string));
}
