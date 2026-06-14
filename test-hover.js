import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('http://localhost:4200/playground', { waitUntil: 'networkidle0' });

  // Wait for the component to load
  await page.waitForSelector('alf-input');

  // Select "Outline" appearance or something to ensure we have borders?
  // No, we can just set the hover variables directly on the alf-input element 
  // via JS and see if the computed style updates!
  
  const result = await page.evaluate(() => {
    const el = document.querySelector('.alf-input');
    
    // Set variables
    el.style.setProperty('--alf-inp-outline-width', '2px');
    el.style.setProperty('--alf-inp-outline-color', 'red');
    el.style.setProperty('--alf-inp-outline-style', 'solid');
    
    el.style.setProperty('--alf-inp-outline-hover-width', '4px');
    el.style.setProperty('--alf-inp-outline-hover-color', 'blue');
    
    // Check computed style without hover
    const baseStyle = window.getComputedStyle(el);
    const baseWidth = baseStyle.outlineWidth;
    const baseColor = baseStyle.outlineColor;
    
    // Now trigger hover state
    el.classList.add('hover-sim'); // This won't work for :hover unless we inject CSS
    
    return { baseWidth, baseColor };
  });

  console.log("Base:", result);
  
  // To test true hover, we use puppeteer's hover
  await page.hover('.alf-input');
  
  const hoverResult = await page.evaluate(() => {
    const el = document.querySelector('.alf-input');
    const style = window.getComputedStyle(el);
    return { 
      hoverWidth: style.outlineWidth, 
      hoverColor: style.outlineColor,
      hasHoverClass: el.matches(':hover')
    };
  });
  
  console.log("Hover:", hoverResult);
  
  await browser.close();
})();
