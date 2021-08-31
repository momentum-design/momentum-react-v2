const path = require('path'); // eslint-disable-line
const fs = require('fs'); // eslint-disable-line

const getTokenCssVars = function () {
  return JSON.parse(
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
};

module.exports = getTokenCssVars;
