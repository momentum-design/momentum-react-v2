import React, { FC } from 'react';
import { Story } from '@storybook/react';

import ThemeProvider, {
  ThemeProviderProps as Props,
  THEME_PROVIDER_CONSTANTS as CONSTANTS
} from './';

export default {
  title: 'Momentum UI/ThemeProvider',
  component: ThemeProvider,
  argTypes: {
    theme: {
      description: 'The name of the target theme to use.',
      options: [...Object.values(CONSTANTS.THEME_NAMES)],
      control: { type: 'select' }
    },
  },
};

const ExampleDiv: FC = () => (
  <div style={{
    alignItems: 'center',
    backgroundColor: 'var(--button-primary-background, #eee)',
    color: 'var(--button-primary-text, #333)',
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
  theme: 'lightWebex',
};

const Unthemed = Template.bind({});

Unthemed.args = {
  theme: undefined,
};

export {
  Themed,
  Unthemed,
};
