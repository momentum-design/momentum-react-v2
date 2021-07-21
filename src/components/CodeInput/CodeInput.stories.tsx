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
  },
};

interface StoryProps extends CodeInputProps {
  theme: ThemeNames;
  messageArr: []
}

const Template: Story<StoryProps> = (args) => {
  const {theme} = args;
  const [messageArrInt, setMessageArr] = useState<Message[]>(args.messageArr);
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
          onComplete={(code) => {
            console.log(`code is ${code}`);
            setMessageArr([{ message: 'test', type: 'error' }]);
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
  messageArr: 'empty'
};

export { Story1 };
