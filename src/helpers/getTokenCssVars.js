const path = require('path'); // eslint-disable-line
const fs = require('fs/promises'); // eslint-disable-line

const getTokenCssVars = function () {
  return fs
    .readFile(
      path.join(
        __dirname,
        '../../node_modules/@momentum-design/tokens/dist/css/theme/webex/light-stable.css'
      )
    )
    .then((buffer) => buffer.toString('utf-8'))
    .then((data) =>
      data
        .split('\n')
        .filter((line) => line.includes('--'))
        .map((line) => line.replace(';', '"').replace(': ', '": "').replace('--', '"--'))
        .join(',\n')
    )
    .then((formattedLines) => ['{', formattedLines, '}'].join('\n'))
    .then((jsonString) => JSON.parse(jsonString));
};

module.exports = getTokenCssVars;
