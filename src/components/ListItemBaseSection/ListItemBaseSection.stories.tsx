import React from 'react';

import StyleDocs from 'storybook/docs.stories.style.mdx';
import { DocumentationPage } from 'storybook/helper.stories.docs';
import { MultiTemplate, Template } from 'storybook/helper.stories.templates';

import ListItemBase from 'components/ListItemBase';

import Documentation from './ListItemBaseSection.documentation.mdx';
import argTypes from './ListItemBaseSection.stories.args';

import ListItemBaseSection from '.';

export default {
  title: 'Momentum UI/ListItemBaseSection',
  component: ListItemBaseSection,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template((args) => {
  return (
    <ListItemBase style={{ minWidth: '20rem', border: '1px solid red' }}>
      <ListItemBaseSection {...args} style={{ border: '1px solid blue' }} />
    </ListItemBase>
  );
}).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  children: 'Content',
};

const Positions = MultiTemplate((args) => {
  return (
    <ListItemBase style={{ minWidth: '20rem', border: '1px solid red' }}>
      <ListItemBaseSection {...args} style={{ border: '1px solid blue' }} />
    </ListItemBase>
  );
}).bind({});

Positions.argTypes = { ...argTypes };
delete Positions.argTypes.position;

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

export { Example, Positions };
