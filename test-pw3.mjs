import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:4200/input', { waitUntil: 'networkidle' });

  const cssText = await page.evaluate(() => {
    let rules = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText && rule.selectorText.includes('.alf-input') && rule.cssText.includes('outline')) {
            rules.push({ selector: rule.selectorText, css: rule.cssText });
          }
        }
      } catch(e) {}
    }
    return rules;
  });
  
  console.log(JSON.stringify(cssText, null, 2));

  await browser.close();
})();
