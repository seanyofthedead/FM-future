# CLAUDE.md

Guidance for working in the consolidated **Financial Management of the Future** repo.

## What this is
A fresh, single React + TS + Vite app that unifies two prior prototypes into ONE product
with two modules: **Agentic Reconciliation** and **PBC Request Agent**. The goal is that
both modules read as one product on screen (shared name, theme, header, terminology),
satisfying the Tradewinds single-solution rule and matching the storyboard.

Sources being consolidated (siblings in `C:\Users\peder\Documents`):
- `AWS_recon_test` — Agentic Reconciliation (React 18, Vite, Tailwind v3, React Router).
- `PBC Workflow` — PBC Request Agent (React 19, Vite, Tailwind v4, Cognito auth).

## Stack specifics
- **Tailwind v4** via `@tailwindcss/vite`. Single `@import "tailwindcss";` in `src/index.css`.
  No `tailwind.config.js`; theme tokens live in `@theme { ... }`. Do NOT add v3
  `@tailwind base/components/utilities` directives.
- Path alias `@/*` -> `src/*` (set in `vite.config.ts` and `tsconfig.app.json`).
- Dev server on port **5180** (5173/5175 are used by the prototypes).

## Conventions
- One shell: every page renders inside `app/AppShell.tsx`. Don't add a second header.
- Product/module identity comes from `lib/brand.ts` — change names there, not inline.
- Shared types in `types/index.ts`. A record carries the SAME `id` through Reconciliation
  and PBC to sell the one-pipeline story (storyboard Shot 15).
- Tailwind utilities in JSX; reach for shared components (`Card`, `StatusBadge`,
  `PageHeader`) before writing new markup.

## Migration order (suggested)
1. Reconciliation: port Inbox / case detail / escalations / audit export into
   `modules/reconciliation`, relabel to storyboard terms (reconciliation, exceptions,
   rationale, review queue, audit-ready output).
2. PBC: port request intake into `modules/pbc`; BUILD the two missing beats —
   provenance source-cards (Shot 13) and the assembled auditor-ready package (Shot 14).
3. Theme: replace placeholder brand hex with official Guidehouse values + wordmark.
4. Auth: decide whether the unified product needs the Cognito gate; keep it out of the
   demo path unless required.

## Don't
- Don't reintroduce per-module branding or separate color palettes.
- Don't commit `node_modules`, `dist`, or `.env`.
