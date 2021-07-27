const WebpackMd5Hash = require('webpack-md5-hash');

const baseConfig = {
  plugins: [
    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),
  ],
};

module.exports = {
  baseConfig,
};
