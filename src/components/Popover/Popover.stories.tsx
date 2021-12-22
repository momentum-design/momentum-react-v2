import React from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Popover, { PopoverProps } from './';
import argTypes from './Popover.stories.args';
import Documentation from './Popover.stories.docs.mdx';

export default {
  title: 'Momentum UI/Popover',
  component: Popover,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

// NOTE: Primary story. This renders a single component with all external props.
const Example = Template<PopoverProps>(Popover).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  children: <p>Content</p>,
  triggerComponent: <button>Click me!</button>,
  placement: 'bottom',
  containerProps: {
    isPadded: true,
    round: 100,
  },
};

// TODO: Inject additional stories here.

// NOTE: Common variants story. This renders multiple variants of a single component.
const Common = MultiTemplate<PopoverProps>(Popover).bind({});

Common.argTypes = { ...argTypes, placement: {} };
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
