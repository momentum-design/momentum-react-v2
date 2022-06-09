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
import { ListHeader, ListItemBaseSection, Icon } from '..';

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
const Sections = MultiTemplate<MenuProps<unknown>>(Menu).bind({});

Sections.argTypes = { ...argTypes };
delete Sections.argTypes.children;
delete Sections.argTypes.isTickOnLeftSide;
delete Sections.argTypes.itemSize;

Sections.args = {
  'aria-label': 'Menu component',
  onAction: action('onAction'),
  onSelectionChange: action('onSelectionChange'),
};

Sections.parameters = {
  variants: [
    {
      selectionMode: 'single',
      itemSize: 32,
      isTickOnLeftSide: true,
      children: [
        <Section
          key="0"
          title={
            <ListHeader outline={false}>
              <ListItemBaseSection position="start">
                <Icon scale={16} name="speaker" strokeColor="none" />
              </ListItemBaseSection>
              <ListItemBaseSection position="fill">Speaker</ListItemBaseSection>
            </ListHeader>
          }
        >
          <Item key="00">Use system setting (internal speakers)</Item>
          <Item key="01">Internal speaker</Item>
          <Item key="02">Bose Headset 100</Item>
        </Section>,
        <Section
          key="1"
          title={
            <ListHeader outline={true} outlinePosition="top" outlineColor="secondary">
              <ListItemBaseSection position="start">
                <Icon scale={16} name="microphone" strokeColor="none" />
              </ListItemBaseSection>
              <ListItemBaseSection position="fill">Microphone</ListItemBaseSection>
            </ListHeader>
          }
        >
          <Item key="10">Use system setting (internal microphone)</Item>
          <Item key="11">Bose Headset 100</Item>
        </Section>,
        <Section title={<ListHeader outline outlineColor="secondary" />} key="2">
          <Item key="20">No title in the section</Item>
        </Section>,
        <Section title={<ListHeader outline outlineColor="secondary" />} key="3">
          <Item key="30">No title in the section</Item>
        </Section>,
      ],
    },
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

export { Example, Sections, Common };
