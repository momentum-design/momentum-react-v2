import React from 'react';
import { Story } from '@storybook/react';

import Flex, { FlexProps } from '.';

import Documentation from './Flex.documentation.mdx';
import argTypes from './Flex.stories.args';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

export default {
  title: 'Momentum UI/Flex',
  component: Flex,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Items = () => {
  return (
    <>
      <div style={{ border: '1px solid blue' }}>Item 1</div>
      <div style={{ border: '1px solid blue' }}>Item 2</div>
      <div style={{ border: '1px solid blue' }}>Item 3</div>
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

const Example = Template;

Example.argTypes = { ...argTypes };

const Common = MultiTemplate;

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

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;
delete Common.argTypes.justifyContent;
delete Common.argTypes.xgap;
delete Common.argTypes.ygap;
delete Common.argTypes.direction;
delete Common.argTypes.alignItems;

export { Example, Common };
