import React, { FC } from 'react';
import { Story } from '@storybook/react';
import { Item, Section } from '@react-stately/collections';

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

const MultiTemplate: Story<SelectProps> = (args: SelectProps, { parameters }) => {
  const { variants } = parameters;

  const items = variants.map((variant, index: number) => (
    <div key={index}>
      <Select {...args} {...variant}>
        {(item) => <Item>{item.value}</Item>}
      </Select>
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

const Template: Story<SelectProps> = (args) => (
  <div style={{ height: '100vh' }}>
    <Select label={args.label} placeholder={args.placeholder} items={args.items}>
      {(item) => <Item>{item.value}</Item>}
    </Select>
  </div>
);

const singleItems = [
  { id: 0, value: 'Red' },
  { id: 1, value: 'Blue' },
  { id: 2, value: 'Green' },
  { id: 3, value: 'Yellow' },
];

const Example = Template.bind({});

Example.args = {
  label: 'Single Value',
  placeholder: 'Select an option',
  items: singleItems,
};

const Common = MultiTemplate.bind({});

Common.args = {
  placeholder: 'Select an option',
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
          value: (
            <>
              <Icon name="accessories" scale={18} weight="bold" />
              <span>Accessories</span>
            </>
          ),
        },
        {
          id: 1,
          value: (
            <>
              <Icon name="active-speaker" scale={18} weight="bold" />
              <span>Active Speaker</span>
            </>
          ),
        },
        {
          id: 2,
          value: (
            <>
              <Icon name="accessibility" scale={18} weight="bold" />
              <span>Accessibility</span>
            </>
          ),
        },
      ],
    },
  ],
};

export { Example, Common };
