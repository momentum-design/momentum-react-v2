# Getting Started

**Currently, this project is closed to any external contributions. Any pull request made against this project from external sources will likely be closed. If you would like to make changes to this project, please fork this project.**

For internal developers, if you would like to contribute to this project, please review our [contributing guide](./CONTRIBUTING.md).

## Cloning

In order to begin utilizing this project, it must be cloned locally. This can be done using multiple methods, but the preferred method would be to utilize [git](https://git-scm.com/). Once [git](https://git-scm.com/) is installed and operational on your platform, navigate to the folder you would like this project to reside in and run the following command:

```bash
# External Developers
git clone git@github.com:{YOUR_FORK}/momentum-react-v2.git

# Internal Developers
git clone git@github.com:momentum-design/momentum-react-v2.git
```

This will download the latest version available via this project's GitHub repository for usage locally. Once the above command finishes its execution, navigate to that folder using the following command:

```bash
cd ./momentum-react-v2
```

## Initializing

In order to execute any scripts associated with this project, the projects dependencies must be initialized using the following command:

```bash
yarn install # installing with yarn package manager

# or

npm install # installing with node package manager
```

## Building

In order to build this project for downstream projects, the following command must be used to compile the source code:

```bash
yarn build # building with yarn package manager

# or

npm run build # building with node package manager
```

## Consumption

In the case of [npm](https://www.npmjs.com/) or [yarn](https://classic.yarnpkg.com/en/), adding the following dependency to your project's `package.json` file will link this project to your project.

```json
{
  /* ...other package definitions... */
  "dependencies": {
    /* ...other package dependencies... */
    "@momentum-ui/react": "link:./path/to/this/project",
  }
}
```

**Note**: Since this package will collide with the [original @momentum-ui](https://github.com/momentum-design/momentum-ui)'s `/react` sub-module, you may need to alias this package seperately in your `package.json`.

## Usage

Once the package is properly linked, the components can be imported for usage within your application:

```jsx
/* ...other imports... */
import { Button } from '@momentum-ui/react';

const Component = () => (
  <div>
    <Button name="primary" size="large">Welcome to Momentum UI - React Collaboration</Button>
  </div>
);

/* ...export statements... */
```
