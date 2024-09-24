/* eslint-disable no-console */
import React from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import { Item, Section } from '@react-stately/collections';

import Menu, { MenuProps, SelectionGroup } from './';
import argTypes from './Menu.stories.args';
import Documentation from './Menu.stories.docs.mdx';
import { action } from '@storybook/addon-actions';
import Flex from '../Flex';
import Avatar from '../Avatar';
import { PresenceType } from '../Avatar/Avatar.types';
import { Icon, Text } from '..';
import './Menu.stories.style.scss';

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

const menuOnSelectionChange = (...rest) => {
  console.log('menuOnSelectionChange', rest);
};

const menuOnAction = (...rest) => {
  console.log('menuOnAction', rest);
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
delete Sections.argTypes.itemSize;

Sections.args = {
  'aria-label': 'Where would you like to live',
  selectionMode: 'multiple',
};

Sections.parameters = {
  variants: [
    {
      itemSize: 32,
      onSelectionChange: menuOnSelectionChange,
      onAction: menuOnAction,
      hasSeparators: true,
      children: [
        <Section key="0" title="Europe">
          <Item key="00">Spain</Item>
          <Item key="01">France</Item>
          <Item key="02">Italy</Item>
        </Section>,
        <Section key="1" title="Asia">
          <Item key="10">India</Item>
          <Item key="11">China</Item>
          <Item key="12">Japan</Item>
        </Section>,
        <Section key="2" title="America">
          <Item key="13">USA</Item>
          <Item key="14">Mexico</Item>
          <Item key="15">Canada</Item>
        </Section>,
      ],
    },
  ],
};

const SelectionGroups = MultiTemplate<MenuProps<unknown>>(Menu).bind({});

SelectionGroups.argTypes = { ...argTypes };
delete SelectionGroups.argTypes.children;
delete SelectionGroups.argTypes.itemSize;

SelectionGroups.args = {
  'aria-label': 'Menu with multiple selection modes component',
  onSelectionChange: action('onSelectionChange'),
};

SelectionGroups.parameters = {
  variants: [
    {
      selectionMode: 'multiple', // this is the default for all the group
      itemSize: 32,
      tickPosition: 'left',
      onSelectionChange: menuOnSelectionChange,
      onAction: menuOnAction,
      hasSeparators: 'true',
      children: [
        <SelectionGroup
          key="0"
          selectionMode="multiple"
          aria-label="First group"
          onSelectionChange={(...rest) => {
            console.log('singleselection1', rest);
          }}
          onAction={(...rest) => {
            console.log('selectionOnAction1', rest);
          }}
          title={
            <Flex direction="row" alignItems="center" xgap="0.25rem">
              <Icon scale={16} name="speaker" strokeColor="none" />
              <Text>Speaker (you can choose many)</Text>
            </Flex>
          }
        >
          <Item key="00">System default speaker</Item>
          <Item key="01">Default - External Headphones (Built-in)</Item>
          <Item key="02">Desk Pro Web Camera</Item>
          <Item key="03">MacBook Pro Speakers</Item>
          <Item key="04">Webex Media Audio Device</Item>
        </SelectionGroup>,
        <SelectionGroup
          key="1"
          selectionMode="single"
          tickPosition="right"
          aria-label="Second group"
          onSelectionChange={(...rest) => {
            console.log('singleselection2', rest);
          }}
          onAction={(...rest) => {
            console.log('selectionOnAction2', rest);
          }}
          title={
            <Flex direction="row" alignItems="center" xgap="0.25rem">
              <Icon scale={16} name="microphone" strokeColor="none" />
              <Text>Microphone (you can choose one)</Text>
            </Flex>
          }
        >
          <Item key="10">No Microphone</Item>
          <Item key="11">Default - External Microhpone (Built-in)</Item>
          <Item key="12">Desk Pro Web Microphone</Item>
          <Item key="13">MacBook Pro Microphone</Item>
          <Item key="14">Webex Media Audio Device</Item>
        </SelectionGroup>,
        <SelectionGroup
          key="2"
          tickPosition="none"
          classNameSelectedItem="selectedItem"
          items={[
            { key: '20', value: 'No optimization' },
            { key: '21', value: 'Noise removal' },
            { key: '22', value: 'Music mode' },
          ]}
          selectionMode="single"
          aria-label="Second group"
          onSelectionChange={(...rest) => {
            console.log('singleselection3', rest);
          }}
          onAction={(...rest) => {
            console.log('selectionOnAction3', rest);
          }}
          title={
            <>
              <Flex direction="row" alignItems="center" xgap="0.25rem">
                <Icon scale={16} name="adjust-microphone" strokeColor="none" />
                <Text>Webex smart audio (You can choose one)</Text>
              </Flex>
            </>
          }
        >
          {(item) => (
            <Item textValue={item.value} key={item.key}>
              {item.value}
            </Item>
          )}
        </SelectionGroup>,
        <SelectionGroup
          key="3"
          tickPosition="none"
          classNameSelectedItem="selectedItem"
          className="layoutGroup"
          itemSize="auto"
          items={[
            { key: '30', value: 'Grid' },
            { key: '31', value: 'Stack' },
            { key: '32', value: 'Side by side' },
          ]}
          selectionMode="single"
          aria-label="Third group"
          onSelectionChange={(...rest) => {
            console.log('singleselection4', rest);
          }}
          onAction={(...rest) => {
            console.log('selectionOnAction4', rest);
          }}
          title={
            <>
              <Flex direction="row" alignItems="center" xgap="0.25rem">
                <Icon scale={16} name="accessibility" strokeColor="none" />
                <Text>Layout</Text>
              </Flex>
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
delete Common.argTypes.selectionMode;
delete Common.argTypes.itemShape;

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

export { Example, ActionMenu, Sections, SelectionGroups, Common };
