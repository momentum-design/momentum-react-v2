const fs = require('fs'); // eslint-disable-line
const glob = require('glob'); // eslint-disable-line
const { getTokensFromSource } = require('./getTokenCssVars'); // eslint-disable-line

let mdlTokens;
let mdsTokens;
// MDSCheck is one in which we make sure all tokens used in a repo come only from @momentum-design package
let isMDSCheck;
let errors = [];

const variableTokens = new Set([
  '--mds-color-theme-text-${level}-normal',
  '--mds-color-theme-text-team${teamColorForToken}-normal',
]);

const isMDSTokenValid = function (token) {
  if (!mdsTokens[token]) {
    throw new Error(`MDS token not found for ${token}`);
  }
};

const isMDLTokenValid = function (token) {
  if (isMDSCheck) {
    throw new Error(`Legacy MDL token ${token} was found in src/`);
  }
  if (!mdlTokens[token]) {
    throw new Error(`MDL token not found for ${token}`);
  }
};

const isVarTokenValid = function (token) {
  // exclude locally defined css vars
  if (
    token.match('--md-globals') ||
    token.match('--local') ||
    token.match('--none') ||
    token.match('transparent') ||
    token.match('--null') ||
    token.slice(0, 1) === '$'
  ) {
    return;
  }

  if (!mdsTokens[token] && !mdlTokens[token]) {
    throw new Error(`Var token not found for ${token}`);
  }

  if (isMDSCheck && !mdsTokens[token]) {
    throw new Error(`${token} was found in src/, where only --mds tokens are allowed`);
  }
};

// source (String): the raw content of each evaluated file
// tokenType (String): could be 'mds', 'mdl', or 'var'
const checkTokens = function (source, tokenType) {
  const lines = source.split('\n');

  lines.forEach((currentLine, index) => {
    let matcher;
    let sliceFrom;
    let sliceUntil;
    switch (tokenType) {
      case 'mds':
        //match[0] gives you the entire match string.
        //Example: In 'background-color: var(--mds-color-theme-common-overlay-primary-normal);'
        //match[0] gives you '--mds-color-theme-common-overlay-primary-normal)'
        //With slice(0,-1), we cut the last char from that string to remove the final ')'
        matcher = /--mds(.*?)[,;)]/g;
        sliceFrom = 0;
        sliceUntil = -1;
        break;
      case 'mdl':
        //match[0] gives you the entire match string.
        //Example: In '$bg-css-var: --mdl-button-secondary-bg-color,'
        //match[0] gives you '--mdl-button-secondary-bg-color,'
        //With slice(0,-1), we cut the last char from that string to remove the final ',' or ')'
        matcher = /--mdl(.*?)[,;)]/g;
        sliceFrom = 0;
        sliceUntil = -1;
        break;
      case 'var':
        //match[0] gives you the entire match string.
        //Example 1: In 'background-color: var(--mdl-background-quaternary, rgba(0, 115, 149, 0.56)); }'
        //match[0] gives you 'var(--mdl-background-quaternaryss, rgba(0, 115, 149, 0.56)'
        //I do not want to test the rgba colors, so I replace any match of them with '**'
        //Which gives me 'var(--mdl-background-quaternaryss, **'
        //With slice(4,-1), we cut the 'var(' in the beginning and the last char '*'
        //So get get '--mdl-background-quaternaryss, *'. If we split that with ', '
        //We get an array like [ '--mdl-background-quaternaryss', '*' ]

        //Example 2: In 'color: var(--mds-color-theme-text-success-normal);'
        //match[0] gives you 'var(--mds-color-theme-text-success-normal)'
        //I do not find any rgba color in this var so the replacement for '**' is ignored.
        //With slice(4,-1), we cut the 'var(' in the beginning and the last char ','
        //So get get '-mds-color-theme-text-success-normal'. If we split that with ', '
        //We get an array like [ '-mds-color-theme-text-success-normal']
        matcher = /var[(](.*?)[)]/g;
        sliceFrom = 4;
        sliceUntil = -1;
        break;
      default:
        throw new Error(`Invalid token type ${tokenType}`);
    }
    const matches = currentLine.matchAll(matcher);

    for (const match of matches) {
      const tokens = match[0].replace(/rgba[(](.*?)[)]/g, '**').slice(sliceFrom, sliceUntil);
      tokens.split(', ').forEach((token) => {
        if (
          !variableTokens.has(token) &&
          !token.includes('#') &&
          !token.includes('*') &&
          !token.includes('inherit')
        ) {
          try {
            tokenType === 'mds' && isMDSTokenValid(token);
            tokenType === 'mdl' && isMDLTokenValid(token);
            tokenType === 'var' && isVarTokenValid(token);
          } catch (error) {
            throw new Error(`line ${index + 1}: ${error}`);
          }
        }
      });
    }
  });
};

const readAndCheckTokens = function (filePath) {
  let data = fs.readFileSync(filePath, 'utf8');
  checkTokens(data, 'mds');
  checkTokens(data, 'mdl');
  checkTokens(data, 'var');
};

const checkAllFiles = function (pathPattern) {
  glob(pathPattern, {}, (_er, files) => {
    files.forEach((filePath) => {
      try {
        if (
          filePath != 'src/helpers/cssTokenCheck.js' &&
          filePath != 'src/examples/ThemeSelect/themes.js'
        ) {
          readAndCheckTokens(filePath);
        }
      } catch (error) {
        errors.push(`In file ${filePath}:\n ${error}\n`);
      }
    });
    if (errors.length) {
      throw new Error('Design token error detected in the following:\n\n' + errors.join('\n'));
    }
  });
};

const args = process.argv.slice(2);

const file = args[0];
isMDSCheck = args[1] || false;
const globPatterns = args[2] || [];

getTokensFromSource(
  '../../node_modules/@momentum-design/tokens/dist/css/theme/webex/light-stable.css',
  'mds-css-stable'
).then((resultMdsTokens) => {
  mdsTokens = resultMdsTokens;

  getTokensFromSource('../../src/examples/ThemeSelect/themes.js', 'mdl-examples').then(
    (resultMdlTokens) => {
      mdlTokens = resultMdlTokens;

      if (file) {
        readAndCheckTokens(file);
      } else if (globPatterns.length) {
        globPatterns.forEach((glob) => {
          checkAllFiles(glob);
        });
      } else {
        isMDSCheck = true;
        checkAllFiles('src/**/*.*');
        isMDSCheck = false;
        checkAllFiles('scss/**/*.*');
        checkAllFiles('css/**/*.*');
      }
    }
  );
});
