import React from 'react';
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
      defaultValue: CONSTANTS.DEFAULTS.THEME,
      description: 'The name of the target theme to apply to all child nodes of this `<ThemeProvider />`.',
      options: [...Object.values(CONSTANTS.THEME_NAMES)],
      control: { type: 'select' },
      table: {
        type: {
          sumary: 'string'
        },
        defaultValue: {
          summary: CONSTANTS.DEFAULTS.THEME,
        },
      },
    },
    children: {
      defaultValue: 'Example Text',
      description: 'Provides the child nodes for this element. The child nodes of this element are themed by the assigned theme.',
      control: { type: 'text' },
      table: {
        type: {
          summary: 'ReactNode',
        },
        defaultValue: {
          summary: 'undefined',
        },
      },
    },
  },
};

const Template: Story<Props> = (args) => {
  const { children } = args;
  const mutatedArgs = { ...args };

  return (
    <ThemeProvider {...mutatedArgs}>
      <div style={{
        backgroundColor: 'var(--theme-background-solid-normal)',
        padding: '2rem',
      }}>
        <div style={{
          alignItems: 'center',
          backgroundColor: 'var(--button-primary-background, #eee)',
          color: 'var(--button-primary-text, #333)',
          display: 'flex',
          height: '4rem',
          justifyContent: 'center',
          width: '16rem',
        }}>{children}</div>
      </div>
    </ThemeProvider>
  );
};

const Example = Template.bind({});

Example.args = {};

export {
  Example,
};
