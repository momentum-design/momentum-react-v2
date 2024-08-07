import {
  MultiTemplate,
  MultiTemplateWithPseudoStates,
  Template,
} from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import ButtonPillLink, { ButtonPillLinkProps } from './';
import argTypes from './ButtonPillLink.stories.args';
import Documentation from './ButtonPillLink.stories.docs.mdx';
import Icon from '../Icon';
import React from 'react';
import { omit } from 'lodash';

export default {
  title: 'Momentum UI/ButtonPillLink',
  component: ButtonPillLink,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
  args: {
    children: 'Example Text',
    style: { margin: '0.5rem' },
    href: 'https://webex.com/',
    target: '_blank',
  },
};

const Example = Template<ButtonPillLinkProps>(ButtonPillLink).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  children: 'Example',
};

const Tooltip = Template<ButtonPillLinkProps>(ButtonPillLink).bind({});

Tooltip.argTypes = { ...argTypes };

Tooltip.args = {
  children: 'Example',
  tooltipContent: 'opens a new tab',
  tooltipType: 'description',
};

const Overflow = Template<ButtonPillLinkProps>(ButtonPillLink).bind({});

Overflow.args = {
  children: 'This is a very long label',
  title: 'This is a very long label',
  style: {
    width: '12rem',
    display: 'inline-block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
};

Overflow.argTypes = {
  ...argTypes,
};

const Grown = MultiTemplate<ButtonPillLinkProps>(ButtonPillLink).bind({});

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
Grown.argTypes = omit(Grown.argTypes, ['color', 'grown']);

const Sizes = MultiTemplate<ButtonPillLinkProps>(ButtonPillLink).bind({});

Sizes.parameters = {
  variants: [{}, { size: 32 }, { size: 28 }, { size: 24 }],
};

Sizes.argTypes = { ...argTypes };
Sizes.argTypes = omit(Sizes.argTypes, ['size']);

const Disabled = MultiTemplate<ButtonPillLinkProps>(ButtonPillLink).bind({});

Disabled.parameters = {
  variants: [
    { children: 'Primary button' },
    { disabled: true, children: 'Disabled primary button' },
    { shallowDisabled: true, children: 'Shallow disabled primarybutton' },
    { outline: true, ghost: true, children: 'Secondary button' },
    { outline: true, ghost: true, disabled: true, children: 'Disabled secondary button' },
    {
      outline: true,
      ghost: true,
      shallowDisabled: true,
      children: 'Shallow disabled secondary button',
    },
    { ghost: true, children: 'Ghost button' },
    { ghost: true, disabled: true, children: 'Disabled ghost button' },
    { ghost: true, shallowDisabled: true, children: 'Shallow disabled ghost button' },
    { color: 'join', disabled: true, children: 'Join button' },
    { color: 'join', shallowDisabled: true, children: 'Shallow disabled join button' },
    { color: 'join', outline: true, inverted: true, children: 'Join outline button' },
    {
      color: 'join',
      outline: true,
      inverted: true,
      disabled: true,
      children: 'Disabled join outline button',
    },
    {
      color: 'join',
      outline: true,
      inverted: true,
      shallowDisabled: true,
      children: 'Shallow disabled join outline button',
    },
  ],
};

Disabled.args = {
  tooltipContent: 'opens a new tab',
  tooltipType: 'description',
};

const NotGhostNotOutlineNotInverted = MultiTemplateWithPseudoStates<ButtonPillLinkProps>(
  ButtonPillLink
).bind({});

NotGhostNotOutlineNotInverted.argTypes = { ...argTypes };
NotGhostNotOutlineNotInverted.argTypes = omit(NotGhostNotOutlineNotInverted.argTypes, [
  'children',
  'outline',
  'ghost',
  'inverted',
]);

NotGhostNotOutlineNotInverted.parameters = {
  variants: [
    { label: 'color: undefined', color: undefined },
    { label: 'color: join', color: 'join' },
    { label: 'color: cancel', color: 'cancel' },
    { label: 'color: message', color: 'message' },
  ],
};

const GhostNotOutlineNotInverted = MultiTemplateWithPseudoStates<ButtonPillLinkProps>(
  ButtonPillLink
).bind({});

GhostNotOutlineNotInverted.argTypes = { ...argTypes };
GhostNotOutlineNotInverted.argTypes = omit(GhostNotOutlineNotInverted.argTypes, [
  'children',
  'outline',
  'ghost',
  'inverted',
]);

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

const NotGhostOutlineNotInverted = MultiTemplateWithPseudoStates<ButtonPillLinkProps>(
  ButtonPillLink
).bind({});

NotGhostOutlineNotInverted.argTypes = { ...argTypes };
NotGhostOutlineNotInverted.argTypes = omit(NotGhostOutlineNotInverted.argTypes, [
  'children',
  'outline',
  'ghost',
  'inverted',
]);

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

const NotGhostNotOutlineInverted = MultiTemplateWithPseudoStates<ButtonPillLinkProps>(
  ButtonPillLink
).bind({});

NotGhostNotOutlineInverted.argTypes = { ...argTypes };
NotGhostNotOutlineInverted.argTypes = omit(NotGhostNotOutlineInverted.argTypes, [
  'children',
  'outline',
  'ghost',
  'inverted',
]);

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

const GhostOutlineNotInverted = MultiTemplateWithPseudoStates<ButtonPillLinkProps>(
  ButtonPillLink
).bind({});

GhostOutlineNotInverted.argTypes = { ...argTypes };
GhostOutlineNotInverted.argTypes = omit(GhostOutlineNotInverted.argTypes, [
  'children',
  'outline',
  'ghost',
  'inverted',
]);

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

const NotGhostOutlineInverted = MultiTemplateWithPseudoStates<ButtonPillLinkProps>(
  ButtonPillLink
).bind({});

NotGhostOutlineInverted.argTypes = { ...argTypes };
NotGhostOutlineInverted.argTypes = omit(NotGhostOutlineInverted.argTypes, [
  'children',
  'outline',
  'ghost',
  'inverted',
]);

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

const Common = MultiTemplate<ButtonPillLinkProps>(ButtonPillLink).bind({});

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
  Tooltip,
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
