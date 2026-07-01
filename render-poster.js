const { chromium } = require('/Users/viktor/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
const path = require('path');

// Usage:
//   node render-poster.js [date] [recurrence] [scale]
//
//   date        YYYY-MM-DD of the event. Omit to auto-use the next 2nd Tuesday.
//   recurrence  Overrides the "Wann" line (default: "Am zweiten Dienstag des Monats").
//   scale       Pixel density of the export (default 3 → 2400×2400 px).
//
// Examples:
//   node render-poster.js                       → poster.jpg (auto date)
//   node render-poster.js 2026-07-08            → poster-2026-07-08.jpg
//   node render-poster.js 2026-07-08 "Ausnahmsweise am 8. Juli"

(async () => {
  const date  = process.argv[2] || '';
  const recur = process.argv[3] || '';
  const scale = parseFloat(process.argv[4] || '3');

  const params = new URLSearchParams();
  if (date)  params.set('date', date);
  if (recur) params.set('recur', recur);
  const query = params.toString();

  const out = date ? `poster-${date}.jpg` : 'poster.jpg';

  const browser = await chromium.launch();
  const context = await browser.newContext({ deviceScaleFactor: scale });
  const page = await context.newPage();
  await page.setViewportSize({ width: 800, height: 800 });
  await page.goto('file://' + path.resolve('poster.html') + (query ? '?' + query : ''));
  await page.waitForTimeout(2000);
  await page.screenshot({ path: out, fullPage: true });
  await browser.close();
  console.log(`Saved ${out} at ${scale}x scale`);
})();
