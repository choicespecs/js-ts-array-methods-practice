import "./style.css";
import { renderShell } from "./ui/shell";
import { renderHome } from "./ui/home";
import { renderMethod } from "./ui/methodView";
import { methodById } from "./data/methods";
import { problemById } from "./data/problems";

const app = document.querySelector<HTMLDivElement>("#app")!;

type Route = { name: "home" } | { name: "method"; id: string } | { name: "problem"; id: string };

function parseRoute(): Route {
  const hash = location.hash.replace(/^#/, "");
  const parts = hash.split("/").filter(Boolean);
  if (parts[0] === "method" && parts[1]) return { name: "method", id: parts[1] };
  if (parts[0] === "problem" && parts[1]) return { name: "problem", id: parts[1] };
  return { name: "home" };
}

function render(): void {
  const route = parseRoute();

  if (route.name === "home") {
    renderShell(app, undefined, renderHome());
    return;
  }

  if (route.name === "method") {
    const isChaining = route.id === "chaining";
    if (!isChaining && !methodById.has(route.id)) {
      renderShell(app, undefined, `<p>Unknown method. <a href="#/">Go home</a></p>`);
      return;
    }
    renderShell(app, route.id, renderMethod(route.id));
    return;
  }

  if (route.name === "problem") {
    const problem = problemById.get(route.id);
    const content = renderShell(app, problem?.methodId, `<p class="loading-note">Loading editor&hellip;</p>`);
    import("./ui/problemView").then(({ mountProblem }) => mountProblem(content, route.id));
    window.scrollTo({ top: 0 });
    return;
  }
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);
render();
