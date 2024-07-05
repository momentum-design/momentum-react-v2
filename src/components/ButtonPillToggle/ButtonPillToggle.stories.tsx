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

const Example = Template<ButtonPillToggleProps>(ButtonPillToggle);

Example.argTypes = { ...argTypes };

Example.args = {
  children: 'Example text',
};

const Outline = MultiTemplateWithPseudoStates<ButtonPillToggleProps>(ButtonPillToggle);

Outline.argTypes = { ...argTypes };
delete Outline.argTypes.children;
delete Outline.argTypes.ghost;
delete Outline.argTypes.outline;
delete Outline.argTypes.isSelected;

Outline.parameters = {
  variants: [
    ...[false, true].map((isSelected) => ({
      isSelected,
      outline: true,
      label: `isSelected: ${isSelected}`,
      children: 'Example text',
    })),
  ],
};

const Ghost = MultiTemplateWithPseudoStates<ButtonPillToggleProps>(ButtonPillToggle);

Ghost.argTypes = { ...argTypes };
delete Ghost.argTypes.children;
delete Ghost.argTypes.ghost;
delete Ghost.argTypes.outline;
delete Ghost.argTypes.isSelected;

Ghost.parameters = {
  variants: [
    ...[false, true].map((isSelected) => ({
      isSelected,
      ghost: true,
      label: `isSelected: ${isSelected}`,
      children: 'Example text',
    })),
  ],
};

export { Example, Outline, Ghost };
