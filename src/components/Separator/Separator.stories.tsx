import React from 'react';
import { Story } from '@storybook/react';

import Separator, { SeparatorProps } from './';

import Icon from '../Icon';

const childrenOptions = {
  'Some separator text': 'Some separator text',
  icon: (
    <div>
      <Icon name="meetings" />
    </div>
  ),
};

export default {
  title: 'Momentum UI/Separator',
  component: Separator,
  argTypes: {
    children: {
      description: 'Text or other component to put in the middle of the separator',
      options: Object.keys(childrenOptions),
      mapping: childrenOptions,
      control: { type: 'select' },
    },
  },
};

const Template: Story<SeparatorProps> = (args) => {
  const { children } = args;
  return (
    <div style={{ width: '15rem' }}>
      <Separator {...args}>{children}</Separator>
    </div>
  );
};

const Story1 = Template.bind({});

Story1.args = {
  children: 'Some separator text',
};

export { Story1 };
