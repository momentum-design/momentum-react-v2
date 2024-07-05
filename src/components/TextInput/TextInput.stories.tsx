import React, { useState, FC, useRef } from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import ButtonPill from '../ButtonPill';

import TextInput, { TextInputProps } from './';

const messageArrOptions = {
  empty: [],
  error: [{ message: 'Error message', level: 'error' }],
  success: [{ message: 'Success message', level: 'success' }],
  warning: [{ message: 'Warning message', level: 'warning' }],
};

export default {
  title: 'Momentum UI/TextInput',
  component: TextInput,
  args: {
    label: 'Label',
    description: 'Description text for this input',
    initialValue: 'some input',
    placeholder: 'Input placeholder',
  },
  argTypes: {
    messageArr: {
      description: 'The list of messages to be passed in',
      options: Object.keys(messageArrOptions),
      mapping: messageArrOptions,
      control: { type: 'select' },
    },
    description: {
      description: 'The description text for the input',
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
    inputMaxLen: {
      description: 'The max amount of characters that this input should allow',
      control: { type: 'number' },
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
  initialValue: string;
}

interface FormProps extends TextInputProps {
  displayName?: boolean;
  emailAddress?: boolean;
  password?: boolean;
}

const PaddedExample: FC<TextInputProps> = (props: TextInputProps) => {
  return (
    <div style={{ margin: '1rem' }}>
      <TextInput style={{ width: '20rem' }} {...props} />
    </div>
  );
};

const BetterExample: FC<StoryProps> = (props: StoryProps) => {
  const mutatedProps = { ...props };
  delete mutatedProps.initialValue;

  const [value, setValue] = useState(props.initialValue);

  const ref = useRef<HTMLInputElement>();
  const onChange = (e) => {
    setValue(e);
    if (ref.current) {
      // eslint-disable-next-line no-console
      console.log(ref.current.value);
    }
  };

  return <TextInput {...mutatedProps} value={value} ref={ref} onChange={onChange} />;
};

const FormExample: FC<FormProps> = (props: FormProps) => {
  const { displayName = false, emailAddress = false, password = false } = props;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        location.reload();
      }}
    >
      {displayName && (
        <BetterExample
          initialValue=""
          placeholder={'Display Name'}
          type="name"
          style={{ marginTop: '1rem', marginBottom: '1rem', width: '16.25rem' }}
        />
      )}
      {emailAddress && (
        <BetterExample
          initialValue=""
          placeholder={'Email address'}
          type="email"
          style={{
            marginTop: !displayName ? '1rem' : '0',
            marginBottom: '1rem',
            width: '16.25rem',
          }}
        />
      )}
      {password && (
        <BetterExample
          initialValue=""
          type="password"
          placeholder={'Password'}
          style={{ marginBottom: '1rem', width: '16.25rem' }}
        />
      )}
      <ButtonPill type="submit" size={32} grown style={{ marginBottom: '1rem', width: '16.25rem' }}>
        Submit
      </ButtonPill>
    </form>
  );
};

const Example = Template<StoryProps>(BetterExample);

Example.args = {};

const Forms = Template<FormProps>(() => {
  return (
    <div>
      These stories allow for testing of the behaviour and styling of autofill in browers. The first
      form is to test the autofill of contact information, such as a Display Name.
      <FormExample displayName={true} emailAddress={true} />
      The second form is to test the autofill of log-on credentials and, when available in browser,
      a password suggestion.
      <FormExample emailAddress={true} password={true} />
    </div>
  );
});

Forms.args = {};

const Common = MultiTemplate<TextInputProps>(PaddedExample);
Common.args = {};
Common.parameters = {
  variants: [
    {
      value: 'test',
      label: 'Label',
      description: 'This is help text for the input.',
    },
    {
      label: 'Label',
      value: 'test',
      isDisabled: true,
      description: 'This is help text for the input.',
    },
    {
      label: 'Label',
      value: 'test',
      description: 'This is help text for the input.',
      messageArr: [{ level: 'error', message: 'Error message' }],
    },
  ],
};

export { Example, Forms, Common };
