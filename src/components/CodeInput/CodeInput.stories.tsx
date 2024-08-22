import React, { useState } from 'react';
import { Story } from '@storybook/react';

import CodeInput, { CodeInputProps } from './';
import { Message } from '../InputMessage/InputMessage.types';

const messageArrOptions = {
  empty: [],
  error: [{ message: 'Error message', level: 'error' }],
  success: [{ message: 'Success message', level: 'success' }],
  warning: [{ message: 'Warning message', level: 'warning' }],
};

export default {
  title: 'Momentum UI/CodeInput',
  component: CodeInput,
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
    numDigits: {
      description: 'Number of boxes',
      control: { type: 'number' },
    },
    clearComplete: {
      description: 'Clear all the boxes when the code is complete if navigated back to',
      control: { type: 'boolean' },
    },
    messageArr: {
      description: 'The list of messages to be passed in',
      options: Object.keys(messageArrOptions),
      mapping: messageArrOptions,
      control: { type: 'select' },
    },
    disabled: {
      description: 'Whether the input is disabled or not',
      control: { type: 'boolean' },
    },
    onComplete: {
      description: 'What happens when the code is complete',
      options: ['show error', 'go disabled', 'alert'],
      control: { type: 'select' },
    },
    onChange: {
      description: 'If present, the this handler will fire whenever the code changes',
      options: ['alert'],
      control: { type: 'select' },
    },
  },
};

interface StoryProps extends CodeInputProps {
  messageArr: [];
  onComplete;
  onChange;
}

const Template: Story<StoryProps> = (args) => {
  const { onComplete, onChange, clearComplete } = args;
  const [messageArrInt, setMessageArr] = useState<Message[]>(args.messageArr);
  const [isDisabled, setDisabled] = useState(args.disabled);

  return (
    <CodeInput
      numDigits={args.numDigits}
      messageArr={messageArrInt}
      disabled={isDisabled}
      clearComplete={clearComplete}
      onComplete={(code) => {
        switch (onComplete) {
          case 'show error':
            setMessageArr([{ message: 'test', level: 'error' }]);
            break;
          case 'go disabled':
            setDisabled(true);
            break;
          case 'alert':
            alert(`onComplete: code is ${code}`);
        }
      }}
      onChange={(code) => {
        if (onChange === 'alert') {
          alert(`onChange: code is ${code}`);
        }
      }}
    />
  );
};

const Example = Template.bind({});

Example.args = {
  numDigits: 6,
  messageArr: 'empty',
  disabled: false,
  onCompleteChoice: 'show error',
  clearComplete: true,
};

export { Example };
