import React from 'react';
import { Story } from '@storybook/react';

import Icon, { IconProps } from './';

import ThemeProvider from '../ThemeProvider';

export default {
  title: 'Momentum UI/Icon',
  component: Icon,
  argTypes: {
    scale: {
      description: 'Scale represents the size/scale of te icon.',
      options: [
        8, 10, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 40, 48, 56, 64, 120, 124,
      ],
      control: { type: 'select' },
    },
    weight: {
      description:
        'Represents the style of the icon. Note: Not all icons have all 4 styles.',
      options: ['light', 'regular', 'bold', 'filled'],
      control: { type: 'select' },
    },
  },
};

const Template: Story<IconProps> = (args) => (
  <ThemeProvider>
    <Icon {...args} />{' '}
  </ThemeProvider>
);

const IconStory = Template.bind({});

IconStory.args = {
  name: 'accessibility',
};

export { IconStory };
