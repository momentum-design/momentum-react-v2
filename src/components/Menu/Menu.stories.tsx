/* eslint-disable no-console */
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
import { SelectionGroup } from './Menu.utils';

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

const ActionMenu = Template<MenuProps<unknown>>(Menu).bind({});

ActionMenu.argTypes = { ...argTypes };

ActionMenu.args = {
  'aria-label': 'Menu component',
  onAction: action('onAction'),
  selectionMode: 'none',
  children: [
    <Item key="Copy">Copy</Item>,
    <Item key="Cut">Cut</Item>,
    <Item key="Paste">Paste</Item>,
  ],
};

const Sections = MultiTemplate<MenuProps<unknown>>(Menu).bind({});

Sections.argTypes = { ...argTypes };
delete Sections.argTypes.children;
delete Sections.argTypes.isTickOnLeftSide;
delete Sections.argTypes.itemSize;

Sections.args = {
  'aria-label': 'Where would you like to live',
  selectionMode: 'multiple',
};

Sections.parameters = {
  variants: [
    {
      itemSize: 32,
      isTickOnLeftSide: true,
      label: 'Where would you like to live?', 
      onSelectionChange: action('onSelectionChange'),
      children: [
        <Section
          key="0"
          title={
            <ListHeader outline={false}>
              <ListItemBaseSection position="fill">Europe</ListItemBaseSection>
            </ListHeader>
          }
        >
          <Item key="00">Spain</Item>
          <Item key="01">France</Item>
          <Item key="02">Italy</Item>
        </Section>,
        <Section
          key="1"
          title={
            <ListHeader outline={true} outlinePosition="top" outlineColor="secondary">
              <ListItemBaseSection position="fill">Asia</ListItemBaseSection>
            </ListHeader>
          }
        >
          <Item key="10">India</Item>
          <Item key="11">China</Item>
          <Item key="12">Japan</Item>
        </Section>,
        <Section
        key="2"
        title={
          <ListHeader outline={true} outlinePosition="top" outlineColor="secondary">
            <ListItemBaseSection position="fill">America</ListItemBaseSection>
          </ListHeader>
        }
      >
        <Item key="13">USA</Item>
        <Item key="14">Mexico</Item>
        <Item key="15">Canada</Item>
      </Section>,
      ],
    },
  ],
};

const SelectionGroupExample = MultiTemplate<MenuProps<unknown>>(Menu).bind({});

SelectionGroupExample.argTypes = { ...argTypes };
delete Sections.argTypes.children;
delete Sections.argTypes.isTickOnLeftSide;
delete Sections.argTypes.itemSize;

SelectionGroupExample.args = {
  'aria-label': 'Menu with multiple selection modes component',
  onSelectionChange: action('onSelectionChange'),
};

SelectionGroupExample.parameters = {
  variants: [
    {
      selectionMode: 'none',
      itemSize: 32,
      isTickOnLeftSide: true,
      children: [
        <SelectionGroup
          key="0"
          selectionMode="multiple"
          aria-label="First group"
          onSelectionChange={(...rest) => {
            console.log('multipleselection', rest);
          }}
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
        </SelectionGroup>,
        <SelectionGroup
          key="1"
          selectionMode="single"
          aria-label="Second group"
          onSelectionChange={(...rest) => {
            console.log('singleselection', rest);
          }}
          title={
            <>
              <ListHeader outline={true} outlinePosition="top" outlineColor="secondary">
                <ListItemBaseSection position="start">
                  <Icon scale={16} name="microphone" strokeColor="none" />
                </ListItemBaseSection>
                <ListItemBaseSection position="fill">Microphone</ListItemBaseSection>
              </ListHeader>
            </>
          }
        >
          <Item key="10">Use system setting (internal microphone)</Item>
          <Item key="11">Bose Headset 100</Item>
        </SelectionGroup>,
        <SelectionGroup
          key="3"
          items={[{ key: '20', value: 'Keyboard' }, { key: '21', value: 'Mouse' }]}
          selectionMode="single"
          aria-label="Second group"
          onSelectionChange={(...rest) => {
            console.log('singleselection', rest);
          }}
          title={
            <>
              <ListHeader outline={true} outlinePosition="top" outlineColor="secondary">
                <ListItemBaseSection position="start">
                  <Icon scale={16} name="accessibility" strokeColor="none" />
                </ListItemBaseSection>
                <ListItemBaseSection position="fill">Devices</ListItemBaseSection>
              </ListHeader>
            </>
          }
        >
          {(item) => (
            <Item textValue={item.value} key={item.key}>
              {item.value}
            </Item>
          )}
        </SelectionGroup>,
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

export { Example, ActionMenu, Sections, SelectionGroupExample, Common };
