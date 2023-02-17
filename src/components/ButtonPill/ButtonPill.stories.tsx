import React from 'react';

import Icon from '../Icon';

import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import AriaButtonDocs from '../../storybook/docs.stories.aria-button.mdx';
import HTMLGlobalAttributes from '../../storybook/docs.stories.common-html-attributes.mdx';

import ButtonPill, { ButtonPillProps } from './';
import argTypes from './ButtonPill.stories.args';
import Documentation from './ButtonPill.stories.docs.mdx';

import Popover, { PopoverProps } from '../Popover';

export default {
  title: 'Momentum UI/ButtonPill',
  component: ButtonPill,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs, HTMLGlobalAttributes, AriaButtonDocs),
    },
  },
  args: {
    children: 'Example Text',
    style: { margin: '0.5rem' },
  },
};

const Example = Template<ButtonPillProps>(ButtonPill).bind({});

Example.argTypes = { ...argTypes };

const Overflow = Template<ButtonPillProps>(ButtonPill).bind({});

Overflow.args = {
  children: 'This is a very long label',
  title: 'This is a very long label',
  style: { width: '12rem' },
};

Overflow.argTypes = {
  ...argTypes,
};

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
    { solid: true, outline: true },
  ],
};

Outline.argTypes = { ...argTypes };
delete Outline.argTypes.color;
delete Outline.argTypes.outline;

const Grown = MultiTemplate<ButtonPillProps>(ButtonPill).bind({});

Grown.parameters = {
  variants: [
    {
      children: [
        <Icon key={0} name="open-pages" autoScale={125} />,
        <div key={1}>Example Text</div>,
      ],
      grown: true,
    },
    {
      children: [
        <Icon key={0} name="open-pages" autoScale={125} />,
        <div key={1}>Example Text</div>,
      ],
      outline: true,
      grown: true,
    },
    {
      children: [
        <Icon key={0} name="open-pages" autoScale={125} />,
        <div key={1}>Example Text</div>,
      ],
      color: 'join',
      grown: true,
    },
    {
      children: [
        <Icon key={0} name="open-pages" autoScale={125} />,
        <div key={1}>Example Text</div>,
      ],
      color: 'cancel',
      grown: true,
    },
    {
      children: [
        <Icon key={0} name="open-pages" autoScale={125} />,
        <div key={1}>Example Text</div>,
      ],
      color: 'message',
      grown: true,
    },
    {
      children: [
        <Icon key={0} name="open-pages" autoScale={125} />,
        <div key={1}>Example Text</div>,
      ],
      solid: true,
      grown: true,
    },
  ],
};

Grown.argTypes = { ...argTypes };
delete Grown.argTypes.color;
delete Grown.argTypes.grown;

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

const Disabled = MultiTemplate<PopoverProps>(Popover).bind({});

Disabled.parameters = {
  variants: [
    {
      children: 'I am a popover',
      triggerComponent: <ButtonPill>Primary button</ButtonPill>,
    },
    {
      children: 'I am a popover',
      triggerComponent: <ButtonPill disabled>Disabled primary button</ButtonPill>,
    },
    {
      children: 'I am a popover',
      triggerComponent: <ButtonPill shallowDisabled>Shallow disabled primarybutton</ButtonPill>,
    },
    {
      children: 'I am a popover',
      triggerComponent: <ButtonPill outline>Secondary button</ButtonPill>,
    },
    {
      children: 'I am a popover',
      triggerComponent: (
        <ButtonPill outline disabled>
          Disabled secondary button
        </ButtonPill>
      ),
    },
    {
      children: 'I am a popover',
      triggerComponent: (
        <ButtonPill outline shallowDisabled>
          Shallow disabled secondary button
        </ButtonPill>
      ),
    },
    {
      children: 'I am a popover',
      triggerComponent: <ButtonPill ghost>Ghost button</ButtonPill>,
    },
    {
      children: 'I am a popover',
      triggerComponent: (
        <ButtonPill ghost disabled>
          Disabled ghost button
        </ButtonPill>
      ),
    },
    {
      children: 'I am a popover',
      triggerComponent: (
        <ButtonPill ghost shallowDisabled>
          Shallow disabled ghost button
        </ButtonPill>
      ),
    },
    {
      children: 'I am a popover',
      triggerComponent: <ButtonPill color="join">Join button</ButtonPill>,
    },
    {
      children: 'I am a popover',
      triggerComponent: (
        <ButtonPill color="join" disabled>
          Disabled join button
        </ButtonPill>
      ),
    },
    {
      children: 'I am a popover',
      triggerComponent: (
        <ButtonPill color="join" shallowDisabled>
          Shallow disabled join button
        </ButtonPill>
      ),
    },
    {
      children: 'I am a popover',
      triggerComponent: (
        <ButtonPill color="join" outline>
          Join outline button
        </ButtonPill>
      ),
    },
    {
      children: 'I am a popover',
      triggerComponent: (
        <ButtonPill color="join" outline disabled>
          Disabled join outline button
        </ButtonPill>
      ),
    },
    {
      children: 'I am a popover',
      triggerComponent: (
        <ButtonPill color="join" outline shallowDisabled>
          Shallow disabled join outline button
        </ButtonPill>
      ),
    },
  ],
};

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

export { Example, Overflow, Colors, Outline, Grown, States, Sizes, Disabled, Common };
