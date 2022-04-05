const fs = require('fs'); // eslint-disable-line
const glob = require('glob'); // eslint-disable-line
const getTokenCssVars = require('./getTokenCssVars'); // eslint-disable-line

const colors = getTokenCssVars();

const getColor = function (cssVar) {
  // exclude locally defined css vars
  if (cssVar.match('--md-globals') || cssVar.match('--local')) {
    return;
  }
  if (!colors[cssVar]) {
    throw `var not found for ${cssVar}`;
  }
};

const checkCSSVars = function (source) {
  const lines = source.split('\n');

  lines.forEach((currentLine, index) => {
    const matcher = /var[(](.*?)[)]/g;
    const matches = currentLine.matchAll(matcher);

    for (const match of matches) {
      const cssVar = match[1];
      try {
        getColor(cssVar);
      } catch (error) {
        throw `line ${index + 1}: ${error}`;
      }
    }
  });
};

const readAndCheckCSS = function (filePath) {
  let data = fs.readFileSync(filePath, 'utf8');
  checkCSSVars(data);
};

const checkAllFiles = function () {
  glob('src/**/*.scss', {}, (_er, files) => {
    const errors = [];
    files.forEach((filePath) => {
      try {
        readAndCheckCSS(filePath);
      } catch (error) {
        errors.push(`In file ${filePath}:\n ${error}\n`);
      }
    });
    if (errors.length) {
      throw new Error('Missing CSS vars detected in the following:\n\n' + errors.join('\n'));
    }
  });
};

const args = process.argv.slice(2);

const file = args[0];

if (file) {
  readAndCheckCSS(file);
} else {
  checkAllFiles();
}
