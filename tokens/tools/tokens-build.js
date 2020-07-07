const generateTokenJSON = require("./generateTokens");

// color tokens
const colors = require("../src/core/colors/colors");
const button = require("../src/core/colors/button");

const border = require("../src/core/border");
const buttonSizes = require("../src/core/buttonSizes");
const font = require("../src/core/font");
const opacity = require("../src/core/opacity");
const radius = require("../src/core/radius");
const zIndex = require("../src/core/zIndex");
// const lineHeight = require("../src/core/lineHeight");
// const buttonThemes = require("../src/core/buttonThemes");

(async function() {
  try {
    // color tokens
    await generateTokenJSON('colors', colors, 'colors');
    await generateTokenJSON('button', button, 'colors/components/');

    await generateTokenJSON('border', border);
    await generateTokenJSON('buttonSizes', buttonSizes);
    await generateTokenJSON('font', font);
    await generateTokenJSON('opacity', opacity);
    await generateTokenJSON('radius', radius);
    await generateTokenJSON('zIndex', zIndex);
    // await generateTokenJSON('buttonThemes', buttonThemes);
    // await generateTokenJSON('lineHeight', lineHeight);
  } catch (e) {
    console.error("Failed to generate tokens\n", e);
  }
})();
