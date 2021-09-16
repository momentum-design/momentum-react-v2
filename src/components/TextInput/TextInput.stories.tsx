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
      description: 'The helptext for the input',
      control: { type: 'text' },
    },
    isDisabled: {
      description: 'Whether the input is disabled or not',
      control: { type: 'boolean' },
    },
    label: {
      description: 'The label for the input',
      control: { type: 'text' },
    },
    className: {
      description:
        'If present, the class name will be added to the underlying component. Used to override styles by consumers.',
      control: { type: 'text' },
    },
    clearAriaLabel: {
      description: 'Aria label for the clear button',
      control: { type: 'text' },
    },
    inputClassName: {
      description: 'If present, the class name will be added to the underlying input. Used to override styles by consumers.',
      control: { type: 'text' },
    },
  },
};

interface StoryProps extends TextInputProps {
  messageArr: [];
  provideInputRef
}

const Template: Story<StoryProps> = (args) => {
  const [messageArrInt, setMessageArr] = useState<Message[]>(args.messageArr);
  const inputRef = React.useRef();
  return (
    <TextInput
      messageArr={messageArrInt}
      helpText={args.helpText}
      isDisabled={args.isDisabled}
      label={args.label}
      className={args.className}
      clearAriaLabel={args.clearAriaLabel}
      inputClassName={args.inputClassName}
    />
  );
};

const Example = Template.bind({});

Example.args = {
};

export { Example };
