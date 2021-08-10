import React, { FC } from 'react';
import { Story } from '@storybook/react';

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

const MultiTemplate: Story<ListBoxProps> = (args: ListBoxProps, { parameters }) => {
  const { variants } = parameters;

  const items = variants.map((variant, index: number) => (
    <div key={index}>
      <ListBox {...args} {...variant} />
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

const Template: Story<ListBoxProps> = (args) => <ListBox {...args} />;

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
