import React from 'react';

import StyleDocs from 'storybook/docs.stories.style.mdx';
import { DocumentationPage } from 'storybook/helper.stories.docs';
import { MultiTemplate, Template } from 'storybook/helper.stories.templates';

import Reaction from 'components/Reaction';
import { REACTION_NAMES } from 'components/Reaction/Reaction.constants';

import argTypes from './ReactionButton.stories.args';
import Documentation from './ReactionButton.stories.docs.mdx';

import ReactionButton, { ReactionButtonProps } from './';

export default {
  title: 'Momentum UI/ReactionButton',
  component: ReactionButton,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
  args: {
    children: <Reaction name={REACTION_NAMES.haha} />,
  },
};

const Example = Template<ReactionButtonProps>(ReactionButton).bind({});

Example.argTypes = { ...argTypes };

const Common = MultiTemplate<ReactionButtonProps>(ReactionButton).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.parameters = {
  variants: [
    {
      children: <Reaction name={REACTION_NAMES.haha} />,
      reacted: true,
    },
    {
      children: <Reaction name={REACTION_NAMES.wow} />,
    },
    {
      children: <Reaction name={REACTION_NAMES.smile} />,
    },
  ],
};

export { Example, Common };
