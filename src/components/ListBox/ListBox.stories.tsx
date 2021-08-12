/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import { Story } from '@storybook/react';
import { action, actions } from '@storybook/addon-actions';

import ListBox, { ListBoxProps } from './';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import Documentation from './ListBox.documentation.mdx';
import { Item, Section } from '@react-stately/collections';
import ListItem from '../ListItem';
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
  title: 'Momentum UI/ListBox',
  component: ListBox,
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

const MultiTemplate: Story<ListBoxProps<any>> = (args: ListBoxProps<any>, { parameters }) => {
  const { variants } = parameters;

  const items = variants.map((variant, index: number) => (
    <div key={index}>
      <ListBox<{ name: string; id: number }> {...args} {...variant}>
        {(item) => <Item key={item.id}>{item.name}</Item>}
      </ListBox>
    </div>
  ));

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(4, auto)`,
        gap: '1.5rem',
        alignItems: 'end',
      }}
    >
      {items}
    </div>
  );
};

const SimpleTemplate: Story<ListBoxProps<any>> = (args) => (
  <ListBox aria-labelledby="label" selectionMode="none" {...args}>
    <Item>
      <ListItem>Test</ListItem>
    </Item>
    <Item>Three</Item>
    <Item>Four</Item>
    <Item>Five</Item>
    <Item>Six</Item>
  </ListBox>
);

const SectionWithNoLabelTemplate: Story<ListBoxProps<any>> = (args) => (
  <ListBox aria-labelledby="label" selectionMode="none" {...args}>
    <Section>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Section>
    <Section>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Section>
  </ListBox>
);

const SectionWithLabelTemplate: Story<ListBoxProps<any>> = (args) => (
  <>
    <ListBox aria-labelledby="label" selectionMode="none" {...args}>
      <Section title="Section 1">
        <Item>One</Item>
        <Item>Two</Item>
        <Item>Three</Item>
      </Section>
      <Section title={'Section 2'}>
        <Item>One</Item>
        <Item>Two</Item>
        <Item>Three</Item>
      </Section>
    </ListBox>
  </>
);

const Example = SimpleTemplate.bind({});

Example.args = {
  label: 'Simple',
  onSelectionChange: actions('onSelectionChange'),
};

const SectionsWithNoLabel = SectionWithNoLabelTemplate.bind({});

SectionsWithNoLabel.args = {
  label: 'Sections with no Label',
  onSelectionChange: actions('onSelectionChange'),
};

const SectionWithLabel = SectionWithLabelTemplate.bind({});

SectionWithLabel.args = {
  label: 'Sections with Label',
  onSelectionChange: actions('onSelectionChange'),
};

const Common = MultiTemplate.bind({});

Common.parameters = {
  variants: [
    {
      label: 'Simple ListBox',
      items: [
        { name: 'Red', id: 0 },
        { name: 'Blue', id: 1 },
        { name: 'Green', id: 2 },
      ],
    },
  ],
};

export { Example, SectionsWithNoLabel, SectionWithLabel, Common };
