import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import GlobalSearchInput, { GlobalSearchInputProps } from './';
import argTypes from './GlobalSearchInput.stories.args';
import Documentation from './GlobalSearchInput.stories.docs.mdx';

export default {
  title: 'Momentum UI/GlobalSearchInput',
  component: GlobalSearchInput,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
  args: {
    // Args provided to all stories by default.
    placeholder: 'Search, meet, and call',
  },
};

/**
 * Primary story. This renders a single component with all external props.
 */
const Example = Template<GlobalSearchInputProps>(GlobalSearchInput).bind({});

Example.argTypes = { ...argTypes };

// TODO: Inject additional stories here.

/**
 * Common variants story. This renders multiple variants of a single component.
 */
const Common = MultiTemplate<GlobalSearchInputProps>(GlobalSearchInput).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.parameters = {
  variants: [
    { value: 'Typed' },
    { searching: true, placeholder: 'Searching...' },
    { disabled: true },
    { searchContext: 'With:' },
    { searchContext: 'From:' },
    { searchContext: 'In:' },
  ],
};

export { Example, Common };
