import React from 'react';

import StyleDocs from 'storybook/docs.stories.style.mdx';
import { DocumentationPage } from 'storybook/helper.stories.docs';
import { MultiTemplate, Template } from 'storybook/helper.stories.templates';

import Flex from 'components/Flex';

import argTypes from './MenuListBackground.stories.args';
import Documentation from './MenuListBackground.stories.docs.mdx';

import MenuListBackground, { MenuListBackgroundProps } from './';

export default {
  title: 'Momentum UI/MenuListBackground',
  component: MenuListBackground,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

/**
 * Primary story. This renders a single component with all external props.
 */
const Example = Template<MenuListBackgroundProps>((args) => (
  <MenuListBackground {...args} style={{ width: '20rem', height: '20rem' }}>
    <Flex justifyContent="center" alignItems="center" style={{ height: '100%' }}>
      This is a Menu Background
    </Flex>
  </MenuListBackground>
)).bind({});

Example.argTypes = { ...argTypes };

const Colors = MultiTemplate<MenuListBackgroundProps>((args) => (
  <MenuListBackground {...args} style={{ width: '20rem', height: '20rem', marginRight: '1rem' }}>
    <Flex justifyContent="center" alignItems="center" style={{ height: '100%' }}>
      This is a Menu Background
    </Flex>
  </MenuListBackground>
)).bind({});

Colors.parameters = {
  variants: [{ color: 'primary' }, { color: 'secondary' }, { color: 'tertiary' }],
};

Colors.argTypes = { ...argTypes };
delete Colors.argTypes.color;

export { Example, Colors };
