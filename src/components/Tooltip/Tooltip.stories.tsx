import React, { useState } from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import Documentation from './Tooltip.stories.docs.mdx';
import { Item } from '@react-stately/collections';
import Text from '../Text';
import Tooltip, { TooltipProps } from './';
import ButtonPill from '../ButtonPill';
import ButtonSimple from '../ButtonSimple';
import Menu from '../Menu';
import { COLORS } from '../ModalContainer/ModalContainer.constants';
import argTypes from './Tooltip.stories.args';
import { PLACEMENTS } from '../ModalArrow/ModalArrow.constants';
import Flex from '../Flex';
import AriaToolbar from '../AriaToolbar';

export default {
  title: 'Momentum UI/Tooltip',
  component: Tooltip,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<TooltipProps>(Tooltip).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  placement: PLACEMENTS.AUTO,
  variant: 'small',
  color: COLORS.PRIMARY,
  delay: [0, 0],
  children: <p>Tooltip</p>,
  isDescription: true,
  triggerComponent: (
    <ButtonSimple style={{ margin: '10rem auto', display: 'flex' }}>Hover me!</ButtonSimple>
  ),
};

const Offset = Template<TooltipProps>(Tooltip).bind({});

Offset.argTypes = { ...argTypes };

Offset.args = {
  placement: PLACEMENTS.RIGHT,
  variant: 'small',
  color: COLORS.TERTIARY,
  delay: [0, 0],
  offsetDistance: -150,
  triggerComponent: (
    <ButtonPill style={{ margin: '10rem auto', display: 'flex', width: '30rem' }}>
      Hover me!
    </ButtonPill>
  ),
  children: (
    <Flex style={{ width: '10rem', height: '10rem' }} justifyContent="center" alignItems="center">
      <Text type="display">🏖</Text>
    </Flex>
  ),
};

const Common = MultiTemplate<TooltipProps>(Tooltip).bind({});

Common.argTypes = { ...argTypes };

Common.args = {};
Common.parameters = {
  variants: [
    {
      children: <p>Non-interactive Content on TERTIARY color, variant medium</p>,
      trigger: 'click',
      triggerComponent: (
        <ButtonSimple
          style={{ height: '50px', width: '100px', margin: '10rem auto', display: 'flex' }}
        >
          Click me!
        </ButtonSimple>
      ),
      placement: PLACEMENTS.RIGHT,
      interactive: false,
      variant: 'medium',
      color: COLORS.TERTIARY,
    },
    {
      children: <p>Non-interactive Content on PRIMARY color, variant small, without arrow</p>,
      trigger: 'mouseenter',
      triggerComponent: (
        <ButtonSimple
          style={{ height: '50px', width: '100px', margin: '10rem auto', display: 'flex' }}
        >
          Hover me!
        </ButtonSimple>
      ),
      placement: PLACEMENTS.BOTTOM_START,
      interactive: false,
      variant: 'small',
      color: COLORS.PRIMARY,
      showArrow: false,
    },
    {
      children: <p>Interactive Content on SECONDARY color, variant medium, showDelay 500ms</p>,
      trigger: 'click mouseenter',
      triggerComponent: (
        <ButtonSimple style={{ height: '50px', width: '200px' }}>Click or hover me!</ButtonSimple>
      ),
      placement: PLACEMENTS.LEFT_START,
      interactive: true,
      delay: [500],
      variant: 'medium',
      color: COLORS.SECONDARY,
    },
  ],
};

export { Example, Common, Offset };
