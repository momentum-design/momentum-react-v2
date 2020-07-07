const fs = require('fs');
const util = require('util');
const path = require('path');

const generateTokenJSON = async (tokenName, tokenFile, subFolder) => {
  try {
    const aJSON = JSON.stringify(tokenFile);

    /** Create JSON file within dist */
    const dir = './dist';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const writeFile = util.promisify(fs.writeFile);

    if (subFolder) {
      if (!fs.existsSync(`dist/${subFolder}`)) {
        fs.mkdirSync(`dist/${subFolder}`);
      }

      await writeFile(path.join(`dist/${subFolder}`, `${tokenName}.json`), aJSON);
      console.log(`dist/${subFolder}/${tokenName}.json written!`);

    } else {
      await writeFile(path.join('dist', `${tokenName}.json`), aJSON);
      console.log(`dist/${tokenName}.json written!`);
    }
  } catch (e) {
    throw new Error(console.error('Failed to generate tokens\n', e));
  }
};

module.exports = generateTokenJSON;
