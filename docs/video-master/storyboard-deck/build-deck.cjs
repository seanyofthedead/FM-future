const pptxgen = require('pptxgenjs')
const fs = require('fs')
// Run from the repo root, after `python docs/video-master/storyboard-deck/export-storyboard.py`:
//   node docs/video-master/storyboard-deck/build-deck.js
const SB = JSON.parse(fs.readFileSync('sb.json', 'utf8'))
const OLD = JSON.parse(fs.readFileSync('sb-old.json', 'utf8'))

const BLACK = '1B1B1B', INK = '1B1B1B', FOREST = '31863E', LIME = '93D500'
const SAND = 'F1F5F3', MUTED = '5A6568', WHITE = 'FFFFFF', LINE = 'D8DEDB', AMBER = 'B26B00'
const HEAD = 'Cambria', BODY = 'Calibri'

const pres = new pptxgen()
pres.layout = 'LAYOUT_WIDE' // 13.3 x 7.5
pres.author = 'Guidehouse'
pres.title = 'FM of the Future - Tradewinds Video Storyboard Rev 2'

// Which shots changed in this revision, and why.
const CHANGED = {
  4:  'On-screen text: dropped the retired "(working title - final name TBD)" caveat.',
  13: 'Re-timed 16s to 18s. Narration now OPENS on "accelerating the mission" (40% of the rubric). New on-screen chip on the package screen.',
  15: 'OSW Comptroller removed from the narration and the on-screen client list. Now names the Army and ATC only.',
  16: 'Re-timed 18s to 21s. Narration now OPENS on "advances the state of the art" (35% of the rubric). Overview strip re-headed to match.',
  17: 'TRL locked at 5-6. "Subscription-based" wording removed. VO note added: say SBIR as a word ("SY-ber").',
  18: 'Re-timed 15s to 10s. All pricing and sales-model language removed; now a pure call to action. SEE OPEN DECISION B.',
  19: 'CORRECTED: "Silver Aisle" does not exist. It is the SBIR/STTR Aisle. POC placeholder made explicit.',
}
const RECAPTURE = new Set([4, 5, 13, 15, 16, 18])   // live app footage that must be re-shot
const REVO = new Set([13, 15, 16, 17, 18, 19])      // narration that must be re-recorded

let PAGE = 0
function newSlide() { PAGE += 1; return pres.addSlide() }
function footer(slide) {
  const n = PAGE
  slide.addText('FM of the Future  |  Tradewinds submission video  |  Storyboard Rev 2', {
    x: 0.5, y: 7.02, w: 8.5, h: 0.3, fontSize: 9, color: MUTED, fontFace: BODY, margin: 0,
  })
  slide.addText(String(n), { x: 12.3, y: 7.02, w: 0.5, h: 0.3, fontSize: 9, color: MUTED, fontFace: BODY, align: 'right', margin: 0 })
}

function sectionTitle(slide, kicker, title) {
  slide.addText(kicker.toUpperCase(), { x: 0.6, y: 0.42, w: 12, h: 0.28, fontSize: 11, bold: true, color: FOREST, fontFace: BODY, charSpacing: 2, margin: 0 })
  slide.addText(title, { x: 0.6, y: 0.72, w: 12.1, h: 0.6, fontSize: 32, bold: true, color: INK, fontFace: HEAD, margin: 0 })
}

/* ---------------------------------------------------------------- 1. Title */
{
  const s = newSlide()
  s.background = { color: BLACK }
  s.addText('GUIDEHOUSE', { x: 0.8, y: 0.7, w: 6, h: 0.3, fontSize: 12, bold: true, color: LIME, fontFace: BODY, charSpacing: 3, margin: 0 })
  s.addText('Financial Management\nof the Future', { x: 0.8, y: 1.5, w: 8.6, h: 1.9, fontSize: 46, bold: true, color: WHITE, fontFace: HEAD, lineSpacing: 50, margin: 0 })
  s.addText('Tradewinds submission video  |  Storyboard Revision 2', { x: 0.8, y: 3.5, w: 9, h: 0.4, fontSize: 19, color: LIME, fontFace: BODY, margin: 0 })
  s.addText(
    'Every change made in response to the July 2026 review, shot by shot. Editable: update any cell here, ' +
    'then hand this deck to production as the shooting and re-record brief.',
    { x: 0.8, y: 4.1, w: 8.4, h: 0.9, fontSize: 14, color: 'C9D6E3', fontFace: BODY, lineSpacing: 22, margin: 0 })
  const stats = [['4:41', 'runtime (5:00 cap)'], ['20', 'shots'], ['7', 'shots changed'], ['6', 'to re-capture']]
  stats.forEach(([v, l], i) => {
    const x = 0.8 + i * 2.35
    s.addText(v, { x, y: 5.3, w: 2.2, h: 0.6, fontSize: 34, bold: true, color: WHITE, fontFace: HEAD, margin: 0 })
    s.addText(l, { x, y: 5.95, w: 2.2, h: 0.5, fontSize: 11, color: '9AA8A2', fontFace: BODY, margin: 0 })
  })
  s.addNotes('Storyboard Rev 2. Source of truth is docs/fm-future-storyboard.xlsx in the FM-future repo. Runtime unchanged at 4:41 against a 5:00 hard cap where over-length videos are not assessed.')
}

/* ------------------------------------------------- 2. Feedback -> response */
{
  const s = newSlide()
  sectionTitle(s, 'July 2026 review', 'Six notes, six responses')
  const items = [
    ['1', 'Reference mission acceleration\nand state of the art explicitly', 'Both phrases now open their beats, in the narration AND on screen. Shots 13 and 16.', 'DONE'],
    ['2', 'Remove OSW Comptroller', 'Gone from the narration, the client strip, and the package citation line. Shot 15.', 'DONE'],
    ['3', 'Say SBIR, do not spell it out', 'VO note added: "SY-ber". Shot 17 re-records.', 'DONE'],
    ['4', 'Drop "sold as a subscription"', 'All pricing and sales-model language removed. Shots 17 and 18.', 'SEE DEC. B'],
    ['5', 'Fix the POC on screen', 'Placeholder made explicit so it cannot ship unnoticed. Shot 19.', 'NEEDS INPUT'],
    ['6', 'Mimic the PPBE video cadence', 'Reference video was not attached. Cadence pass pending.', 'BLOCKED'],
  ]
  items.forEach((it, i) => {
    const col = i % 2, row = Math.floor(i / 2)
    const x = 0.6 + col * 6.25, y = 1.55 + row * 1.72
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 5.95, h: 1.5, fill: { color: SAND }, line: { color: LINE, width: 1 }, rectRadius: 0.08 })
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.22, y: y + 0.24, w: 0.42, h: 0.42, fill: { color: FOREST } })
    s.addText(it[0], { x: x + 0.22, y: y + 0.24, w: 0.42, h: 0.42, fontSize: 14, bold: true, color: WHITE, fontFace: BODY, align: 'center', valign: 'middle', margin: 0 })
    s.addText(it[1], { x: x + 0.8, y: y + 0.16, w: 3.4, h: 0.62, fontSize: 12, bold: true, color: INK, fontFace: BODY, margin: 0, lineSpacing: 15 })
    s.addText(it[2], { x: x + 0.8, y: y + 0.78, w: 4.9, h: 0.62, fontSize: 10.5, color: MUTED, fontFace: BODY, margin: 0, lineSpacing: 13 })
    const done = it[3] === 'DONE'
    s.addText(it[3], { x: x + 4.28, y: y + 0.2, w: 1.5, h: 0.32, fontSize: 9, bold: true, fontFace: BODY, align: 'right', margin: 0, color: done ? FOREST : AMBER })
  })
  footer(s)
  s.addNotes('Items 4, 5 and 6 still need a decision or an input. They are listed again at the end of the deck.')
}

/* ------------------------------------------------------- 3. Rubric weights */
{
  const s = newSlide()
  sectionTitle(s, 'Why note 1 mattered most', 'The rubric is not evenly weighted')
  s.addChart(pres.ChartType.bar, [{
    name: 'Weight',
    labels: ['Defining\nthe problem', 'Accelerating\nthe mission', 'Advancing the\nstate of the art', 'Business\nmodel'],
    values: [15, 40, 35, 10],
  }], {
    x: 0.6, y: 1.6, w: 7.4, h: 4.6, barDir: 'col', chartColors: [MUTED, FOREST, FOREST, MUTED],
    showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0"%"',
    dataLabelColor: INK, dataLabelFontSize: 13, dataLabelFontBold: true, dataLabelFontFace: BODY,
    showLegend: false, catAxisLabelColor: INK, catAxisLabelFontSize: 11, catAxisLabelFontFace: BODY,
    valAxisHidden: true, valGridLine: { style: 'none' }, catGridLine: { style: 'none' },
    barGapWidthPct: 55, valAxisMaxVal: 50,
  })
  s.addShape(pres.ShapeType.roundRect, { x: 8.35, y: 1.6, w: 4.35, h: 2.5, fill: { color: BLACK }, rectRadius: 0.08 })
  s.addText('75%', { x: 8.7, y: 1.85, w: 3.6, h: 0.85, fontSize: 46, bold: true, color: LIME, fontFace: HEAD, margin: 0 })
  s.addText('of the score sits in the two elements the review said we were only implying. That is why note 1 drove the largest rewrite in this revision.',
    { x: 8.7, y: 2.75, w: 3.7, h: 1.2, fontSize: 12, color: 'C9D6E3', fontFace: BODY, lineSpacing: 16, margin: 0 })
  s.addShape(pres.ShapeType.roundRect, { x: 8.35, y: 4.3, w: 4.35, h: 1.9, fill: { color: SAND }, line: { color: LINE, width: 1 }, rectRadius: 0.08 })
  s.addText('Business model is only 10%,', { x: 8.7, y: 4.5, w: 3.7, h: 0.3, fontSize: 12, bold: true, color: INK, fontFace: BODY, margin: 0 })
  s.addText('but it is the cheapest 10% on the sheet, and removing all sales-model language leaves it answered only obliquely. See open decision B.',
    { x: 8.7, y: 4.82, w: 3.7, h: 1.2, fontSize: 11, color: MUTED, fontFace: BODY, lineSpacing: 14, margin: 0 })
  footer(s)
  s.addNotes('Weights per the Tradewinds evaluation rubric: problem 15%, accelerating the mission 40%, advancing the state of the art 35%, business model 10%.')
}

/* -------------------------------------------------- 4. Requirements check */
{
  const s = newSlide()
  sectionTitle(s, 'Verified against the marketplace package', 'Where the submission stands on spec')
  const rows = [
    ['Runtime', '5:00 hard cap; over-length is not assessed', '4:41', 'OK'],
    ['Resolution', 'HD 1920 x 1080', '1920 x 1080', 'OK'],
    ['Frame rate', '23.98 FPS', 'v1 masters built at 30 fps', 'FIX'],
    ['File', '.mp4, streaming-encoded, under 1 GB', '13 MB', 'OK'],
    ['Colour space', 'Rec709 or sRGB', 'confirm at final encode', 'CHECK'],
    ['Required elements', 'Problem / Mission / State of the art / Business model', 'all four present', 'OK'],
    ['Business model', 'Describe how the model works. No rates or non-public pricing.', 'thin after the removal', 'FIX'],
    ['TRL', 'Must align to the business model', 'TRL 5-6, unconfirmed', 'CHECK'],
    ['Point of contact', 'A responsive contact person, reachable directly', 'placeholder', 'FIX'],
    ['Aisle name', 'SBIR/STTR Aisle of the Solutions Marketplace', 'corrected from "Silver Aisle"', 'OK'],
  ]
  const head = [
    { text: 'REQUIREMENT', options: { bold: true, color: WHITE, fill: { color: BLACK }, fontSize: 10, fontFace: BODY } },
    { text: 'WHAT THE PACKAGE SAYS', options: { bold: true, color: WHITE, fill: { color: BLACK }, fontSize: 10, fontFace: BODY } },
    { text: 'WHERE WE ARE', options: { bold: true, color: WHITE, fill: { color: BLACK }, fontSize: 10, fontFace: BODY } },
    { text: '', options: { fill: { color: BLACK } } },
  ]
  const body = rows.map((r, i) => {
    const bg = i % 2 ? WHITE : SAND
    const tone = r[3] === 'OK' ? FOREST : AMBER
    return [
      { text: r[0], options: { bold: true, color: INK, fill: { color: bg }, fontSize: 10.5, fontFace: BODY } },
      { text: r[1], options: { color: MUTED, fill: { color: bg }, fontSize: 10, fontFace: BODY } },
      { text: r[2], options: { color: INK, fill: { color: bg }, fontSize: 10, fontFace: BODY } },
      { text: r[3], options: { bold: true, color: tone, fill: { color: bg }, fontSize: 9, fontFace: BODY, align: 'center' } },
    ]
  })
  s.addTable([head, ...body], {
    x: 0.6, y: 1.6, w: 12.1, colW: [2.0, 4.9, 3.5, 1.7], rowH: 0.36,
    border: { type: 'solid', color: LINE, pt: 1 }, valign: 'middle', margin: 0.06,
  })
  s.addText('Sources: tradewindai.com/faqs, tradewindai.com/sbir-sttr-aisle, tradewindai.com/tw-marketplace',
    { x: 0.6, y: 5.75, w: 12, h: 0.3, fontSize: 9.5, italic: true, color: MUTED, fontFace: BODY, margin: 0 })
  s.addText('Frame rate was never on our compliance checklist, so it was never checked. Build scripts are corrected; the existing renders are off-spec until rebuilt.',
    { x: 0.6, y: 6.1, w: 12, h: 0.35, fontSize: 11, bold: true, color: AMBER, fontFace: BODY, margin: 0 })
  footer(s)
}

/* ------------------------------------------------------------ 5. Re-timing */
{
  const s = newSlide()
  sectionTitle(s, 'Timing', 'Three shots re-timed, total runtime unchanged')
  const bars = [
    ['Shot 13', 'Auditor-ready package', 16, 18, FOREST],
    ['Shot 16', 'Advancing the state of the art', 18, 21, FOREST],
    ['Shot 18', 'Call to action', 15, 10, AMBER],
  ]
  bars.forEach((b, i) => {
    const y = 1.75 + i * 1.35
    s.addText(b[0], { x: 0.6, y, w: 1.3, h: 0.3, fontSize: 13, bold: true, color: INK, fontFace: BODY, margin: 0 })
    s.addText(b[1], { x: 0.6, y: y + 0.3, w: 2.6, h: 0.3, fontSize: 10.5, color: MUTED, fontFace: BODY, margin: 0 })
    const unit = 0.34
    s.addShape(pres.ShapeType.roundRect, { x: 3.4, y: y - 0.02, w: b[2] * unit, h: 0.34, fill: { color: 'C9D2CD' }, rectRadius: 0.04 })
    s.addText(`was ${b[2]}s`, { x: 3.5 + b[2] * unit, y: y - 0.02, w: 1.2, h: 0.34, fontSize: 10, color: MUTED, fontFace: BODY, valign: 'middle', margin: 0 })
    s.addShape(pres.ShapeType.roundRect, { x: 3.4, y: y + 0.42, w: b[3] * unit, h: 0.34, fill: { color: b[4] }, rectRadius: 0.04 })
    s.addText(`now ${b[3]}s`, { x: 3.5 + b[3] * unit, y: y + 0.42, w: 1.2, h: 0.34, fontSize: 10, bold: true, color: b[4], fontFace: BODY, valign: 'middle', margin: 0 })
  })
  s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 5.85, w: 12.1, h: 0.95, fill: { color: SAND }, line: { color: LINE, width: 1 }, rectRadius: 0.08 })
  s.addText('Net zero. Two beats gained 5 seconds and the call to action gave 5 back, so the cut stays at 4:41 and shots 19 and 20 land on exactly the timecodes they did before. Everything from 2:47 onward shifts; everything before it is untouched.',
    { x: 0.9, y: 6.02, w: 11.6, h: 0.7, fontSize: 12, color: INK, fontFace: BODY, lineSpacing: 16, margin: 0 })
  footer(s)
}

/* --------------------------------------------------- 6+. One slide per shot */
SB.rows.forEach((r) => {
  const s = newSlide()
  const changed = CHANGED[r.shot]
  s.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 0.38, w: 1.5, h: 0.95, fill: { color: changed ? FOREST : BLACK }, rectRadius: 0.08 })
  s.addText(`SHOT ${r.shot}`, { x: 0.5, y: 0.5, w: 1.5, h: 0.3, fontSize: 11, bold: true, color: changed ? LIME : 'FFFFFF', fontFace: BODY, align: 'center', margin: 0 })
  s.addText(`${r.sec}s`, { x: 0.5, y: 0.78, w: 1.5, h: 0.45, fontSize: 20, bold: true, color: WHITE, fontFace: HEAD, align: 'center', margin: 0 })
  s.addText(`${r.inTc} - ${r.outTc}`, { x: 2.2, y: 0.45, w: 3, h: 0.35, fontSize: 17, bold: true, color: INK, fontFace: HEAD, margin: 0 })
  s.addText(r.element, { x: 2.2, y: 0.82, w: 7.4, h: 0.45, fontSize: 11, color: MUTED, fontFace: BODY, margin: 0, lineSpacing: 13 })

  const tags = []
  if (RECAPTURE.has(r.shot)) tags.push('RE-CAPTURE')
  if (REVO.has(r.shot)) tags.push('RE-RECORD VO')
  tags.forEach((t, i) => {
    const w = 1.45
    s.addShape(pres.ShapeType.roundRect, { x: 12.75 - (tags.length - i) * (w + 0.12), y: 0.5, w, h: 0.32, fill: { color: 'FFF1DC' }, line: { color: AMBER, width: 1 }, rectRadius: 0.06 })
    s.addText(t, { x: 12.75 - (tags.length - i) * (w + 0.12), y: 0.5, w, h: 0.32, fontSize: 8.5, bold: true, color: AMBER, fontFace: BODY, align: 'center', valign: 'middle', margin: 0 })
  })

  let y = 1.5
  if (changed) {
    const h = 0.92
    s.addShape(pres.ShapeType.roundRect, { x: 0.5, y, w: 12.25, h, fill: { color: 'FFF1DC' }, line: { color: AMBER, width: 1 }, rectRadius: 0.08 })
    s.addText('CHANGED IN REV 2', { x: 0.78, y: y + 0.1, w: 2.4, h: 0.25, fontSize: 9, bold: true, color: AMBER, fontFace: BODY, charSpacing: 1, margin: 0 })
    s.addText(changed, { x: 0.78, y: y + 0.34, w: 11.7, h: 0.5, fontSize: 11, color: INK, fontFace: BODY, lineSpacing: 14, margin: 0 })
    y += h + 0.22
  }

  // Fit the three blocks to whatever vertical room is left, reserving space for a VO note.
  const voH = 0.66
  const bottom = r.vo ? 6.94 - voH - 0.16 : 6.9
  const avail = bottom - y - 0.4               // two 0.2" gaps
  const heights = [avail * 0.39, avail * 0.26, avail * 0.35]
  const block = (label, text, yy, hh, accent) => {
    s.addShape(pres.ShapeType.roundRect, { x: 0.5, y: yy, w: 12.25, h: hh, fill: { color: accent ? SAND : WHITE }, line: { color: LINE, width: 1 }, rectRadius: 0.08 })
    s.addText(label, { x: 0.78, y: yy + 0.09, w: 3.2, h: 0.24, fontSize: 9, bold: true, color: FOREST, fontFace: BODY, charSpacing: 1, margin: 0 })
    s.addText(text || '-', { x: 0.78, y: yy + 0.34, w: 11.7, h: hh - 0.44, fontSize: 11.5, color: INK, fontFace: BODY, lineSpacing: 15, margin: 0 })
  }
  block('NARRATION (VOICEOVER)', r.script, y, heights[0], true); y += heights[0] + 0.2
  block('TEXT ON SCREEN', r.onscreen, y, heights[1]); y += heights[1] + 0.2
  block('PICTURE / SOURCE', r.visual, y, heights[2])

  if (r.vo) {
    const vy = bottom + 0.16
    s.addShape(pres.ShapeType.roundRect, { x: 0.5, y: vy, w: 12.25, h: voH, fill: { color: BLACK }, rectRadius: 0.06 })
    s.addText([
      { text: 'VO NOTE   ', options: { bold: true, color: LIME, fontSize: 9 } },
      { text: r.vo, options: { color: 'E6ECE9', fontSize: 9.5 } },
    ], { x: 0.78, y: vy + 0.06, w: 11.7, h: voH - 0.12, fontFace: BODY, valign: 'middle', lineSpacing: 11.5, margin: 0 })
  }
  footer(s)
  s.addNotes(`Shot ${r.shot}. ${r.inTc}-${r.outTc}, ${r.sec}s. Narrator: ${r.narrator}.` +
    (changed ? ` CHANGED: ${changed}` : ' Unchanged from Rev 1.'))
})

/* ------------------------------------------------------------- Redline */
{
  const s = newSlide()
  sectionTitle(s, 'Appendix', 'Narration redline, before and after')
  const shots = [13, 15, 16, 17, 18, 19]
  let y = 1.66
  shots.forEach((n) => {
    const cur = SB.rows.find((r) => r.shot === n)
    const prev = OLD[String(n)]
    const h = 0.80
    s.addText(`SHOT ${n}`, { x: 0.5, y: y + 0.04, w: 0.95, h: 0.3, fontSize: 10, bold: true, color: FOREST, fontFace: BODY, margin: 0 })
    s.addText(prev.script, { x: 1.5, y, w: 5.4, h, fontSize: 8.6, color: MUTED, italic: true, fontFace: BODY, lineSpacing: 10.5, margin: 0 })
    s.addText(cur.script, { x: 7.15, y, w: 5.6, h, fontSize: 8.6, color: INK, fontFace: BODY, lineSpacing: 10.5, margin: 0 })
    y += h + 0.05
  })
  s.addText('REV 1', { x: 1.5, y: 1.36, w: 2, h: 0.24, fontSize: 9, bold: true, color: MUTED, fontFace: BODY, margin: 0 })
  s.addText('REV 2', { x: 7.15, y: 1.36, w: 2, h: 0.24, fontSize: 9, bold: true, color: FOREST, fontFace: BODY, margin: 0 })
  footer(s)
}

/* -------------------------------------------------------- Production to-do */
{
  const s = newSlide()
  s.background = { color: BLACK }
  s.addText('FOR PRODUCTION', { x: 0.6, y: 0.5, w: 8, h: 0.3, fontSize: 11, bold: true, color: LIME, fontFace: BODY, charSpacing: 2, margin: 0 })
  s.addText('What has to be redone', { x: 0.6, y: 0.85, w: 11, h: 0.6, fontSize: 32, bold: true, color: WHITE, fontFace: HEAD, margin: 0 })
  const todo = [
    ['1', 'Re-capture the product footage', 'Shots 4, 5, 13, 15, 16, 18 all changed on screen. Re-shooting the full pass is simpler than patching. capture-live-product.js against the app on :5180, then build-live-product.sh (shot durations already updated).'],
    ['2', 'Re-record the voiceover from 2:47 onward', 'Shots 13, 15, 16, 17, 18, 19. Shots 1 to 12 are unchanged and those takes still work. SBIR is said as a word: "SY-ber", never spelled out.'],
    ['3', 'Re-render the TRL / SBIR badge card (Shot 17)', 'TRL reads 5-6. Remove "subscription-based" from the card.'],
    ['4', 'Re-render the closing CTA card (Shot 19)', 'Aisle name reads "CDAO Tradewinds Solutions Marketplace, SBIR/STTR Aisle". Named POC and email replace the placeholder.'],
    ['5', 'Re-render every master at 23.976 fps', 'The spec is 23.98 FPS. All v1 masters are 30 fps and off-spec. Build scripts are corrected; verify the output frame rate on the first rebuild.'],
    ['6', 'Re-shoot the reference stills', 'The strip frames in docs/video-frames and docs/demo-walkthrough still show OSW Comptroller and the subscription strip.'],
  ]
  todo.forEach((t, i) => {
    const y = 1.72 + i * 0.87
    s.addShape(pres.ShapeType.ellipse, { x: 0.6, y: y + 0.04, w: 0.4, h: 0.4, fill: { color: LIME } })
    s.addText(t[0], { x: 0.6, y: y + 0.04, w: 0.4, h: 0.4, fontSize: 13, bold: true, color: BLACK, fontFace: BODY, align: 'center', valign: 'middle', margin: 0 })
    s.addText(t[1], { x: 1.2, y, w: 5.1, h: 0.5, fontSize: 12.5, bold: true, color: WHITE, fontFace: BODY, lineSpacing: 15, margin: 0 })
    s.addText(t[2], { x: 6.45, y, w: 6.3, h: 0.8, fontSize: 10, color: 'B9C4BF', fontFace: BODY, lineSpacing: 12.5, margin: 0 })
  })
  s.addNotes('Hand this slide to the production team with the shot slides. The build scripts referenced live in docs/video-master/ in the FM-future repo.')
}

/* ------------------------------------------------------- Open decisions */
{
  const s = newSlide()
  sectionTitle(s, 'Before the re-record', 'Six decisions that need a person')
  const rows = [
    ['A', 'Are the Army and ATC cleared to name on screen?', 'Removing OSW leaves a two-client claim. If the reason was clearance rather than accuracy, the other two may carry the same issue.', 'Angel / Bizrat'],
    ['B', 'Business model: put one clause back?', 'The element asks us to describe how the model works. The removed line described structure, not price, and carried no rates. Recommend one unpriced clause in Shot 18.', 'Angel'],
    ['C', 'POC name, email, and an alternate', 'The card cannot ship with a placeholder. The package also asks for a responsive contact reachable directly.', 'Bizrat / Angel'],
    ['D', 'Send the approved PPBE video', 'Needed for the cadence and narration pass. Best done once, after the content above is settled.', 'Angel'],
    ['E', 'Confirm TRL 5-6', 'The badge already shows it, and the business model and the TRL are required to align.', 'Sean / Angel'],
    ['F', 'Re-render all masters at 23.976 fps', 'The v1 renders are 30 fps and off-spec.', 'Jeff'],
  ]
  const head = ['', 'DECISION', 'WHY IT MATTERS', 'OWNER'].map((h) => ({
    text: h, options: { bold: true, color: WHITE, fill: { color: BLACK }, fontSize: 10, fontFace: BODY },
  }))
  const body = rows.map((r, i) => {
    const bg = i % 2 ? WHITE : SAND
    return [
      { text: r[0], options: { bold: true, color: FOREST, fill: { color: bg }, fontSize: 13, fontFace: HEAD, align: 'center' } },
      { text: r[1], options: { bold: true, color: INK, fill: { color: bg }, fontSize: 10.5, fontFace: BODY } },
      { text: r[2], options: { color: MUTED, fill: { color: bg }, fontSize: 9.5, fontFace: BODY } },
      { text: r[3], options: { color: INK, fill: { color: bg }, fontSize: 10, fontFace: BODY } },
    ]
  })
  s.addTable([head, ...body], {
    x: 0.5, y: 1.6, w: 12.3, colW: [0.6, 3.5, 6.2, 2.0], rowH: 0.62,
    border: { type: 'solid', color: LINE, pt: 1 }, valign: 'middle', margin: 0.08,
  })
  footer(s)
}

const OUT = 'docs/FM-Future_Storyboard_Rev2.pptx'
pres.writeFile({ fileName: OUT }).then(() => console.log('wrote', OUT))
