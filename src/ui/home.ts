import { methods } from "../data/methods";
import { problemsByMethod } from "../data/problems";
import { getProgress, solvedCount } from "../progress";
import { totalProblemCount } from "./shell";

export function renderHome(): string {
  const progress = getProgress();
  const total = totalProblemCount();
  const solved = solvedCount();
  const pct = total > 0 ? Math.round((solved / total) * 100) : 0;

  const cards = methods
    .map((m) => {
      const probs = problemsByMethod(m.id);
      const solvedInMethod = probs.filter((p) => progress.solved[p.id]).length;
      return `
        <a class="method-card" href="#/method/${m.id}">
          <div class="method-name">${m.name}()</div>
          <div class="tagline">${m.tagline}</div>
          <div class="card-footer">
            <span>${m.category}</span>
            <span>${solvedInMethod}/${probs.length} solved</span>
          </div>
        </a>`;
    })
    .join("");

  const chainingCount = problemsByMethod("chaining").length;
  const chainingSolved = problemsByMethod("chaining").filter((p) => progress.solved[p.id]).length;

  return `
    <div class="hero">
      <h1>Learn array methods by doing.</h1>
      <p>
        Pick a method below to read a short explanation, then solve hands-on problems that get
        progressively harder — from a single method up to chaining several together, the way
        you'll actually use them in real code.
      </p>
      <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      <p style="margin-top:-6px;font-size:13px;">${solved} / ${total} problems solved (${pct}%)</p>
    </div>

    <div style="margin-bottom:22px;">
      <a class="method-card" href="#/method/chaining" style="border-color:var(--accent);">
        <div class="method-name">Chaining Challenges</div>
        <div class="tagline">Combine map, filter, reduce and more in a single expression — the skill that ties everything together.</div>
        <div class="card-footer">
          <span>Mixed methods</span>
          <span>${chainingSolved}/${chainingCount} solved</span>
        </div>
      </a>
    </div>

    <div class="category-grid">
      ${cards}
    </div>
  `;
}
