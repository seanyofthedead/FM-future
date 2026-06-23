# FM of the Future — VO-sync video masters

Two silent, spec-compliant cuts to hand the production team to combine with Sean's
voiceover. Both are **exactly 4:41 (281 s), 1920×1080, 16:9, 30 fps, no audio**, with
every shot cut to its storyboard duration and placed at its timecode — so the narration
track (`docs/fm-future-storyboard.xlsx`, column C) drops on and syncs without trimming.

Built per the hand-off spec in `docs/video-draft-shotlist.md` §B/§D.

## The two files

| File                                                  | What it is                                                                                                                                                                                | Use it for                                                                                                         |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `FM-Future_VO-sync-master_1080p_silent.mp4` (4.2 MB)  | **Clean stills master.** Product shots are crisp 1920×1080 app screenshots held for each shot's duration. No baked-in labels.                                                             | The authoritative **VO-sync timing master** and the assembly skeleton. Lay the VO on this; it syncs shot-for-shot. |
| `FM-Future_motion-roughcut_1080p_silent.mp4` (8.6 MB) | **Motion reference.** The Reconciliation→PBC spine (shots 6–13), the overview open (4–5), and Lineage (14) use the **live animated** captures; everything else is the same stills/slates. | Seeing the real app motion/pacing. Soft (see caveat).                                                              |

## How to combine with the VO

1. Drop either master on the timeline; lay Sean's narration (column-C script) against it.
   Each shot already occupies its exact storyboard window, so it lines up.
2. Replace the **6 placeholder slates** (navy cards reading "INSERT …") with the produced /
   on-camera footage — see below.
3. For a motion final, **re-record the 14 product shots at 1080p per §C** of the shotlist and
   drop each take into its window on the stills master. (The motion rough-cut's product
   footage is draft quality — don't ship it as final.)

## ⚠️ What is NOT real footage (must be supplied by production)

Six shots don't exist in the repo and are rendered as labeled placeholder slates:

| Shot | Window    | Placeholder     | Needs                                            |
| ---- | --------- | --------------- | ------------------------------------------------ |
| 1    | 0:00–0:08 | on-camera (Joe) | Joe-to-camera footage + GH lower-third           |
| 2    | 0:08–0:28 | b-roll montage  | desaturated b-roll                               |
| 3    | 0:28–0:46 | motion graphic  | cost-icons → agency-grid mograph                 |
| 17   | 3:47–4:05 | motion graphic  | TRL/SBIR badge — **fill in the real TRL number** |
| 19   | 4:20–4:34 | motion graphic  | CTA card — **confirm Silver Aisle contact + QR** |
| 20   | 4:34–4:41 | motion graphic  | Guidehouse logo-lockup end card                  |

## Caveats (straight from the shotlist)

- **Product footage is draft.** The stills master is crisp but **static** (no in-app
  animation). The motion rough-cut shows animation but is **upscaled from 1262×568 @ 10 fps
  headless captures**, so it's soft and letterboxed. Neither is broadcast-final — §C is the
  recipe for final product capture at true 1080p.
- **Per-shot timing.** The stills master is frame-accurate to the storyboard. In the motion
  rough-cut, shots 4–5 and 6–13 are each one continuous motion block, so the _internal_ shot
  boundaries inside those blocks are approximate (use the stills master for exact in/out points).

## Shot timing reference

Cumulative from 0:00. `S` = slate placeholder, `■` = still, `▶` = live motion (rough-cut only).

| #   | In–Out    | Dur | stills master | motion rough-cut |
| --- | --------- | --- | ------------- | ---------------- |
| 1   | 0:00–0:08 | 8   | S             | S                |
| 2   | 0:08–0:28 | 20  | S             | S                |
| 3   | 0:28–0:46 | 18  | S             | S                |
| 4   | 0:46–1:01 | 15  | ■             | ▶               |
| 5   | 1:01–1:15 | 14  | ■             | ▶               |
| 6   | 1:15–1:29 | 14  | ■             | ▶               |
| 7   | 1:29–1:42 | 13  | ■             | ▶               |
| 8   | 1:42–1:55 | 13  | ■             | ▶               |
| 9   | 1:55–2:07 | 12  | ■             | ▶               |
| 10  | 2:07–2:19 | 12  | ■             | ▶               |
| 11  | 2:19–2:31 | 12  | ■             | ▶               |
| 12  | 2:31–2:47 | 16  | ■             | ▶               |
| 13  | 2:47–3:03 | 16  | ■             | ▶               |
| 14  | 3:03–3:13 | 10  | ■             | ▶               |
| 15  | 3:13–3:29 | 16  | ■             | ■                |
| 16  | 3:29–3:47 | 18  | ■             | ■                |
| 17  | 3:47–4:05 | 18  | S             | S                |
| 18  | 4:05–4:20 | 15  | ■             | ■                |
| 19  | 4:20–4:34 | 14  | S             | S                |
| 20  | 4:34–4:41 | 7   | S             | S                |

Total: **281 s = 4:41.**

## Rebuilding

`build.sh` (in this folder) regenerates both masters from `docs/video-frames/` (stills) and
`docs/video-clips/` (live captures). It needs `ffmpeg`/`ffprobe` on PATH (or edit the `FF`/`FP`
paths at the top). Outputs land back here.
