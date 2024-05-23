import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import RadioSimple, { RadioSimpleProps } from './';
import argTypes from './RadioSimple.stories.args';
import Documentation from './RadioSimple.stories.docs.mdx';

export default {
  title: 'Momentum UI/RadioSimple',
  component: RadioSimple,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

// NOTE: Primary story. This renders a single component with all external props.
const Example = Template<RadioSimpleProps>(RadioSimple).bind({});

Example.argTypes = { ...argTypes };

// TODO: Provide default arguments for this story here. These populate into the argument table for this component.
Example.args = {
  children: 'Example',
};

// TODO: Inject additional stories here.

// NOTE: Common variants story. This renders multiple variants of a single component.
const Common = MultiTemplate<RadioSimpleProps>(RadioSimple).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

// TODO: Provide default arguments for this story here. These populate into the argument table for this component for all variants.
Common.args = {
  children: 'Example',
};

Common.parameters = {
  variants: [{ children: 'Example A' }, { children: 'Example B' }, { children: 'Example C' }],
};

// NOTE: Export stories here. The first export should be `Example`, and the last export should be `Common`.
export { Example, Common };
