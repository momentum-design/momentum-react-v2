import React from 'react';
import { Story } from '@storybook/react';

import InputMessage, { InputMessageProps, INPUT_MESSAGE_CONSTANTS } from './';

import ThemeProvider from '../ThemeProvider';

export default {
  title: 'Momentum UI/InputMessage',
  component: InputMessage,
  argTypes: {
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

const Story1 = Template.bind({});

Story1.args = {
  message: 'This is a message',
  level: 'error',
};

export { Story1 };
