const fs = require('fs'); // eslint-disable-line
const glob = require('glob'); // eslint-disable-line
const { getMDSTokens, getMDLTokens } = require('./getTokenCssVars'); // eslint-disable-line

let mdlTokens;
let mdsTokens;
let isSrc;

const isMDSTokenValid = function (token) {
  if (!mdsTokens[token]) {
    throw new Error(`MDS token not found for ${token}`);
  }
};

const isMDLTokenValid = function (token) {
  if (isSrc) {
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
};

const checkMDSTokens = function (source) {
  const lines = source.split('\n');

  const variableTokens = new Set([
    '--mds-color-theme-text-${level}-normal',
    '--mds-color-theme-text-team${teamColorForToken}-normal',
  ]);

  lines.forEach((currentLine, index) => {
    const matcher = /--mds(.*?)[,;)]/g;
    const matches = currentLine.matchAll(matcher);

    for (const match of matches) {
      //match[0] gives you the entire match string.
      //Example: In 'background-color: var(--mds-color-theme-common-overlay-primary-normal);'
      //match[0] gives you '--mds-color-theme-common-overlay-primary-normal)'
      //With slice(0,-1), we cut the last char from that string to remove the final ')'
      const token = match[0].slice(0, -1);
      if (!variableTokens.has(token)) {
        try {
          isMDSTokenValid(token);
        } catch (error) {
          throw new Error(`line ${index + 1}: ${error}`);
        }
      }
    }
  });
};

const checkMDLTokens = function (source) {
  const lines = source.split('\n');

  lines.forEach((currentLine, index) => {
    const matcher = /--mdl(.*?)[,;)]/g;
    const matches = currentLine.matchAll(matcher);

    for (const match of matches) {
      //match[0] gives you the entire match string.
      //Example: In '$bg-css-var: --mdl-button-secondary-bg-color,'
      //match[0] gives you '--mdl-button-secondary-bg-color,'
      //With slice(0,-1), we cut the last char from that string to remove the final ',' or ')'
      const token = match[0].slice(0, -1);
      try {
        isMDLTokenValid(token);
      } catch (error) {
        throw new Error(`line ${index + 1}: ${error}`);
      }
    }
  });
};

const checkVarTokens = function (source) {
  const lines = source.split('\n');

  const variableTokens = new Set([
    '--mds-color-theme-text-${level}-normal',
    '--mds-color-theme-text-team${teamColorForToken}-normal',
  ]);

  lines.forEach((currentLine, index) => {
    const matcher = /var[(](.*?)[)]/g;
    const matches = currentLine.matchAll(matcher);

    for (const match of matches) {
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
      let tokens = match[0].replace(/rgba[(](.*?)[)]/g, '**').slice(4, -1);
      tokens.split(', ').forEach((token) => {
        if (
          !variableTokens.has(token) &&
          !token.includes('#') &&
          !token.includes('*') &&
          !token.includes('inherit')
        ) {
          try {
            isVarTokenValid(token);
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
  checkMDSTokens(data);
  checkMDLTokens(data);
  checkVarTokens(data);
};

const checkAllSrcFiles = function () {
  isSrc = true;
  glob('src/**/*.*', {}, (_er, files) => {
    const errors = [];
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
      throw new Error('Missing CSS vars detected in the following:\n\n' + errors.join('\n'));
    }
  });
  isSrc = false;
};

const checkAllSCSSFiles = function () {
  isSrc = false;
  glob('scss/**/*.*', {}, (_er, files) => {
    const errors = [];
    files.forEach((filePath) => {
      try {
        readAndCheckTokens(filePath);
      } catch (error) {
        errors.push(`In file ${filePath}:\n ${error}\n`);
      }
    });
    if (errors.length) {
      throw new Error('Missing CSS vars detected in the following:\n\n' + errors.join('\n'));
    }
  });
  isSrc = false;
};

const checkAllCSSFiles = function () {
  isSrc = false;
  glob('css/**/*.*', {}, (_er, files) => {
    const errors = [];
    files.forEach((filePath) => {
      try {
        readAndCheckTokens(filePath);
      } catch (error) {
        errors.push(`In file ${filePath}:\n ${error}\n`);
      }
    });
    if (errors.length) {
      throw new Error('Missing CSS vars detected in the following:\n\n' + errors.join('\n'));
    }
  });
  isSrc = false;
};

const args = process.argv.slice(2);

const file = args[0];

getMDSTokens().then((resultMdsTokens) => {
  mdsTokens = resultMdsTokens;

  getMDLTokens().then((resultMdlTokens) => {
    mdlTokens = resultMdlTokens;

    if (file) {
      isSrc = file.includes('src/') ? true : false;
      readAndCheckTokens(file);
      isSrc = false;
    } else {
      checkAllSrcFiles();
      checkAllSCSSFiles();
      checkAllCSSFiles();
    }
  });
});
