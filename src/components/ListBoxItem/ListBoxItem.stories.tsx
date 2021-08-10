import React, { FC } from 'react';
import { Story } from '@storybook/react';

import ListBoxItem, { ListBoxItemProps } from './';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import Documentation from './ListBoxItem.documentation.mdx';

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
  title: 'Momentum UI/ListBoxItem',
  component: ListBoxItem,
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

const MultiTemplate: Story<ListBoxItemProps> = (args: ListBoxItemProps, { parameters }) => {
  const { variants } = parameters;

  const items = variants.map((variant, index: number) => (
    <div key={index}>
      <ListBoxItem {...args} {...variant} />
      <p>{variant.label}</p>
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

const Template: Story<ListBoxItemProps> = (args) => <ListBoxItem {...args} />;

const Example = Template.bind({});

Example.args = {
  propName: 'Value 1',
};

const Common = MultiTemplate.bind({});

Common.parameters = {
  variants: [
    {},
    { propName: 'Value 1', label: 'With value 1' },
    { propName: 'Value 2', label: 'With value 2' },
  ],
};

export { Example, Common };
