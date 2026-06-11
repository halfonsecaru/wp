const fs = require('fs');
let content = fs.readFileSync('alfcomponents/visualStyles/typography/typography.scss', 'utf8');

const overlapping = ['font-size', 'font-weight', 'line-height', 'letter-spacing', 'color', 'opacity', 'text-shadow', 'text-decoration', 'text-transform'];

overlapping.forEach(prop => {
    // 1. BASE STATE
    const baseRegex = new RegExp(`(${prop}:\\s*var\\(#\\{\\$prefix\\}-typography-${prop},\\s*)(inherit)(\\);)`, 'g');
    content = content.replace(baseRegex, `$1var(#{$prefix}-text-${prop}, inherit)$3`);

    // 2. HOVER / FOCUS / DISABLED STATES (1 level of fallback)
    const stateRegex = new RegExp(`(${prop}:\\s*var\\(#\\{\\$prefix\\}-typography-(hover|focus|disabled)-${prop},\\s*)(var\\(#\\{\\$prefix\\}-typography-${prop},\\s*inherit\\))(\\);)`, 'g');
    content = content.replace(stateRegex, `$1var(#{$prefix}-text-$2-${prop}, var(#{$prefix}-typography-${prop}, var(#{$prefix}-text-${prop}, inherit)))$4`);

    // 3. ACTIVE STATE (2 levels of fallback)
    const activeRegex = new RegExp(`(${prop}:\\s*var\\(#\\{\\$prefix\\}-typography-active-${prop},\\s*)(var\\(#\\{\\$prefix\\}-typography-hover-${prop},\\s*var\\(#\\{\\$prefix\\}-typography-${prop},\\s*inherit\\)\\))(\\);)`, 'g');
    content = content.replace(activeRegex, `$1var(#{$prefix}-text-active-${prop}, var(#{$prefix}-typography-hover-${prop}, var(#{$prefix}-text-hover-${prop}, var(#{$prefix}-typography-${prop}, var(#{$prefix}-text-${prop}, inherit)))))$3`);
});

fs.writeFileSync('alfcomponents/visualStyles/typography/typography.scss', content);
console.log('Fixed typography SCSS!');
