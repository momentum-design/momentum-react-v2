/* eslint-disable @typescript-eslint/ban-types */
import React, { FC, ReactElement, useState } from 'react';
import { Story } from '@storybook/react';
import { Item, Section } from '@react-stately/collections';
import { action } from '@storybook/addon-actions';
import Select, { SelectProps } from './';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import Documentation from './Select.documentation.mdx';
import Icon from '../Icon';
import Flex from '../Flex';

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
  title: 'Momentum UI/Select',
  component: Select,
  parameters: {
    expanded: true,
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    propName: {
      defaultValue: undefined,
      description: 'Description goes here.',
      options: [undefined, 'Option 1', 'Option 2'],
      control: { type: 'select' },
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: undefined,
        },
      },
    },
  },
};

type SelectData = {
  id: number;
  value: string | ReactElement;
  textValue?: string;
  children?: SelectData[];
};

const MultiTemplate =
  (): Story<SelectProps<SelectData>> =>
  // eslint-disable-next-line react/display-name
  (args: SelectProps<SelectData>, { parameters }) => {
    const { variants } = parameters;

    const elements = variants.map((variant, index: number) => {
      if (variant.items[0].children) {
        return (
          <div key={index}>
            <Select<SelectData> {...args} {...variant}>
              {(item) => (
                <Section key={item.id} items={item.children} title={item.value}>
                  {(item) => (
                    <Item textValue={item.textValue} key={item.id}>
                      {item.value}
                    </Item>
                  )}
                </Section>
              )}
            </Select>
          </div>
        );
      } else {
        return (
          <div key={index}>
            <Select<SelectData> {...args} {...variant}>
              {(item) => (
                <Item textValue={item.textValue} key={item.id}>
                  {item.value}
                </Item>
              )}
            </Select>
          </div>
        );
      }
    });

    return (
      <div
        style={{
          height: '100vh',
          display: 'grid',
          gridTemplateColumns: `repeat(3, auto)`,
          gap: '1.5rem',
          alignItems: 'start',
        }}
      >
        {elements}
      </div>
    );
  };

const SingleTemplate: Story<SelectProps<object>> = (args) => (
  <div style={{ height: '100vh' }}>
    <Select {...args}>
      <Item>Red</Item>
      <Item>Blue</Item>
      <Item>Green</Item>
      <Item>Yellow</Item>
    </Select>
  </div>
);

const SectionTemplate: Story<SelectProps<object>> = (args) => (
  <div style={{ height: '100vh' }}>
    <Select {...args}>
      <Section title="Colors">
        <Item>Red</Item>
        <Item>Blue</Item>
        <Item>Green</Item>
        <Item>Yellow</Item>
      </Section>
      <Section title="Animals">
        <Item>Dog</Item>
        <Item>Cat</Item>
      </Section>
    </Select>
  </div>
);

const singleItems: SelectData[] = [
  { id: 0, value: 'Red' },
  { id: 1, value: 'Blue' },
  { id: 2, value: 'Green' },
  { id: 3, value: 'Yellow' },
];

const Example = SingleTemplate.bind({});

Example.args = {
  label: 'Single Value',
  placeholder: 'Select an option',
  onSelectionChange: action('onSelectionChange'),
};

const Common = MultiTemplate().bind({});

Common.args = {
  placeholder: 'Select an option',
  onSelectionChange: action('onSelectionChange'),
};

Common.parameters = {
  variants: [
    { label: 'Default', items: singleItems },
    { label: 'Disabled', items: singleItems, isDisabled: true },
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
                  <span>Active Speaker Active Speaker Active Speaker Active Speaker</span>
                </Flex>
              ),
            },
            {
              id: 5,
              textValue: 'Apps',
              value: (
                <Flex alignItems="center" xgap="0.875rem">
                  <Icon name="apps" scale={18} weight="bold" />
                  <span>Apps</span>
                </Flex>
              ),
            },
          ],
        },
      ] as SelectData[],
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
                  <Icon name="apps" scale={18} weight="bold" />
                  <span>Apps</span>
                </Flex>
              ),
            },
          ],
        },
      ] as SelectData[],
    },
    { label: 'Direction Top', items: singleItems, direction: 'top' },
  ],
};

const Sections = SectionTemplate.bind({});

Sections.args = {
  label: 'Sections',
  placeholder: 'Select an option',
  onSelectionChange: action('onSelectionChange'),
};

export { Example, Common, Sections };
