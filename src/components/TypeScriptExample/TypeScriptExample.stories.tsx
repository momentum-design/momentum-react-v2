import React from 'react';
import { Story } from '@storybook/react';

import TypeScriptExample, { TypeScriptExampleProps as Props } from './';

export default {
  title: 'Momentum UI/TypeScriptExample',
  component: TypeScriptExample,
};

const Template: Story<Props> = (args) => (
  <TypeScriptExample {...args} />
);

const Demo = Template.bind({});

Demo.args = {
  param: 'Demonstration Text',
};

export {
  Demo,
};
