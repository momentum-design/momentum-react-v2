import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Reaction, { ReactionProps } from './';
import argTypes from './Reaction.stories.args';
import Documentation from './Reaction.stories.docs.mdx';

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
    // Args provided to all stories by default.
    name: 'thumb-up-yellow', // Example of a default arg for all stories.
  },
};

/**
 * Primary story. This renders a single component with all external props.
 */
const Example = Template<ReactionProps>(Reaction).bind({});

Example.argTypes = { ...argTypes };

// TODO: Inject additional stories here.

/**
 * Common variants story. This renders multiple variants of a single component.
 */
const Common = MultiTemplate<ReactionProps>(Reaction).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.parameters = {
  variants: [
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
  ],
};

export { Example, Common };
