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
        backgroundColor: 'var(--mds-color-theme-background-solid-primary-normal)',
        padding: '2rem',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          backgroundColor: 'var(--mds-color-theme-button-primary-normal)',
          color: 'var(--mds-color-theme-inverted-text-primary-normal)',
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

export { Example };
