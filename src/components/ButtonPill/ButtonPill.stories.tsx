import React from 'react';

import Icon from '../Icon';

import {
  MultiTemplate,
  MultiTemplateWithPseudoStates,
  Template,
} from '../../storybook/helper.stories.templates';
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
      inverted: true,
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
      ghost: true,
      outline: true,
      grown: true,
    },
  ],
};

Grown.argTypes = { ...argTypes };
delete Grown.argTypes.color;
delete Grown.argTypes.grown;

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
      triggerComponent: (
        <ButtonPill outline ghost>
          Secondary button
        </ButtonPill>
      ),
    },
    {
      children: 'I am a popover',
      triggerComponent: (
        <ButtonPill outline ghost disabled>
          Disabled secondary button
        </ButtonPill>
      ),
    },
    {
      children: 'I am a popover',
      triggerComponent: (
        <ButtonPill outline ghost shallowDisabled>
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
        <ButtonPill color="join" outline inverted>
          Join outline button
        </ButtonPill>
      ),
    },
    {
      children: 'I am a popover',
      triggerComponent: (
        <ButtonPill color="join" outline inverted disabled>
          Disabled join outline button
        </ButtonPill>
      ),
    },
    {
      children: 'I am a popover',
      triggerComponent: (
        <ButtonPill color="join" outline inverted shallowDisabled>
          Shallow disabled join outline button
        </ButtonPill>
      ),
    },
  ],
};

const NotGhostNotOutlineNotInverted = MultiTemplateWithPseudoStates<ButtonPillProps>(
  ButtonPill
).bind({});

NotGhostNotOutlineNotInverted.argTypes = { ...argTypes };
delete NotGhostNotOutlineNotInverted.argTypes.children;
delete NotGhostNotOutlineNotInverted.argTypes.outline;
delete NotGhostNotOutlineNotInverted.argTypes.ghost;
delete NotGhostNotOutlineNotInverted.argTypes.inverted;

NotGhostNotOutlineNotInverted.args = {
  outline: false,
  ghost: false,
  inverted: false,
};

NotGhostNotOutlineNotInverted.parameters = {
  variants: [
    { label: 'color: undefined', color: undefined },
    { label: 'color: join', color: 'join' },
    { label: 'color: cancel', color: 'cancel' },
    { label: 'color: message', color: 'message' },
  ],
};

const GhostNotOutlineNotInverted = MultiTemplateWithPseudoStates<ButtonPillProps>(ButtonPill).bind(
  {}
);

GhostNotOutlineNotInverted.argTypes = { ...argTypes };
delete GhostNotOutlineNotInverted.argTypes.children;
delete GhostNotOutlineNotInverted.argTypes.outline;
delete GhostNotOutlineNotInverted.argTypes.ghost;
delete GhostNotOutlineNotInverted.argTypes.inverted;

GhostNotOutlineNotInverted.args = {
  outline: false,
  ghost: true,
  inverted: false,
};

GhostNotOutlineNotInverted.parameters = {
  variants: [
    { label: 'color: undefined', color: undefined },
    { label: 'color: join', color: 'join' },
    { label: 'color: cancel', color: 'cancel' },
    { label: 'color: message', color: 'message' },
  ],
};

const NotGhostOutlineNotInverted = MultiTemplateWithPseudoStates<ButtonPillProps>(ButtonPill).bind(
  {}
);

NotGhostOutlineNotInverted.argTypes = { ...argTypes };
delete NotGhostOutlineNotInverted.argTypes.children;
delete NotGhostOutlineNotInverted.argTypes.outline;
delete NotGhostOutlineNotInverted.argTypes.ghost;
delete NotGhostOutlineNotInverted.argTypes.inverted;

NotGhostOutlineNotInverted.args = {
  outline: true,
  ghost: false,
  inverted: false,
};

NotGhostOutlineNotInverted.parameters = {
  variants: [
    { label: 'color: undefined', color: undefined },
    { label: 'color: join', color: 'join' },
    { label: 'color: cancel', color: 'cancel' },
    { label: 'color: message', color: 'message' },
  ],
};

const NotGhostNotOutlineInverted = MultiTemplateWithPseudoStates<ButtonPillProps>(ButtonPill).bind(
  {}
);

NotGhostNotOutlineInverted.argTypes = { ...argTypes };
delete NotGhostNotOutlineInverted.argTypes.children;
delete NotGhostNotOutlineInverted.argTypes.outline;
delete NotGhostNotOutlineInverted.argTypes.ghost;
delete NotGhostNotOutlineInverted.argTypes.inverted;

NotGhostNotOutlineInverted.args = {
  outline: false,
  ghost: false,
  inverted: true,
};

NotGhostNotOutlineInverted.parameters = {
  variants: [
    { label: 'color: undefined', color: undefined },
    { label: 'color: join', color: 'join' },
    { label: 'color: cancel', color: 'cancel' },
    { label: 'color: message', color: 'message' },
  ],
};

const GhostOutlineNotInverted = MultiTemplateWithPseudoStates<ButtonPillProps>(ButtonPill).bind({});

GhostOutlineNotInverted.argTypes = { ...argTypes };
delete GhostOutlineNotInverted.argTypes.children;
delete GhostOutlineNotInverted.argTypes.outline;
delete GhostOutlineNotInverted.argTypes.ghost;
delete GhostOutlineNotInverted.argTypes.inverted;

GhostOutlineNotInverted.args = {
  outline: true,
  ghost: true,
  inverted: false,
};

GhostOutlineNotInverted.parameters = {
  variants: [
    { label: 'color: undefined', color: undefined },
    { label: 'color: join', color: 'join' },
    { label: 'color: cancel', color: 'cancel' },
    { label: 'color: message', color: 'message' },
  ],
};

const NotGhostOutlineInverted = MultiTemplateWithPseudoStates<ButtonPillProps>(ButtonPill).bind({});

NotGhostOutlineInverted.argTypes = { ...argTypes };
delete NotGhostOutlineInverted.argTypes.children;
delete NotGhostOutlineInverted.argTypes.outline;
delete NotGhostOutlineInverted.argTypes.ghost;
delete NotGhostOutlineInverted.argTypes.inverted;

NotGhostOutlineInverted.args = {
  outline: true,
  ghost: false,
  inverted: true,
};

NotGhostOutlineInverted.parameters = {
  variants: [
    { label: 'color: undefined', color: undefined },
    { label: 'color: join', color: 'join' },
    { label: 'color: cancel', color: 'cancel' },
    { label: 'color: message', color: 'message' },
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

export {
  Example,
  Overflow,
  Grown,
  Sizes,
  Disabled,
  NotGhostNotOutlineNotInverted,
  GhostNotOutlineNotInverted,
  NotGhostOutlineNotInverted,
  NotGhostNotOutlineInverted,
  GhostOutlineNotInverted,
  NotGhostOutlineInverted,
  Common,
};
