import React from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import ReactionPicker, { ReactionPickerProps } from './';
import ButtonCircle from '../ButtonCircle';
import argTypes from './ReactionPicker.stories.args';
import Documentation from './ReactionPicker.stories.docs.mdx';

export default {
  title: 'Momentum UI/ReactionPicker',
  component: ReactionPicker,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
  subComponents: { ButtonCircle },
  args: {
    // Args provided to all stories by default.
    children: [
      <ButtonCircle key="1" size={32}>
        <span>🎉</span>
      </ButtonCircle>,
      <ButtonCircle key="2" size={32}>
        <span>🎉</span>
      </ButtonCircle>,
      <ButtonCircle key="3" size={32}>
        <span>🎉</span>
      </ButtonCircle>,
    ], // Example of a default arg for all stories.
  },
};

/**
 * Primary story. This renders a single component with all external props.
 */
const Example = Template<ReactionPickerProps>(ReactionPicker).bind({});

Example.argTypes = { ...argTypes };

// TODO: Inject additional stories here.

/**
 * Common variants story. This renders multiple variants of a single component.
 */
const Common = MultiTemplate<ReactionPickerProps>(ReactionPicker).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.parameters = {
  variants: [{ children: 'Example A' }, { children: 'Example B' }, { children: 'Example C' }],
};

export { Example, Common };
