const path = require("path"); // eslint-disable-line

module.exports = {
  root: true,
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      alias: {
        map: [['@momentum-ui/react', path.resolve(__dirname, 'src')]],
      },
      node: {
        extensions: ['.js', '.jsx', '.json', '.tsx', '.ts'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
    'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx'],
    'import/ignore': [
      'node_modules',
      '\\.(coffee|scss|css|less|hbs|svg|json)$',
    ],
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['**/src/app', '**/es', '**/dist', '**/docs', '**/*.d.ts'],
  plugins: ['react', 'jsx-a11y', 'cypress', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    'cypress/globals': true,
    node: true,
    jquery: true,
    jest: true,
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-empty-function': 0,
      },
    },
    {
      files: ['config/**'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      },
    },
    {
      files: ['src/legacy/**', 'src/examples/**'],
      rules: {
        'prettier/prettier': 0,
        quotes: 0,
      },
    },
  ],
  rules: {
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'no-console': 1,
    'no-debugger': 1,
    'no-var': 1,
    semi: [1, 'always'],
    'no-trailing-spaces': 0,
    'eol-last': 0,
    'no-underscore-dangle': 0,
    'no-alert': 0,
    'no-lone-blocks': 0,
    'jsx-quotes': [0, 'prefer-single'],
    'react/display-name': [
      1,
      {
        ignoreTranspilerName: false,
      },
    ],
    'react/forbid-prop-types': [
      1,
      {
        forbid: ['any'],
      },
    ],
    'react/jsx-boolean-value': 0,
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-curly-spacing': 1,
    'react/jsx-indent-props': 0,
    'react/jsx-key': 1,
    'react/jsx-max-props-per-line': 0,
    'react/jsx-no-bind': 0,
    'react/jsx-no-duplicate-props': 1,
    'react/jsx-no-literals': 0,
    'react/jsx-no-undef': 1,
    'react/jsx-pascal-case': 1,
    'react/jsx-sort-prop-types': 0,
    'react/jsx-sort-props': 0,
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/jsx-wrap-multilines': 1,
    'react/no-danger': 1,
    'react/no-did-mount-set-state': 1,
    'react/no-did-update-set-state': 1,
    'react/no-direct-mutation-state': 1,
    'react/no-multi-comp': [1, { ignoreStateless: true }],
    'react/no-set-state': 0,
    'react/no-unknown-property': 1,
    'react/prefer-es6-class': 1,
    'react/prop-types': 1,
    'react/react-in-jsx-scope': 1,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/self-closing-comp': 1,
    'react/sort-comp': 1,
    'jsx-a11y/label-has-for': [
      2,
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
  },
  globals: {},
};

// 'prettier/prettier': [
//   'error',
//   {
//     endOfLine: 'auto',
//   },
//   {
//     usePrettierrc: true,
//   },
// ],