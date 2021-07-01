# Momentum UI React

[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/react/LICENSE)

**`Momentum React v2`** is a resuable, component based, flexible React library available as
npm module. It provides set of UI components and utilities based on [Momentum Design](https://momentum.design).

The git repo can be cloned from [https://github.com/momentum-design/momentum-react-v2](https://github.com/momentum-design/momentum-react-v2).

Checkout the [documentation](https://momentum.design) for documentation and live examples.

## Goals
* **Independent** — pick and use only the components you need.
* **Styled** — override styles of components by `className` and `style` properties.
* **Customizable** — properties allow many different config options to suit your app.
* **Performant** - high performance guaranteed with use of CSS3 Flexbox and non-bloated architecture.
* **Reliable** — each component is rigorously tested.

## Getting Started

This module is currently not published on npm. To use it, build and host it somewhere then alias `@momentum-ui/react` (the old monorepo) to the new module location.

### Step 2. Import Momentum UI React components in your app

Use ES6 import statement to import the component that you want to use:

```jsx
import { Button } from '@momentum-ui/react';
// or
import Button from from '@momentum-ui/react/button';
...
...

<div className="container">
  <Button name="primary" size="large">Welcome to Momentum UI React !</Button>
</div>
```

## Scripts

The following section includes definitions and details on the scripts available within this package. Each script is broken into its appropriate scope, with the exception of the general scripts immediately below. The general scripts should be used in most cases, while the auxiliary scoped scripts can be used to perform specific actions.

```bash
build # Compiles documentation and source for distribution.
lint # Performs static analysis of './src'.
lint:watch # Performs static analysis when a file is changed in './src'.
test # Performs tests against './src' files.
test:watch # Performs tests against './src' when a file is changed.
start # Starts storybook in watch mode for development.
start:components # Starts storybook in watch mode.
start:examples # Starts the examples in watch mode.
start:watch # Starts persistent static analysis, testing, and rendering on file change.
```

### cd

`cd` scripts are for strict usage with our continual delivery system.

```bash
cd:build # Used to build the application for artifact deployment.
```

### ci

`ci` scripts are for strict usage with our continuos integration system.

```bash
ci:build # Builds source, docs, and specific tests into the './dist/{cjs|esm}` folder.
ci:test:examples # Launches and tests examples using the built project files.
ci:test:lint # Performs static anaysis [linting] of './src' and './config' folder files.
ci:test:src # Runs unit tests within the './src' folder.
ci:test:storybook # Launches and tests storybook using the built project files.
```

### docs

`docs` scripts are used for building servable documentation.

```bash
docs:clean # Removes the './docs' directory and contents.
docs:build # Cleans built documentation and builds all documentation from './dist'.
```

### examples

`examples` scripts are used for operating the examples application [kitchen sink].

```bash
examples:build # Cleans built examples and builds from './dist'.
examples:clean # Removes the './docs/examples' directory and contents.
examples:start:esm # Starts built examples from './dist/esm'.
examples:start:src # Starts source examples from './src'.
examples:test # Performs visual tests of the built examples.
```

### lint

`lint` scripts perform actions related to static analysis.

```bash
lint:config # Performs static analysis of the './config' directory.
lint:src # Performs static analysis of the './src' directory.
```

### storybook

`storybook` scripts are used for operating [Storybook](https://storybook.js.org/) actions.

```bash
storybook:build # Cleans the built storybook and builds a storybook from './dist/esm'.
storybook:build:cjs # Builds a storybook to './docs/storybook' from './dist/cjs'.
storybook:build:esm # Builds a storybook to './docs/storybook' from './dist/esm'.
storybook:build:src # Builds a storybook to './docs/storybook' from './src'.
storybook:clean # Removes the './docs/storybook' folder and its contents.
storybook:start # Starts the storybook examples from './src'.
storybook:test # Performs visual tests of the built storybook.
```

### source

`source` scripts perform actions against source files in this project.

```bash
source:build # Cleans built files from './dist' and builds types, esm, and cjs bundles.
source:build:styles # Builds style files from './src' into their paired './dist' folders.
source:build:clean # Removes the './dist' folder and its contents.
source:build:cjs # Builds the './src' files into './dist/cjs' as CommonJS.
source:build:compile # Builds CommonJS and ESModule from './src' to './dist'.
source:build:esm # Builds the './src' files into './dist/esm' as ESModule.
source:build:stories # Builds the storybook files into './dist' for production testing.
source:test # Runs unit and integration tests within './src'.
``` 

## Tools & Frameworks

### Package manager

* [yarn](https://github.com/yarnpkg/yarn) - BSD-2-Clause

### Base framework

* [react](https://github.com/facebook/react) - MIT

* [react-dom](https://github.com/facebook/react) - MIT

### Momentum Design System Look & Feel

* [@momentum-ui/core](https://github.com/momentum-design/momentum-ui-core) - MIT
* [@momentum-ui/icons](https://github.com/momentum-design/momentum-ui-icons) - MIT

### ES6 Minifier

* [babili](https://github.com/babel/babili) - MIT

### ES6 Lint

* [eslint](https://github.com/eslint/eslint) - MIT

### CSS/SCSS Lint

* [stylelint](https://github.com/stylelint/stylelint) - MIT

### CSS Utility Tool

* [normalize](https://github.com/necolas/normalize.css) - MIT

* [postcss](https://github.com/postcss/postcss) - MIT

### JsUnit Testing framework

* [jest](https://github.com/facebook/jest) - BSD-3-Clause

* [enzyme](https://github.com/airbnb/enzyme) - MIT


## Contribution

Want to contribute? Why not go through [Developer's Guide](./GETTING_STARTED.md) to understand more technical details about the project and contribution guidelines to be adhered.

## Changelog

The changelog can be found [here](./CHANGELOG.md).

## Copyright

Copyright (c) 2021 Cisco Systems
