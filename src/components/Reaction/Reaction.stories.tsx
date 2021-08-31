import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Reaction, { ReactionProps } from './';
import argTypes from './Reaction.stories.args';
import Documentation from './Reaction.stories.docs.mdx';
<<<<<<< HEAD
import { REACTION_NAMES } from './Reaction.constants';
=======
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)

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
<<<<<<< HEAD
    name: REACTION_NAMES.thumbUpYellow,
    loop: 1,
    autoPlay: true,
  },
};

=======
    // Args provided to all stories by default.
    name: 'thumb-up-yellow', // Example of a default arg for all stories.
  },
};

/**
 * Primary story. This renders a single component with all external props.
 */
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)
const Example = Template<ReactionProps>(Reaction).bind({});

Example.argTypes = { ...argTypes };

<<<<<<< HEAD
=======
// TODO: Inject additional stories here.

/**
 * Common variants story. This renders multiple variants of a single component.
 */
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)
const Common = MultiTemplate<ReactionProps>(Reaction).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.parameters = {
  variants: [
<<<<<<< HEAD
    { name: REACTION_NAMES.popper },
    { name: REACTION_NAMES.heart },
    { name: REACTION_NAMES.thumbUpYellow },
    { name: REACTION_NAMES.smile },
    { name: REACTION_NAMES.haha },
    { name: REACTION_NAMES.wow },
    { name: REACTION_NAMES.sad },
    { name: REACTION_NAMES.popper, size: 16 },
    { name: REACTION_NAMES.heart, size: 16 },
    { name: REACTION_NAMES.thumbUpYellow, size: 16 },
    { name: REACTION_NAMES.smile, size: 16 },
    { name: REACTION_NAMES.haha, size: 16 },
    { name: REACTION_NAMES.wow, size: 16 },
    { name: REACTION_NAMES.sad, size: 16 },
=======
    { name: 'popper' },
    { name: 'heart' },
    { name: 'thumb-up-yellow' },
    { name: 'smile' },
    { name: 'haha' },
    { name: 'wow' },
    { name: 'sad' },
    { name: 'popper', size: 16 },
    { name: 'heart', size: 16 },
    { name: 'thumb-up-yellow', size: 16 },
    { name: 'smile', size: 16 },
    { name: 'haha', size: 16 },
    { name: 'wow', size: 16 },
    { name: 'sad', size: 16 },
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)
  ],
};

export { Example, Common };
