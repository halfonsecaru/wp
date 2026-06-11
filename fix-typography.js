const fs = require('fs');
let content = fs.readFileSync('alfcomponents/visualStyles/typography/typography.scss', 'utf8');

const overlapping = ['font-size', 'font-weight', 'line-height', 'letter-spacing', 'color', 'opacity', 'text-shadow', 'text-decoration', 'text-transform'];

overlapping.forEach(prop => {
    // 1. BASE STATE
    // Example: font-size: var(#{$prefix}-typography-font-size, inherit);
    const baseRegex = new RegExp(`(${prop}:\\s*var\\(#\\{\\$prefix\\}-typography-${prop},\\s*)(inherit)(\\);)`, 'g');
    content = content.replace(baseRegex, `$1var(#{$prefix}-text-${prop}, inherit)$3`);

    // 2. HOVER / FOCUS / DISABLED STATES
    // Example: font-size: var(#{$prefix}-typography-hover-font-size, var(#{$prefix}-typography-font-size, inherit));
    const stateRegex = new RegExp(`(${prop}:\\s*var\\(#\\{\\$prefix\\}-typography-(hover|focus|disabled)-${prop},\\s*)(var\\(#\\{\\$prefix\\}-typography-${prop},\\s*inherit\\))(\\);)`, 'g');
    content = content.replace(stateRegex, `$1var(#{$prefix}-text-$2-${prop}, var(#{$prefix}-typography-${prop}, var(#{$prefix}-text-${prop}, inherit)))$4`);

    // 3. ACTIVE STATE
    // Example: font-size: var(#{$prefix}-typography-active-font-size, var(#{$prefix}-typography-hover-font-size, var(#{$prefix}-typography-font-size, inherit)));
    const activeRegex = new RegExp(`(${prop}:\\s*var\\(#\\{\\$prefix\\}-typography-active-${prop},\\s*)(var\\(#\\{\\$prefix\\}-typography-hover-font-size,[^;]+)(\\);)`, 'g');
    // For active, we just do a generic replacement because it's too nested.
    // Let's manually replace active for overlapping props:
});

fs.writeFileSync('alfcomponents/visualStyles/typography/typography.scss', content);
console.log('Done base and simple states!');
