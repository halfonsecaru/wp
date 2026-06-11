const fs = require('fs');
const content = fs.readFileSync('alfcomponents/components/base/base.directive.ts', 'utf8');
if (content.includes('transformBase: this.buildTransformConfig()')) {
    console.log('transformBase is inside defaultConstruct!');
} else {
    console.log('transformBase is MISSING!');
}
