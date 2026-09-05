// Local rendering of the three review drafts; no production-site mutation.
const { chromium } = require('/Users/hbm/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('node:path');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const report = [];
  for (const name of ['a-paper', 'b-journal', 'c-ink']) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('file://' + path.join(__dirname, name + '.html'));
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(__dirname, name + '.png') });
    await page.screenshot({ path: path.join(__dirname, name + '-full.png'), fullPage: true });
    const desktop = await page.evaluate(() => ({ width: innerWidth, content: document.documentElement.scrollWidth }));
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: path.join(__dirname, name + '-mobile.png'), fullPage: true });
    const mobile = await page.evaluate(() => ({ width: innerWidth, content: document.documentElement.scrollWidth }));
    report.push({ name, desktop, mobile, errors });
    await page.close();
  }
  fs.writeFileSync(path.join(__dirname, 'render-report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report));
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
