import { methodById } from "../data/methods";
import { problemsByMethod } from "../data/problems";
import { getProgress } from "../progress";

export function renderMethod(methodId: string): string {
  const problems = problemsByMethod(methodId);
  const progress = getProgress();
  const info = methodById.get(methodId);

  const header =
    methodId === "chaining"
      ? `
      <div class="method-header">
        <span class="category-tag">Mixed methods</span>
        <h1>Chaining Challenges</h1>
      </div>
      <div class="explain-card">
        <p>
          Every array method you've learned returns a value you can immediately call another method on.
          That's what makes chains like <code>arr.filter(...).map(...).reduce(...)</code> possible: each
          stage narrows or transforms the data before handing it to the next. Read each chain right to left
          in your head as a pipeline — filter first, then transform, then combine.
        </p>
      </div>`
      : info
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

function escapeHtml(s: string): string {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c] as string));
}
