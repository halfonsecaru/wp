import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:4200/input', { waitUntil: 'networkidle' });

  // Let's set some hover styles via JS to test the CSS architecture directly
  await page.evaluate(() => {
    const el = document.querySelector('.alf-input');
    // Set base outline
    el.style.setProperty('--alf-inp-outline-width', '2px');
    el.style.setProperty('--alf-inp-outline-style', 'solid');
    el.style.setProperty('--alf-inp-outline-color', 'transparent');
    
    // Set hover outline
    el.style.setProperty('--alf-inp-outline-hover-color', 'red');
    el.style.setProperty('--alf-inp-outline-hover-width', '4px');
    
    // Check if the variable is correctly read
    window.testEl = el;
  });

  const baseWidth = await page.evaluate(() => window.getComputedStyle(window.testEl).outlineWidth);
  const baseColor = await page.evaluate(() => window.getComputedStyle(window.testEl).outlineColor);
  console.log('Base -> width:', baseWidth, 'color:', baseColor);

  // Trigger hover
  const box = await page.locator('.alf-input').first().boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  
  // Wait a bit for transition
  await page.waitForTimeout(200);

  const hoverWidth = await page.evaluate(() => window.getComputedStyle(window.testEl).outlineWidth);
  const hoverColor = await page.evaluate(() => window.getComputedStyle(window.testEl).outlineColor);
  
  // Let's check which selectors match
  const matchesHover = await page.evaluate(() => window.testEl.matches(':hover'));
  const matchesFocus = await page.evaluate(() => window.testEl.matches('.alf-input--focused, :focus-within, :focus-visible'));
  
  console.log('Hover -> width:', hoverWidth, 'color:', hoverColor);
  console.log('Matches :hover ->', matchesHover);
  console.log('Matches focus selectors ->', matchesFocus);

  await browser.close();
})();
