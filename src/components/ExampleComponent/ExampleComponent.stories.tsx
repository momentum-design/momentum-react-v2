import React from 'react';
import { Story } from '@storybook/react';

import ExampleComponent, { ExampleComponentProps as Props } from './';

export default {
  title: 'Momentum UI/ExampleComponent',
  component: ExampleComponent,
  argTypes: {
    param: {
      description: 'The string to insert into this component.',
    },
  },
};

const Template: Story<Props> = (args) => <ExampleComponent {...args} />;

const Demo = Template;

Demo.args = {
  param: 'Demonstration Text',
};

export { Demo };
