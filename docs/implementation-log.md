# FM if the Future
## Implementation Log

> Append-only history of demo-impacting changes. Newest first. Never delete entries.

## 2026-06-10 – Demo polish pass: make every captured shot usable

- **Goal:** Tighten the screens that get recorded so nothing reads as placeholder or off-brand.
- **Files Changed:**
  - `src/modules/reconciliation/ReconciliationPage.tsx` + `src/modules/overview/components/ExecutiveInsights.tsx`
    — **Exceptions now = the agent's escalations** (`r.escalate`), not "escalate OR low confidence".
    Low-confidence-but-not-escalated rows count as reconciled (flagged with their confidence).
    Result: **77% audit-ready / 68 reconciled / 20 exceptions** (was 51% / 45 / 43) — a 4× "review
    20, not 88" story, and every queue row now carries the ESCALATED badge.
  - `ExecutiveInsights.tsx` — the catch-all category "Unknown / Needs Review" (the old #1 cluster)
    is relabeled **"Needs analyst review"** (reads as intentional HITL routing); section header
    renamed **"Where exceptions concentrate."**
  - `ReconciliationPage.tsx` — source datasets show **distinct record counts** (PO 88 / GR 86 /
    GL 88) instead of an identical "88 rows ×3" that looked like placeholder data.
  - `src/modules/pbc/data/pbcTypes.ts`, `auditTrail.ts`, `components/AuditTrail.tsx`, `data/validate.ts`
    — **re-skinned the provenance trail off Microsoft Power Platform** (SharePoint / Power Apps /
    Power Automate / Dataverse) **onto the stack the product advertises**: Databricks (lakehouse) →
    Extraction Agent → Validation Engine → Orchestration → Audit Ledger. Removes the Shot-12-vs-Shot-16
    contradiction (trail said Microsoft, the "Built on" strip says Databricks).
- **Verification:** `npm run build` exit 0; re-captured shots 04/05/06-07/07/08/09/12 live —
  77% exec band with "Needs analyst review", distinct source counts, 68/20 result with all-escalated
  queue, export toast, and the Databricks/agentic provenance trail. Console clean (0 errors). Updated
  gallery in `docs/demo-walkthrough/`.
- **Follow-Up Needed:** None.

## 2026-06-10 – Storyboard alignment: remaining product-backable shots (P1 + P2)

- **Source:** `docs/fm-future-storyboard.xlsx` / `docs/storyboard-alignment.md`. Closes every
  storyboard beat the product can legitimately back.
- **Files Changed:**
  - `src/modules/reconciliation/ReconciliationPage.tsx` — **Shot 7**: source datasets renamed
    to the procurement domain (Purchase Orders / Goods Receipts / General Ledger); copy de-"both".
  - `src/modules/pbc/PbcRequestAgentPage.tsx` — **Shot 12**: new "Retrieved sources" card with
    the three pulled artifacts as staggered cards (PO-23577 / DOC-795613 / GL-00043) + an
    "Every record traceable" chip; **Shot 13**: "Strategic Focus Area · Streamlining Business
    Processes" chip on the package. Also wrapped the lower cards in `mt-4` for consistent spacing.
  - `src/modules/overview/OverviewPage.tsx` — **Shot 16**: "Built on accredited building blocks"
    strip (Databricks · Cloud-native · Agentic orchestration · Human-in-the-loop guardrails) with
    the brittle-rules/manual-team contrast line; **Shot 18**: "Offered as a subscription · contact
    for a quote" strip (no rates, per v10).
- **Deliberately not built (produced video / pitch graphics):** Shots 1–3 (on-camera + b-roll),
  Shot 17 (TRL/SBIR pitch badges — not fabricated in-product), Shot 19 (CTA/QR), Shot 20 (end card).
- **Verification:** `npm run build` exit 0 (70 modules); driven live — recon shows PO/GR/GL;
  PBC guided run surfaces the three retrieved-source cards + "Every record traceable" chip,
  the package carries the SFA chip and AUTO ACCEPT 97%; Overview shows the built-on + subscription
  strips. Console clean (0 errors) on `/`, `/reconciliation`, `/pbc`.
- **Follow-Up Needed:** None. Every product-backable storyboard shot is now implemented.

## 2026-06-10 – Storyboard alignment: decisions applied + 3 P0 demo-fidelity gaps closed

- **Source:** `docs/fm-future-storyboard.xlsx` (Script col C, Visual Elements col E). New
  artifact `docs/storyboard-alignment.md` maps all 20 shots → product screens with status.
- **Decisions applied (D1–D3 confirmed by user):**
  - D1 — Shot 13 metric is **client-confirmed**: dropped the "illustrative" hedge on the
    before/after; PBC package now reads "Before ~3 days → Delivered in minutes · Confirmed in
    production · OSW Comptroller · Dept. of the Army · Army Transportation Command"; Overview
    "Time to evidence" tile → "minutes · confirmed in production." (The synthetic packages
    counter and computed reviewer-hours stay illustrative — not the client metric.)
  - D2 — added a text-only "In production today" missions strip on the Overview (no seals).
  - D3 — product name locked as **FM of the Future** (TBD caveat dropped).
- **P0 demo-fidelity gaps built (all verified live):**
  - **Shot 11** — `PbcRequestAgentPage.tsx`: new "Submit a request" compose card; operator
    types a request, agent interprets/routes (TX/PBC id parsing) and validates; guided flow
    auto-submits; duplicate validate button demoted to "Re-run validation."
  - **Shots 5 & 14** — `PipelineDiagram.tsx` + `LineagePage.tsx`: labeled "Financial Management
    of the Future" product-boundary frame around the pipeline/chain, with the **Auditor** as a
    recipient node **outside** the frame.
  - **Shot 9** — `AuditReadyOutput.tsx`: Export + Share buttons and a transient "exported"
    toast (auto-fires in guided capture).
- **Verification:** `npm run build` exit 0 (70 modules); driven live — Overview boundary +
  missions strip + minutes tile, Lineage boundary + external auditor, recon Export toast
  ("✓ Reconciliation exported…"), PBC typed request auto-submits → routed to PBC-2043/TX-1000043
  → AUTO ACCEPT 97% with the confirmed/cited benchmark. Console clean (0 errors) on all routes.
- **Follow-Up Needed:** Optional P1 polish remains (Shot 12 retrieved-source cards + "Every
  record traceable" chip; rename recon sources to PO/GR/GL; SFA chip). Not blocking.

## 2026-06-10 – Official Guidehouse brand applied (P2-9 COMPLETE)

- **Roadmap Item:** P2-9 (official Guidehouse hex + wordmark) — unblocked; the brand kit
  arrived in `docs/branding` (Color Palette / ADA Compliance / Logo Guidelines PDFs + Inter fonts).
- **Files Changed:**
  - `src/index.css` — `@theme` tokens swapped to official brand hex; added `@font-face` for
    Inter (5 weights). `brand-navy` → Black `#1B1B1B`, `brand-green` → Forest `#31863E`,
    new `brand-lime` → Guidehouse Green `#93D500`, `--font-sans` → Inter, ink → `#1B1B1B`.
  - `src/components/Brand.tsx` — replaced the placeholder check mark with the Guidehouse
    **Acon** (twin pillars), using the brand's dark-background treatment (white + Guidehouse Green).
  - `public/fonts/` *(new)* — Inter Light/Regular/Italic/Bold/BoldItalic copied from the kit.
- **Summary:** The product now wears the real Guidehouse brand end-to-end: black header, the
  Acon mark, Inter typeface, and Forest/Guidehouse-Green accents — all reskinned from the
  shared tokens, so every page inherited it without per-page edits.
- **Design decision (508):** Two greens by surface, per the brand's own ADA contrast sheet —
  **Forest `#31863E`** for green on white (4.6:1, the only compliant core green there) and the
  bright **Guidehouse Green `#93D500`** only on dark surfaces (11.8:1 on black), where the logo sits.
- **Demo Impact:** Removes the last "placeholder/prototype" tell — the recording now reads as a
  finished Guidehouse product, reinforcing the single-solution story for judges.
- **Verification:** `npm run build` exit 0 (70 modules); verified live via browser — header
  computed `rgb(27,27,27)`, `document.fonts.check('16px Inter')` = true, Acon pillars `#ffffff`
  + `rgb(147,213,0)`, Forest badges/buttons on white (Lineage, Overview), console clean
  (0 errors / 0 warnings) on `/` and `/lineage`.
- **Follow-Up Needed:** None. Entire prioritized backlog (P0–P2) is COMPLETE.

## 2026-06-09 – Remaining backlog: lineage view, executive layer, line provenance, types, brand

- **Roadmap Item:** P1-5 (shared types), P2-10 (line-level provenance), P2-11 (lineage view),
  P2-12 (executive insights), P2-9 (wordmark polish — official hex still pending).
- **Files Changed:**
  - `src/types/index.ts` — repurposed as the live shared contract (`ConfidenceBand`,
    `PackageLine`, `LinkedReconciliation`); dead aspirational types removed.
  - `src/modules/pbc/data/pbcTypes.ts` — imports `LinkedReconciliation` from `@/types`.
  - `src/modules/pbc/data/documents.ts` — added `lines` (PO / GR / GL) to the linked record.
  - `src/modules/pbc/PbcRequestAgentPage.tsx` — "provenance on every line" table in the package.
  - `src/modules/overview/components/ExecutiveInsights.tsx` *(new)* — CFO-level readiness
    headline computed from the live reconciliation data.
  - `src/modules/overview/OverviewPage.tsx` — renders the executive band.
  - `src/modules/lineage/LineagePage.tsx` *(new)* — full TX→evidence→package chain on one screen.
  - `src/lib/brand.ts` — added the Lineage nav tab; `src/App.tsx` — `/lineage` route.
  - `src/components/Brand.tsx` — refined wordmark lockup (reconciliation-check mark + type).
- **Summary:** The product now opens with an executive audit-readiness headline, offers a
  one-screen end-to-end lineage view threading TX-1000043 across all three stages, and the
  auditor package traces every supporting line to its system of record. The previously dead
  shared-types file is now the live cross-module contract.
- **Demo Impact:** Executive comprehension (CFO headline), the "see it all at once" lineage
  artifact for judges, and stronger Shot-14 payoff (line-level provenance).
- **Verification:** `npm run build` exit 0 (70 modules); driven live — Overview executive
  band (51% audit-ready, top causes), `/lineage` three-stage chain, and the package line
  table all render; PBC auto-validate still fires; console clean (0 errors / 0 warnings).
- **Follow-Up Needed:** Only P2-9's official Guidehouse hex + wordmark (external brand asset)
  remains — a token swap in `index.css` + `Brand.tsx` once provided.

## 2026-06-09 – Auditor framing + guided demo path (P1-7, P1-8)

- **Roadmap Item:** P1-7 (auditor-request framing) and P1-8 (guided auto-advance path).
- **Files Changed:**
  - `src/modules/overview/OverviewPage.tsx` — "▶ Start guided demo" CTA → `/reconciliation?autorun=1`.
  - `src/modules/reconciliation/ReconciliationPage.tsx` — auto-run the reconciliation on
    `?autorun=1`, auto-scroll to the audit-ready output, forward the flag to the handoff.
  - `src/modules/reconciliation/components/AuditReadyOutput.tsx` — `guided` prop appends
    `&autorun=1` to the PBC handoff link.
  - `src/modules/pbc/PbcRequestAgentPage.tsx` — auditor-request banner on the selected
    request (P1-7); timeout-guarded, StrictMode-safe auto-validation on `?autorun=1` (P1-8).
- **Summary:** The Overview CTA now threads the entire pipeline hands-free except for the one
  meaningful "Send to PBC" transition: reconciliation runs itself, the output scrolls into
  view, and the linked PBC request auto-validates into the auditor-ready package. Every PBC
  request also carries an explicit "Auditor request · {auditor} requested…" line.
- **Demo Impact:** Removes dead air / button-hunting from the recording and makes the
  auditor's ask (demo story step 4) explicit on screen.
- **Verification:** `npm run build` exit 0; driven live from the Overview CTA through to the
  assembled package — reconciliation auto-ran, PBC auto-validated (AUTO ACCEPT 97%), console
  clean. Note: the PBC auto-run guard had to move inside the timeout so React StrictMode's
  mount/cleanup/mount cycle couldn't suppress it (caught and fixed during live verification).
- **Follow-Up Needed:** P1-5 (use/remove dead `types/index.ts` pipeline types); P2 backlog.

## 2026-06-09 – PBC domain unification + terminology (P1-6, P0-4)

- **Roadmap Item:** P1-6 (re-skin PBC fixtures into the federal procurement domain) and
  P0-4 (disambiguate "reconciliation") — completed jointly.
- **Files Changed:**
  - `src/modules/pbc/data/pbcTypes.ts` — `DocumentType` union replaced with procurement
    types (Reconciliation Evidence / Obligation Reconciliation / Disbursement Reconciliation
    / Three-Way Match Package).
  - `src/modules/pbc/data/documents.ts` — rewrote the five legacy bank-rec fixtures
    (Northwind) as federal procurement evidence requests tied to the recon vendors and
    `@agency.example` POCs; each preserves its distinct validation outcome.
  - `src/modules/pbc/data/validate.ts` — de-banked visible strings (check renamed
    "Three-way match balances"; "bank statement" → "matched source"; field labels).
  - `src/modules/pbc/PbcRequestAgentPage.tsx` — subtitle nests the reconciliation→evidence
    relationship; financial labels → "GL · matched source" / "GL posting" / "Matched source (PO / GR)".
- **Summary:** The PBC queue now reads entirely as one federal procurement organization —
  no bank-rec language, no second company. Both modules now mean the same thing by
  "reconciliation" (PO/GR/GL matching), resolving the terminology ambiguity.
- **Demo Impact:** Closes the last "two products" tell — any record a judge clicks reads as
  the same organization as the Reconciliation module.
- **Verification:** `npm run build` exit 0; driven live in browser — PBC queue shows only
  procurement packages, the PBC-1044 amount-mismatch record returns to POC with "GL posting
  vs matched source" framing, console clean (0 errors / 0 warnings).
- **Follow-Up Needed:** All P0 complete. Next: P1-5 (use/remove dead pipeline types), P1-7
  (auditor-request framing line), P1-8 (guided demo path).

## 2026-06-09 – Reconciliation → PBC spine, provenance lineage, anchored Overview

- **Roadmap Item:** P0-1 (spine), P0-2 (provenance lineage), P0-3 (anchored token +
  illustrative labels), P0-4 (terminology, partial).
- **Files Changed:**
  - `src/lib/bridge.ts` *(new)* — `DEMO_ANCHOR` (TX-1000043) single source of truth + `FROM_PARAM`.
  - `src/modules/overview/components/PipelineDiagram.tsx` — token now the demo anchor;
    "packages produced today" labeled illustrative.
  - `src/modules/reconciliation/components/AuditReadyOutput.tsx` — names the specific
    reconciled record and hands it off via `/pbc?from=TX-1000043`.
  - `src/modules/pbc/data/pbcTypes.ts` — added `linkedReconciliation` to `PbcDocument` and a
    `Reconciliation Agent` audit source.
  - `src/modules/pbc/data/documents.ts` — added linked lead request `PBC-2043` for the
    reconciled TX-1000043 (clean, AUTO_ACCEPTs).
  - `src/modules/pbc/data/auditTrail.ts` — provenance trail leads with a Reconciliation
    Agent lineage event when the request is linked.
  - `src/modules/pbc/components/AuditTrail.tsx` — tone styling for the new source.
  - `src/modules/pbc/PbcRequestAgentPage.tsx` — reads `?from`, auto-selects the linked
    request, shows a "From Reconciliation" banner, renders a "Sourced from Agentic
    Reconciliation" provenance block in the accepted package, and labels the benchmark illustrative.
- **Summary:** The product now follows one real record from Reconciliation into PBC. The
  reconciled `TX-1000043` is handed to the PBC agent, which opens the matching auditor
  request (same ID, "From Reconciliation" badge), cites the upstream three-way match in its
  provenance trail, and assembles a clean auditor-ready package that traces back to the
  source systems. The Overview hero animates the same record. Unsupported usage figures are
  labeled illustrative (closes a submission gate risk).
- **Demo Impact:** Highest possible — turns "two products in a repo" into one verifiable
  pipeline, the central requirement for the Tradewinds submission.
- **Follow-Up Needed:** P0-4 secondary terminology pass; P1-5 (use/remove dead pipeline
  types); P1-6 (unify remaining PBC fixtures into the federal domain); P1-7 (auditor-request
  framing); P1-8 (guided path). Verify `npm run build` on the Windows host.
