import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE_URL = 'http://localhost:5180';
const OUT_DIR = '/tmp/lara-audit-v2';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function runFullAudit() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const routes = ['/', '/about', '/treatments', '/doctors', '/gallery', '/contact'];
  const viewports = [
    { width: 320, height: 568, name: '320px' },
    { width: 375, height: 667, name: '375px' },
    { width: 390, height: 844, name: '390px' },
    { width: 414, height: 896, name: '414px' },
    { width: 768, height: 1024, name: '768px' },
    { width: 1024, height: 768, name: '1024px' },
    { width: 1440, height: 900, name: '1440px' },
    { width: 1920, height: 1080, name: '1920px' }
  ];

  const results = {
    overflows: [],
    errors: [],
    tests: {},
    screenshots: []
  };

  // 1. Viewport & Overflow Tests
  for (const vp of viewports) {
    for (const route of routes) {
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height });

      page.on('console', msg => {
        if (msg.type() === 'error') {
          results.errors.push(`[${route} @ ${vp.name}] CONSOLE ERROR: ${msg.text()}`);
        }
      });

      page.on('pageerror', err => {
        results.errors.push(`[${route} @ ${vp.name}] PAGE ERROR: ${err.message}`);
      });

      try {
        await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle2', timeout: 10000 });
        await new Promise(r => setTimeout(r, 600));

        // Check horizontal overflow
        const overflow = await page.evaluate(() => {
          const docWidth = document.documentElement.clientWidth;
          const scrollWidth = document.documentElement.scrollWidth;
          const bodyScrollWidth = document.body.scrollWidth;
          return {
            docWidth,
            scrollWidth,
            bodyScrollWidth,
            hasOverflow: scrollWidth > docWidth || bodyScrollWidth > docWidth
          };
        });

        if (overflow.hasOverflow) {
          results.overflows.push({
            route,
            viewport: vp.name,
            details: overflow
          });
        }

        // Take representative screenshots at 1440px and 390px
        if (vp.width === 1440 || vp.width === 390) {
          const cleanRoute = route === '/' ? 'home' : route.replace('/', '');
          const filename = `${cleanRoute}-${vp.name}-full.png`;
          const filepath = path.join(OUT_DIR, filename);
          await page.screenshot({ path: filepath, fullPage: true });
          results.screenshots.push({ route, viewport: vp.name, path: filepath });
        }
      } catch (err) {
        results.errors.push(`[${route} @ ${vp.name}] LOAD ERROR: ${err.message}`);
      } finally {
        await page.close();
      }
    }
  }

  // 2. Functional Test: Appointment Modal
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    // Click navbar Book Appointment button
    const bookBtn = await page.$('button[aria-label="Book Dental Appointment"]');
    if (bookBtn) {
      await bookBtn.click();
      await new Promise(r => setTimeout(r, 500));
      const isModalVisible = await page.evaluate(() => {
        return !!document.querySelector('form') && document.body.innerText.includes('Book Consultation');
      });
      results.tests.appointmentModal = isModalVisible ? 'PASSED' : 'FAILED';
    } else {
      results.tests.appointmentModal = 'BUTTON_NOT_FOUND';
    }
    await page.close();
  }

  // 3. Functional Test: Mobile Menu Toggle
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    const toggleBtn = await page.$('button[aria-label="Toggle Navigation Menu"]');
    if (toggleBtn) {
      await toggleBtn.click();
      await new Promise(r => setTimeout(r, 400));
      const isDrawerOpen = await page.evaluate(() => {
        return !!document.querySelector('[role="dialog"]');
      });
      results.tests.mobileMenuToggle = isDrawerOpen ? 'PASSED' : 'FAILED';
    } else {
      results.tests.mobileMenuToggle = 'TOGGLE_NOT_FOUND';
    }
    await page.close();
  }

  // 4. Functional Test: Lara AI Assistant Chat
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    const aiBtn = await page.$('button[title="Ask Lara AI Dental Assistant"]');
    if (aiBtn) {
      await aiBtn.click();
      await new Promise(r => setTimeout(r, 500));
      const isChatWindowOpen = await page.evaluate(() => {
        return document.body.innerText.includes('Lara AI') && !!document.querySelector('input, textarea');
      });
      results.tests.aiAssistantOpen = isChatWindowOpen ? 'PASSED' : 'FAILED';
    } else {
      results.tests.aiAssistantOpen = 'AI_BTN_NOT_FOUND';
    }
    await page.close();
  }

  // 5. Functional Test: Contact Form Validation & WhatsApp URL
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 600));

    // Submit empty form to trigger validation
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
      await new Promise(r => setTimeout(r, 300));
      const hasErrors = await page.evaluate(() => {
        return document.body.innerText.includes('required') || document.body.innerText.includes('Select treatment');
      });
      results.tests.contactFormValidation = hasErrors ? 'PASSED' : 'FAILED';
    }
    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

runFullAudit();
