# FM of the Future — Storyboard ↔ Product Alignment

> Compares the current product draft against `docs/fm-future-storyboard.xlsx`
> (column C = Script, column E = Visual Elements). Purpose: make it unambiguous
> which product screens get recorded for which shots, where the product already
> nails the script, where it falls short, and what to build to close the gap.
>
> Legend: ✅ strong match · 🟡 partial · ❌ gap · 🎬 produced video (not product).

## Shot-by-shot mapping

| Shot | Script beat (C) | Visual ask (E) | Product screen | Status |
|---|---|---|---|---|
| 1 | "We're Guidehouse…" | Cold open - title card / b-roll (no on-camera) | — | 🎬 |
| 2 | "Audit readiness is broken" | Desaturated b-roll, inbox spike | — | 🎬 |
| 3 | "The cost shows up everywhere" | 3 cost icons → grid of agencies → brand palette | — | 🎬 |
| 4 | "One product, two capabilities" | One wordmark; Recon + PBC **inside** it | Overview hero + header/nav | ✅ (boundary visual could be explicit) |
| 5 | "One platform, one audit-ready pipeline" | Architecture: single **product boundary**, data flows L→R to Audit-Ready Output → auditor | Overview `PipelineDiagram` | ✅ product-boundary frame + auditor node added |
| 6 | "First, Agentic Reconciliation" | Title card: "Reconciliation, on autopilot" | Reconciliation page header (exact match) | ✅ |
| 7 | "Point Agentic Recon at two+ datasets…" | DEMO: two datasets load, job kicks off, animated progress | Reconciliation "Source datasets" (PO / GR / GL) + progress | ✅ sources renamed to the procurement domain |
| 8 | "Every mismatch comes with rationale" | Mismatches in amber; expandable "why" card | Review queue + `ExceptionCard` (amber, why, first row open) | ✅ |
| 9 | "Clean, reconciled record set" | Final report card w/ **download/share** + **"exported" toast**; feeds next step | `AuditReadyOutput` | ✅ Export/Share + "exported" toast added |
| 10 | "Next, the PBC Request Agent" | Title card: "Agentic record requests, packaged for the auditor" | PBC page header (exact match) | ✅ (intentionally **no** separate PBC logomark — see notes) |
| 11 | "An operator submits a request" | DEMO: PBC home → operator **types request** → submits | PBC "Submit a request" compose card → routes & validates | ✅ typed-request intake added |
| 12 | "Reasons across systems, retrieves, assembles" | Reasoning panel animates; **retrieved sources as cards**; package renders; chip "Every record traceable" | PBC provenance trail (staggered) + **Retrieved sources cards** + checks + package | ✅ source cards (PO/GR/GL) + "Every record traceable" chip added |
| 13 | "3 days → minutes… accelerating the mission" | Before/after clock w/ **CONFIRMED, CITED** numbers (source on screen); SFA chip | PBC package before/after + SFA chip | ✅ confirmed/cited (D1) + SFA chip added |
| 14 | "One product, one pipeline" | One record token travels reconcile→package→**Audit-Ready outbox**→auditor; **product boundary stays on screen** | Lineage page (3 stages, TX threaded) | ✅ product-boundary frame + auditor (outside the frame) added |
| 15 | "In production today… OSW Comptroller, Army, ATC" | The **product** adopted across missions; names as text, no seals | — (nothing in product) | ❌ no customers/missions surface in-product |
| 16 | "Accredited building blocks… Databricks, HITL" | Tech-stack ribbon; brittle stack dissolves into agentic product | Overview "Built on accredited building blocks" strip + HITL note | ✅ in-product strip added (HITL also live in the reject loop) |
| 17 | "Subscription, TRL X, SBIR Phase III" | Timeline/badge motif | — | 🎬 produced graphic — TRL/SBIR are pitch claims, deliberately NOT fabricated in-product |
| 18 | "Sold as a subscription… contact for quote" | Clean pricing card | Overview "Offered as a subscription · contact for a quote" strip | ✅ in-product strip added (no rates, per v10) |
| 19 | "Find us on the Tradewinds Silver Aisle" | CTA card, contact/QR | — | 🎬 |
| 20 | "Guidehouse — audit-ready every day" | Final logo lockup, brand bg | Header brand (Acon + GH, official) | ✅ assets ready |

## Gaps that do not align (prioritized by demo-fidelity impact)

### P0 — directly breaks a scripted DEMO beat → ALL RESOLVED (2026-06-10, verified live)
1. **Shot 11 — typed-request intake — DONE.** Added a "Submit a request" compose card to the
   PBC page: the operator types a natural-language request (prefilled from the linked record so
   no live typing is forced on camera); the agent interprets it, routes to the matching
   reconciled record (TX id / PBC id parsing), and runs the Early Validation Gate. The guided
   flow auto-submits the typed request. Removed the duplicate "Submit & validate" button from
   the Selected-request card (now a secondary "Re-run validation").
2. **Shots 5 & 14 — product boundary — DONE.** Wrapped the Overview pipeline and the Lineage
   chain in a labeled "Financial Management of the Future" dashed boundary frame, with the
   **Auditor** rendered as a recipient node **outside** the frame (right side on Overview,
   below on Lineage) — the package is delivered out of the product boundary.
3. **Shot 9 — export/share + toast — DONE.** Added **Export** and **Share** buttons plus a
   transient "✓ Reconciliation exported — audit-ready file saved." toast to `AuditReadyOutput`.
   In guided capture the toast auto-fires when the output scrolls into view.

### P1 — strengthens a scripted beat → ALL RESOLVED (2026-06-10, verified live)
4. **Shot 12 — retrieved-source cards — DONE.** A "Retrieved sources" card now surfaces the
   three pulled artifacts as cards (Purchase Order · PO-23577, Goods Receipt · DOC-795613,
   General Ledger · GL-00043), staggered during the run, with an **"Every record traceable"**
   chip — matching the script's exact wording.
5. **Shot 7 — source datasets aligned — DONE.** The recon page sources are now **Purchase
   Orders / Goods Receipts / General Ledger** (PO / GR / GL), so the demo reads as one
   consistent procurement domain end-to-end.
6. **Shot 13 — SFA chip — DONE.** Added a **"Strategic Focus Area · Streamlining Business
   Processes"** chip to the package (the benchmark itself was confirmed/cited under D1).

### P2 — RESOLVED where product-appropriate (2026-06-10)
7. **Shot 15 — DONE** (missions strip; see D2).
8. **Shot 16 — DONE.** Overview now has a **"Built on accredited building blocks"** strip
   (Databricks · Cloud-native services · Agentic orchestration · Human-in-the-loop guardrails)
   with the brittle-rules-engine/manual-team contrast line. HITL is also live in the reject loop.
9. **Shot 18 — DONE.** Overview has an **"Offered as a subscription · contact for a quote"**
   strip (no rates shown, per v10).

### Deliberately NOT built into the product (produced video / motion graphics)
- **Shots 1–3** — produced cold open + desaturated b-roll (problem framing). No product capture.
- **Shot 17** — TRL level + SBIR Phase III eligibility are pitch claims with placeholder
   values ("[TRL X]"); these belong in a produced badge graphic and were **not fabricated**
   in the product.
- **Shot 19** — CTA / Silver Aisle / QR is a closing card.
- **Shot 20** — final full-screen logo lockup is a produced end card (brand assets are ready).

## Strengths to lean on (already aligned — record these as-is)
- **Shot 6 & 10 title cards** are *literally* the page headers ("Reconciliation, on autopilot";
  "Agentic record requests, packaged for the auditor") — the product can BE the title cards.
- **Shot 8** exceptions/amber/expandable "why" is an exact match.
- **Shot 4** single header + capability nav already reads as one product.
- **Shot 14** the same record ID (TX-1000043) genuinely threads Recon → PBC → Lineage — the
  "one record, one pipeline" claim is real, not staged.
- **Shot 20** brand is now the official Guidehouse Acon + palette + Inter.
- **HITL (Shot 16):** the closed-loop reject ("Returned to POC — awaiting resubmission") is a
  concrete, recordable human-in-the-loop guardrail moment.

## Decisions — RESOLVED (2026-06-10)
- **D1 — Shot 13 benchmark → CONFIRMED.** The time-savings metric (~3 days → minutes) is
  confirmed with the client. The product no longer labels it "illustrative"; it now cites the
  source on screen ("Confirmed in production · OSW Comptroller · Dept. of the Army · Army
  Transportation Command"), satisfying Shot 13's "show the source on screen." Applied to the
  PBC package line and the Overview "Time to evidence" tile. *(Note: the synthetic "packages
  produced today" counter and the computed "reviewer-hours avoided" figure remain labeled
  illustrative — they are not the client-confirmed metric.)*
- **D2 — Shot 15 customers → CONFIRMED + CLEARED.** OSW Comptroller / Department of the Army /
  Army Transportation Command are confirmed production deployments. Added a text-only "In
  production today" missions strip to the Overview (no seals, per v10).
- **D3 — Product name → LOCKED.** The product name is **FM of the Future** (no longer TBD).
  The header keeps the spelled-out "Financial Management of the Future" wordmark with "FM of
  the Future" as the established short name; the storyboard's "(working title — final name TBD)"
  caveat is dropped.

## Demo capture list (what actually gets recorded from the product)
1. **Overview** — hero ("one product · two capabilities") + animated pipeline → Shots 4, 5.
2. **Reconciliation** — sources + run + progress → Shot 7; exceptions/why → Shot 8;
   audit-ready output → Shot 9.
3. **PBC** — request intake/submit → Shot 11; reasoning + provenance + package → Shots 12, 13.
4. **Lineage** — end-to-end single-record chain → Shot 14.
5. **Header/brand** — Acon lockup → Shots 4, 20.

Everything else (1, 2, 3, 16, 17, 18, 19) is produced video / motion graphics, not product capture.
