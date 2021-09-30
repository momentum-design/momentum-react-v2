import React from 'react';

import Icon from '../Icon';

import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import AriaButtonDocs from '../../storybook/docs.stories.aria-button.mdx';

import ButtonPill, { ButtonPillProps } from './';
import argTypes from './ButtonPill.stories.args';
import Documentation from './ButtonPill.stories.docs.mdx';

export default {
  title: 'Momentum UI/ButtonPill',
  component: ButtonPill,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs, AriaButtonDocs),
    },
  },
  args: {
    children: 'Example Text',
    style: { margin: '0.5rem' },
  },
};

const Example = Template<ButtonPillProps>(ButtonPill).bind({});

Example.argTypes = { ...argTypes };

const Colors = MultiTemplate<ButtonPillProps>(ButtonPill).bind({});

Colors.parameters = {
  variants: [{}, { color: 'join' }, { color: 'cancel' }, { color: 'message' }],
};

Colors.argTypes = { ...argTypes };
delete Colors.argTypes.color;

const Outline = MultiTemplate<ButtonPillProps>(ButtonPill).bind({});

Outline.parameters = {
  variants: [
    { outline: true },
    { color: 'join', outline: true },
    { color: 'cancel', outline: true },
    { color: 'message', outline: true },
  ],
};

Outline.argTypes = { ...argTypes };
delete Outline.argTypes.color;
delete Outline.argTypes.outline;

const States = MultiTemplate<ButtonPillProps>(ButtonPill).bind({});

States.parameters = {
  variants: [{}, { ghost: true }, { disabled: true }, { ghost: true, disabled: true }],
};

States.argTypes = { ...argTypes };
delete States.argTypes.disabled;
delete States.argTypes.ghost;

const Sizes = MultiTemplate<ButtonPillProps>(ButtonPill).bind({});

Sizes.parameters = {
  variants: [{}, { size: 32 }, { size: 28 }, { size: 24 }],
};

Sizes.argTypes = { ...argTypes };
delete Sizes.argTypes.size;

const Common = MultiTemplate<ButtonPillProps>(ButtonPill).bind({});

Common.argTypes = { ...argTypes };

delete Common.argTypes.children;

Common.parameters = {
  variants: [
    {
      children: [
        <Icon key={0} name="open-pages" autoScale={125} />,
        <div key={1}>Example Text</div>,
      ],
    },
    {
      children: [
        <Icon key={0} name="audio-call" autoScale={125} />,
        <div key={1}>Example Text</div>,
        <Icon key={2} name="arrow-down" weight="bold" autoScale={125} />,
      ],
    },
    {
      children: [<div key={1}>Example Text</div>, <Icon key={0} name="camera" autoScale={125} />],
    },
  ],
};

export { Example, Colors, Outline, States, Sizes, Common };
