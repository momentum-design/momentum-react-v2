import React from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import ReactionPicker, { ReactionPickerProps } from './';
import Reaction from '../Reaction';
import Tooltip from '../Tooltip';
import ReactionButton from '../ReactionButton';
import argTypes from './ReactionPicker.stories.args';
import Documentation from './ReactionPicker.stories.docs.mdx';
import Text from '../Text';
import AriaToolbarItem from '../AriaToolbarItem';

const reactionChildren = [
  <Tooltip
    type="label"
    placement="top"
    variant="small"
    triggerComponent={
      <AriaToolbarItem itemIndex={0}>
        <ReactionButton key="1">
          <Reaction name="celebrate" autoPlay />
        </ReactionButton>
      </AriaToolbarItem>
    }
  >
    <Text type="body-compact">Celebrate!</Text>
  </Tooltip>,
  <AriaToolbarItem itemIndex={1}>
    <ReactionButton key="2">
      <Reaction name="heart" autoPlay />
    </ReactionButton>
  </AriaToolbarItem>,

  <AriaToolbarItem itemIndex={2}>
    <ReactionButton key="3">
      <Reaction name="thumb_up_yellow" autoPlay />
    </ReactionButton>
  </AriaToolbarItem>,
  <AriaToolbarItem itemIndex={3}>
    <ReactionButton reacted key="4">
      <Reaction name="smile" autoPlay />
    </ReactionButton>
  </AriaToolbarItem>,
  <AriaToolbarItem itemIndex={4}>
    <ReactionButton key="5">
      <Reaction name="haha" autoPlay />
    </ReactionButton>
  </AriaToolbarItem>,
  <AriaToolbarItem itemIndex={5}>
    <ReactionButton key="6">
      <Reaction name="wow" autoPlay />
    </ReactionButton>
  </AriaToolbarItem>,
  <AriaToolbarItem itemIndex={6}>
    <ReactionButton key="7">
      <Reaction name="sad" autoPlay />
    </ReactionButton>
  </AriaToolbarItem>,
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
    // 7 because there are 7 reactions at the top.
    ariaToolbarItemsSize: 7,
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
