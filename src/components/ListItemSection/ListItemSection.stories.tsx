import React, { FC } from 'react';
import { Story } from '@storybook/react';

import ListItemSection, { ListItemSectionProps } from './';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import Documentation from './ListItemSection.documentation.mdx';
import ListItem from '../ListItem';
import argTypes from './ListItemSection.stories.args';

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
  title: 'Momentum UI/ListItemSection',
  component: ListItemSection,
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

const MultiTemplate: Story<ListItemSectionProps> = (args: ListItemSectionProps, { parameters }) => {
  const { variants } = parameters;

  const items = variants.map((variant, index: number) => (
    <div key={index}>
      <ListItem style={{ minWidth: '20rem', border: '1px solid red' }}>
        <ListItemSection {...args} {...variant} style={{ border: '1px solid blue' }} />
      </ListItem>
      <p>{variant.label}</p>
    </div>
  ));

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(1, auto)`,
        gap: '1.5rem',
        alignItems: 'end',
      }}
    >
      {items}
    </div>
  );
};

const Positions = MultiTemplate.bind({});

Positions.args = {
  children: 'Content',
};

Positions.parameters = {
  variants: [
    { position: 'start', label: 'Start' },
    { position: 'middle', label: 'Middle' },
    { position: 'end', label: 'End' },
    { position: 'fill', label: 'Fill' },
  ],
};

export { Positions };
