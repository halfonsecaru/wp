import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:4200/input', { waitUntil: 'networkidle' });

  // Let's set some hover styles via JS
  await page.evaluate(() => {
    const el = document.querySelector('.alf-input');
    el.style.setProperty('--alf-inp-outline-width', '2px');
    el.style.setProperty('--alf-inp-outline-style', 'solid');
    el.style.setProperty('--alf-inp-outline-color', 'transparent');
    
    el.style.setProperty('--alf-inp-outline-hover-color', 'red');
    el.style.setProperty('--alf-inp-outline-hover-width', '4px');
    
    // Add an explicit id so we can query pseudo element rules
    el.id = 'test-input';
    window.testEl = el;
  });

  const box = await page.locator('.alf-input').first().boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(200);

  const cssText = await page.evaluate(() => {
    // Traverse all stylesheets to find rules matching #test-input:hover or .alf-input:hover
    let rules = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText && rule.selectorText.includes('.alf-input:hover')) {
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
