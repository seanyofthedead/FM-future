# FM of the Future — Tradewinds Video: First Draft (Shot List + Timing Sheet + Capture Plan)

**Purpose.** Everything a colleague needs to record the visuals and cut them against
Sean's recorded narration. The narration **is** the storyboard script (`docs/fm-future-storyboard.xlsx`,
column C, "Joe (VO)"). This draft locks the picture to that script, shot for shot.

**Total runtime: 4:41 (281 s)** — matches the storyboard's summed `Est. sec` exactly.
Every product screen recording below is cut to its storyboard duration so each visual lands
on its own line of narration.

**Deliverable type:** visual-only, **no audio** (Sean's VO is separate). 16:9, 1080p.

> ⚠️ One thing to know going in: the app's demo animations run **faster** than the narration
> windows (a reconciliation run finishes in ~2 s; the storyboard gives it 13 s). So recording
> is not "hit play and walk away" — you **hold/linger** on each finished state to fill its
> narration window. The per-shot notes say exactly where to hold. See §C.

---

## A. Demo-readiness summary

The product is **live and recordable today** at `http://localhost:5180` (`npm run dev`).
The same record — **TX-1000043, VENDOR-035, $14,026.62** — threads through every demo screen,
so the "one record, one pipeline" claim is real on camera, not staged.

| Bucket | Shots | Source | Status |
|---|---|---|---|
| **Product screen recording** | 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18 | Live app at :5180 | ✅ recordable now |
| **Produced video / on-camera** | 1, 2, 3 (Joe + b-roll) | Not the app — Joe on camera + montage | ◻ colleagues' footage |
| **Produced motion graphic** | 17 (TRL/SBIR badge), 19 (CTA/QR), 20 (logo lockup) | Motion graphics / end cards | ◻ design |

**Nothing in the product path is missing** — the storyboard's three demo beats (typed request,
product-boundary frame, export/share + toast) and the supporting strips (missions, building
blocks, subscription) were all built and verified live on 2026-06-10 (`docs/storyboard-alignment.md`).

**The one judgment call for Shot 17:** TRL level and SBIR Phase III are *pitch claims* with a
placeholder value (`[TRL X]`). They were deliberately **not** fabricated in the product, so there
is no screen to record for Shot 17 — it must be a produced badge graphic, and someone has to fill
in the real TRL number before render.

---

## B. Shot list / timing sheet

Lay this against the narration track. Timecodes are cumulative from 0:00.
**Source** = where the picture comes from. **Hold** = the frame to rest on for the window.

| # | In–Out | Dur | Element | Source | Screen / route | On-screen action (the picture) | Narration beat (what Sean is saying) |
|---|---|---|---|---|---|---|---|
| 1 | 0:00–0:08 | 8s | Problem | 🎥 On-cam | — | Joe to camera, neutral bg, GH lower-third | "We're Guidehouse… one of the hardest problems in federal financial management." |
| 2 | 0:08–0:28 | 20s | Problem | 🎬 B-roll | — | Desaturated montage: paper stacks, scrolling sheets, inbox counter spiking, "auditor request" badge | "Audit readiness… is broken… records requests bounce between inboxes for weeks." |
| 3 | 0:28–0:46 | 18s | Problem | 🎬 Mograph | — | 3 cost icons → widen to grid of agencies → lift from desaturated into brand palette | "The cost shows up everywhere… That's the problem we built Financial Management of the Future to solve." |
| 4 | 0:46–1:01 | 15s | Bridge | 🟢 App | **Overview** `/` | Land on hero "Audit-ready, every day"; header wordmark + nav (Recon + PBC read as ONE product) | "…a single product Guidehouse already runs in production… two capabilities working on the same records." |
| 5 | 1:01–1:15 | 14s | Bridge | 🟢 App | **Overview** `/` (scroll) | The `PipelineDiagram`: record token TX-1000043 travels Reconcile → Package → Deliver inside the dashed product boundary; Auditor node sits outside it | "…one connected workflow: data is continuously reconciled… already defensible and ready to hand over." |
| 6 | 1:15–1:29 | 14s | Element 2 | 🟢 App | **Reconciliation** `/reconciliation?autorun=1` | Land on page header "Reconciliation, on autopilot" — this IS the title card. Hold before the job auto-runs. | "First, Agentic Reconciliation. Reconciliation is where most audit programs lose time…" |
| 7 | 1:29–1:42 | 13s | Element 2 | 🟢 App | **Reconciliation** (same take) | Source datasets (PO / GR / GL) visible; job kicks off; animated progress bar matching records | "We point Agentic Recon at two or more source datasets… match records, surface mismatches, and explain why." |
| 8 | 1:42–1:55 | 13s | Element 2 | 🟢 App | **Reconciliation** (same take) | "Review queue — exceptions only" renders; exceptions in amber; first `ExceptionCard` "why" expanded | "Every mismatch comes with the agent's rationale, so your team reviews exceptions — not entire ledgers." |
| 9 | 1:55–2:07 | 12s | Element 2 | 🟢 App | **Reconciliation** (same take) | `AuditReadyOutput` card scrolls in; "✓ Reconciliation exported — audit-ready file saved" toast fires; TX-1000043 handoff chip visible | "…a clean, reconciled record set — defensible source data… ready the moment an auditor asks." |
| 10 | 2:07–2:19 | 12s | Element 2 | 🟢 App | **PBC** (click "Send TX-1000043 to PBC →") | Lands on PBC header "Agentic record requests, packaged for the auditor" — title card. "From Reconciliation" banner shows the same TX. | "Next, the PBC Request Agent — what turns that reconciled data into an auditor-ready package…" |
| 11 | 2:19–2:31 | 12s | Element 2 | 🟢 App | **PBC** (same take) | "Submit a request" compose card shows the prefilled natural-language request; auto-submits; "Interpreted & routed to PBC-… · TX-1000043" | "Here's the PBC Request Agent in action. An operator submits a request for a supporting record." |
| 12 | 2:31–2:47 | 16s | Element 2 | 🟢 App | **PBC** (same take) | Provenance trail reveals step-by-step; "Retrieved sources" cards (PO-23577 / DOC-795613 / GL-00043) stagger in; "Every record traceable" chip; package renders | "The agent reasons across source systems, retrieves the reconciled artifacts, and assembles a complete response — provenance on every line." |
| 13 | 2:47–3:03 | 16s | Element 2 +SFA | 🟢 App | **PBC** (same take, scroll) | Auditor-ready package: "Before: ~3 days" struck through → "Delivered in minutes"; cited source line; "Defensible" + SFA chip "Streamlining Business Processes" | "What used to take 3 days… is delivered in minutes — defensible, repeatable… accelerating the mission." |
| 14 | 3:03–3:13 | 10s | Bridge | 🟢 App | **Lineage** `/lineage` | One-record chain inside the product boundary: AI Reconciliation → PBC Request → Auditor-ready package; TX-1000043 threaded; Auditor node outside the frame | "…one product, one pipeline. The same record moves from reconciliation through packaging… without ever leaving the product." |
| 15 | 3:13–3:29 | 16s | Element 3 | 🟢 App | **Overview** `/` (scroll to "In production today") | "In production today" missions strip: OSW Comptroller · Dept. of the Army · Army Transportation Command (text only, no seals) | "…in production today across federal missions — at the OSW Comptroller, the Department of the Army, and Army Transportation Command…" |
| 16 | 3:29–3:47 | 18s | Element 3 | 🟢 App | **Overview** `/` (scroll to "Built on accredited building blocks") | Building-blocks strip: Databricks · Cloud-native · Agentic orchestration · HITL guardrails + the "not a brittle rules engine / not another manual team" line | "…orchestrating accredited, already-in-use building blocks — Databricks… and human-in-the-loop guardrails on every output." |
| 17 | 3:47–4:05 | 18s | Element 4 | 🎬 Mograph | — (NOT in product) | Badge motif: acquired SBIR topic → Phase III badge → "sole-source eligible"; stopwatch · shield · scale icons. **Fill in real TRL value.** | "…a subscription-based product at Technology Readiness Level [TRL X]… eligible for SBIR Phase III direct award…" |
| 18 | 4:05–4:20 | 15s | Element 4 | 🟢 App | **Overview** `/` (scroll to subscription strip) | "Offered as a subscription · contact for a quote" strip (no rates shown, per v10) | "…sold as a subscription, scoped to the size of your data and your audit workload… we'll put together a quote that fits." |
| 19 | 4:20–4:34 | 14s | Close | 🎬 Mograph | — | CTA card: contact + CDAO Tradewinds Silver Aisle link/QR (confirm QR) | "Find Financial Management of the Future on the CDAO Tradewinds Silver Aisle…" |
| 20 | 4:34–4:41 | 7s | Close | 🎬 Mograph | — | Final Guidehouse logo lockup on brand bg, fade to black, optional sting | "Guidehouse — mission-ready innovation, audit-ready every day." |

🟢 App = record from :5180 · 🎥 On-cam · 🎬 Produced video/motion graphic

**Product capture subtotal: 196 s across 14 shots. Produced/on-cam: 85 s across 6 shots.**

---

## C. Capture instructions (record these three passes)

Run the app first: from the repo root, `npm run dev`, then open **http://localhost:5180** in a
clean Chrome window. **Record at 1920×1080**, hide bookmarks/extensions, 100% browser zoom, cursor
visible. Capture silent (no system audio needed). Each "pass" below is one continuous take that the
editor slices into the shots noted.

> 🔑 **Navigate by clicking inside the app, not by typing URLs.** This is a single-page app that
> uses hash routing — typing a path like `localhost:5180/reconciliation` will just show the Overview.
> Always start at `localhost:5180`, then use the **top nav** (Overview · Agentic Reconciliation ·
> PBC Request Agent · Lineage) and the in-page buttons. The whole demo spine is driven by the
> **"▶ Start guided demo"** button on the Overview — that's the intended path and it chains the run
> automatically. (If you must type a deep link, the correct form includes the hash, e.g.
> `localhost:5180/#/reconciliation?autorun=1`.)

### Pass 1 — Overview (yields Shots 4, 5, 15, 16, 18)
The script uses Overview twice (early: 4–5; late: 15, 16, 18), so record it **once** as a slow
top-to-bottom pass and let the editor place the segments.
1. Go to `http://localhost:5180/` . Hold on the hero + header for ~4 s → **Shot 4**.
2. Let the `PipelineDiagram` token complete at least one full Reconcile → Package → Deliver loop
   (the loop is ~5.4 s). Capture 2 full loops so the editor can pick a clean 14 s → **Shot 5**.
3. Slowly scroll down, pausing ~4 s each on: "In production today" missions strip → **Shot 15**;
   "Built on accredited building blocks" strip → **Shot 16**; "Offered as a subscription" strip → **Shot 18**.
   Keep scrolls slow and steady — editors can speed-ramp but can't smooth a jerky scroll.

### Pass 2 — The guided spine (yields Shots 6, 7, 8, 9, 10, 11, 12, 13) — **one continuous take**
This is the money shot. The Overview's **"▶ Start guided demo"** button chains Reconciliation → PBC
with no dead air. Record the whole thing in one take:
1. From the Overview, **click "▶ Start guided demo"**. It lands on the Reconciliation header
   ("Reconciliation, on autopilot"). **Hold ~3 s before the job runs** so editors have a clean
   Shot 6 title card. *(Verified: this navigates to `#/reconciliation?autorun=1` and auto-runs.)*
2. The reconciliation auto-runs (progress bar ~2 s). **Shots 7–9 happen fast — do not click away.**
   After it completes, the page shows the exceptions queue and scrolls the audit-ready output into
   view (the "exported" toast auto-fires). **Slowly scroll** so each state is on screen for its window:
   sources+progress (Shot 7), exceptions/why card (Shot 8), audit-ready output + toast (Shot 9).
   Linger ~12–13 s on each — re-scroll up/down gently if you need more footage; editors trim.
3. In the audit-ready output, **click "Send TX-1000043 to PBC Request Agent →"**. This navigates to
   `#/pbc?from=TX-1000043&autorun=1` and the PBC flow auto-runs. *(Verified: the button only carries
   `&autorun=1` when you reached Reconciliation via the guided-demo button — so always start the spine
   from "▶ Start guided demo", not the plain nav link, or the PBC side won't auto-submit.)*
4. Land on the PBC header (**Shot 10** title card, "From Reconciliation" banner visible — hold ~3 s).
   The request auto-submits (**Shot 11**), the provenance trail + retrieved-source cards reveal
   (**Shot 12**, ~staggered), and the auditor-ready package renders. **Scroll slowly** down to the
   before/after "3 days → minutes" + SFA chip (**Shot 13**). Hold on the package ~5 s at the end.
5. Stop recording. **Do not click "Download package"** (it fires a demo `alert()` — leave it untouched).

> If the auto-run finishes before you've panned, just **scroll back up and dwell** on each card —
> the states persist, so you can gather as much footage as each 12–16 s window needs.

### Pass 3 — Lineage (yields Shot 14)
1. **Click "Lineage" in the top nav.** The full single-record chain is on one screen.
2. Hold on the whole boundary frame ~4 s, then slow-pan/zoom across stage 1 → 2 → 3 → Auditor node.
   10 s window; capture ~20 s so the editor can choose the pan.

### Reset between takes
The flows use one-shot guards. If a guided run doesn't auto-start, go back to the Overview and click
**"▶ Start guided demo"** again (a fresh click re-arms the autorun). Avoid typing the autorun URL by
hand — because of hash routing it's easy to get wrong; the button is foolproof.

---

## D. Hand-off spec (for the editor)

**Picture**
- Aspect 16:9, **1920×1080**, ≥30 fps. No audio track (narration is delivered separately).
- No baked-in captions/subtitles. On-screen **text** in the storyboard (column D) is *product UI text*
  already in the recordings or part of the produced graphics — don't re-key it as overlays unless a
  shot is a produced card (3, 17, 19, 20).
- Cut each product shot to the **Dur** in §B; align its In/Out to the narration track timecodes.

**Assembly order:** follow §B top to bottom (Shots 1→20). Interleave the three product passes per the
timing sheet — note Overview footage (Pass 1) is split across Shots 4–5 *and* 15/16/18.

**Asset checklist to hand off / collect**
- ✅ **Draft motion clips of the three passes** — `docs/video-clips/` (`pass1-overview`,
  `pass2-guided-spine`, `pass3-lineage`, as `.mp4` + `.webm`) — silent live screen captures showing the
  motion/pacing. These are **draft reference, ~1262×568, captured headless** — re-record final footage
  at 1080p per §C.
- ✅ **`pass1-overview-1080p-labeled.mp4`, `pass2-guided-spine-1080p-labeled.mp4`,
  `pass3-lineage-1080p-labeled.mp4`** — all three passes rebuilt at **true 1920×1080** from the crisp
  stills, matching style: crossfades, fade in/out, and burned-in navy lower-third shot labels (each
  names the screen + its target duration). Best artifacts for showing colleagues the intended framing,
  order, and pacing. *(Built from stills, so no in-screen animation — agent-browser's live recorder is
  hard-capped at 1262×568 and this display is 1536×864, so a crisp 1080p screen recording wasn't
  possible. The original `*.mp4`/`.webm` captures have the live animation at the lower res.)*
- ✅ **Reference frames for all 14 product states** — `docs/video-frames/` (see §E) — use these to
  confirm framing *before* you record
- ✅ Pass 1 recording — Overview (Shots 4, 5, 15, 16, 18)
- ✅ Pass 2 recording — guided spine (Shots 6–13)
- ✅ Pass 3 recording — Lineage (Shot 14)
- ◻ Joe on-camera (Shot 1) + b-roll montage (Shot 2) + cost/agencies mograph (Shot 3)
- ◻ TRL/SBIR badge graphic (Shot 17) — **needs the real TRL number filled in**
- ◻ CTA/Silver-Aisle card with confirmed contact + QR (Shot 19)
- ◻ Guidehouse logo-lockup end card + optional audio sting (Shot 20)
- ◻ Sean's narration track (the column-C script, ~4:41)

**Open items to confirm before final render**
1. **Shot 17 TRL value** — placeholder `[TRL X]` must be replaced with the real level.
2. **Shot 19 contact + QR** — Silver Aisle link / Innovation Hub URL / QR still marked TBD in the storyboard.
3. **Shot 4 on-screen text** — storyboard still carries the "(working title — final name TBD)" caveat;
   per decision D3 the name is **locked to "Financial Management of the Future"** — drop the caveat in the graphic.

---

## E. Reference frames (exact framing for each product state)

Captured live from the running app at 1920×1080. These are **framing references**, not the final
footage — they show colleagues exactly what each state looks like before they record. In
`docs/video-frames/`:

| Shot | File | What it shows |
|---|---|---|
| 4 | `shot04_overview_hero.png` | Overview hero "Audit-ready, every day" + header/nav (one product) + exec tiles |
| 5 | `shot05_overview_pipeline.png` | `PipelineDiagram` — TX-1000043 token traveling Reconcile → Package → Deliver inside the boundary |
| 6 | `shot06_recon_titlecard_idle.png` | Reconciliation title card, idle — sources (PO 88 / GR 86 / GL 88) + "Run reconciliation" |
| 7 | `shot07_recon_progress.png` | Mid-run progress bar — "Matching 37 / 88 records…", button "Reconciling…" |
| 8 | `shot08_recon_exceptions.png` | Done: "Reconciled 68 / 20 exceptions"; review queue with first "why" card expanded (rationale + next steps) |
| 9 | `shot09_recon_auditready.png` | Audit-ready output card + TX-1000043 handoff chip + "Send to PBC" / Export / Share |
| 10 | `shot10_pbc_titlecard.png` | PBC title card + "From Reconciliation" banner + compose card (prefilled request) |
| 11 | `shot11_pbc_routed.png` | Request submitted — "Agent working…" + interpreted/routed confirmation |
| 12 | `shot12_pbc_provenance.png` | Provenance trail ("Every step logged") + 3 retrieved-source cards ("Every record traceable") + gate checks passing |
| 13 | `shot13_pbc_package.png` | Auditor-ready package "Defensible" — 3 days → minutes, cited missions, SFA chip, provenance lines |
| 14 | `shot14_lineage_fullchain.png` | Lineage chain (viewport): AI Reconciliation → PBC (Auto-Accept 97%) → Defensible package, auditor outside boundary |
| 14 | `shot14b_lineage_fullpage.png` | Lineage — full-page version (whole chain + closing line), for a clean wide framing |
| 15/16/18 | `shot15-16-18_overview_strips.png` | Lower Overview: "In production today" missions · "Built on accredited building blocks" · subscription strips (all three sit together at the page bottom — one frame covers them) |

**Notes for whoever records:**
- Shots 7 (progress bar) and 11 ("Agent working…") are **transient** — the app animates faster than
  the narration window. The reference frames prove the state exists; on the day, **dwell / re-scroll**
  to hold it long enough, or capture a few takes and pick the best.
- Shots 15/16/18 share one frame because the three strips render stacked at the bottom of the Overview;
  the editor crops/holds on each strip in turn against its narration line.

---

*Source of truth: `docs/fm-future-storyboard.xlsx` (script + durations) and `docs/storyboard-alignment.md`
(shot ↔ screen mapping). Product + guided-demo chain verified live at :5180; reference frames in
`docs/video-frames/` captured from the same run.*
