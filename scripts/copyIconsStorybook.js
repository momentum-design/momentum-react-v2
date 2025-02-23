const fse = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const iconsFolder = path.dirname(require.resolve('@momentum-design/icons/dist/manifest.json'));
const root = process.cwd();
const storybookPublicDist = path.join(root, 'config', 'storybook', 'public', 'icons');

const copyFolderToDest = (srcDir, destDir) => {
  try {
    fse.copySync(srcDir, destDir, { overwrite: true });
  } catch (err) {
    console.error(err);
  }
};

copyFolderToDest(iconsFolder, storybookPublicDist);
console.log(chalk.gray('Icons have been copied successfully to Storybook public!'));
return;
