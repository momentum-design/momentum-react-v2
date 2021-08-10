import React, { useState } from 'react';
import { Story } from '@storybook/react';

import CodeInput, { CodeInputProps } from './';
import { Message } from './CodeInput.types';

const messageArrOptions = {
  empty: [],
  error: [{ message: 'Error message', type: 'error' }],
  success: [{ message: 'Success message', type: 'success' }],
  warning: [{ message: 'Warning message', type: 'warning' }],
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
    onCompleteChoice: {
      description: 'What happens when the code is complete',
      options: ['show error', 'go disabled', 'alert'],
      control: { type: 'select' },
    },
  },
};

interface StoryProps extends CodeInputProps {
  messageArr: [];
  onCompleteChoice;
}

const Template: Story<StoryProps> = (args) => {
  const { onCompleteChoice } = args;
  const [messageArrInt, setMessageArr] = useState<Message[]>(args.messageArr);
  const [isDisabled, setDisabled] = useState(args.disabled);

  return (
    <CodeInput
      numDigits={args.numDigits}
      messageArr={messageArrInt}
      disabled={isDisabled}
      onComplete={(code) => {
        switch (onCompleteChoice) {
          case 'show error':
            setMessageArr([{ message: 'test', type: 'error' }]);
            break;
          case 'go disabled':
            setDisabled(true);
            break;
          case 'alert':
            alert(`code is ${code}`);
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
};

export { Example };
