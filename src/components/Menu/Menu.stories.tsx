import React from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import { Item, Section } from '@react-stately/collections';

import Menu, { MenuProps } from './';
import argTypes from './Menu.stories.args';
import Documentation from './Menu.stories.docs.mdx';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Momentum UI/Menu',
  component: Menu,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<MenuProps<unknown>>(Menu).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  'aria-label': 'Menu component',
  onAction: action('onAction'),
  children: [
    <Item key="one">One</Item>,
    <Item key="two">Two</Item>,
    <Item key="three">Three</Item>,
  ],
};

const Common = MultiTemplate<MenuProps<unknown>>(Menu).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.args = {
  'aria-label': 'Menu component',
  onAction: action('onAction'),
};

Common.parameters = {
  variants: [
    {
      children: [
        <Section key="0" title="Colors">
          <Item>Red</Item>
          <Item>Blue</Item>
          <Item>Yellow</Item>
        </Section>,
        <Section key="1" title="Animals">
          <Item>Dog</Item>
          <Item>Cat</Item>
        </Section>,
      ],
    },
    {
      disabledKeys: ['$.0.0', '$.0.1'],
      children: [
        // If key is not provided the elements get generated ones
        // eslint-disable-next-line react/jsx-key
        <Section title="Disabled Options">
          <Item>Red</Item>
          <Item>Blue</Item>
        </Section>,
        // eslint-disable-next-line react/jsx-key
        <Section title="Animals">
          <Item>Dog</Item>
          <Item>Cat</Item>
        </Section>,
      ],
    },
  ],
};

delete Common.argTypes.onAction;
delete Common.argTypes.disabledKeys;

export { Example, Common };
