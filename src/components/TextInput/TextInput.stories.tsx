import React, { useState, FC } from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
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
      description:
        'If present, the class name will be added to the underlying input. Used to override styles by consumers.',
      control: { type: 'text' },
    },
  },
};

interface StoryProps extends TextInputProps {
  messageArr: [];
  provideInputRef;
}

const PaddedExample: FC<TextInputProps> = (props: TextInputProps) => {
  return (
    <div style={{ margin: '1rem' }}>
      <TextInput {...props} />
    </div>
  );
};

// const Template: Story<StoryProps> = (args) => {
//   const [messageArrInt, setMessageArr] = useState<Message[]>(args.messageArr);
//   const inputRef = React.useRef();
//   return (
//     <TextInput
//       messageArr={messageArrInt}
//       helpText={args.helpText}
//       isDisabled={args.isDisabled}
//       label={args.label}
//       className={args.className}
//       clearAriaLabel={args.clearAriaLabel}
//       inputClassName={args.inputClassName}
//     />
//   );
// };

const Example = Template(TextInput).bind({});

Example.args = {};

const Common = MultiTemplate<TextInputProps>(PaddedExample).bind({});
Common.args = {};
Common.parameters = {
  variants: [
    {
      value: 'test',
      label: 'Label',
      helpText: 'This is help text for the input.',
    },
    {
      label: 'Label',
      value: 'test',
      disabled: true,
      helpText: 'This is help text for the input.',
    },
    {
      label: 'Label',
      value: 'test',
      helpText: 'This is help text for the input.',
      messageArr: [{ type: 'error', message: 'Error message' }],
    },
  ],
};

export { Example, Common };
