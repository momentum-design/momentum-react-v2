import React from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import ReactionPicker, { ReactionPickerProps } from './';
import Reaction from '../Reaction';
import ReactionButton from '../ReactionButton';
import argTypes from './ReactionPicker.stories.args';
import Documentation from './ReactionPicker.stories.docs.mdx';

const reactionChildren = [
  <ReactionButton key="1">
    <Reaction name={'popper'} />
  </ReactionButton>,
  <ReactionButton key="2">
    <Reaction name={'heart'} />
  </ReactionButton>,
  <ReactionButton key="3">
    <Reaction name={'thumb-up-yellow'} />
  </ReactionButton>,
  <ReactionButton reacted key="4">
    <Reaction name={'smile'} />
  </ReactionButton>,
  <ReactionButton key="5">
    <Reaction name={'haha'} />
  </ReactionButton>,
  <ReactionButton key="6">
    <Reaction name={'wow'} />
  </ReactionButton>,
  <ReactionButton key="7">
    <Reaction name={'sad'} />
  </ReactionButton>,
];

export default {
  title: 'Momentum UI/ReactionPicker',
  component: ReactionPicker,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
  subComponents: { ReactionButton },
  args: {
    children: reactionChildren,
  },
};

const Example = Template<ReactionPickerProps>(ReactionPicker).bind({});

Example.argTypes = { ...argTypes };

const Common = MultiTemplate<ReactionPickerProps>(ReactionPicker).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.parameters = {
  variants: [
    { children: reactionChildren },
    { children: reactionChildren },
    { children: reactionChildren },
  ],
};

export { Example, Common };
