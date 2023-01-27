const path = require('path'); // eslint-disable-line
const fs = require('fs/promises'); // eslint-disable-line

// sourcePath is the path of the source you want to get the valid tokens from. Example: '../../node_modules/@momentum-design/tokens/dist/css/theme/webex/light-stable.css'
// sourceType can be 'mds-css-stable' or 'mdl-examples'

const getTokensFromSource = function (sourcePath, sourceType) {
  return fs
    .readFile(path.join(__dirname, sourcePath))
    .then((buffer) => buffer.toString('utf-8'))
    .then((data) => data.split('\n').filter((line) => line.includes('--')))
    .then((data) => {
      switch (sourceType) {
        case 'mds-css-stable':
          // To get a string that is parseable to json from @momentum-design/tokens/dist/css/theme/webex/light-stable.css
          // 1. We want to replace ';' with '"'. From '--mds-color-theme-common-text-white: #fffffff2;' we get '--mds-color-theme-common-text-white: #fffffff2"'
          // 2. We want to replace ': ' with '": ". From '--mds-color-theme-common-text-white: #fffffff2"' we get '--mds-color-theme-common-text-white": "#fffffff2"'
          // 3. We want to replace '--' with '"--'. From '--mds-color-theme-common-text-white": "#fffffff2"' we get '"--mds-color-theme-common-text-white": "#fffffff2"'
          // 4. We want to put a ,\n at the end of each line, and join them to return a big string that looks like this:
          //
          // "--mds-color-theme-common-text-white": "#fffffff2",
          // "--mds-color-theme-common-text-white": "#fffffff2",
          // ...
          return data
            .map((line) => line.replace(';', '"').replace(': ', '": "').replace('--', '"--'))
            .join(',\n');
        case 'mdl-examples':
          // To get a string that is parseable to json from src/examples/ThemeSelector/themes.js
          // 1. We want to replace "'", '"'. From ''--mdl-button-primary-bg-color': '#007AA3',', we get '"--mdl-button-primary-bg-color': '#007AA3',',
          // 2. We want to replace '': ' with '": ". From '"--mdl-button-primary-bg-color': '#007AA3',' we get '"--mdl-button-primary-bg-color": "#007AA3','
          // 3. We want to replace '',' with '",'. From '"--mdl-button-primary-bg-color": "#007AA3',' we get '"--mdl-button-primary-bg-color": "#007AA3",'
          // 5. We want to put a \n at the end of each line, and join them to form a big string
          // 4. We want to cut the last char of the big string because it is a ','. In json, the last member should haveno ',' at the end.
          //
          // "--mdl-button-primary-bg-color": "#007AA3",
          // "--mdl-button-primary-bg-color": "#007AA3",
          // ...
          // "--mdl-button-primary-bg-color": "#007AA3"
          return data
            .map((line) => line.replace("'", '"').replace("': '", '": "').replace("',", '",'))
            .join('\n')
            .slice(0, -1);
        default:
          throw new Error('Invalid sourceType when trying to getTokensFromSource');
      }
    })
    .then((formattedLines) => ['{', formattedLines, '}'].join('\n'))
    .then((jsonString) => JSON.parse(jsonString));
};

module.exports = { getTokensFromSource };
