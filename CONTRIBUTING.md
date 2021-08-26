# Contributing

- [Requirements](#requirements)
- [Project Structure](#project-structure)
- [Code Style](#code-style)
  - [New Components](#new-components)
  - [Legacy Components](#legacy-components)
- [Scripts](#scripts)
  - [CD](#cd)
  - [CI](#ci)
  - [docs](#docs)
  - [examples](#examples)
  - [generate](#generate)
  - [lint](#lint)
  - [storybook](#storybook)
  - [source](#source)
  - [styles](#styles)
  - [legacy](#legacy)
- [Submitting Changes](#submitting-changes)
- [License](#license)

## Requirements

In order to begin making contributions to this project, [NodeJS](https://nodejs.org/en/) must be installed. Currently, this project is built for usage on the Node `v14.x.x` **LTS** runtime.

While the [NodeJS](https://nodejs.org/en/) installation package includes the package manager: [Node Package Manager](https://www.npmjs.com/), we recommend that the developement platform has [yarn package manager](https://yarnpkg.com/) installed globally. See [this yarn documentation page](https://yarnpkg.com/getting-started/install) as a reference for installing yarn 1 on your platform.

Note that all example scripts within this contribution guide will utilize `yarn` as the package manager.

## Project Structure

The following definition provides an overview of commonly used files, when contributing, within the file structure of this project:

```bash
./ # project root
+-+ config/ # configuration files for this project
+-+ dist/ # built distributables
+-+ docs/ # build documentation
+-+ scss/ # legacy component styles ported from @momentum-ui/core
+-+ src/ # source code for this project
  +-- components/ # typescript react components
  +-- examples/ # legacy examples
  +-- helpers/ # enzyme test helpers
  +-- legacy/ # legacy react components cloned from the original @momentum-ui/react project
  +-- storybook/ # storybook utilities
  +-- index.js # entry file for all module exports
```

While there are other files and directories within the project that contain other project resources, most contributors will only interface with the above-listed items.

## Code Style

### New Components

Most feature contributions to this project will be implementing new React components within the `./src/components/` directory. We ask that all contributions that include new React components follow the following directory model:

```bash
./src/ # source code directory
+-- index.js # global react component module entry point
+-+ components/ # typescript react components directory
  +-- index.ts # typescript react component module entry point
  +-+ {component}/ # typescript react component directory
    +-- index.ts # entry point for component, should contain all exports [component, constants, types, etc]
    +-- {Component}.constants.ts # constants scoped to this component [styles, text, etc]
    +-- {Component}.stories.args.ts # global story argTypes.
    +-- {Component}.stories.docs.mdx # storybook stories description this component.
    +-- {Component}.stories.tsx # storybook stories for this component [be robust, as these are tested visually]
    +-- {Component}.style.scss # scoped styles, class selectors should follow 'md-{component}' for the root selector
    +-- {Component}.tsx # react component file
    +-- {Component}.types.ts # scoped types for this component [props, state, etc]
    +-- {Component}.unit.test.tsx # scoped unit tests for this component
    +-- {Component}.unit.test.tsx.snap # scoped unit test snapshot for this component
```

After a component has been implemented, it will need to be added to the `./src/index.js` and `./src/components/index.ts` files for exporting. Be sure to add the new component in the appropriately commented section within these files once the component is ready.

When generating a new component, the `generate:component` script can be used to automatically generate a majority of the boiler-plate for the new component. Be sure to validate that the folder's name is properly capitalized and that your component is exported via the various `index` files appropriately after generation is complete.

When a changes occur against the new React components in this project, a few standards must be met:

#### General

- All logical code must be written in TypeScript.
- Style definitions must be written without the help of functional style generations, such as mixins.
- Component entry points must export constants and types for easy downstream consumption.
- Component style assignment should be via attribute selectors prefixed with `data-` and classes prefixed with `md-{component}`.
- Component styles should be referenced in the renderer as constants in `{component}.constants.ts`.
- Component constants should be used for all limited prop variations and defined in a `{component}.constants.ts` file.
- Components should be functional whenever possible.

#### Testing

- Components must include unit and integration testing with [jest](http://facebook.github.io/jest/).
- Component unit tests should separate snapshots, attributes, and actions respectfully.
- Components must include visual testing with [storybook](https://github.com/storybookjs/storybook).
- Component stories should be written to provide an example for each provided prop.

#### Documentation

- Components must include documentation with [storybook](https://storybook.js.org/docs/web-components/writing-docs/introduction).
- Component documentation must be fully specified, see other component stories in this project for examples.
- Components should have a default story: `Example` which allows for mutation of all props.
- Specific prop stories should remove the associated prop from the arglist.
- For components with large amounts of variations, a `Common` story can be written with common examples.
- Most components should have a `{component}.documentation.mdx` file that includes a description of the component.

### Legacy Components

Legacy components should not contain any larger feature work, and are currently in the **maintenance** SDLC state. Below is their directory model:

```bash
./ # project root directory
+-+ scss/ # styling sub-module
  +-+ components/ # scoped styling entry directory
    +-+ {component}/ # scoped component styling
      +-- {styles}.scss # various scoped styling definitions
+-+ src/ # source code directory
  +-- index.js # global react component module entry point
  +-+ legacy/ # legacy react components directory
    +-- index.js # legacy react component module entry point
    +-+ {component}/ # legacy react component directory
      +-- index.js # entry point for component, contains the component renderer
      +-+ examples/ # examples documentation fo visual testing and docs
        +-- index.js # examples module file, imports all files from directory needed
        +-- KitchenSink.js # renderer for component states, includes all component states
        +-- {state}.js # scoped state for this component
      +-+ tests/ # scoped unit test directory
        +-- index.cy.js # cypress unit test file
        +-- index.spec.js # jest unit test file
        +-- index.spec.js.snap # automatically-generated snapshot file
```

While most changes to these components wont require any changes to the module entry files, be aware that changes in those files may be needed in broad-scoped implementaitons.

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
examples:start # Starts source examples from './src'.
examples:start:docs # Starts built examples from './docs/examples'.
examples:start:esm # Starts built examples from './dist/esm'.
examples:start:src # Starts source examples from './src'.
examples:test # Performs visual tests of the built examples.
```

### generate

`generate` scripts are used to automatically create files within the ./src directory to promote consistent code styling.

```bash
generate:component # generates folder structure, files and manages imports of a new component via prompts
```

### lint

`lint` scripts perform actions related to static analysis.

```bash
lint:config # Performs static analysis of the './config' directory.
lint:src # Performs static analysis of the './src' directory.
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
source:build:documentation # Builds the storybook mdx files into './dist' for production testing.
source:test # Runs unit and integration tests within './src'.
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
storybook:start:docs # Starts the storybook examples from './docs/storybook'.
storybook:start:src # Starts the storybook examples from './src'.
storybook:test # Performs visual tests of the built storybook.
```

### styles

`styles` scripts perform actions against style files within the `./scss` folder.

```bash
styles:build:css # Builds './scss' files into a bundled css file.
styles:build:settings # Generates scss files from settings within the './scss' directory.
styles:build:tokens: # Generates scss files from tokens within the './scss' directory.
```

### legacy

These scripts do not contain special scopes, and are limited to scripts required by legacy CI commands.

```bash
cypress:verify # validates that cypress is operational for testing
```

## Submitting Changes

With the current state of this project, all changes must be submitted as pull requests from branches that exist on [this repository](https://github.com/momentum-design/momentum-react-v2). This gives our automation platforms access to the code during their cycles. If a pull request is generated from a fork of this repository, and not a branch on this repository, our CI platform will not run any tests due to the privacy settings of this project.

Since upcoming changes to this project will include the usage of an active CD changelog, we recommend validating that every commit meets [conventional commit standards](https://www.conventionalcommits.org/en/v1.0.0/), specifically those set by [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional). This will allow our changelog to build appropriately once a change is merged into the default branch of this project.

## License

By contributing your code to the `momentum-react-v2` GitHub repository, you agree to license your contribution under the MIT license.
