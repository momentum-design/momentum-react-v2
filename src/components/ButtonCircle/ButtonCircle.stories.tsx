import React from 'react';

import Icon from '../Icon';

import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import AriaButtonDocs from '../../storybook/docs.stories.aria-button.mdx';
import HTMLGlobalAttributes from '../../storybook/docs.stories.common-html-attributes.mdx';

import ButtonCircle, { ButtonCircleProps } from './';
import argTypes from './ButtonCircle.stories.args';
import Documentation from './ButtonCircle.stories.docs.mdx';

export default {
  title: 'Momentum UI/ButtonCircle',
  component: ButtonCircle,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs, HTMLGlobalAttributes, AriaButtonDocs),
    },
  },
  args: {
    children: 'A',
    style: { margin: '0.5rem' },
  },
};

const Example = Template<ButtonCircleProps>(ButtonCircle).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  children: <Icon name="chat-group" autoScale={150} />,
};

const Colors = MultiTemplate<ButtonCircleProps>(ButtonCircle).bind({});

Colors.args = {
  children: <Icon name="chat-group" autoScale={150} />,
};

Colors.parameters = {
  variants: [{}, { color: 'join' }, { color: 'cancel' }, { color: 'message' }],
};

Colors.argTypes = { ...argTypes };
delete Colors.argTypes.color;

const Outline = MultiTemplate<ButtonCircleProps>(ButtonCircle).bind({});

Outline.args = {
  children: <Icon name="favorite" weight="filled" autoScale={150} />,
};

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

const IsSelected = MultiTemplate<ButtonCircleProps>(ButtonCircle).bind({});

IsSelected.args = {
  children: <Icon name="raise-hand" weight="filled" autoScale={150} />,
};

IsSelected.parameters = {
  variants: [
    { ghost: true },
    { ghost: true, isSelected: false },
    { ghost: true, isSelected: true },
    { ghost: true, isSelected: true, disabled: true },
    { ghost: true, outline: true },
    { ghost: true, outline: true, isSelected: false },
    { ghost: true, outline: true, isSelected: true },
    { ghost: true, outline: true, isSelected: true, disabled: true },
  ],
};

IsSelected.argTypes = { ...argTypes };
delete Outline.argTypes.ghost;
delete Outline.argTypes.outline;
delete Outline.argTypes.isSelected;

const States = MultiTemplate<ButtonCircleProps>(ButtonCircle).bind({});

States.args = {
  children: <Icon name="settings" weight="filled" autoScale={150} />,
};

States.parameters = {
  variants: [{}, { ghost: true }, { disabled: true }, { ghost: true, disabled: true }],
};

States.argTypes = { ...argTypes };
delete States.argTypes.disabled;
delete States.argTypes.ghost;

const Sizes = MultiTemplate<ButtonCircleProps>(ButtonCircle).bind({});

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
delete Sizes.argTypes.children;
delete Sizes.argTypes.size;

const Common = MultiTemplate<ButtonCircleProps>(ButtonCircle).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;
delete Common.argTypes.color;
delete Common.argTypes.disabled;
delete Common.argTypes.ghost;
delete Common.argTypes.outline;

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
    {
      children: <Icon name="raise-hand" weight="filled" autoScale={150} />,
      outline: true,
      ghost: true,
      isSelected: true,
    },
  ],
};

export { Example, Colors, Outline, IsSelected, States, Sizes, Common };
