import { MultiTemplateWithPseudoStates, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import ButtonPillToggle, { ButtonPillToggleProps } from './';
import argTypes from './ButtonPillToggle.stories.args';
import Documentation from './ButtonPillToggle.stories.docs.mdx';

export default {
  title: 'Momentum UI/ButtonPillToggle',
  component: ButtonPillToggle,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
    args: {
      style: { margin: '0.5rem' },
    },
  },
};

const Example = Template<ButtonPillToggleProps>(ButtonPillToggle).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  children: 'Example text',
};

// Pseudostates will be correctly applied to ButtonPillToggle once ButtonPill
// is fixed to receive these pseudostates.

const Outline = MultiTemplateWithPseudoStates<ButtonPillToggleProps>(ButtonPillToggle).bind({});

Outline.argTypes = { ...argTypes };
delete Outline.argTypes.children;
delete Outline.argTypes.ghost;
delete Outline.argTypes.outline;
delete Outline.argTypes.isSelected;

Outline.args = {
  children: 'Example text',
};

Outline.parameters = {
  variants: [{ outline: true }, { outline: true, isSelected: true }],
};

const Ghost = MultiTemplateWithPseudoStates<ButtonPillToggleProps>(ButtonPillToggle).bind({});

Ghost.argTypes = { ...argTypes };
delete Ghost.argTypes.children;
delete Ghost.argTypes.ghost;
delete Ghost.argTypes.outline;
delete Ghost.argTypes.isSelected;

Ghost.args = {
  children: 'Example text',
};

Ghost.parameters = {
  variants: [{ ghost: true }, { ghost: true, isSelected: true }],
};

export { Example, Outline, Ghost };
