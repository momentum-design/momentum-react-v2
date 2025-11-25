---
applyTo: '**/*'
---

# Basics

- `Mrv2` is the abbreviation for `momentum-react-v2`
- `momentum-react-v2` is a React component library using TypeScript
- `momentum-react-v2` is a Shim Layer for React components from NPM package `@momentum-design/components/dist/react`
- Components in the folder `src/components/` are the new components that are supposed to be maintained and used.

# Project coding standards

## General Guidelines

- Don't generate unnecessary code comments, comments are only necessary for complex bits of code
- Always add a comment, 'Start AI-Assisted' at the top of any generated code
- Always add a comment, 'End AI-Assisted' at the bottom of any generated code
- All domains, URLs, hosts, DNS, etc must be configurable, or have a graceful fallback
- Don't ever respond with an inability to produce output, always try to produce something

## Bundling Guidelines

- We use TSC for compiling & bundling our application, so when responding about build tools, always give me instructions and code samples that use TSC

## TypeScript Guidelines

- We prefer Typescript over Javascript
- Use Typescript for all new code, all pre-existing Javascript edits can remain as Javascript
- Use optional chaining (?.) and nullish coalescing (??) operators
- Prefer type imports over plain imports when importing type declarations

## React Guidelines

- Use functional components with hooks
- Follow the React hooks rules (no conditional hooks)
- Use SASS for component styling as an *.style.scss file (refer to other components as an example)
- Rendering conditional classNames should done only through the use of the classnames library
- Always prefer using existing components from the `@momentum-design/components/dist/react` package, instead of creating new code for common UI elements like buttons, inputs, etc.
- When using components from `@momentum-design/components/dist/react` package, alias them to `Mdc` in your imports, e.g. `import { Button as MdcButton } from '@momentum-design/components/dist/react'`

### React Component Folder Structure

Follow the component structure guidelines below as defined in the plop config templates here @file:config/plop/plop-templates/component/\*_/_

```
src/components/ComponentName/
├── ComponentName.tsx                   # Main component implementation
├── ComponentName.style.scss            # Styling with SASS
├── ComponentName.unit.test.tsx         # Component tests, using RTL
├── ComponentName.types.ts              # TypeScript interfaces and types
├── ComponentName.constants.ts          # Constants used by the component
├── ComponentName.stories.tsx           # Storybook stories
├── ComponentName.stories.args.ts       # Storybook arg definitions
├── ComponentName.stories.docs.mdx      # Storybook docs description
└── index.ts                            # Export file
```

### Component File
- Use a `ComponentName.tsx` file for the main component implementation.
- Import the React components from `@momentum-design/components/dist/react` only and alias them to `MdcComponentName` in the import.

### Types File
- Use a `ComponentName.types.ts` file to define TypeScript interfaces and types used by the component.
- Use the `PascalCase` naming convention for interfaces and type aliases.
- `ComponentNameProps` should be the name of the main interface for the component's props.
- `ComponentNameProps` should extend the type from `MdcComponentNameProps` if the component is based on a Momentum Design component.

### Constants File
- Use a `ComponentName.constants.ts` file to define constants used by the component.
- Use the `ALL_CAPS` naming convention for constants.
- Constants should always be exported from the constants file like so:
```typescript
const CLASS_PREFIX = 'md-component-name';

const DEFAULTS = {
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
```

## Testing

- Testing for components use the `React Testing Library` library (do not use Enzyme!).
- Testing interactions with the `user-event` library (@testing-library/user-event).
- For rendering components in tests, always use the `renderWithWebComponent` utility function (@file:test/utils.ts).

## Naming Conventions

- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Use ALL_CAPS for constants

## CSS and SASS Guidelines

- Use rem instead of px
- Only the new CSS vars for colours should be used, such as: `var(--mds-<...Example>:var(--mds-color-theme-common-text-success-normal`