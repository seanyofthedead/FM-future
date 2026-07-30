# Produced on-screen graphics

`docs/FM-Future_Video-Graphics.pptx` holds the five produced cards in the submission video,
one slide per card, at 16:9. Everything on a slide is what the viewer sees. Shot number,
timecode and the narration line each card sits under are in the **speaker notes**, so the
slide itself stays clean for review.

| Slide | Shot | In-out | Card |
| ----- | ---- | ------ | ---- |
| 1 | 1  | 0:00-0:08 | Cold open title card |
| 2 | 3  | 0:28-0:46 | The cost of audit readiness |
| 3 | 17 | 3:52-4:10 | Readiness and acquisition (TRL / SBIR Phase III) |
| 4 | 19 | 4:20-4:34 | Get in touch (marketplace + POC) |
| 5 | 20 | 4:34-4:41 | End card |

Shots 2 is b-roll and shots 4-16 and 18 are live product screen recordings, so neither
appears here. Those come from the app itself, per `docs/video-draft-shotlist.md`.

## Still to fill before render

- **Slide 4** carries `[POINT OF CONTACT NAME]`, `[name@guidehouse.com]` and `[phone]`
  placeholders, plus a grey square where the marketplace QR goes. Compliance also wants an
  **alternate** POC.

## Rebuilding

Edit the `.pptx` directly for one-off wording changes. To regenerate from source:

```bash
npm install --no-save pptxgenjs react-icons react react-dom sharp
node docs/video-master/graphics-deck/build-graphics.cjs
```

The Guidehouse Acon is drawn from the same two-pillar geometry as the in-app mark
(`src/components/Brand.tsx`) and rasterised at build time. Swap it for the official logo
asset before anything ships externally.

Type is set in Calibri so the deck renders predictably anywhere. Restyle to the brand face
in the motion tool.
