import React, {useState} from 'react';
import { Story } from '@storybook/react';

import ThemeProvider, { ThemeNames, THEME_PROVIDER_CONSTANTS } from '../ThemeProvider';
import CodeInput, {CodeInputProps } from './';
import {Message} from './CodeInput.types';

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
    theme: {
      description: 'The name of the target theme to use.',
      options: [...Object.values(THEME_PROVIDER_CONSTANTS.THEME_NAMES)],
      control: { type: 'select' },
    },
    messageArr: {
      description: 'The name of the target theme to use.',
      options: Object.keys(messageArrOptions),
      mapping: messageArrOptions,
      control: { type: 'select' },
    },
    disabled: {
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
  theme: ThemeNames;
  messageArr: [];
  onCompleteChoice;
}

const Template: Story<StoryProps> = (args) => {
  const {theme, onCompleteChoice} = args;
  const [messageArrInt, setMessageArr] = useState<Message[]>(args.messageArr);
  const [isDisabled, setDisabled] = useState(args.disabled);

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: 'inline-block',
          padding: '2rem',
          backgroundColor: 'var(--theme-background-solid-primary-normal)',
        }}
      >
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
      </div>
    </ThemeProvider>
  );
};

const Story1 = Template.bind({});

Story1.args = {
  theme: 'lightWebex',
  numDigits: 6,
  messageArr: 'empty',
  disabled: false,
  onCompleteChoice: 'show error'
};

export { Story1 };
