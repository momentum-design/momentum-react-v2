import { Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import AriaButtonDocs from '../../storybook/docs.stories.aria-button.mdx';

import ReactionBadge, { ReactionBadgeProps } from './';
import argTypes from './ReactionBadge.stories.args';
import Documentation from './ReactionBadge.stories.docs.mdx';

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
    children: '👍 1',
  },
};

/**
 * Primary story. This renders a single component with all external props.
 */
const Example = Template<ReactionBadgeProps>(ReactionBadge).bind({});

Example.argTypes = { ...argTypes };

export { Example };
