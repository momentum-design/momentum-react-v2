import React, { useState } from 'react';

import { Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import { TextAreaProps } from '.';
import TextArea from './TextArea';
import Documentation from './TextArea.stories.docs.mdx';
import argTypes from './TextArea.stories.args';
import ButtonPill from '../ButtonPill';

export default {
  title: 'Momentum Ui/TextArea',
  component: TextArea,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
  args: {
    label: 'Label',
    helpText: 'Help text',
    helpTextType: 'default',
    placeholder: 'Placeholder',
  },
};

const Example = Template<TextAreaProps>((props: TextAreaProps) => {
  const [inputValue, setInputValue] = useState('');
  const handleInput = (e: InputEvent) => {
    const value = (e.target as HTMLTextAreaElement).value;
    setInputValue(value);
    // eslint-disable-next-line no-console
    console.log('example inputvalue', value);
  };

  return <TextArea value={inputValue} required {...props} onInput={handleInput} />;
}).bind({});
Example.argTypes = { ...argTypes };

const variants: Array<{
  type: TextAreaProps['helpTextType'];
  label: string;
  helpText: string;
}> = [
  { type: 'default', label: 'Default Label', helpText: 'Default help text' },
  { type: 'error', label: 'Error Label', helpText: 'Error help text' },
  { type: 'warning', label: 'Warning Label', helpText: 'Warning help text' },
  { type: 'success', label: 'Success Label', helpText: 'Success help text' },
  { type: 'priority', label: 'Priority Label', helpText: 'Priority help text' },
];
const AllVariants = Template<TextAreaProps>((props: TextAreaProps) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(3, auto)`,
        gap: '1rem',
        alignItems: 'end',
      }}
    >
      {variants.map(({ type, label, helpText }) => (
        <TextArea key={type} {...props} helpTextType={type} label={label} helpText={helpText} />
      ))}
    </div>
  );
}).bind({});
AllVariants.argTypes = { ...argTypes };

const Disabled = Template<TextAreaProps>((props: TextAreaProps) => {
  return (
    <div>
      <TextArea value="Disabled text area" disabled {...props} />
    </div>
  );
}).bind({});
Disabled.argTypes = { ...argTypes };

const Readonly = Template<TextAreaProps>((props: TextAreaProps) => {
  return (
    <div>
      <TextArea value="Readonly text area" readonly {...props} />
    </div>
  );
}).bind({});
Readonly.argTypes = { ...argTypes };

const Form = Template<TextAreaProps>((props: TextAreaProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const selectedValue = formData.get('formTextarea');
    // eslint-disable-next-line no-console
    console.log('Form submitted value:', selectedValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextArea
        name="formTextarea"
        id="textarea"
        required
        toggletipText="toggletip"
        maxCharacterLimit={100}
        {...props}
      />
      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
        <ButtonPill type="submit" size={28} style={{ width: '5rem' }}>
          Submit
        </ButtonPill>
        <ButtonPill type="reset" size={28} style={{ width: '5rem' }}>
          Reset
        </ButtonPill>
      </div>
    </form>
  );
}).bind({});
Form.argTypes = { ...argTypes };

export { Example, AllVariants, Disabled, Readonly, Form };
