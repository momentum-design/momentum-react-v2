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

import ButtonCircle, { ButtonCircleProps } from './';
import { Story } from '@storybook/react';
import Tooltip from '../Tooltip';
import Flex from '../Flex';
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

const NotGhostNotOutlineNotInverted = MultiTemplateWithPseudoStates<ButtonCircleProps>(
  ButtonCircle
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

const GhostNotOutlineNotInverted = MultiTemplateWithPseudoStates<ButtonCircleProps>(
  ButtonCircle
).bind({});

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

const NotGhostOutlineNotInverted = MultiTemplateWithPseudoStates<ButtonCircleProps>(
  ButtonCircle
).bind({});

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

const NotGhostNotOutlineInverted = MultiTemplateWithPseudoStates<ButtonCircleProps>(
  ButtonCircle
).bind({});

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

const GhostOutlineNotInverted = MultiTemplateWithPseudoStates<ButtonCircleProps>(ButtonCircle).bind(
  {}
);

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

const NotGhostOutlineInverted = MultiTemplateWithPseudoStates<ButtonCircleProps>(ButtonCircle).bind(
  {}
);

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

const WithoutAction: Story = () => {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        For accessibility reasons, informative icons (icons that do not trigger any action on click
        but convey a meaning to the user) should have a visible label next to them or in a tooltip.
        If a tooltip is used, the Icon needs to wrapped in a ButtonCircle onlyTriggersTooltip = true
        to get no change in color on hover and pressed
      </div>

      <Flex direction="column" ygap="2rem">
        <div>
          <b>A. Icon with visible label next to it</b>
          <Flex xgap="0.5rem">
            <Icon name="recurring" scale={20} />
            <div>Icon label </div>
          </Flex>
        </div>
        <div>
          <b>B. Icon with visible label in a tooltip</b>
          <Tooltip
            type="label"
            triggerComponent={
              <ButtonCircle onlyTriggersTooltip={true}>
                <Icon name="recurring" scale={20} />
              </ButtonCircle>
            }
          >
            Icon label
          </Tooltip>
        </div>
      </Flex>
    </div>
  );
};

WithoutAction.argTypes = {};

const Common = MultiTemplate<ButtonCircleProps>(ButtonCircle).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;
delete Common.argTypes.color;
delete Common.argTypes.disabled;
delete Common.argTypes.ghost;
delete Common.argTypes.outline;
delete Common.argTypes.inverted;

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

export {
  Example,
  NotGhostNotOutlineNotInverted,
  GhostNotOutlineNotInverted,
  NotGhostOutlineNotInverted,
  NotGhostNotOutlineInverted,
  GhostOutlineNotInverted,
  NotGhostOutlineInverted,
  Sizes,
  WithoutAction,
  Common,
};
