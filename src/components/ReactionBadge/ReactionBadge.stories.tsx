import React from 'react';

import AriaButtonDocs from 'storybook/docs.stories.aria-button.mdx';
import StyleDocs from 'storybook/docs.stories.style.mdx';
import { DocumentationPage } from 'storybook/helper.stories.docs';
import { MultiTemplate, Template } from 'storybook/helper.stories.templates';

import Reaction from 'components/Reaction';
import { REACTION_NAMES } from 'components/Reaction/Reaction.constants';

import argTypes from './ReactionBadge.stories.args';
import Documentation from './ReactionBadge.stories.docs.mdx';

import ReactionBadge, { ReactionBadgeProps } from './';

export default {
  title: 'Momentum UI/ReactionBadge',
  component: ReactionBadge,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs, AriaButtonDocs),
    },
  },
  args: {
    reaction: <Reaction name={REACTION_NAMES.haha} autoPlay loop />,
    count: '1',
  },
};

/**
 * Primary story. This renders a single component with all external props.
 */
const Example = Template<ReactionBadgeProps>(ReactionBadge).bind({});

Example.argTypes = { ...argTypes };

const Common = MultiTemplate<ReactionBadgeProps>(ReactionBadge).bind({});

Common.argTypes = { ...argTypes };

delete Common.argTypes.children;

Common.parameters = {
  variants: [
    {
      reaction: <Reaction name={REACTION_NAMES.popper} autoPlay loop />,
      count: 1,
    },
    {
      reaction: <Reaction name={REACTION_NAMES.heart} autoPlay loop />,
      count: 1,
    },
    {
      reaction: <Reaction name={REACTION_NAMES.sad} autoPlay loop />,
      count: 1,
    },
  ],
};

export { Example, Common };
