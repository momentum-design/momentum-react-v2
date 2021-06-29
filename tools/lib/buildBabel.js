const { transform } = require('@babel/core');
const fse = require('fs-extra');
const path = require('path');

const getConfig = ({ modules = true, optimize = true, test = false } = {}) => {
  delete require.cache[require.resolve('../../.babelrc.js')];
  const devEnv = test ? 'test' : 'development';
  process.env.NODE_ENV = optimize ? 'production' : devEnv;
  process.env.BABEL_ENV = modules ? '' : 'esm';

  return require('../../.babelrc.js');
};

const babelExtensionMatch = /^(\.js|.tsx|.ts)$/;
const otherExtensionMatch = /^(\.css)$/;

const buildFile = async (filename, destination, babelOptions = {}) => {
  const content = await fse.readFile(filename, { encoding: 'utf8' });

  const result = transform(content, { ...babelOptions, filename });
  const output = path.join(destination, path.parse(filename).name + '.js');

  await fse.outputFile(output, result.code);
}

const _build = async (folderPath, destination, babelOptions = {}, firstFolder = true) => {
  let stats = fse.statSync(folderPath);

  if (stats.isFile()) {
    if (babelExtensionMatch.test(path.extname(folderPath))) {
      await buildFile(folderPath, destination, babelOptions);
    } else if (otherExtensionMatch.test(path.extname(folderPath))) {
      const dest = path.join(destination, path.basename(folderPath));
      await fse.copy(folderPath, dest);
    }
  } else if (stats.isDirectory()) {
    let outputPath = firstFolder
      ? destination
      : path.join(destination, path.basename(folderPath));

    let files = (await fse.readdir(folderPath))
      .map(file => path.join(folderPath, file));

      await Promise.all(
      files.map(f => _build(f, outputPath, babelOptions, false))
    );
  }
}

module.exports = function buildBabel(
  folderPath,
  destination,
  babelConfig = {}
) {
  return _build(folderPath, destination, getConfig(babelConfig));
};