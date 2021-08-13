import React, { FC } from 'react';
import { Story } from '@storybook/react';

import Text, { TextProps, TEXT_CONSTANTS as CONSTANTS } from './';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import Documentation from './Text.documentation.mdx';

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
  title: 'Momentum UI/Text',
  component: Text,
  parameters: {
    expanded: true,
    docs: {
      page: DocsPage,
    },
  },
};

const argTypes = {
  children: {
    defaultValue: 'Example Text',
    description: 'Provides the child nodes for this element.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  className: {
    defaultValue: undefined,
    description:
      'If present, the class name will be added to the underlying component. Used to override styles by consumers.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  type: {
    defaultValue: CONSTANTS.DEFAULTS.TYPE,
    description: 'Modifies the text style (token) of this `<Text />`.',
    options: [undefined, ...Object.values(CONSTANTS.TYPES)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.TYPE,
      },
    },
  },
};

const Template: Story<TextProps> = (args) => <Text {...args} />;

const Example = Template.bind({});
Example.argTypes = { ...argTypes };

const MultiTemplate: Story<TextProps> = (args: TextProps, { parameters }) => {
  const { variants } = parameters;
  const { children } = args;

  const items = variants.map((variant, index: number) => (
    <Text key={index} {...variant} {...args}>
      {children}
    </Text>
  ));

  return (
    <div
      style={{
        display: 'inline',
      }}
    >
      {items}
    </div>
  );
};

const Types = MultiTemplate.bind({});

Types.parameters = {
  variants: [
    {},
    { type: 'display' },
    { type: 'banner-tertiary' },
    { type: 'banner-primary' },
    { type: 'banner-secondary' },
    { type: 'title' },
    { type: 'header-primary' },
    { type: 'highlight-primary' },
    { type: 'subheader-primary' },
    { type: 'body-primary' },
    { type: 'hyperlink-primary' },
    { type: 'subheader-secondary' },
    { type: 'highlight-secondary' },
    { type: 'header-secondary' },
    { type: 'body-secondary' },
    { type: 'hyperlink-secondary' },
    { type: 'highlight-compact' },
    { type: 'body-compact' },
    { type: 'label-compact' },
  ],
};

Types.argTypes = { ...argTypes };
delete Types.argTypes.type;

export { Example, Types };
