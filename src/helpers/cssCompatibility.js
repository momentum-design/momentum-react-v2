const path = require('path'); // eslint-disable-line
const fs = require('fs'); // eslint-disable-line

let colors = JSON.parse(
  fs
    .readFileSync(
      path.join(__dirname, '../../node_modules/@momentum-ui/design-tokens/dist/lightWebex.css'),
      'utf8'
    )
    .split(';')
    .join('",')
    .split('--')
    .join('"--')
    .split(':')
    .join('":"')
    .slice(20, -4) + '}'
);

colors = {
  ...colors,
  '--border-clear': '0rem solid rgba(0, 0, 0, 0)',
  '--focus-ring-box-shadow':
    '0 0 0 0.0625rem rgba(255, 255, 255, 1), 0 0 0 0.125rem rgba(17, 112, 207, 1)',
  '--focus-ring-outline': 'none',
  '--font-default': 'CiscoSansTT',
};

const getColor = function (cssVar) {
  if (!colors[cssVar]) {
    throw `color not found for ${cssVar}`;
  }
  return colors[cssVar];
};

const makeCompatible = function (source) {
  const lines = source.split('\n');

  const newLines = lines.reduce(function (allLines, currentLine) {
    const matcher = /(.*?)(var)\((.*)\)(.*)/;
    const match = matcher.exec(currentLine);

    const numVars = (currentLine.match(/var/g) || []).length;

    if (numVars > 1) {
      console.log('WARNING: unable to handle multiple vars in:', currentLine);
    }

    if (match && match[3] && numVars === 1) {
      const color = getColor(match[3]);
      allLines.push(currentLine.replace(matcher, `$1${color}$4 // IEFIX`));
    }
    allLines.push(currentLine);
    return allLines;
  }, []);

  return newLines.join('\n');
};

const makeIncompatible = function (source) {
  const lines = source.split('\n');

  const newLines = lines.reduce(function (allLines, currentLine) {
    const matcher = /IEFIX/;
    const match = matcher.exec(currentLine);

    if (!match) {
      allLines.push(currentLine);
    }
    return allLines;
  }, []);

  return newLines.join('\n');
};

const makeFileCompatible = function (filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  const compatibleSource = makeCompatible(data);
  fs.writeFileSync(filePath, compatibleSource);
};

const removeCompatibility = function (filePath) {
  const data = fs.readFileSync(filePath, 'utf8');

  const incompatibleSource = makeIncompatible(data);

  fs.writeFileSync(filePath, incompatibleSource);
};

const args = process.argv.slice(2);

const file = args[0];
const reverse = args[1];

if (file) {
  if (reverse) {
    removeCompatibility(file);
  } else {
    makeFileCompatible(file);
  }
}
