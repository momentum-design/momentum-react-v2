import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import { Item, Section } from '@react-stately/collections';
import React from 'react';
import ComboBox, { ComboBoxProps } from './';
import argTypes from './ComboBox.stories.args';
import Documentation from './ComboBox.stories.docs.mdx';
import { useListState } from '@react-stately/list';
import ListBoxBase from '../ListBoxBase';
import Flex from '../Flex';

export default {
  title: 'Momentum UI/ComboBox',
  component: ComboBox,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Dual = (props: any) => {
  return (
    <Flex alignItems="center">
      <ComboBox showButton={false}>
        <Item key="1">Red</Item>
        <Item key="2">Blue</Item>
        <Item key="3">Yellow</Item>
      </ComboBox>
      <ComboBox>
        <Item key="4">07377148709</Item>
        <Item key="5">07377142322</Item>
        <Item key="6">07377142322</Item>
      </ComboBox>
    </Flex>
  );
};

// NOTE: Primary story. This renders a single component with all external props.
const Example = Template<any>(Dual).bind({});

Example.argTypes = { ...argTypes };

// TODO: Provide default arguments for this story here. These populate into the argument table for this component.
Example.args = {
  label: 'this',
  children: [<Item key="1">Red</Item>, <Item key="2">Blue</Item>, <Item key="3">Yellow</Item>],
};

const ListBoxExampleComponent = (props: any) => {
  const state = useListState(props);
  return <ListBoxBase state={state} />;
};

// NOTE: Primary story. This renders a single component with all external props.
const ListBoxExample = Template<any>(ListBoxExampleComponent).bind({});

ListBoxExample.argTypes = { ...argTypes };

// TODO: Provide default arguments for this story here. These populate into the argument table for this component.
ListBoxExample.args = {
  label: 'this',
  children: [<Item key="1">Red</Item>, <Item key="2">Blue</Item>, <Item key="3">Yellow</Item>],
};

// TODO: Inject additional stories here.

// NOTE: Common variants story. This renders multiple variants of a single component.
const Common = MultiTemplate<ComboBoxProps>(ComboBox).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

// TODO: Provide default arguments for this story here. These populate into the argument table for this component for all variants.
Common.args = {
  children: 'Example',
};

Common.parameters = {
  variants: [{ children: 'Example A' }, { children: 'Example B' }, { children: 'Example C' }],
};

// NOTE: Export stories here. The first export should be `Example`, and the last export should be `Common`.
export { Example, ListBoxExample, Common };
