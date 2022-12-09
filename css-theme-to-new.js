const fs = require('fs/promises');
const glob = require('glob');

const listStyleSheetFiles = () => {
  return new Promise((resolve, reject) => {
    glob('./scss/**/*.*', (error, files) => {
      if (error) {
        reject(error);
      }

      resolve(files);
    });
  });
};

const readStyleSheetFiles = (files) => {
  return Promise.all(files.map((file) => fs.readFile(file)))
    .then((buffers) => buffers.reduce((output, buffer, index) => ({
      ...output,
      [files[index]]: buffer.toString('utf-8'),
    }), {}));
};

const writeStyleSheetFiles = (sheets) => {
  return Promise.all(Object.entries(sheets).map(([file, data]) => fs.writeFile(file, data)));
};

const readSourceFile = (target) => {
  return fs.readFile(target)
    .then((buffer) => buffer.toString('utf-8'))
    .then((string) => JSON.parse(string));
};

const replaceValues = (reference, data) => {
  // replace all old themes with new themes.
  let mutable1 = data.replaceAll('var(--theme', 'var(--mds-color-theme');
  let mutable = mutable1.replaceAll(': --theme', ': --mds-color-theme');

  // replace component tokens with theme tokens.
  const final = Object.entries(reference).reduce((output, [componentToken, themeToken]) => {
    const first = output.replaceAll(`var(${componentToken})`, themeToken.includes('--mds-color-theme') || themeToken.includes('--md-globals') ? `var(${themeToken})` : themeToken);
    const second = first.replaceAll(`: ${componentToken}`, `: ${themeToken}`);

    return second;
  }, mutable);

  return final;

  // return Object.entries(reference).reduce((output, [componentToken, themeToken]) => (
  //   output.replaceAll(`var(${componentToken})`, themeToken.includes('--mds-color-theme') || themeToken.includes('--md-globals') ? `var(${themeToken})` : themeToken)
  // ), mutable);
};

const main = () => {
  return listStyleSheetFiles()
    .then((files) => Promise.all([
      readSourceFile('./webex-light-theme-references-validated.json'),
      readStyleSheetFiles(files)
    ]))
    .then(([reference, sheets]) => {
      return Object.entries(sheets).reduce((output, [file, data]) => ({
        ...output,
        [file]: replaceValues(reference, data)
      }), {});
    })
    .then((sheets) => writeStyleSheetFiles(sheets));
};

main()
  .then(() => {
    console.log('done');
  });
