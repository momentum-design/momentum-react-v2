import React, { FC } from 'react';
import { Story } from '@storybook/react';

import ListItemBaseSection, { ListItemBaseSectionProps } from '.';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import Documentation from './ListItemBaseSection.documentation.mdx';
import ListItemBase from '../ListItemBase';
import argTypes from './ListItemBaseSection.stories.args';

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
  title: 'Momentum UI/ListItemBaseSection',
  component: ListItemBaseSection,
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

const MultiTemplate: Story<ListItemBaseSectionProps> = (
  args: ListItemBaseSectionProps,
  { parameters }
) => {
  const { variants } = parameters;

  const items = variants.map((variant, index: number) => (
    <div key={index}>
      <ListItemBase style={{ minWidth: '20rem', border: '1px solid red' }}>
        <ListItemBaseSection {...args} {...variant} style={{ border: '1px solid blue' }} />
      </ListItemBase>
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
