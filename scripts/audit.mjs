import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:5180';
const OUT_DIR = '/tmp/lara-audit';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function audit() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const routes = ['/', '/about', '/treatments', '/doctors', '/gallery', '/contact'];
  const viewports = [
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'mobile-390', width: 390, height: 844 }
  ];

  const results = {
    errors: [],
    pages: []
  };

  for (const vp of viewports) {
    for (const route of routes) {
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height });

      page.on('console', msg => {
        if (msg.type() === 'error') {
          results.errors.push(`[${route} ${vp.name}] ${msg.text()}`);
        }
      });
      page.on('pageerror', err => {
        results.errors.push(`[${route} ${vp.name}] PAGEERROR: ${err.message}`);
      });

      try {
        await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle2', timeout: 15000 });
        // wait extra 1s for preloader / transitions
        await new Promise(r => setTimeout(r, 1200));

        const cleanRouteName = route === '/' ? 'home' : route.replace('/', '');
        const filename = `${cleanRouteName}-${vp.name}.png`;
        const filepath = path.join(OUT_DIR, filename);
        await page.screenshot({ path: filepath, fullPage: false });

        results.pages.push({
          route,
          viewport: vp.name,
          screenshot: filepath
        });
      } catch (err) {
        results.errors.push(`[${route} ${vp.name}] LOAD_FAIL: ${err.message}`);
      } finally {
        await page.close();
      }
    }
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

audit();
