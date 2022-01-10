import React from 'react';

import { Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import ThemeProvider, { THEME_PROVIDER_CONSTANTS as CONSTANTS, ThemeProviderProps } from './';
import argTypes from './ThemeProvider.stories.args';
import Documentation from './ThemeProvider.stories.docs.mdx';

export default {
  title: 'Momentum UI/ThemeProvider',
  component: ThemeProvider,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<ThemeProviderProps>(ThemeProvider).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  theme: CONSTANTS.DEFAULTS.THEME,
  children: (
    <div
      style={{
        backgroundColor: 'var(--theme-background-solid-primary-normal)',
        padding: '2rem',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          backgroundColor: 'var(--button-primary-background)',
          color: 'var(--button-primary-text)',
          display: 'flex',
          height: '4rem',
          justifyContent: 'center',
          width: '16rem',
        }}
      >
        Example Text
      </div>
    </div>
  ),
};

// const Template: Story<Props> = (args) => {
//   const { children } = args;
//   const mutatedArgs = { ...args };

//   return (
//     <ThemeProvider {...mutatedArgs}>
//       <div
//         style={{
//           backgroundColor: 'var(--theme-background-solid-primary-normal)',
//           padding: '2rem',
//         }}
//       >
//         <div
//           style={{
//             alignItems: 'center',
//             backgroundColor: 'var(--button-primary-background)',
//             color: 'var(--button-primary-text)',
//             display: 'flex',
//             height: '4rem',
//             justifyContent: 'center',
//             width: '16rem',
//           }}
//         >
//           {children}
//         </div>
//       </div>
//     </ThemeProvider>
//   );
// };

// const Example = Template.bind({});

// Example.args = {};

export { Example };
