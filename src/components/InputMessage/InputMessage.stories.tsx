import React from 'react';
import { Story } from '@storybook/react';

import InputMessage, { InputMessageProps, INPUT_MESSAGE_CONSTANTS } from './';

import ThemeProvider from '../ThemeProvider';

export default {
  title: 'Momentum UI/InputMessage',
  component: InputMessage,
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
    level: {
      description: 'The level of the message.',
      options: INPUT_MESSAGE_CONSTANTS.MESSAGE_LEVEL,
      control: { type: 'select' },
    },
  },
};

const Template: Story<InputMessageProps> = (args) => (
  <ThemeProvider>
    <InputMessage {...args} />
  </ThemeProvider>
);

const Example = Template;

Example.args = {
  message: 'This is a message',
  level: 'error',
};

export { Example };
