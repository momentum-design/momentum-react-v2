import React from 'react';

import { MultiTemplateWithPseudoStates, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Icon from '../Icon';
import ButtonCircleToggle, { ButtonCircleToggleProps } from './';
import argTypes from './ButtonCircleToggle.stories.args';
import Documentation from './ButtonCircleToggle.stories.docs.mdx';
import { action } from '@storybook/addon-actions';

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
  onChange: action('onChange'),
  onPress: action('onPress'),
};

const Outline = MultiTemplateWithPseudoStates<ButtonCircleToggleProps>(ButtonCircleToggle).bind({});

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
      children: <Icon name="cancel" autoScale={150} />,
    })),
  ],
};

const Ghost = MultiTemplateWithPseudoStates<ButtonCircleToggleProps>(ButtonCircleToggle).bind({});

Ghost.argTypes = { ...argTypes };
delete Ghost.argTypes.children;
delete Ghost.argTypes.ghost;
delete Ghost.argTypes.outline;
delete Ghost.argTypes.isSelected;

Ghost.parameters = {
  variants: [
    ...[true, false].map((isSelected) => ({
      isSelected,
      ghost: true,
      label: `isSelected: ${isSelected}`,
      children: <Icon name="cancel" autoScale={150} />,
    })),
  ],
};

export { Example, Outline, Ghost };
