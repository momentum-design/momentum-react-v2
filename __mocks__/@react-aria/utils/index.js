// eslint-disable-next-line @typescript-eslint/no-var-requires
const utils = require('@react-aria/utils/dist/main');

module.exports = {
  ...utils,
  useId: () => 'test-ID',
};
