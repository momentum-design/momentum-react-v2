import React, { FC } from 'react';
import { Story } from '@storybook/react';

import MenuListBox, { MenuListBoxProps } from './';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import Documentation from './MenuListBox.documentation.mdx';
import Flex from '../Flex';
import argTypes from './MenuListBox.stories.args';

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
  title: 'Momentum UI/MenuListBox',
  component: MenuListBox,
  parameters: {
    expanded: true,
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    ...argTypes,
  },
};

const Template: Story<MenuListBoxProps> = (args) => (
  <MenuListBox {...args} style={{ width: '20rem', height: '20rem' }}>
    <Flex justifyContent="center" alignItems="center" style={{ height: '100%' }}>
      This is a Menu Background
    </Flex>
  </MenuListBox>
);

const Example = Template.bind({});

export { Example };
