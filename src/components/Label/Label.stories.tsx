import React from 'react';
import { Story } from '@storybook/react';

import Label, { LabelProps } from './';

import TextInput from '../TextInput';

import ThemeProvider from '../ThemeProvider';

export default {
  title: 'Momentum UI/Label',
  component: Label,
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
    label: {
      defaultValue: undefined,
      description: 'The label for the parent input',
      control: { type: 'text' },
    },
    addChild: {
      defaultValue: false,
      description: 'Whether the label has a child',
      control: { type: 'boolean' },
    }
  },
};

interface StoryProps extends LabelProps {
  addChild;
}

const Template: Story<StoryProps> = (args) => {
  const {addChild, ...labelArgs} = args;
  if (addChild) {
    return (
      <ThemeProvider>
        <Label {...labelArgs}>
          <TextInput/>
        </Label>
      </ThemeProvider>
    )
  }
  else {
    return (
      <ThemeProvider>
        <Label {...labelArgs} />
      </ThemeProvider>
    )
  }
};

const Example = Template.bind({});

Example.args = {
};

export { Example };
