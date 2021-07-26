import React, { FC } from 'react';
import { Story } from '@storybook/react';

import Icon, { IconProps } from './';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import ThemeProvider from '../ThemeProvider';
import Documentation from './Icon.documentation.mdx';

const DocsPage: FC = () => (
  <>
    <Title />
    <Subtitle />
    <Description />
    <Documentation />
    <Primary />
    <ArgsTable story={PRIMARY_STORY} />
  </>
);

export default {
  title: 'Momentum UI/Icon',
  component: Icon,
  parameters: {
    expanded: true,
    docs: {
      page: DocsPage,
    },
  },
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
  <>
    <Icon {...args} />
    <Icon {...args} weight="light" />
    <Icon {...args} weight="regular" />
    <Icon {...args} weight="bold" />
  </>
);

const Example = Template.bind({});

Example.args = {
  name: 'accessibility',
};

export { Example };
