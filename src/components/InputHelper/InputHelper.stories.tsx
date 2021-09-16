import React from 'react';
import { Story } from '@storybook/react';

import InputHelper, { InputHelperProps } from './';

import ThemeProvider from '../ThemeProvider';

export default {
  title: 'Momentum UI/InputHelper',
  component: InputHelper,
  argTypes: {
    className: {
      defaultValue: undefined,
      description:
        'If present, the class name will be added to the underlying component. Used to override styles by consumers.',
      control: { type: 'text' },
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: undefined,
        },
      },
    },
    message: {
      defaultValue: undefined,
      description: 'The help message for the parent input',
      control: { type: 'text' },
    }
  },
};

const Template: Story<InputHelperProps> = (args) => (
  <ThemeProvider>
    <InputHelper {...args} />
  </ThemeProvider>
);

const Example = Template.bind({});

Example.args = {
};

export { Example };
