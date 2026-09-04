import { methodById } from "../data/methods";
import { problemsByMethod, chainGroups } from "../data/problems";
import { getProgress } from "../progress";

export function renderMethod(methodId: string): string {
  const progress = getProgress();
  const info = methodById.get(methodId);

  if (methodId === "chaining") {
    return renderChainingHub(progress);
  }

  const problems = problemsByMethod(methodId);

  const header = info
    ? `
      <div class="method-header">
        <span class="category-tag">${info.category}</span>
        <h1>${info.name}()</h1>
      </div>
      <div class="explain-card">
        <code class="syntax">${escapeHtml(info.syntax)}</code>
        <p>${info.description}</p>
        <div class="example">
          <pre>${escapeHtml(info.example.code)}</pre>
          <span class="arrow">&rarr;</span>
          <pre>${escapeHtml(info.example.result)}</pre>
        </div>
        ${
          info.gotchas && info.gotchas.length
            ? `<div class="gotchas">
                <h5>Watch out for</h5>
                <ul>${info.gotchas.map((g) => `<li>${g}</li>`).join("")}</ul>
              </div>`
            : ""
        }
      </div>`
    : "";

  const rows = problems
    .map((p) => {
      const solved = Boolean(progress.solved[p.id]);
      return `
        <a class="problem-row ${solved ? "solved" : ""}" href="#/problem/${p.id}">
          <span class="check">${solved ? "&#10003;" : ""}</span>
          <span class="title">${p.title}</span>
          <span class="badge ${p.difficulty}">${p.difficulty}</span>
        </a>`;
    })
    .join("");

  return `
    <a class="back-link" href="#/">&larr; All methods</a>
    ${header}
    <div class="problem-list">${rows}</div>
  `;
}

function renderChainingHub(progress: ReturnType<typeof getProgress>): string {
  const groups = chainGroups();

  const tracks = groups
    .map((g) => {
      const solvedCount = g.steps.filter((s) => progress.solved[s.id]).length;
      const firstUnsolved = g.steps.find((s) => !progress.solved[s.id]) ?? g.steps[0];
      const complete = solvedCount === g.steps.length;

      const stepDots = g.steps
        .map((s) => `<span class="chain-dot ${progress.solved[s.id] ? "done" : ""}" title="${escapeHtml(s.title)}"></span>`)
        .join("");

      return `
        <a class="method-card chain-track ${complete ? "complete" : ""}" href="#/problem/${firstUnsolved.id}">
          <div class="method-name">${escapeHtml(g.title)}</div>
          <div class="tagline">${g.steps.length} steps &middot; each one chains a new method onto the last</div>
          <div class="chain-dots">${stepDots}</div>
          <div class="card-footer">
            <span>${complete ? "Completed" : solvedCount > 0 ? "Continue" : "Start"}</span>
            <span>${solvedCount}/${g.steps.length} solved</span>
          </div>
        </a>`;
    })
    .join("");

  return `
    <a class="back-link" href="#/">&larr; All methods</a>
    <div class="method-header">
      <span class="category-tag">Mixed methods</span>
      <h1>Chaining Challenges</h1>
    </div>
    <div class="explain-card">
      <p>
        Every array method returns a value you can immediately call another method on. Each pipeline below
        starts from one dataset and adds a step at a time — solve a step, see the real output, then chain the
        next method straight onto what you already wrote.
      </p>
    </div>
    <div class="category-grid">${tracks}</div>
  `;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c] as string));
}
