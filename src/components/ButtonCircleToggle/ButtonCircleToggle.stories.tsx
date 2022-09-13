import React from 'react';

import { MultiTemplateWithPseudoStates, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Icon from '../Icon';
import ButtonCircleToggle, { ButtonCircleToggleProps } from './';
import argTypes from './ButtonCircleToggle.stories.args';
import Documentation from './ButtonCircleToggle.stories.docs.mdx';

export default {
  title: 'Momentum UI/ButtonCircleToggle',
  component: ButtonCircleToggle,
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

const Example = Template<ButtonCircleToggleProps>(ButtonCircleToggle).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  children: <Icon name="cancel" autoScale={150} />,
};

// Pseudostates will be correctly applied to ButtonCircleToggle once ButtonCircle
// is fixed to receive these pseudostates.

const Outline = MultiTemplateWithPseudoStates<ButtonCircleToggleProps>(ButtonCircleToggle).bind({});

Outline.argTypes = { ...argTypes };
delete Outline.argTypes.children;
delete Outline.argTypes.ghost;
delete Outline.argTypes.outline;
delete Outline.argTypes.isSelected;

Outline.args = {
  children: <Icon name="cancel" autoScale={150} />,
};

Outline.parameters = {
  variants: [{ outline: true }, { outline: true, isSelected: true }],
};

const Ghost = MultiTemplateWithPseudoStates<ButtonCircleToggleProps>(ButtonCircleToggle).bind({});

Ghost.argTypes = { ...argTypes };
delete Ghost.argTypes.children;
delete Ghost.argTypes.ghost;
delete Ghost.argTypes.outline;
delete Ghost.argTypes.isSelected;

Ghost.args = {
  children: <Icon name="cancel" autoScale={150} />,
};

Ghost.parameters = {
  variants: [{ ghost: true }, { ghost: true, isSelected: true }],
};

export { Example, Outline, Ghost };
