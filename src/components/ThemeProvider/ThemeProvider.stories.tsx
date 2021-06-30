import React, { FC } from 'react';
import { Story } from '@storybook/react';

// This reference will be removed once themes are available.
import './ThemeProvider.stories.css';

import ThemeProvider, { ThemeProviderProps as Props } from './';

export default {
  title: 'ThemeProvider',
  component: ThemeProvider,
};

const ExampleDiv: FC = () => (
  <div style={{
    alignItems: 'center',
    backgroundColor: 'var(--sbe-bg-color, #eee)',
    color: 'var(--sbe-font-color, #333)',
    display: 'flex',
    height: '4rem',
    justifyContent: 'center',
    width: '16rem',
  }}>Example Container</div>
);

const Template: Story<Props> = (args) => (
  <ThemeProvider {...args}>
    <ExampleDiv />
  </ThemeProvider>
);

const Themed = Template.bind({});

Themed.args = {
  theme: 'storybook-example-theme',
};

const Unthemed = Template.bind({});

Unthemed.args = {
  theme: undefined,
};

export {
  Themed,
  Unthemed,
};
