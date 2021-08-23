import React, { FC } from 'react';
import { Story } from '@storybook/react';

import Flex, { FlexProps } from './';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import Documentation from './Flex.documentation.mdx';
import argTypes from './Flex.stories.args';

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
  title: 'Momentum UI/Flex',
  component: Flex,
  parameters: {
    expanded: true,
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    ...argTypes,
  },
};

const Items = () => {
  return (
    <>
      <p style={{ border: '1px solid blue' }}>Item 1</p>
      <p style={{ border: '1px solid blue' }}>Item 2</p>
      <p style={{ border: '1px solid blue' }}>Item 3</p>
    </>
  );
};

const Template: Story<FlexProps> = (args: FlexProps) => (
  <Flex {...args} style={{ border: '1px solid red', minWidth: '20rem', height: '20rem' }}>
    <Items />
  </Flex>
);

const MultiTemplate: Story<FlexProps> = (args: FlexProps, { parameters }) => {
  const { variants } = parameters;

  const items = variants.map((variant, index: number) => (
    <div key={index}>
      <Flex {...args} {...variant} style={{ minWidth: '20rem', border: '1px solid red' }} />
      <p>{variant.label}</p>
    </div>
  ));

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(3, auto)`,
        gap: '1.5rem',
        alignItems: 'end',
      }}
    >
      {items}
    </div>
  );
};

const Example = Template.bind({});

const Common = MultiTemplate.bind({});

Common.parameters = {
  variants: [
    { children: <Items />, justifyContent: 'flex-start', xgap: '1rem' },
    { children: <Items />, justifyContent: 'center', xgap: '1rem' },
    { children: <Items />, justifyContent: 'flex-end', xgap: '1rem' },
    { children: <Items />, direction: 'column', alignItems: 'flex-start', ygap: '1rem' },
    { children: <Items />, direction: 'column', alignItems: 'center', ygap: '1rem' },
    { children: <Items />, direction: 'column', alignItems: 'flex-end', ygap: '1rem' },
  ],
};

export { Example, Common };
