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

const extensionMatch = /^(\.js|.tsx|.ts)$/;

const buildFile = async (filename, destination, babelOptions = {}) => {
  if (!extensionMatch.test(path.extname(filename))) {
    return;
  }
  const content = await fse.readFile(filename, { encoding: 'utf8' });
  // We only want to build index.js files
  if (path.basename(filename) === 'index.js' || path.basename(filename) === 'index.tsx' || path.basename(filename) === 'index.ts') {
    const result = transform(content, { ...babelOptions, filename });
    const output = path.join(destination, path.parse(filename).name + '.js');

    await fse.outputFile(output, result.code);
  }
}

const _build = async (folderPath, destination, babelOptions = {}, firstFolder = true) => {
  let stats = fse.statSync(folderPath);

  if (stats.isFile()) {
    await buildFile(folderPath, destination, babelOptions);
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