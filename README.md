# Financial Management of the Future

Guidehouse's consolidated audit-readiness product. One application, one audit-ready
pipeline, two capabilities:

- **Agentic Reconciliation** — matches records across source systems, surfaces mismatches
  with the agent's rationale, produces a clean reconciled record set.
- **PBC Request Agent** — turns reconciled data into an auditor-ready package, with
  traceable provenance on every line.

This repo is the working directory for consolidating the two prior prototypes
(`AWS_recon_test` and `PBC Workflow`) into a single product that reads as one thing
on screen — matching the Tradewinds storyboard and the single-solution requirement.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # type-check + production build
npm run preview
```

> Run `npm install` on your machine (Windows). Don't commit `node_modules`.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 (`@tailwindcss/vite`, no config file —
theme tokens live in `src/index.css` under `@theme`) · React Router v7.

## Structure

```
src/
  app/AppShell.tsx          One shell (header + module nav) wraps every module
  components/                Shared UI: Brand, ModuleNav, Card, StatusBadge, PageHeader
  lib/brand.ts               Product + module identity (single source of truth)
  types/index.ts             Shared domain types (record flows Reconciliation -> PBC)
  modules/
    overview/                One-product / one-pipeline landing (storyboard Shots 4-6, 15)
    reconciliation/          Agentic Reconciliation module (storyboard Shots 7-10)
    pbc/                      PBC Request Agent module (storyboard Shots 11-14)
```

## Migration plan

See `CLAUDE.md` and `../`-level `Repo_Alignment_Review.docx`. Bring screens from the
two prototypes into the matching `modules/*` folders, adopt the shared theme + shell,
and standardize terminology to the storyboard. Two demo beats still need building in the
PBC module: provenance source-cards (Shot 13) and the assembled auditor-ready package
(Shot 14).

## Branding

Brand tokens in `src/index.css` are placeholders (navy `#1f3864`, green `#2e7d32`).
Replace with the official Guidehouse hex + wordmark when confirmed.
