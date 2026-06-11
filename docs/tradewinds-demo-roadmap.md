# FM if the Future
## Tradewinds Demo Implementation Roadmap

> Living backlog for the Tradewinds video submission. Claude Code maintains this file in
> place across sessions. **Read this file first**, update statuses as you work, never
> delete completed history. Priority order is by *demo impact*, not engineering elegance.
>
> Core thesis the demo must prove on screen:
> **AI reconciles financial assets and transforms reconciliation outputs into audit-ready
> evidence that satisfies auditor PBC requests — one integrated product.**
>
> Last synced: 2026-06-09.

### The one-sentence problem this roadmap exists to fix
The app was **visually one product but structurally two**: Reconciliation (real `TX-####`
procurement data) and PBC (separate `PBC-####` bank-rec data) shared no record, domain, or
ID. The roadmap drives them into one verifiable pipeline anchored on a single record,
`TX-1000043`, that survives the trip from Reconciliation into PBC.

---

## P0 – Demo Critical

### [P0-1] Carry the reconciled record into PBC (the spine)
- **Status:** COMPLETE (2026-06-09)
- **Source Finding:** Audit #1, #2 — no shared identifier; "Send to PBC" carried no data.
- **User Problem:** A judge clicking Reconciliation → PBC saw two unrelated datasets; the
  central claim ("reconciliation output becomes the auditor's evidence") was never shown.
- **Proposed Enhancement:** A single real reconciled record (`TX-1000043`, the demo anchor
  in `src/lib/bridge.ts`) is sent from the Reconciliation audit-ready output into PBC via a
  `?from=TX-1000043` handoff. PBC opens a linked auditor request for that exact record,
  with the same ID visible and a "From Reconciliation" badge.
- **Implementation Details:** `src/lib/bridge.ts` (new anchor SoT); `AuditReadyOutput.tsx`
  names the record and links with the param; `documents.ts` adds a `linkedReconciliation`
  lead request (`PBC-2043`) whose financials cleanly AUTO_ACCEPT; `PbcRequestAgentPage.tsx`
  reads the param, auto-selects the linked request, and shows a back-link banner.
- **Expected Demo Impact:** Converts "two products" into one pipeline — the single most
  important fix for the submission.
- **Estimated Effort:** M (½ day). **Actual:** done.
- **Dependencies:** none.
- **Acceptance Criteria:**
  - [x] Clicking "Send to PBC Request Agent" lands on PBC with the linked request selected.
  - [x] The same `TX-1000043` ID is visible in both modules.
  - [x] The linked request validates to a clean auditor-ready package.

### [P0-2] Provenance lineage — PBC cites the upstream reconciliation
- **Status:** COMPLETE (2026-06-09)
- **Source Finding:** Audit #8, #14 — provenance stopped at the module boundary.
- **User Problem:** PBC's trail/package never showed the evidence *came from* the agent's
  reconciliation, so the lineage story broke at the handoff.
- **Proposed Enhancement:** When a request is linked to a reconciled record, the provenance
  trail leads with a "Reconciliation Agent" event citing the three-way match + confidence,
  and the auditor-ready package shows a "Sourced from Agentic Reconciliation" block tracing
  PO / Goods Receipt / GL.
- **Implementation Details:** `pbcTypes.ts` adds `linkedReconciliation` + a
  `Reconciliation Agent` audit source; `auditTrail.ts` prepends the lineage event;
  `PbcRequestAgentPage.tsx` renders the provenance block in the accepted package.
- **Expected Demo Impact:** Makes "reconciliation output = audit evidence" literally visible.
- **Estimated Effort:** S. **Actual:** done.
- **Dependencies:** P0-1.
- **Acceptance Criteria:**
  - [x] Provenance trail names the source reconciliation and confidence.
  - [x] Accepted package shows the three source systems with the trace/evidence id.

### [P0-3] Anchor the Overview token + label illustrative figures (gate-critical)
- **Status:** COMPLETE (2026-06-09)
- **Source Finding:** Audit #6, #7 + `TRADEWINDS_COMPLIANCE.md` #20 (VII.e.iii gate risk).
- **User Problem:** The hero pipeline animated an orphan ID (`TX-1000092`) and showed
  unsupported usage figures ("1,287 packages produced today", "Before: 3 days") for a
  pre-client product — a submission gate risk.
- **Proposed Enhancement:** Token = the real demo anchor `TX-1000043`; counter and
  before/after benchmark carry an on-screen "illustrative" label.
- **Implementation Details:** `PipelineDiagram.tsx` (token from `bridge.ts` + "illustrative"
  caption); `PbcRequestAgentPage.tsx` ("Illustrative internal benchmark" on the package).
- **Expected Demo Impact:** Hero resolves into the walkthrough; closes a gate risk.
- **Estimated Effort:** S. **Actual:** done.
- **Dependencies:** P0-1 (shared anchor).
- **Acceptance Criteria:**
  - [x] Overview token equals the record demoed end-to-end.
  - [x] No on-screen figure implies real customer usage without an "illustrative" label.

### [P0-4] Disambiguate "reconciliation" across the two modules
- **Status:** COMPLETE (2026-06-09)
- **Source Finding:** Audit #4 — "reconciliation" means three-way match in one module and
  bank-rec in the other; same word, different concept, no bridge.
- **User Problem:** Reviewers hear "reconciliation" twice meaning two different things.
- **Proposed Enhancement:** Make both modules mean the SAME thing by "reconciliation"
  (procurement PO/Goods-Receipt/GL matching). Resolved jointly with P1-6: once the PBC
  fixtures became procurement evidence, the conflicting bank-rec sense disappeared. PBC
  subtitle reframed to nest the relationship ("an auditor requests supporting evidence; the
  agent retrieves the reconciliation package…"); financial labels changed to
  "GL · matched source" / "GL posting" / "Matched source (PO / GR)"; the validation check is
  now "Three-way match balances".
- **Implementation Details:** `PbcRequestAgentPage.tsx` (subtitle + financial labels);
  `validate.ts` (de-banked check name + detail strings); resolved alongside `documents.ts`.
- **Expected Demo Impact:** Removes the most common reviewer confusion.
- **Estimated Effort:** S. **Actual:** done.
- **Dependencies:** none (completed with P1-6).
- **Acceptance Criteria:**
  - [x] The linked request states it is evidence *for* the reconciled transaction.
  - [x] No screen uses "reconciliation" for two concepts without qualification.

---

## P1 – High Impact

### [P1-5] Activate or remove the dead pipeline types
- **Status:** COMPLETE (2026-06-09)
- **Source Finding:** Audit #5 — `types/index.ts` was defined but imported nowhere.
- **User Problem:** The architecture claimed a pipeline the wiring didn't use.
- **Proposed Enhancement:** Repurposed `types/index.ts` as the live shared contract: removed
  the dead aspirational types and kept `ConfidenceBand`, a real `PackageLine`, and
  `LinkedReconciliation` — now imported by the PBC module (`pbcTypes.ts`). The `PackageLine`
  type also powers P2-10's line-level provenance, so the file is genuinely used.
- **Implementation Details:** `types/index.ts` rewritten; `pbcTypes.ts` imports
  `LinkedReconciliation` from `@/types` instead of defining its own.
- **Expected Demo Impact:** Indirect (code clarity); enables P2-10.
- **Estimated Effort:** M. **Actual:** done.
- **Dependencies:** P0-1.
- **Acceptance Criteria:** [x] No unused exported domain types; the shared types back the handoff.

### [P1-6] Unify the PBC fixtures into the federal/procurement domain
- **Status:** COMPLETE (2026-06-09)
- **Source Finding:** Audit #3 — PBC fixtures are commercial bank recs ("Northwind",
  Marcus Lin) while Reconciliation is federal procurement; looks like two companies.
- **User Problem:** Domain whiplash between modules undercuts "one product".
- **Proposed Enhancement:** Re-author the non-linked PBC fixtures as federal procurement
  evidence (obligation / disbursement / three-way-match packages) tied to the same vendors
  (VENDOR-###) and `@agency.example` POCs as the reconciliation dataset.
- **Implementation Details:** Rewrote the five fixtures in `documents.ts` and the
  `DocumentType` union in `pbcTypes.ts`; kept the validation engine intact — each fixture
  preserves its distinct outcome (clean accept + missing-signature / amount-mismatch /
  wrong-period / incomplete-checklist). Engine's visible strings de-banked in `validate.ts`.
- **Expected Demo Impact:** Removes the cross-module domain whiplash for any record clicked.
- **Estimated Effort:** M. **Actual:** done.
- **Dependencies:** none.
- **Acceptance Criteria:** [x] Every PBC request reads as the same organization as Recon
  (verified live: queue shows only procurement packages; amount-mismatch closed-loop fires
  with "GL posting vs matched source" framing).

### [P1-7] Explicit auditor-request framing on PBC
- **Status:** COMPLETE (2026-06-09)
- **Source Finding:** Audit #9 — no screen shows a request *arriving from* an auditor.
- **Proposed Enhancement:** A one-line "Auditor request · {auditor} requested this supporting
  evidence (due {date})" banner on every selected request, dramatizing demo story step 4.
- **Implementation Details:** `PbcRequestAgentPage.tsx` Selected-request card.
- **Estimated Effort:** S. **Actual:** done. **Dependencies:** P0-1.
- **Acceptance Criteria:** [x] Selected request names the auditor and what was requested
  (verified live: "Auditor request · Priya Raman requested this supporting evidence…").

### [P1-8] Guided / auto-advance demo path
- **Status:** COMPLETE (2026-06-09)
- **Source Finding:** Audit #15 — demo depends on manual clicks; risk of dead air on tape.
- **Proposed Enhancement:** A single "▶ Start guided demo" CTA on Overview that threads the
  whole pipeline via an `?autorun=1` flag: Reconciliation auto-runs and scrolls to its
  output, the handoff carries the flag forward, and PBC auto-validates the linked request —
  leaving only the one meaningful "Send to PBC" transition as a deliberate click.
- **Implementation Details:** `OverviewPage.tsx` (CTA → `/reconciliation?autorun=1`);
  `ReconciliationPage.tsx` (auto-run + auto-scroll effects, forwards flag);
  `AuditReadyOutput.tsx` (`guided` prop appends `&autorun=1`); `PbcRequestAgentPage.tsx`
  (timeout-guarded auto-validate, StrictMode-safe).
- **Estimated Effort:** M. **Actual:** done. **Dependencies:** P0-1.
- **Acceptance Criteria:** [x] One path drives reconcile → package without manual hunting
  (verified live end-to-end).

---

## P2 – Future Enhancements

### [P2-9] Official Guidehouse brand hex + wordmark
- **Status:** COMPLETE (2026-06-10) — Source: Audit #10. Official brand kit provided in
  `docs/branding` (Color Palette, ADA Compliance, Logo Guidelines PDFs + Inter font files).
- **Done:** Applied the official Guidehouse palette, typeface, and logo:
  - **Color tokens** (`src/index.css` `@theme`) swapped to brand hex — `brand-navy` → Black
    `#1B1B1B` (the brand's own dark/header surface), `brand-green` → Forest `#31863E`, added
    `brand-lime` → Guidehouse Green `#93D500`. Green choice is **508-driven**: Forest is the
    only core green that clears 4.5:1 on white (4.6:1 per the ADA sheet); the bright Guidehouse
    Green is reserved for dark surfaces (11.8:1 on black), where the logo lives.
  - **Typeface** → Inter (the brand's digital font); 5 weights copied to `public/fonts/` and
    wired via `@font-face`; `--font-sans` set to Inter. Verified `document.fonts.check` = true.
  - **Logo** → the Guidehouse **Acon** (twin pillars converging to an apex) rebuilt as SVG in
    `Brand.tsx`, using the brand's dark-background treatment (one pillar white, one Guidehouse
    Green) since it sits on the black header.
- **Acceptance Criteria:** [x] Polished wordmark lockup · [x] Official hex + typeface + logo applied.
- **Verification:** `npm run build` exit 0; verified live — header `rgb(27,27,27)`, Inter loaded,
  Acon pillars `#fff` + `#93D500`, Forest badges/buttons on white, console clean (0 errors).

### [P2-10] Line-level package with per-line source provenance
- **Status:** COMPLETE (2026-06-09) — Source: Audit #14.
- **Done:** The auditor-ready package now shows a "provenance on every line" table — each
  supporting line (Purchase order / Goods receipt / GL posting) with amount, source system,
  and trace id. Backed by `PackageLine[]` on the linked record. Verified live.
- **Implementation Details:** `types/index.ts` (`PackageLine`); `documents.ts` (lines on
  PBC-2043); `PbcRequestAgentPage.tsx` (line table).
- **Acceptance Criteria:** [x] Each package line traces to a source system + trace id.

### [P2-11] Single lineage view (TX → evidence → package)
- **Status:** COMPLETE (2026-06-09) — Source: Audit screen review.
- **Done:** New `/lineage` route + nav tab showing the full chain for `TX-1000043` on one
  screen — AI Reconciliation → PBC Request (gate result) → Auditor-ready package — with the
  same ID threaded through and deep links into each module. Verified live.
- **Implementation Details:** `modules/lineage/LineagePage.tsx`; `brand.ts` (nav); `App.tsx` (route).
- **Acceptance Criteria:** [x] One screen shows asset → reconciliation → evidence → package.

### [P2-12] Executive insights / audit-readiness layer
- **Status:** COMPLETE (2026-06-09) — Source: `executive-insights.md`.
- **Done:** "Audit readiness at a glance" band on the Overview computes a CFO-level headline
  from the live reconciliation data — % audit-ready, exceptions + value under review,
  illustrative reviewer-hours avoided, time-to-evidence, and the top root-cause clusters.
  Efficiency figures labeled illustrative. Verified live.
- **Implementation Details:** `modules/overview/components/ExecutiveInsights.tsx`; `OverviewPage.tsx`.
- **Acceptance Criteria:** [x] Executive-ready summary replaces raw tables as the headline.

---

## Completed Enhancements
- **P0-1** Reconciliation → PBC spine (shared record handoff) — 2026-06-09. *Verified live.*
- **P0-2** Provenance lineage (PBC cites upstream reconciliation) — 2026-06-09. *Verified live.*
- **P0-3** Overview token anchored + illustrative labels (gate risk closed) — 2026-06-09. *Verified live.*
- **P0-4** "Reconciliation" terminology unified across both modules — 2026-06-09.
- **P1-6** PBC fixtures re-skinned into the federal procurement domain — 2026-06-09. *Verified live.*
- **P1-7** Auditor-request framing on every PBC request — 2026-06-09. *Verified live.*
- **P1-8** Guided "Start guided demo" auto-advance path — 2026-06-09. *Verified live.*
- **P1-5** Dead pipeline types repurposed as the live shared contract — 2026-06-09.
- **P2-10** Line-level provenance in the auditor package — 2026-06-09. *Verified live.*
- **P2-11** Single end-to-end lineage view (`/lineage`) — 2026-06-09. *Verified live.*
- **P2-12** Executive audit-readiness headline on Overview — 2026-06-09. *Verified live.*
- **P2-9** Official Guidehouse brand applied (Black/Forest/Guidehouse Green palette, Inter,
  Acon logo) — 2026-06-10. *Verified live.*

> **Every roadmap item is COMPLETE.** The official Guidehouse brand kit (`docs/branding`) is
> now wired into the product — palette, Inter typeface, and the Acon logo — with green usage
> chosen against the brand's own 508 contrast sheet. No open items remain.

## Obsolete / Superseded Items
- _(none yet)_
