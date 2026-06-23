// Capture the 14 product shots from the live app at true 1920x1080 via Playwright.
// Each shot: fresh context (own video), deep-link, wait for the demo animation to
// settle, scroll the target state into view, dwell (duration + lead), close.
// The lead seconds are front-trimmed later by ffmpeg so each clip is the clean
// settled/scrolled state for exactly its storyboard duration.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE || "http://localhost:5184";
const OUTDIR = process.env.OUTDIR || "C:/Users/peder/.fmbuild/caps";
const LEAD = 2.0; // seconds of lead-in (load+scroll+settle tail) trimmed later

// settle = ms to wait after goto for the guided-demo animation to finish before scrolling.
const SHOTS = [
  { id: "p04", dur: 15, url: "/", scroll: "top", settle: 1500 },
  { id: "p05", dur: 14, url: "/", scroll: "Auditor", settle: 1500 },
  { id: "p06", dur: 14, url: "/reconciliation", scroll: "top", settle: 1500 },
  {
    id: "p07",
    dur: 13,
    url: "/reconciliation?autorun=1",
    scroll: "top",
    settle: 3800,
  },
  {
    id: "p08",
    dur: 13,
    url: "/reconciliation?autorun=1",
    scroll: "Review queue",
    settle: 3800,
  },
  {
    id: "p09",
    dur: 12,
    url: "/reconciliation?autorun=1",
    scroll: "Clean reconciliation, ready for the auditor",
    settle: 3800,
  },
  {
    id: "p10",
    dur: 12,
    url: "/pbc?from=TX-1000043&autorun=1",
    scroll: "top",
    settle: 6500,
  },
  {
    id: "p11",
    dur: 12,
    url: "/pbc?from=TX-1000043&autorun=1",
    scroll: "Submit a request",
    settle: 6500,
  },
  {
    id: "p12",
    dur: 16,
    url: "/pbc?from=TX-1000043&autorun=1",
    scroll: "Retrieved sources",
    settle: 6500,
  },
  {
    id: "p13",
    dur: 16,
    url: "/pbc?from=TX-1000043&autorun=1",
    scroll: "Delivered in minutes",
    settle: 6500,
  },
  { id: "p14", dur: 10, url: "/lineage", scroll: "top", settle: 1800 },
  { id: "p15", dur: 16, url: "/", scroll: "In production today", settle: 1500 },
  {
    id: "p16",
    dur: 18,
    url: "/",
    scroll: "Built on accredited building blocks",
    settle: 1500,
  },
  {
    id: "p18",
    dur: 15,
    url: "/",
    scroll: "Offered as a subscription",
    settle: 1500,
  },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  fs.mkdirSync(OUTDIR, { recursive: true });
  let browser;
  try {
    browser = await chromium.launch({ channel: "msedge", headless: true });
  } catch (e) {
    console.error(
      "msedge channel failed:",
      e.message,
      "\nRun: npx playwright install chromium",
    );
    process.exit(2);
  }
  const ONLY = process.env.ONLY ? process.env.ONLY.split(",") : null;
  const manifest = [];
  for (const s of SHOTS) {
    if (ONLY && !ONLY.includes(s.id)) continue;
    const ctx = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
      recordVideo: { dir: OUTDIR, size: { width: 1920, height: 1080 } },
    });
    const page = await ctx.newPage();
    // The app uses HashRouter, so non-root routes live after the '#'.
    const target = s.url === "/" ? BASE + "/" : BASE + "/#" + s.url;
    await page.goto(target, { waitUntil: "networkidle" }).catch(() => {});
    await sleep(s.settle);
    if (s.scroll === "top") {
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
    } else {
      try {
        const loc = page.getByText(s.scroll, { exact: false }).first();
        await loc.scrollIntoViewIfNeeded({ timeout: 4000 });
        // Center the target so small strips aren't jammed against an edge.
        await loc.evaluate((el) =>
          el.scrollIntoView({ block: "center", behavior: "instant" }),
        );
      } catch (e) {
        console.error(
          `  [${s.id}] scroll target "${s.scroll}" not found: ${e.message}`,
        );
      }
    }
    await sleep(300);
    await sleep((s.dur + LEAD) * 1000); // dwell on the settled, scrolled state
    const vp = await page.video().path();
    await ctx.close(); // finalizes the webm
    const dest = path.join(OUTDIR, s.id + ".webm");
    fs.renameSync(vp, dest);
    manifest.push({ id: s.id, dur: s.dur, lead: LEAD, file: dest });
    console.log(`  captured ${s.id} (${s.dur}s) <- ${s.url} @ "${s.scroll}"`);
  }
  await browser.close();
  fs.writeFileSync(
    path.join(OUTDIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
  );
  console.log("CAPTURE DONE", manifest.length, "shots");
})().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});
