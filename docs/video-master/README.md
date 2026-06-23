# FM of the Future — VO-sync video masters

Silent, spec-compliant cuts to hand the production team to combine with Sean's
voiceover. All are **4:41 (281 s), 1920×1080, 16:9, 30 fps, no audio**, with every
shot cut to its storyboard duration and placed at its timecode — so the narration
track (`docs/fm-future-storyboard.xlsx`, column C) drops on and syncs shot-for-shot.

Built per the hand-off spec in `docs/video-draft-shotlist.md` §B/§D.

## The files (use the first one)

| File                                                                    | Product shots                                                                                              | Use it for                                                               |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **`FM-Future_live-product_1080p_silent.mp4`** (13 MB) — **recommended** | **Real app footage, recorded live at true 1920×1080 with animation** (Playwright driving the running app). | The primary cut to lay the VO against. Production-grade product footage. |
| `FM-Future_VO-sync-master_1080p_silent.mp4` (4 MB)                      | crisp app **stills** per shot, no labels                                                                   | Backup / exact-timing reference.                                         |
| `FM-Future_motion-roughcut_1080p_silent.mp4` (9 MB)                     | early low-res (1262×568) animated captures                                                                 | Superseded by the live-product cut; kept for reference.                  |

All three share the same 281 s timeline and the same 6 placeholder slates, so they're
interchangeable on the editing timeline.

## How to combine with the VO

1. Drop `FM-Future_live-product_1080p_silent.mp4` on the timeline; lay Sean's narration
   (column-C script) against it. Each shot already fills its exact storyboard window, so
   it lines up.
2. Replace the **6 placeholder slates** (navy cards reading "INSERT …") with the produced /
   on-camera footage — see below.
3. That's the deliverable: 14 real product shots at 1080p + 6 inserts to drop in.

## ⚠️ What is NOT in the video (must be supplied by production)

Six shots are content that doesn't exist in the repo and can't be generated — they render
as labeled placeholder slates:

| Shot | Window    | Placeholder     | Needs                                        |
| ---- | --------- | --------------- | -------------------------------------------- |
| 1    | 0:00–0:08 | produced opener | title card / b-roll cold open (no on-camera) |
| 2    | 0:08–0:28 | b-roll montage  | desaturated b-roll                           |
| 3    | 0:28–0:46 | motion graphic  | cost-icons → agency-grid mograph             |
| 17   | 3:47–4:05 | motion graphic  | TRL/SBIR Phase III badge graphic             |
| 19   | 4:20–4:34 | motion graphic  | CTA card — Silver Aisle link + QR            |
| 20   | 4:34–4:41 | motion graphic  | Guidehouse logo-lockup end card              |

Until those six are supplied, this is a production-grade **product** cut with
placeholders — not a complete broadcast final.

## How the live-product footage was captured

The 14 product shots were recorded from the running app (`npm run dev`, :5180) with
Playwright at a 1920×1080 viewport, deep-linking each storyboard state
(`#/reconciliation?autorun=1`, `#/pbc?from=TX-1000043&autorun=1`, `#/lineage`, and the
Overview strips), letting the guided-demo animation settle, scrolling the target state to
frame, and dwelling for the shot's duration. Same record — **TX-1000043 / VENDOR-035 /
$14,026.62** — threads through every screen, so the "one record, one pipeline" claim is
real on camera. Note: capture skips the sub-2 s entry animations (progress bar, card
stagger) in favor of the settled states the narration windows rest on (per §C); to feature
those micro-animations, re-record the specific shot and hold longer.

## Shot timing reference

Cumulative from 0:00. `S` = slate placeholder, `▶` = live app footage.

| #   | In–Out    | Dur | Source                             |
| --- | --------- | --- | ---------------------------------- |
| 1   | 0:00–0:08 | 8   | S                                  |
| 2   | 0:08–0:28 | 20  | S                                  |
| 3   | 0:28–0:46 | 18  | S                                  |
| 4   | 0:46–1:01 | 15  | ▶ Overview hero                   |
| 5   | 1:01–1:15 | 14  | ▶ Pipeline diagram                |
| 6   | 1:15–1:29 | 14  | ▶ Reconciliation title            |
| 7   | 1:29–1:42 | 13  | ▶ Reconciliation run/result       |
| 8   | 1:42–1:55 | 13  | ▶ Exceptions + rationale          |
| 9   | 1:55–2:07 | 12  | ▶ Audit-ready output              |
| 10  | 2:07–2:19 | 12  | ▶ PBC title + From-Reconciliation |
| 11  | 2:19–2:31 | 12  | ▶ PBC request submitted           |
| 12  | 2:31–2:47 | 16  | ▶ Provenance + retrieved sources  |
| 13  | 2:47–3:03 | 16  | ▶ Auditor-ready package           |
| 14  | 3:03–3:13 | 10  | ▶ Lineage chain                   |
| 15  | 3:13–3:29 | 16  | ▶ "In production today" strip     |
| 16  | 3:29–3:47 | 18  | ▶ Building-blocks strip           |
| 17  | 3:47–4:05 | 18  | S                                  |
| 18  | 4:05–4:20 | 15  | ▶ Subscription strip              |
| 19  | 4:20–4:34 | 14  | S                                  |
| 20  | 4:34–4:41 | 7   | S                                  |

Total: **281 s = 4:41.**

## Rebuilding

- `capture-live-product.js` — Playwright capture of the 14 product shots (needs `npm i playwright`,
  the dev server on :5180, and `BASE`/`OUTDIR` env if different).
- `build-live-product.sh` — cuts the captures to shot durations and assembles the live-product master.
- `build.sh` — regenerates the stills + motion-roughcut masters from `docs/video-frames/` + `docs/video-clips/`.

All need `ffmpeg`/`ffprobe` on PATH.
