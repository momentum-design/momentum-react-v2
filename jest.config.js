const {swcLoaderOptions} = require('./config/swc/loaderOptions'); // eslint-disable-line

module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '\\.d\\.test\\.ts$'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  modulePathIgnorePatterns: ['<rootDir>/src/app/'],
  transformIgnorePatterns: [
    'node_modules/(?!(@lit/react|lit|lit-html|lit-element|@lit/reactive-element|@lit/context|@momentum-design/components)/)',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  snapshotResolver: '<rootDir>/config/jest/jest.snapshot-resolver.js',
  setupFiles: ['jest-canvas-mock'],
  setupFilesAfterEnv: ['<rootDir>/src/helpers/enzyme_setup.js'],
  transform: {
    '\\.[jt]sx?$': ['@swc/jest', swcLoaderOptions('typescript', 'test', false)],
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tools/assetsTransformer.js',
    '\\.(scss|css|less)$': '<rootDir>/tools/assetsTransformer.js',
    '\\.svg\\?svgr$': '<rootDir>/tools/svgMock.js',
    '\\/reactions/.*\\.json\\?lottie$': '<rootDir>/tools/reactionMock.js',
    '^@momentum-ui/react-collaboration(.*)$': '<rootDir>/src',
  },
  testEnvironment: 'jsdom'
};
