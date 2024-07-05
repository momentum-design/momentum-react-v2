import React from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import ReactionButton, { ReactionButtonProps } from './';
import argTypes from './ReactionButton.stories.args';
import Documentation from './ReactionButton.stories.docs.mdx';

import Reaction from '../Reaction';
import { REACTIONS } from '../Reaction/Reaction.constants';

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
    children: <Reaction name={REACTIONS.haha} />,
  },
};

const Example = Template<ReactionButtonProps>(ReactionButton);

Example.argTypes = { ...argTypes };

const Common = MultiTemplate<ReactionButtonProps>(ReactionButton);

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.parameters = {
  variants: [
    {
      children: <Reaction name={REACTIONS.haha} />,
      reacted: true,
    },
    {
      children: <Reaction name={REACTIONS.wow} />,
    },
    {
      children: <Reaction name={REACTIONS.smile} />,
    },
  ],
};

export { Example, Common };
