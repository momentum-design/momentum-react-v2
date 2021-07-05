import React from 'react';
import { Story } from '@storybook/react';

import ExampleComponent, { ExampleComponentProps as Props } from './';

export default {
  title: 'Momentum UI/ExampleComponent',
  component: ExampleComponent,
};

const Template: Story<Props> = (args) => (
  <ExampleComponent {...args} />
);

const Demo = Template.bind({});

Demo.args = {
  param: 'Demonstration Text',
};

export {
  Demo,
};
