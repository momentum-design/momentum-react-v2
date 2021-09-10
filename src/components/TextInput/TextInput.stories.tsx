import React, { useState } from 'react';
import { Story } from '@storybook/react';

import TextInput, { TextInputProps } from './';
import { Message } from './TextInput.types';

const messageArrOptions = {
  empty: [],
  error: [{ message: 'Error message', type: 'error' }],
  success: [{ message: 'Success message', type: 'success' }],
  warning: [{ message: 'Warning message', type: 'warning' }],
};

export default {
  title: 'Momentum UI/TextInput',
  component: TextInput,
  argTypes: {
    messageArr: {
      description: 'The list of messages to be passed in',
      options: Object.keys(messageArrOptions),
      mapping: messageArrOptions,
      control: { type: 'select' },
    },
    helpText: {
      defaultValue: undefined,
      description: 'The helptext for the input',
      control: { type: 'text' },
    }
  },
};

interface StoryProps extends TextInputProps {
  messageArr: [];
}

const Template: Story<StoryProps> = (args) => {
  const [messageArrInt, setMessageArr] = useState<Message[]>(args.messageArr);
  return (
    <TextInput
      messageArr={messageArrInt}
      helpText={args.helpText}
    />
  );
};

const Example = Template.bind({});

Example.args = {
  messageArr: 'empty',
};

export { Example };
