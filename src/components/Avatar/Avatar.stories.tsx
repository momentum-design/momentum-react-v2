import React from 'react';
import { Story } from '@storybook/react';

import Avatar, { AvatarProps } from './';

import ThemeProvider from '../ThemeProvider';

export default {
  title: 'Momentum UI/Avatar',
  component: Avatar,
  argTypes: {
    propName: {
      description: 'Description with what the prop does.',
      options: ['Value 1', 'Value 2'],
      control: { type: 'select' }, // change as needed
    },
  },
};

const Template: Story<AvatarProps> = (args) => (
  <ThemeProvider>
    <Avatar {...args} />
  </ThemeProvider>
);

const Story1 = Template.bind({});

Story1.args = {
  src: 'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2855&q=80',
};

const Story2 = Template.bind({});

Story2.args = {
  initials: 'AS',
  color: 'gold',
  size: 24,
};

export { Story1, Story2 };
