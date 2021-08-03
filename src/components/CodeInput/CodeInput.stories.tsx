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
    numDigits: {
      description: 'Number of boxes',
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

const Story1 = Template.bind({});

Story1.args = {
  numDigits: 6,
  messageArr: 'empty',
  disabled: false,
  onCompleteChoice: 'show error',
};

export { Story1 };
