import React from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import Documentation from './Popover.stories.docs.mdx';
import { Item } from '@react-stately/collections';

import Popover, { PopoverProps } from './';
import ButtonPill from '../ButtonPill';
import ButtonSimple from '../ButtonSimple';
import Menu from '../Menu';
import { COLORS } from './Popover.constants';
import argTypes from './Popover.stories.args';

export default {
  title: 'Momentum UI/Popover',
  component: Popover,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<PopoverProps>(Popover).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  trigger: 'click',
  placement: 'bottom',
  showArrow: true,
  interactive: false,
  containerProps: {
    isPadded: true,
    round: 25,
    elevation: 0,
  },
  color: COLORS.TERTIARY,
  delay: [0, 0],
  children: <p>Content Text Content Text</p>,
  triggerComponent: <ButtonSimple>Click me!</ButtonSimple>,
};

const InteractiveContent = Template<PopoverProps>(Popover).bind({});

InteractiveContent.argTypes = { ...argTypes };

InteractiveContent.args = {
  trigger: 'click',
  placement: 'bottom',
  showArrow: true,
  interactive: true,
  containerProps: {
    isPadded: true,
    round: 25,
    elevation: 0,
  },
  color: COLORS.TERTIARY,
  delay: [0, 0],
  triggerComponent: <ButtonPill>Click me!</ButtonPill>,
  children: (
    <Menu selectionMode="single" key="2" style={{ width: '200px' }}>
      <Item key="one">One</Item>
      <Item key="two">Two</Item>
      <Item key="three">Three</Item>
      <Item key="four">Four</Item>
      <Item key="five">Five</Item>
      <Item key="six">Six</Item>
    </Menu>
  ),
};

const Common = MultiTemplate<PopoverProps>(Popover).bind({});

Common.argTypes = { ...argTypes };

Common.args = {};
Common.parameters = {
  variants: [
    {
      children: <p>Non-interactive Content on TERTIARY color, round 25, elevation 1</p>,
      trigger: 'click',
      triggerComponent: (
        <ButtonSimple style={{ height: '50px', width: '100px', marginRight: '10px' }}>
          Click me!
        </ButtonSimple>
      ),
      placement: 'right',
      interactive: false,
      containerProps: {
        isPadded: true,
        round: 25,
        elevation: 1,
      },
      color: COLORS.TERTIARY,
    },
    {
      children: (
        <p>Non-interactive Content on PRIMARY color, round 100, elevation 2, without arrow</p>
      ),
      trigger: 'mouseenter',
      triggerComponent: (
        <ButtonSimple style={{ height: '50px', width: '100px', marginRight: '10px' }}>
          Hover me!
        </ButtonSimple>
      ),
      placement: 'bottom-start',
      interactive: false,
      containerProps: {
        isPadded: true,
        round: 100,
        elevation: 2,
      },
      color: COLORS.PRIMARY,
      showArrow: false,
    },
    {
      children: (
        <p>Interactive Content on SECONDARY color, round 0, elevation 3, showDelay 500ms</p>
      ),
      trigger: 'click mouseenter',
      triggerComponent: (
        <ButtonSimple style={{ height: '50px', width: '200px' }}>Click or hover me!</ButtonSimple>
      ),
      placement: 'left-start',
      interactive: true,
      delay: [500],
      containerProps: {
        isPadded: true,
        round: 0,
        elevation: 3,
      },
      color: COLORS.SECONDARY,
    },
  ],
};

// NOTE: Export stories here. The first export should be `Example`, and the last export should be `Common`.
export { Example, InteractiveContent, Common };
