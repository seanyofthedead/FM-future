# Video feedback response — Jul 2026 review

Item-by-item response to the review of the FM of the Future Tradewinds submission cut.
Status key: ✅ done in this repo · 🎬 needs a re-record / re-render · ❓ needs a decision from the team.

**Net effect on runtime: none.** Still **4:41 (281 s)**, inside the 4:45 target and the 5:00
hard cap. Shots 13 and 16 got longer (+2 s, +3 s) and Shot 18 got shorter (−5 s), so timecodes
from 2:47 to 4:20 shift; Shots 19–20 land exactly where they did before.

---

## 1 · "Explicitly reference how the solution accelerates the mission and advances the state of the art"

✅ **Script** (`docs/fm-future-storyboard.xlsx`, column C) · ✅ **Screen** (the app) · 🎬 **re-record + re-capture**

Those are Tradewinds required Elements 2 and 3, and the reviewer is right that the old cut only
implied them. Both phrases are now said out loud and shown on screen.

| Beat | Was | Now |
| --- | --- | --- |
| **Shot 13** (2:47–3:05, was 16 s → **18 s**) | "accelerating the mission" was a trailing clause at the end of the line | Opens the line: _"This is what accelerating the mission looks like…"_ — then the 3-days→minutes proof and the analyst-time payoff. The package screen carries a new green **"Accelerating the mission"** chip next to "Delivered in minutes". |
| **Shot 16** (3:31–3:52, was 18 s → **21 s**) | "It advances the state of the art by orchestrating accredited building blocks…" — one claim, no contrast | _"It advances the state of the art **two ways**"_ — (a) agents reason where rules engines can't, explaining every exception defensibly; (b) accredited, already-in-use building blocks, cutting manual review an estimated 80–90%. The Overview strip's heading changed from "Built on accredited building blocks" to **"Advancing the state of the art"**. |
| **Overview page** | no mission-acceleration content above the fold | New **"Accelerating the mission"** strip under the pipeline diagram: ~3 days → minutes to evidence · reviewers see exceptions, not entire ledgers · audit prep runs continuously, not at year-end. |

The 80–90% figure is the one already logged as an illustrative estimate in
`TRADEWINDS_COMPLIANCE.md` (#18) — it is labeled illustrative on screen, not presented as a
measured customer result.

## 2 · "Remove OSW Comptroller from the clients listed at 03:12"

✅ **done** · 🎬 **re-capture Shot 15 + re-record its VO**

Removed in all three places it appeared:

- `src/modules/overview/OverviewPage.tsx` — the "In production today" strip now reads
  **Department of the Army · Army Transportation Command**.
- `src/modules/pbc/PbcRequestAgentPage.tsx` — the auditor-ready package citation line
  ("Confirmed in production · …") drops OSW Comptroller.
- Storyboard Shot 15 script and on-screen text.

⚠️ One thing to flag: this makes it a **two-client** claim. If the reason for pulling OSW is
clearance rather than accuracy, Shot 15 is now thinner evidence for Element 3 and we should
consider whether the remaining two names are cleared to name on screen. `TRADEWINDS_COMPLIANCE.md`
still carries an older note (2026-06-09) saying the product was pre-deployment with no clients
and that customer-deployment claims shouldn't be reintroduced; decision D2 later reversed that.
**Worth a one-line confirmation from Angel/Bizrat that Army and ATC are cleared to name.**

## 3 · SBIR pronunciation at 03:57 — and the "Silver Aisle" at 04:22

🎬 **re-record Shots 17 and 19** · ⚠️ **04:22 is a script error, not just a read — see below**

- **03:57 (Shot 17)** — agreed. The storyboard now carries an explicit VO note in the new
  **"VO / pronunciation notes"** column: _say SBIR as a word — **"SY-ber"** (rhymes with fiber),
  not spelled out S-B-I-R._ It occurs twice in that line. Also: say **"Phase Three"**, not
  "Phase I-I-I".
- **04:22 (Shot 19)** — **Angel was right, and the problem is bigger than the read.** The v1
  script literally says "CDAO Tradewinds **Silver Aisle**." There is no Silver Aisle. The aisle
  is the **SBIR/STTR Aisle** of the Tradewinds Solutions Marketplace — commonly written "SBIR
  Aisle." So the narration came out as "silver aisle" because that is what the script said, and
  the script said it because "SBIR Aisle," spoken as "SY-ber aisle," was mis-transcribed at some
  point. Sources:
  [Tradewinds SBIR/STTR Aisle](https://www.tradewindai.com/sbir-sttr-aisle) ·
  [Tradewinds Solutions Marketplace](https://www.tradewindai.com/tw-marketplace).

  **Fixed:** Shot 19's script now reads _"Find Financial Management of the Future on the CDAO
  Tradewinds Solutions Marketplace, in the SBIR Aisle"_ and the on-screen text reads
  **"CDAO Tradewinds Solutions Marketplace · SBIR/STTR Aisle."** This is a **re-record and a
  re-render of the Shot 19 CTA card**, not just a pronunciation note. Every other "Silver Aisle"
  reference in the repo (shot list, editor packet, build scripts, alignment doc) is corrected too.

  Note the same pronunciation rule applies here as in Shot 17: SBIR is said as a word — this line
  reads "the SY-ber aisle."

## 4 · "Sold as a subscription" references at 04:09

✅ **removed from screen and script, as instructed** · ⚠️ **but the requirement check says put one clause back — see below**

- Overview strip **"Offered as a subscription · Scoped to your data and audit workload · Contact
  us for a quote"** → replaced with **"Contact us to learn more — See what Guidehouse and
  Financial Management of the Future can do for your audit, on your data."**
- Shot 18 VO rewritten to the reviewer's suggested content and cut 15 s → 10 s.
- Shot 17 also said "subscription-based product"; that wording is out too (the on-screen card in
  the current cut reads "A proven, subscription-based product"). Shot 17 now leads with
  **"a mature, deployable product at Technology Readiness Level five to six."**

**The requirement question Angel asked — "is there a requirement to say how we sell this?"
Verified against the marketplace package: yes, there is.** The Business Model element asks
vendors to _"Describe how your company's business model works"_ — general structure
(fixed-price licenses, services, etc.), whether the model varies by volume or complexity,
commercial viability, and **alignment with the technology maturity level (TRL)**. The pricing
restriction is narrower than it looks: _"NOTE: THIS SECTION IS NOT REQUESTING NON-PUBLIC
PRICING. DO NOT SUBMIT RATES OR OTHER PROPRIETARY PRICING INFORMATION."_ Publicly available
commercial pricing may be shown. Source:
[Tradewinds FAQs](https://www.tradewindai.com/faqs).

So the line we removed — _"sold as a subscription, scoped to the size of your data and your
audit workload"_ — was **not** a pricing disclosure. It was a description of structure and of
scaling by volume/complexity, which is exactly what the element asks for, and it carried no
rates. Nothing about it violated the v10 pricing rule.

**Weighting context.** The rubric is Defining the Problem **15%**, Accelerating the Mission
**40%**, Advancing the State of the Art **35%**, Business Model **10%**. So this is the
smallest element — but it is also the cheapest to satisfy, and we currently answer it only
obliquely.

**Recommendation — reversed from my first pass.** Keep the sales-model description; it is
requested, it is unpriced, and dropping it forfeits the only element it serves. Concretely:

- **Shot 17** already covers TRL alignment and the acquisition path (mature product, TRL 5–6,
  SBIR Phase III sole-source eligible). That half is solid.
- **Shot 18** should carry one structural clause before the call to action — e.g. _"It's
  delivered as a subscription scoped to your data and audit workload"_ — then _"contact us to
  learn more."_ No rates, no quote language, nothing that reads as a sales pitch.

**Current state of the edit:** Angel's instruction was followed literally — all sales-model
language is out of Shots 17 and 18 and off the Overview screen. The strip reads "Contact us
to learn more." **Decision B is now: put one clause back, or accept a thin Business Model
element.** My recommendation is to put it back; it is Angel's call.

## 5 · POC at 04:18

✅ **placeholder made explicit** · ❓ **needs the actual name + email**

`poc@guidehouse.com` was always a placeholder, not a real mailbox. The reviewer offered their own
info, but I don't have it, so Shot 19's on-screen text now reads
**`[POC NAME] · [poc email] · [Innovation Hub link / QR]`** so it can't ship as-is unnoticed.
Compliance item **#11** (POC + alternate, email & phone) is still open and also wants an
**alternate** POC. Send me the name/email and I'll drop it in.

## 6 · "Mimic the cadence/storytelling flow and narration of the approved PPBE submission video"

❓ **blocked — the reference wasn't attached**

The feedback message cuts off at "...recently approved for". Nothing about that PPBE video is in
this repo. Send the video (or a link) and I'll do a cadence pass against it — that's a narration
and edit-rhythm change on top of the content changes above, and it's the kind of thing best done
once, after the content is settled.

---

## What has to happen next in production

The picture and the voice track both change, so neither the v1 masters nor the existing VO can
be reused past 2:47.

1. **Re-capture the product footage.** `docs/video-master/capture-live-product.js` against the
   running app (`npm run dev`, :5180), then `build-live-product.sh` — its shot durations are
   already updated (p13 18 s, p16 21 s, p18 10 s). Shots 4, 13, 15, 16 and 18 all changed
   on screen; re-capturing the full pass is simpler than patching.
2. **Re-record the VO from Shot 13 onward** (2:47→), plus Shot 17 for the SBIR pronunciation.
   Shots 1–12 are unchanged and their takes still work.
3. **Re-render Shot 17's badge graphic** — TRL reads **5–6**, drop "subscription-based".
4. **Re-render Shot 19's CTA card** with the named POC **and the corrected aisle name**
   ("CDAO Tradewinds Solutions Marketplace · SBIR/STTR Aisle" — the v1 card's "Silver Aisle" is wrong).
5. **Re-shoot the reference stills.** `docs/video-frames/shot15-16-18_overview_strips.png` and
   `docs/demo-walkthrough/shot-15-16-18-strips.png` still show OSW Comptroller and the
   subscription strip.

## Requirements re-verified against the marketplace package (Jul 2026)

Checked directly rather than relying on the v10 notes in this repo. Sources:
[Tradewinds FAQs](https://www.tradewindai.com/faqs) ·
[SBIR/STTR Aisle](https://www.tradewindai.com/sbir-sttr-aisle) ·
[TW Marketplace](https://www.tradewindai.com/tw-marketplace) ·
[SAM.gov announcement](https://sam.gov/opp/3b22374d646240429d4dc754a23c20d0/view)

| Requirement | Spec | Us |
| --- | --- | --- |
| Runtime | 5:00 hard cap — over-length "will not be assessed" | **4:41** ✅ |
| Resolution | HD 1920×1080 | 1920×1080 ✅ |
| **Frame rate** | **23.98FPS** | ⚠️ **v1 masters rendered at 30 fps.** Build scripts corrected to `24000/1001`; renders must be rebuilt |
| File | `.mp4`, streaming-encoded, **under 1 GB** | 13 MB ✅ |
| Color space | Rec709 or sRGB | confirm at final encode (compliance #7) |
| Audio | stereo or mono-mix | on the mixed deliverable, not these silent masters |
| Required elements | Defining the Problem · Accelerating the Mission · Advancing the State of the Art · Business Model | all four present ✅ |
| Rubric weights | 15% · **40%** · **35%** · 10% | mission + state of the art are **75%** of the score |
| Business Model | "Describe how your company's business model works" — structure, variation by volume/complexity, commercial viability, TRL alignment. **No rates / non-public pricing.** | ⚠️ thin after the Jul 2026 removal — see item 4 |
| TRL | must align to the business model; "if you are unsure which TRL you fall under, reach out to success@tradewindai.com" | TRL 5–6, unconfirmed (compliance #3) |
| POC | "include a responsive contact person as government customers can opt to reach out to them directly" | placeholder — compliance #11 |
| Aisle name | **SBIR/STTR Aisle** of the Tradewinds Solutions Marketplace | corrected — see item 3 |

Two findings worth acting on independent of the client feedback:

1. **Frame rate.** The spec is 23.98FPS and every master in `docs/video-master/` was built at
   30 fps. Compliance item #7 didn't list frame rate at all, so it was never checked. Both
   build scripts now encode `-r 24000/1001`; the renders are off-spec until rebuilt. _(ffmpeg
   isn't available in this environment, so the corrected scripts have not been run — verify the
   output frame rate on the first rebuild.)_
2. **Business Model is a required element, not an optional pitch.** See item 4 — the removal
   went further than the pricing rule requires.

## Open decisions (all need a person, not a code change)

| # | Decision | Owner |
| - | -------- | ----- |
| A | Confirm Army + ATC are cleared to name on screen now that OSW is out (item 2) | Angel / Bizrat |
| B | Business Model — **recommend putting one structural clause back into Shot 18** ("delivered as a subscription scoped to your data and audit workload", no rates). The element explicitly asks for it and the pricing rule doesn't bar it (item 4) | Angel |
| C | POC name + email, plus the alternate POC required by compliance #11 (item 5) | Bizrat / reviewer |
| D | Send the approved PPBE video so the cadence pass can happen (item 6) | Reviewer |
| E | Confirm TRL 5–6 is the locked value — compliance #3 is still open, the produced graphic already shows 5–6, and the Business Model element requires the two to align | Sean / Angel |
| F | Re-render all masters at **23.976 fps** — the v1 renders are 30 fps and off-spec (compliance #7) | Jeff |
