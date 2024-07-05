import React from 'react';
import { Story } from '@storybook/react';

import ContentSeparator, { ContentSeparatorProps } from './';

import Icon from '../Icon';

const childrenOptions = {
  'Some separator text': 'Some separator text',
  icon: (
    <div>
      <Icon name="meetings" />
    </div>
  ),
  undefined: undefined,
};

export default {
  title: 'Momentum UI/ContentSeparator',
  component: ContentSeparator,
  argTypes: {
    children: {
      description: 'Text or other component to put in the middle of the separator',
      options: Object.keys(childrenOptions),
      mapping: childrenOptions,
      control: { type: 'select' },
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: undefined,
        },
      },
    },
  },
};

const Template: Story<ContentSeparatorProps> = (args) => {
  const { children } = args;
  return (
    <div style={{ width: '15rem' }}>
      <ContentSeparator {...args}>{children}</ContentSeparator>
    </div>
  );
};

const Example = Template;

Example.args = {
  children: 'Some separator text',
};

export { Example };
