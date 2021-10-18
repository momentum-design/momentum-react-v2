import React from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import ReactionButton, { ReactionButtonProps } from './';
import argTypes from './ReactionButton.stories.args';
import Documentation from './ReactionButton.stories.docs.mdx';

import Reaction from '../Reaction';
import { REACTION_NAMES } from '../Reaction/Reaction.constants';

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
    size: 32,
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
