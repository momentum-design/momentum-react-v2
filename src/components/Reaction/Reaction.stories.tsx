import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import React from 'react';

import Reaction, { ReactionProps } from './';
import argTypes from './Reaction.stories.args';
import Documentation from './Reaction.stories.docs.mdx';
import { ON_VIDEO_REACTIONS, ORIGINAL_REACTIONS, REACTIONS } from './Reaction.constants';
import { action } from '@storybook/addon-actions';
import Flex from '../Flex';
import { ICON_CONSTANTS } from '../Icon';

export default {
  title: 'Momentum UI/Reaction',
  component: Reaction,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
  args: {
    name: REACTIONS.celebrate,
    autoPlay: true,
    onComplete: action('onComplete'),
    size: 'auto',
  },
};

const Example = Template<ReactionProps>(Reaction);

Example.argTypes = { ...argTypes };

const ReactionWithLabel = (props: ReactionProps) => (
  <Flex direction="column" alignItems="center" ygap="1rem" style={{ margin: '1.5rem' }}>
    <Reaction {...props} style={{ border: '1px solid gray' }} />
    <p>{props.name}</p>
  </Flex>
);

const Sizes = MultiTemplate<ReactionProps>(Reaction);
Sizes.parameters = {
  variants: [...Object.values(ICON_CONSTANTS.SIZES).map((size) => ({ name: 'haha', size }))],
};
Sizes.argTypes = { ...argTypes };
delete Sizes.argTypes.size;

const Original = MultiTemplate<ReactionProps>(ReactionWithLabel);

Original.argTypes = { ...argTypes };
delete Original.argTypes.children;

Original.parameters = {
  variants: [...Object.values(ORIGINAL_REACTIONS).map((name) => ({ name, size: 'auto' }))],
};

const OnVideo = MultiTemplate<ReactionProps>(ReactionWithLabel);

OnVideo.argTypes = { ...argTypes };
delete OnVideo.argTypes.children;

OnVideo.parameters = {
  variants: [...Object.values(ON_VIDEO_REACTIONS).map((name) => ({ name, size: 'auto' }))],
};

export { Example, Original, OnVideo, Sizes };
