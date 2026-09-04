# Array Methods Practice

An interactive practice site for learning JavaScript / TypeScript array methods —
`map`, `filter`, `reduce`, `find`, `sort`, `flatMap`, chaining, and more.

Live site: https://choicespecs.github.io/js-ts-array-methods-practice/

## What it does

- **Method explanations.** Every method gets a short syntax reference, description, a
  worked example, and common gotchas.
- **Hands-on problems.** Each method has easy/medium/hard problems you solve in a
  real in-browser code editor (CodeMirror), run against test cases, and get instant
  pass/fail feedback with expected vs. actual output.
- **Progressive hints.** Stuck? Reveal hints one at a time instead of jumping
  straight to the answer. A reference solution is available if you want it.
- **Chaining challenges.** A dedicated section combines methods
  (`filter().map().reduce()`, `sort().slice()`, etc.) the way you'd actually use them.
- **Progress tracking.** Solved problems, hint usage, and a daily solve streak are
  saved to `localStorage` — no account needed.

## Tech stack

- TypeScript, no framework — a small hash-router over vanilla DOM rendering
- [Vite](https://vitejs.dev/) for dev server & build
- [CodeMirror 6](https://codemirror.net/) for the in-browser code editor (lazy-loaded
  only on problem pages)
- Learner code runs client-side via `new Function(...)`, the same trust model as any
  browser-based coding playground — it's the learner's own code, in their own browser tab

## Local development

```bash
npm install
npm run dev       # start dev server
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build locally
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to GitHub Pages via GitHub Actions.

To enable Pages for a fork: **Settings → Pages → Build and deployment → Source:
GitHub Actions**.

If you rename/fork the repo, update `base` in `vite.config.ts` to match the new repo
name (GitHub Pages project sites are served from `/<repo-name>/`).

## Adding a new problem

Problems live in `src/data/problems.ts`, method explanations in
`src/data/methods.ts`. Each problem needs a prompt, starter code, a reference
implementation (used to compute expected test output), test cases, hints, and a
solution — see existing entries for the shape.
