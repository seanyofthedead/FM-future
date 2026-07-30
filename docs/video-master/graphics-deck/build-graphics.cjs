/**
 * Produced on-screen graphics for the Tradewinds submission video.
 * One slide per card, exactly as it appears on screen. 16:9, brand-dark.
 *
 * Shot number, timecode and the narration line it sits under are in the SPEAKER
 * NOTES of each slide, so the visible slide stays clean for review.
 *
 *   npm install --no-save pptxgenjs react-icons react react-dom sharp
 *   node docs/video-master/graphics-deck/build-graphics.cjs
 */
const pptxgen = require('pptxgenjs')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const sharp = require('sharp')
const fa = require('react-icons/fa')

// Brand: Guidehouse black + Guidehouse Green. Forest is the on-white green and is
// deliberately unused here because every card is a dark surface.
const BG = '111111', PANEL = '1B1B1B', LIME = '93D500', WHITE = 'FFFFFF'
const MUTED = '9BA39C', DIM = '6E7670', PILL = '2F7D32'
const HEAD = 'Calibri', BODY = 'Calibri'

const pres = new pptxgen()
pres.layout = 'LAYOUT_WIDE' // 13.33 x 7.5, 16:9
pres.author = 'Guidehouse'
pres.title = 'FM of the Future - Tradewinds video graphics'

async function icon(Cmp, color) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Cmp, { color, size: 256, style: { color } }))
  const buf = await sharp(Buffer.from(svg)).resize(256, 256, {
    fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 },
  }).png().toBuffer()
  return 'image/png;base64,' + buf.toString('base64')
}

// The Guidehouse Acon: two pillars converging on an apex. White + Guidehouse Green
// on dark, per the brand's dark-background treatment.
async function acon(h) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 26" width="440" height="520">
    <path d="M11 1.5 L11 16 L3.5 24.5 Z" fill="#ffffff"/>
    <path d="M11 1.5 L18.5 24.5 L11 16 Z" fill="#93D500"/></svg>`
  const buf = await sharp(Buffer.from(svg)).png().toBuffer()
  return { data: 'image/png;base64,' + buf.toString('base64'), w: (h * 22) / 26, h }
}

function lockup(s, mark, x, y, h = 0.42) {
  s.addImage({ data: mark.data, x, y, w: (h * 22) / 26, h })
  s.addText('Guidehouse', {
    x: x + (h * 22) / 26 + 0.12, y: y - 0.03, w: 1.7, h: h + 0.06,
    fontSize: 19, bold: true, color: WHITE, fontFace: HEAD, valign: 'middle', margin: 0,
  })
}

function eyebrow(s, text, x = 0.85, y = 0.62) {
  s.addText(text.toUpperCase(), {
    x, y, w: 8, h: 0.3, fontSize: 12, bold: true, color: LIME,
    fontFace: BODY, charSpacing: 3.5, margin: 0,
  })
}

async function build() {
  const mark = await acon(0.42)
  const [icStop, icShield, icScale] = await Promise.all(
    [fa.FaStopwatch, fa.FaShieldAlt, fa.FaLayerGroup].map((c) => icon(c, '#93D500')))
  const [icClock, icFlag, icSearch] = await Promise.all(
    [fa.FaRegClock, fa.FaExclamationTriangle, fa.FaSearch].map((c) => icon(c, '#93D500')))

  /* ============================================================ 1. Cold open */
  {
    const s = pres.addSlide()
    s.background = { color: BG }
    lockup(s, mark, 10.85, 0.6)
    s.addText([
      { text: 'Financial Management\n', options: { color: WHITE } },
      { text: 'of the Future', options: { color: WHITE, bold: true } },
    ], { x: 0.85, y: 2.15, w: 10.5, h: 2.1, fontSize: 58, fontFace: HEAD, lineSpacing: 66, margin: 0 })
    s.addText('Audit-ready, every day.', {
      x: 0.85, y: 4.45, w: 9, h: 0.6, fontSize: 26, color: LIME, fontFace: HEAD, margin: 0 })
    s.addText('Solving one of the hardest problems in federal financial management.', {
      x: 0.85, y: 5.25, w: 9.5, h: 0.5, fontSize: 16, color: MUTED, fontFace: BODY, margin: 0 })
    s.addNotes('SHOT 1 | 0:00-0:08 | 8s | Element 1, Defining the Problem.\n' +
      'VO: "We\'re Guidehouse, and we\'re here to show you how we\'re solving one of the hardest ' +
      'problems in federal financial management."\nProduced cold open. No on-camera presenter.')
  }

  /* ========================================================= 2. The cost of it */
  {
    const s = pres.addSlide()
    s.background = { color: BG }
    lockup(s, mark, 10.85, 0.6)
    eyebrow(s, 'The cost of audit readiness')
    s.addText([
      { text: 'It shows up ', options: { color: WHITE } },
      { text: 'everywhere.', options: { color: LIME, bold: true } },
    ], { x: 0.85, y: 1.25, w: 9.5, h: 0.9, fontSize: 44, fontFace: HEAD, margin: 0 })
    const cols = [
      [icClock, 'Cycle time', 'Records requests bounce between inboxes for weeks.'],
      [icFlag, 'Audit findings', 'Seven straight disclaimers of opinion since 2018.'],
      [icSearch, 'Lost analyst hours', 'Weeks spent searching shared drives instead of doing analysis.'],
    ]
    cols.forEach(([ic, title, sub], i) => {
      const x = 0.85 + i * 3.95
      s.addShape(pres.ShapeType.roundRect, { x, y: 2.55, w: 3.6, h: 2.75, fill: { color: PANEL }, rectRadius: 0.1 })
      s.addImage({ data: ic, x: x + 0.35, y: 2.95, w: 0.55, h: 0.55 })
      s.addText(title, { x: x + 0.35, y: 3.68, w: 3, h: 0.4, fontSize: 20, bold: true, color: WHITE, fontFace: HEAD, margin: 0 })
      s.addText(sub, { x: x + 0.35, y: 4.14, w: 2.95, h: 1.0, fontSize: 13, color: MUTED, fontFace: BODY, lineSpacing: 17, margin: 0 })
    })
    s.addText('$4.1T in assets under audit  ·  audit work exceeding $1B a year', {
      x: 0.85, y: 5.65, w: 11, h: 0.35, fontSize: 15, color: WHITE, fontFace: BODY, margin: 0 })
    s.addText('Source: DoD FY2024 Financial Statement Audit, DoD Office of Inspector General', {
      x: 0.85, y: 6.05, w: 11, h: 0.3, fontSize: 11, italic: true, color: DIM, fontFace: BODY, margin: 0 })
    s.addNotes('SHOT 3 | 0:28-0:46 | 18s | Element 1, applicability and impact.\n' +
      'VO: "The cost shows up everywhere, in cycle time, in audit findings, and in analysts who spend ' +
      'their week searching shared drives instead of doing real analysis..."\n' +
      'Motion: three cost icons, then widen from one desk to a grid of agencies. Transition lifts from ' +
      'desaturated into the brand palette.')
  }

  /* ============================================== 3. Readiness and acquisition */
  {
    const s = pres.addSlide()
    s.background = { color: BG }
    lockup(s, mark, 10.85, 0.6)
    eyebrow(s, 'Readiness & acquisition')

    // TRL ring
    s.addShape(pres.ShapeType.ellipse, { x: 0.95, y: 1.55, w: 3.0, h: 3.0, fill: { color: PANEL }, line: { color: LIME, width: 2.5 } })
    s.addText('TRL', { x: 0.95, y: 2.0, w: 3.0, h: 0.3, fontSize: 13, bold: true, color: LIME, fontFace: BODY, align: 'center', charSpacing: 2, margin: 0 })
    s.addText('5-6', { x: 0.95, y: 2.28, w: 3.0, h: 1.14, fontSize: 60, bold: true, color: WHITE, fontFace: HEAD, align: 'center', margin: 0 })
    s.addText('System validated in\na relevant environment', { x: 1.05, y: 3.46, w: 2.8, h: 0.7, fontSize: 11, color: MUTED, fontFace: BODY, align: 'center', lineSpacing: 14, margin: 0 })

    s.addText('A proven, production-deployed product', {
      x: 4.55, y: 1.6, w: 8, h: 0.35, fontSize: 15, bold: true, color: LIME, fontFace: BODY, margin: 0 })
    s.addText([
      { text: 'Mature technology,\n', options: { color: WHITE } },
      { text: 'ready to acquire.', options: { color: WHITE, bold: true } },
    ], { x: 4.55, y: 2.05, w: 8.2, h: 1.6, fontSize: 42, fontFace: HEAD, lineSpacing: 50, margin: 0 })
    s.addShape(pres.ShapeType.roundRect, { x: 4.55, y: 3.78, w: 4.75, h: 0.55, fill: { color: PILL }, rectRadius: 0.12 })
    s.addShape(pres.ShapeType.ellipse, { x: 4.8, y: 3.99, w: 0.14, h: 0.14, fill: { color: LIME } })
    s.addText('SBIR Phase III  ·  Sole-source eligible', {
      x: 5.05, y: 3.78, w: 4.2, h: 0.55, fontSize: 15, bold: true, color: WHITE, fontFace: BODY, valign: 'middle', margin: 0 })

    const pillars = [
      [icStop, 'Proven', 'In production across federal missions'],
      [icShield, 'Defensible', 'Provenance on every delivered line'],
      [icScale, 'Scalable', 'One program to an enterprise audit'],
    ]
    pillars.forEach(([ic, title, sub], i) => {
      const x = 0.95 + i * 4.05
      s.addImage({ data: ic, x, y: 5.25, w: 0.42, h: 0.42 })
      s.addText(title, { x: x + 0.6, y: 5.2, w: 3.2, h: 0.32, fontSize: 17, bold: true, color: WHITE, fontFace: HEAD, margin: 0 })
      s.addText(sub, { x: x + 0.6, y: 5.54, w: 3.3, h: 0.6, fontSize: 12, color: MUTED, fontFace: BODY, lineSpacing: 15, margin: 0 })
    })
    s.addNotes('SHOT 17 | 3:52-4:10 | 18s | Element 4, Business Model and TRL.\n' +
      'VO: "The business model is built for fast adoption: a mature, deployable product at Technology ' +
      'Readiness Level five to six, validated in a relevant environment. We acquired the AFRL SBIR topic, ' +
      'and as successor-in-interest Guidehouse is eligible for SBIR Phase Three award, sole-source, in ' +
      'weeks, not years."\nPRONUNCIATION: SBIR is said as a word, "SY-ber". Never spelled out. Say ' +
      '"Phase Three", not "Phase I-I-I".\nMotion: acquired SBIR topic, then the Phase III badge, then ' +
      'the sole-source chip. Three-icon row resolves last.')
  }

  /* ============================================================ 4. Get in touch */
  {
    const s = pres.addSlide()
    s.background = { color: BG }
    lockup(s, mark, 10.85, 0.6)
    eyebrow(s, 'Get in touch')
    s.addText([
      { text: 'Financial Management\n', options: { color: WHITE } },
      { text: 'of the Future', options: { color: WHITE, bold: true } },
    ], { x: 0.85, y: 1.35, w: 8.2, h: 1.75, fontSize: 46, fontFace: HEAD, lineSpacing: 54, margin: 0 })
    s.addText([
      { text: 'Audit-ready, ', options: { color: WHITE } },
      { text: 'every day.', options: { color: LIME, bold: true } },
    ], { x: 0.85, y: 3.2, w: 8, h: 0.55, fontSize: 25, fontFace: HEAD, margin: 0 })
    s.addText('Agentic Reconciliation and the PBC Request Agent: one product, one audit-ready pipeline, running in production today.', {
      x: 0.85, y: 3.9, w: 6.2, h: 0.9, fontSize: 14, color: MUTED, fontFace: BODY, lineSpacing: 20, margin: 0 })

    s.addText('FIND US ON', { x: 0.85, y: 5.0, w: 4, h: 0.28, fontSize: 11, bold: true, color: LIME, fontFace: BODY, charSpacing: 2.5, margin: 0 })
    s.addText('CDAO Tradewinds Solutions Marketplace', { x: 0.85, y: 5.3, w: 6, h: 0.32, fontSize: 16, bold: true, color: WHITE, fontFace: BODY, margin: 0 })
    s.addText('SBIR/STTR Aisle', { x: 0.85, y: 5.64, w: 6, h: 0.3, fontSize: 15, color: MUTED, fontFace: BODY, margin: 0 })

    s.addText('CONTACT', { x: 7.4, y: 5.0, w: 4, h: 0.28, fontSize: 11, bold: true, color: LIME, fontFace: BODY, charSpacing: 2.5, margin: 0 })
    s.addText('[POINT OF CONTACT NAME]', { x: 7.4, y: 5.3, w: 4.2, h: 0.32, fontSize: 16, bold: true, color: WHITE, fontFace: BODY, margin: 0 })
    s.addText('[name@guidehouse.com]  ·  [phone]', { x: 7.4, y: 5.64, w: 4.6, h: 0.3, fontSize: 15, color: MUTED, fontFace: BODY, margin: 0 })

    // QR placeholder: swap this square for the marketplace QR when it is issued.
    s.addShape(pres.ShapeType.roundRect, { x: 11.15, y: 3.35, w: 1.45, h: 1.45, fill: { color: PANEL }, line: { color: DIM, width: 1 }, rectRadius: 0.06 })
    s.addText('QR', { x: 11.15, y: 3.85, w: 1.45, h: 0.45, fontSize: 15, bold: true, color: DIM, fontFace: BODY, align: 'center', margin: 0 })
    s.addNotes('SHOT 19 | 4:20-4:34 | 14s | Close, call to action.\n' +
      'VO: "Find Financial Management of the Future on the CDAO Tradewinds Solutions Marketplace, in the ' +
      'SBIR Aisle. Bring your hardest reconciliation and your messiest records, we\'ll show you what the ' +
      'agents do with them."\nPRONUNCIATION: reads "the SY-ber aisle". The aisle is the SBIR/STTR Aisle; ' +
      'there is no "Silver Aisle".\nTO FILL BEFORE RENDER: named point of contact, email and phone, plus ' +
      'an alternate POC. Swap the placeholder square for the marketplace QR.')
  }

  /* =============================================================== 5. End card */
  {
    const s = pres.addSlide()
    s.background = { color: BG }
    const big = await acon(1.55)
    s.addImage({ data: big.data, x: 5.35, y: 2.15, w: big.w, h: big.h })
    s.addText('Guidehouse', { x: 3.67, y: 4.0, w: 6, h: 0.7, fontSize: 40, bold: true, color: WHITE, fontFace: HEAD, align: 'center', margin: 0 })
    s.addText('Mission-ready innovation.  Audit-ready every day.', {
      x: 3.17, y: 4.85, w: 7, h: 0.4, fontSize: 17, color: LIME, fontFace: BODY, align: 'center', margin: 0 })
    s.addNotes('SHOT 20 | 4:34-4:41 | 7s | Close.\n' +
      'VO: "Guidehouse. Mission-ready innovation, audit-ready every day."\n' +
      'Final logo lockup on the brand background, fade to black. Optional short audio sting.')
  }

  const OUT = 'docs/FM-Future_Video-Graphics.pptx'
  await pres.writeFile({ fileName: OUT })
  console.log('wrote', OUT)
}

build().catch((e) => { console.error(e); process.exit(1) })
