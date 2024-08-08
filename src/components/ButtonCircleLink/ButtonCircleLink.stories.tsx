import {
  MultiTemplate,
  MultiTemplateWithPseudoStates,
  Template,
} from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import ButtonCircleLink, { ButtonCircleLinkProps } from './';
import argTypes from './ButtonCircleLink.stories.args';
import Documentation from './ButtonCircleLink.stories.docs.mdx';
import Icon from '../Icon';
import React from 'react';
import { omit } from 'lodash';

export default {
  title: 'Momentum UI/ButtonCircleLink',
  component: ButtonCircleLink,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
  args: {
    children: 'A',
    href: 'https://webex.com/',
    target: '_blank',
    style: { margin: '0.5rem' },
  },
};

const Example = Template<ButtonCircleLinkProps>(ButtonCircleLink).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  children: <Icon name="chat-group" autoScale={150} />,
};

const Tooltip = Template<ButtonCircleLinkProps>(ButtonCircleLink).bind({});

Tooltip.argTypes = { ...argTypes };

Tooltip.args = {
  children: <Icon name="chat-group" autoScale={150} />,
  tooltipContent: 'opens a new tab',
  tooltipType: 'description',
};

const NotGhostNotOutlineNotInverted = MultiTemplateWithPseudoStates<ButtonCircleLinkProps>(
  ButtonCircleLink
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

const GhostNotOutlineNotInverted = MultiTemplateWithPseudoStates<ButtonCircleLinkProps>(
  ButtonCircleLink
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

const NotGhostOutlineNotInverted = MultiTemplateWithPseudoStates<ButtonCircleLinkProps>(
  ButtonCircleLink
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

const NotGhostNotOutlineInverted = MultiTemplateWithPseudoStates<ButtonCircleLinkProps>(
  ButtonCircleLink
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

const GhostOutlineNotInverted = MultiTemplateWithPseudoStates<ButtonCircleLinkProps>(
  ButtonCircleLink
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

const NotGhostOutlineInverted = MultiTemplateWithPseudoStates<ButtonCircleLinkProps>(
  ButtonCircleLink
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

const Sizes = MultiTemplate<ButtonCircleLinkProps>(ButtonCircleLink).bind({});

Sizes.parameters = {
  variants: [
    { children: <Icon name="email" weight="bold" autoScale={150} />, size: 64 },
    { children: <Icon name="email" weight="bold" autoScale={150} />, size: 52 },
    { children: <Icon name="email" weight="bold" autoScale={150} /> },
    { children: <Icon name="email" weight="bold" autoScale={150} />, size: 32 },
    { children: <Icon name="email" weight="bold" autoScale={150} />, size: 28 },
    {
      children: [
        <div key={0}>64</div>,
        <Icon key={1} name="email" weight="bold" autoScale={150} />,
      ],
      size: 64,
    },
    {
      children: [
        <div key={0}>52</div>,
        <Icon key={1} name="email" weight="bold" autoScale={150} />,
      ],
      size: 52,
    },
    {
      children: [
        <div key={0}>40</div>,
        <Icon key={1} name="email" weight="bold" autoScale={150} />,
      ],
    },
    {
      children: [
        <div key={0}>32</div>,
        <Icon key={1} name="email" weight="bold" autoScale={150} />,
      ],
      size: 32,
    },
    {
      children: [
        <div key={0}>28</div>,
        <Icon key={1} name="email" weight="bold" autoScale={150} />,
      ],
      size: 28,
    },
  ],
};

Sizes.argTypes = { ...argTypes };
Sizes.argTypes = omit(Sizes.argTypes, ['children', 'size']);

const Common = MultiTemplate<ButtonCircleLinkProps>(ButtonCircleLink).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.args = {
  children: 'Example',
};

Common.parameters = {
  variants: [
    {
      children: [<div key={0}>20</div>, <Icon key={1} name="chat-group" autoScale={150} />],
    },
    {
      children: <Icon name="contact-card" weight="filled" autoScale={150} />,
      outline: true,
    },
    {
      children: <Icon name="invited-user" autoScale={150} />,
      ghost: true,
    },
    {
      children: <Icon key={1} name="favorite" weight="filled" autoScale={150} />,
      color: 'join',
    },
    {
      children: [
        <div key={0}>5</div>,
        <Icon key={1} name="settings" weight="filled" autoScale={150} />,
      ],
      color: 'join',
      outline: true,
    },
    {
      children: <Icon name="cancel" autoScale={150} />,
      color: 'cancel',
    },
    {
      children: <Icon name="redo" autoScale={150} />,
      color: 'cancel',
      outline: true,
    },
    {
      children: <Icon name="more-circle" autoScale={150} />,
      color: 'message',
    },
    {
      children: <Icon name="plus-circle" autoScale={150} />,
      disabled: true,
    },
    {
      children: <Icon name="pen" weight="filled" autoScale={150} />,
      disabled: true,
      outline: true,
    },
  ],
};

// NOTE: Export stories here. The first export should be `Example`, and the last export should be `Common`.
export {
  Example,
  Tooltip,
  NotGhostNotOutlineNotInverted,
  GhostNotOutlineNotInverted,
  NotGhostOutlineNotInverted,
  NotGhostNotOutlineInverted,
  GhostOutlineNotInverted,
  NotGhostOutlineInverted,
  Sizes,
  Common,
};
