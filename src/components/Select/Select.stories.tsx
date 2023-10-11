/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactElement } from 'react';
import { Item, Section } from '@react-stately/collections';
import { action } from '@storybook/addon-actions';
import Select from '.';

import { DocumentationPage } from '../../storybook/helper.stories.docs';

import Documentation from './Select.documentation.mdx';
import Icon from '../Icon';
import Flex from '../Flex';

import StyleDocs from '../../storybook/docs.stories.style.mdx';
import argTypes from './Select.stories.args';

import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';

export default {
  title: 'Momentum UI/Select',
  component: Select,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

type SelectData = {
  id: number;
  value: string | ReactElement;
  textValue?: string;
  children?: SelectData[];
};

const singleItems: SelectData[] = [
  { id: 0, value: 'Red' },
  { id: 1, value: 'Blue' },
  { id: 2, value: 'Green' },
  { id: 3, value: 'Yellow' },
];

const manyItems: SelectData[] = [
  { id: 0, value: 'Red' },
  { id: 1, value: 'Blue' },
  { id: 2, value: 'Green' },
  { id: 3, value: 'Yellow' },
  { id: 4, value: 'Red' },
  { id: 5, value: 'Blue' },
  { id: 6, value: 'Green' },
  { id: 7, value: 'Yellow' },
  { id: 8, value: 'Red' },
  { id: 9, value: 'Blue' },
  { id: 10, value: 'Green' },
  { id: 11, value: 'Yellow' },
  { id: 12, value: 'Red' },
  { id: 13, value: 'Blue' },
];

const Example = Template(Select).bind({});

Example.args = {
  label: 'Single Value',
  placeholder: 'Select an option',
  onSelectionChange: action('onSelectionChange'),
  style: { maxWidth: '15rem' },
  children: [
    <Item key="1">This is a very long option and should trim.</Item>,
    <Item key="2">Blue</Item>,
    <Item key="3">Green</Item>,
    <Item key="4">Yellow</Item>,
  ],
};

Example.argTypes = { ...argTypes };

const Sections = Template(Select).bind({});

Sections.args = {
  label: 'With Sections',
  placeholder: 'Select an option',
  onSelectionChange: action('onSelectionChange'),
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
};

Sections.argTypes = { ...argTypes };

delete Sections.argTypes.label;
delete Sections.argTypes.placeholder;
delete Sections.argTypes.onSelectionChange;

const DisabledOptions = Template(Select).bind({});

DisabledOptions.args = {
  label: 'With Disabled Options',
  placeholder: 'Select an option',
  onSelectionChange: action('onSelectionChange'),
  disabledKeys: ['$.0.0', '$.0.1', '$.1.1'],
  children: [
    // If key is not provided the elements get generated ones
    // eslint-disable-next-line react/jsx-key
    <Section title="Colors">
      <Item>Red</Item>
      <Item>Blue</Item>
      <Item>Yellow</Item>
    </Section>,
    // eslint-disable-next-line react/jsx-key
    <Section title="Animals">
      <Item>Dog</Item>
      <Item>Cat</Item>
    </Section>,
  ],
};

DisabledOptions.argTypes = { ...argTypes };

delete DisabledOptions.argTypes.label;
delete DisabledOptions.argTypes.placeholder;
delete DisabledOptions.argTypes.onSelectionChange;
delete DisabledOptions.argTypes.disabledKeys;

const Common = MultiTemplate(Select).bind({});

Common.argTypes = { ...argTypes };

Common.args = {
  placeholder: 'Select an option',
  onSelectionChange: action('onSelectionChange'),
  style: { margin: '1rem' },
};

delete Common.argTypes.label;
delete Common.argTypes.placeholder;
delete Common.argTypes.onSelectionChange;
delete Common.argTypes.disabledKeys;

Common.parameters = {
  variants: [
    {
      label: 'Default',
      items: singleItems,
      children: (item) => <Item key={item.id}>{item.value}</Item>,
    },
    {
      label: 'Disabled',
      items: singleItems,
      isDisabled: true,
      children: (item) => <Item key={item.id}>{item.value}</Item>,
    },
    {
      label: 'With Icon',
      items: [
        {
          id: 0,
          textValue: 'Accessories',
          value: (
            <Flex alignItems="center" xgap="0.875rem">
              <Icon name="accessories" scale={18} weight="bold" />
              <span>Accessories</span>
            </Flex>
          ),
        },
        {
          id: 1,
          textValue: 'Active Speaker',
          value: (
            <Flex alignItems="center" xgap="0.875rem">
              <Icon name="active-speaker" scale={18} weight="bold" />
              <span>Active Speaker</span>
            </Flex>
          ),
        },
        {
          id: 2,
          textValue: 'Accessibility',
          value: (
            <Flex alignItems="center" xgap="0.875rem">
              <Icon name="accessibility" scale={18} weight="bold" />
              <span>Accessibility</span>
            </Flex>
          ),
        },
      ],
      children: (item) => <Item key={item.id}>{item.value}</Item>,
    },
    {
      label: 'With Sections & Label Section',
      items: [
        {
          id: 0,
          value: 'Section 1',
          children: [
            {
              id: 1,
              textValue: 'Accessories',
              value: (
                <Flex alignItems="center" xgap="0.875rem">
                  <Icon name="accessories" scale={18} weight="bold" />
                  <span>Accessories</span>
                </Flex>
              ),
            },
            {
              id: 2,
              textValue: 'Accessibility',
              value: (
                <Flex alignItems="center" xgap="0.875rem">
                  <Icon name="accessibility" scale={18} weight="bold" />
                  <span>Accessibility</span>
                </Flex>
              ),
            },
          ],
        },
        {
          id: 3,
          value: 'Section 2',
          children: [
            {
              id: 4,
              textValue: 'Active Speaker',
              value: (
                <Flex alignItems="center" xgap="0.875rem">
                  <Icon name="active-speaker" scale={18} weight="bold" />
                  <span>Active Speaker</span>
                </Flex>
              ),
            },
            {
              id: 5,
              textValue: 'Apps',
              value: (
                <Flex alignItems="center" xgap="0.875rem">
                  <Icon name="accessories" scale={18} weight="bold" />
                  <span>Apps</span>
                </Flex>
              ),
            },
          ],
        },
      ] as SelectData[],
      children: (item: SelectData) => (
        <Section key={item.id} items={item.children} title={item.value}>
          {(item) => (
            <Item textValue={item.textValue} key={item.id}>
              {item.value}
            </Item>
          )}
        </Section>
      ),
    },
    {
      label: 'With Sections & No Label Section',
      items: [
        {
          id: 0,
          children: [
            {
              id: 1,
              textValue: 'Accessories',
              value: (
                <Flex alignItems="center" xgap="0.875rem">
                  <Icon name="accessories" scale={18} weight="bold" />
                  <span>Accessories</span>
                </Flex>
              ),
            },
            {
              id: 2,
              textValue: 'Accessibility',
              value: (
                <Flex alignItems="center" xgap="0.875rem">
                  <Icon name="accessibility" scale={18} weight="bold" />
                  <span>Accessibility</span>
                </Flex>
              ),
            },
          ],
        },
        {
          id: 3,
          children: [
            {
              id: 4,
              textValue: 'Active Speaker',
              value: (
                <Flex alignItems="center" xgap="0.875rem">
                  <Icon name="active-speaker" scale={18} weight="bold" />
                  <span>Active Speaker</span>
                </Flex>
              ),
            },
            {
              id: 5,
              textValue: 'Apps',
              value: (
                <Flex alignItems="center" xgap="0.875rem">
                  <Icon name="accessories" scale={18} weight="bold" />
                  <span>Apps</span>
                </Flex>
              ),
            },
          ],
        },
      ] as SelectData[],
      children: (item: SelectData) => (
        <Section key={item.id} items={item.children} title={item.value}>
          {(item) => (
            <Item textValue={item.textValue} key={item.id}>
              {item.value}
            </Item>
          )}
        </Section>
      ),
    },
    {
      label: 'Direction Top',
      items: singleItems,
      direction: 'top',
      showBorder: true,
      children: (item) => <Item key={item.id}>{item.value}</Item>,
    },
    {
      label: 'With a lot of list items',
      items: manyItems,
      direction: 'bottom',
      showBorder: true,
      children: (item) => <Item key={item.id}>{item.value}</Item>,
    },
    {
      label: 'With a lot of list items and fixed height',
      items: manyItems,
      listboxMaxHeight: '13.5rem',
      direction: 'bottom',
      showBorder: true,
      children: (item) => <Item key={item.id}>{item.value}</Item>,
    },
    {
      label: 'Select with fixed width',
      style: { width: '25rem', margin: '1rem' },
      items: singleItems,
      direction: 'bottom',
      showBorder: true,
      children: (item) => <Item key={item.id}>{item.value}</Item>,
    },
  ],
};

export { Example, Sections, DisabledOptions, Common };
