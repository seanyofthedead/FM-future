# FM if the Future
## Tradewinds Demo Narrative

> The recorded-demo script. Aligned to the implemented app after the P0 spine work
> (2026-06-09). The demo follows ONE record — **TX-1000043** (`src/lib/bridge.ts`) — the
> whole way through, so the pipeline is shown, not asserted. Keep the cut at/under 4:45.

## Core Demo Thesis
**AI reconciles financial assets and turns the reconciliation output into audit-ready
evidence that satisfies an auditor's PBC request — inside one product.** The proof is that
the same record, `TX-1000043` (VENDOR-035, $14,026.62), is reconciled by the agent and then
appears as the evidence the auditor receives.

The flow the viewer must see:
**Financial Asset → AI Reconciliation → Reconciled Evidence → PBC Request → Auditor Response.**

## Recommended 10-Minute Flow
(Target a tight 4:30; the extra minutes are buffer for narration, not more clicks.)

| Time | Screen | Beat |
|------|--------|------|
| 0:00 | Overview | Problem + the live "one product, one pipeline" animation on TX-1000043 |
| 1:15 | Reconciliation | Run the agents → "review exceptions, not the whole ledger" |
| 2:45 | Case detail | The agent's run log, three-way match, confidence, accept |
| 4:30 | Audit-ready output | "Send to PBC" — the reconciled record becomes the evidence |
| 5:45 | PBC (linked request) | Same ID, provenance cites the reconciliation, clean package |
| 7:30 | PBC (failing record) | The closed loop: caught before the auditor, returned to POC |
| 8:30 | Overview | Close on the one-pipeline takeaway |

## Screen-by-Screen Walkthrough
1. **Overview** — Hero pipeline animates the demo record reconcile → package → deliver. The
   "packages produced today" counter is labeled *illustrative*. State the problem: DoD has
   had 7 straight audit disclaimers; audit support runs >$1B/yr.
2. **Reconciliation** — Click **Run reconciliation**. Land on the payoff line: the team
   reviews N exceptions, not thousands of rows. Name the two sources (GL, Vendor portal).
3. **Case detail** — Open one of the **flagged exceptions** to show *how the agent reasons*:
   walk the **Run log** (Screen → Plan → Retrieve → Verify → Report), the **three-way match**
   evidence, the confidence band and the agent's rationale. Click **Accept** to show human
   oversight. (This beat demonstrates reasoning depth on an exception; the *clean reconciled*
   record carried end-to-end into PBC is the anchor **TX-1000043** — that single ID is what
   the Overview token, the handoff, and the auditor's PBC request all show.)
4. **Audit-ready output** — The clean reconciled set is "ready the moment an auditor asks."
   Click **Send to PBC Request Agent** — note it names the specific record, **TX-1000043**.
5. **PBC linked request** — The request is pre-selected with a **From Reconciliation**
   banner and the same **TX-1000043** ID. Click **Submit & validate**. The provenance trail
   *leads* with a Reconciliation Agent event ("sourced from reconciled record TX-1000043,
   three-way match, 95% confidence"). The auditor-ready package shows the three source
   systems. "Validated in seconds (illustrative)."
6. **PBC failing record** — Select a High-risk record with a missing signature / wrong
   period. Validation returns it to the POC with the agent's drafted correction — caught
   before the auditor saw it.
7. **Close** — Back to Overview; restate the one-pipeline message.

## Click Path
Overview → `/reconciliation` → Run reconciliation → open an exception (`/reconciliation/:id`)
→ Accept → **Send to PBC Request Agent** (`/pbc?from=TX-1000043`) → Submit & validate →
select a failing request → Submit & validate → Overview.

## Talking Points
- "The agent doesn't just flag — it explains, with the three-way match behind every call."
- "Your team reviews the exceptions, not the entire ledger."
- "This is the same record. What the agent reconciled is exactly what the auditor receives."
- "Every line in the package traces back to a source system — provenance, not a screenshot."
- "When something's wrong, it's caught before the auditor ever sees it."

## Key Messages
1. One product, one pipeline.
2. AI does the reconciling and explains itself.
3. Reconciliation output *is* the audit evidence.
4. Human stays in control (accept / escalate / resubmit).
5. Manual audit-support burden drops dramatically (illustrative ~80–90% less review).

## Transition Language
- Recon → PBC: *"The agent has produced clean, defensible source data. Watch what happens
  when the auditor asks for it."*
- PBC happy → failing: *"That was the clean path. Here's the control that protects the
  auditor relationship when a submission isn't ready."*
- Failing → close: *"Same product, same pipeline — reconcile, package, deliver."*

## Likely Reviewer Questions
1. Is this one product or two stitched together?
2. Are these real numbers / real customers?
3. What is the AI actually doing vs. scripted UI?
4. How does evidence stay defensible / traceable?
5. What's the readiness level (TRL) and business model?

## Suggested Responses
1. **One.** The same record, TX-1000043, is reconciled and then delivered as the auditor's
   evidence — shown live, not described.
2. **Pre-deployment.** All figures are labeled illustrative internal benchmarks; no customer
   claims. Problem-scale facts are cited (DoD FY2024 audit).
3. The agent runs a screen → plan → retrieve → verify → report loop, produces a three-way
   match with confidence scoring, and a human accepts or escalates.
4. Every package line carries provenance back to its source system and the reconciliation
   that produced it; every validation step is logged with its source.
5. See Shot 17 / submission form (TRL + PPB business-model line — team-owned inputs).

## Closing Statement
*"FM if the Future reconciles financial assets with AI and turns that work directly into
audit-ready evidence — so when the auditor asks, the answer is already done, traceable, and
defensible. One product. One pipeline. Audit-ready, every day."*
