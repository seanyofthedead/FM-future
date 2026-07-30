# Storyboard deck generator

Builds `docs/FM-Future_Storyboard_Rev2.pptx` — the editable storyboard and change-log deck —
straight from `docs/fm-future-storyboard.xlsx`, so the deck can never drift from the script.

```bash
# from the repo root
pip install openpyxl && npm install --no-save pptxgenjs
python docs/video-master/storyboard-deck/export-storyboard.py   # writes sb.json + sb-old.json
node docs/video-master/storyboard-deck/build-deck.cjs           # writes the .pptx
rm sb.json sb-old.json
```

`.cjs`, not `.js` — the repo's `package.json` sets `"type": "module"` and pptxgenjs is CommonJS.

**What's hand-maintained in `build-deck.cjs`** (everything else comes from the spreadsheet):

- `CHANGED` — the per-shot "changed in Rev 2" note. Add or clear entries as revisions land.
- `RECAPTURE` / `REVO` — which shots need new footage and which need a new voice take.
- The summary slides: feedback responses, rubric weights, requirements check, re-timing,
  production to-do, and open decisions.
- `REV1` in `export-storyboard.py` — the commit the redline appendix compares against.

Leadership can also just edit the `.pptx` directly. If they do, re-apply their wording to the
spreadsheet before regenerating, or the next build will overwrite it.
