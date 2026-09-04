import { methods, categories, methodById } from "../data/methods";
import { problemsByMethod } from "../data/problems";
import { getProgress, solvedCount } from "../progress";

export function totalProblemCount(): number {
  const chaining = problemsByMethod("chaining").length;
  const perMethod = methods.reduce((n, m) => n + problemsByMethod(m.id).length, 0);
  return chaining + perMethod;
}

function sidebarHtml(activeMethodId?: string): string {
  const progress = getProgress();

  const methodLink = (m: (typeof methods)[number]) => {
    const probs = problemsByMethod(m.id);
    const solved = probs.filter((p) => progress.solved[p.id]).length;
    const allSolved = probs.length > 0 && solved === probs.length;
    const active = activeMethodId === m.id;
    return `<a href="#/method/${m.id}" class="side-link ${active ? "active" : ""} ${allSolved ? "all-solved" : ""}">
      <span>${m.name}()</span>
      <span class="count">${solved}/${probs.length}</span>
    </a>`;
  };

  const byCategory = categories
    .map((cat) => {
      const inCat = methods.filter((m) => m.category === cat);
      return `<div class="sidebar-section">
        <h4>${cat}</h4>
        ${inCat.map(methodLink).join("")}
      </div>`;
    })
    .join("");

  const chainingProbs = problemsByMethod("chaining");
  const chainingSolved = chainingProbs.filter((p) => progress.solved[p.id]).length;
  const chainingActive = activeMethodId === "chaining";
  const chainingAllSolved = chainingSolved === chainingProbs.length;

  return `
    <div class="sidebar-section">
      <a href="#/" class="side-link ${!activeMethodId ? "active" : ""}"><span>Overview</span></a>
      <a href="#/method/chaining" class="side-link ${chainingActive ? "active" : ""} ${chainingAllSolved ? "all-solved" : ""}">
        <span>Chaining Challenges</span>
        <span class="count">${chainingSolved}/${chainingProbs.length}</span>
      </a>
    </div>
    ${byCategory}
  `;
}

function headerHtml(): string {
  const solved = solvedCount();
  const total = totalProblemCount();
  const progress = getProgress();
  return `
    <header class="app-header">
      <button class="menu-toggle" id="menu-toggle" aria-label="Toggle navigation">&#9776;</button>
      <a href="#/" class="brand">array<span class="dot">.</span>methods<span class="dot">.</span>practice</a>
      <div class="header-spacer"></div>
      <div class="stat-pill" title="Problems solved">Solved <strong id="stat-solved">${solved}</strong>/${total}</div>
      <div class="stat-pill" title="Consecutive days with at least one solve">Streak <strong id="stat-streak">${progress.streak}</strong>&#128293;</div>
    </header>
  `;
}

/** Called after a problem is solved so counts update without a full route re-render. */
export function refreshShellStats(activeMethodId: string | undefined): void {
  const sidebar = document.querySelector<HTMLElement>("#sidebar");
  if (sidebar) sidebar.innerHTML = sidebarHtml(activeMethodId);

  const solvedEl = document.querySelector<HTMLElement>("#stat-solved");
  if (solvedEl) solvedEl.textContent = String(solvedCount());

  const streakEl = document.querySelector<HTMLElement>("#stat-streak");
  if (streakEl) streakEl.textContent = String(getProgress().streak);
}

export function renderShell(app: HTMLElement, activeMethodId: string | undefined, contentHtml: string): HTMLElement {
  app.innerHTML = `
    ${headerHtml()}
    <div class="layout">
      <nav class="sidebar" id="sidebar">${sidebarHtml(activeMethodId)}</nav>
      <main class="content"><div class="container" id="content-root">${contentHtml}</div></main>
    </div>
    <footer class="app-footer">
      Practice site for JavaScript / TypeScript array methods &middot;
      <a href="https://github.com/choicespecs/js-ts-array-methods-practice" target="_blank" rel="noreferrer">source on GitHub</a>
    </footer>
  `;

  const toggle = app.querySelector<HTMLButtonElement>("#menu-toggle");
  const sidebar = app.querySelector<HTMLElement>("#sidebar");
  toggle?.addEventListener("click", () => sidebar?.classList.toggle("open"));
  sidebar?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => sidebar.classList.remove("open")));

  return app.querySelector<HTMLElement>("#content-root")!;
}

export { methodById };
