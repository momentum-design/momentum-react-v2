import React from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import { Item, Section } from '@react-stately/collections';

import Menu, { MenuProps } from './';
import argTypes from './Menu.stories.args';
import Documentation from './Menu.stories.docs.mdx';
import { action } from '@storybook/addon-actions';
import Flex from '../Flex';
import Avatar from '../Avatar';
import { PresenceType } from '../Avatar/Avatar.types';

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
  selectionMode: 'single',
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
      selectionMode: 'single',
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
      selectionMode: 'single',
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

    {
      selectionMode: 'single',
      itemShape: 'isPilled',
      itemSize: 50,
      children: [
        // If key is not provided the elements get generated ones
        // eslint-disable-next-line react/jsx-key
        <Section title="People">
          <Item textValue="Cisco">
            <Flex alignItems="center" xgap="0.875rem">
              <Avatar initials="CW" size={32} presence={PresenceType.Active} />
              <span>Cisco Webex</span>
            </Flex>
          </Item>
          <Item textValue="Josh">
            <Flex alignItems="center" xgap="0.875rem">
              <Avatar initials="CW" size={32} presence={PresenceType.Active} />
              <span>Josh Webex</span>
            </Flex>
          </Item>
        </Section>,
      ],
    },
  ],
};

delete Common.argTypes.onAction;
delete Common.argTypes.disabledKeys;

export { Example, Common };
