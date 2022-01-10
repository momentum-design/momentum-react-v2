import React from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import Documentation from './Popover.stories.docs.mdx';
import { Item } from '@react-stately/collections';

import Popover, { PopoverProps } from './';
import ButtonPill from '../ButtonPill';
import Icon from '../Icon';
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
  children: <p>Content Text Content Text</p>,
  trigger: 'click',
  triggerComponent: <button style={{ height: '250px', width: '250px' }}>Click me!</button>,
  placement: 'bottom',
  interactive: false,
  containerProps: {
    isPadded: true,
    round: 25,
    elevation: 0,
  },
  color: COLORS.TERTIARY,
};

const InteractiveContent = Template<PopoverProps>(Popover).bind({});

InteractiveContent.argTypes = { ...argTypes };

InteractiveContent.args = {
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
  trigger: 'click',
  triggerComponent: <button style={{ height: '50px', width: '100px' }}>Click me!</button>,
  placement: 'bottom',
  interactive: true,
  containerProps: {
    isPadded: true,
    round: 25,
    elevation: 0,
  },
  color: COLORS.TERTIARY,
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
        <button style={{ height: '50px', width: '100px', marginRight: '10px' }}>Click me!</button>
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
        <button style={{ height: '50px', width: '100px', marginRight: '10px' }}>Hover me!</button>
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
      children: <p>Interactive Content on SECONDARY color, round 0, elevation 3</p>,
      trigger: 'click mouseenter',
      triggerComponent: (
        <ButtonPill key="1">
          <div>Click or hover me!</div> <Icon name="arrow-down" weight="bold" autoScale={100} />
        </ButtonPill>
      ),
      placement: 'left-start',
      interactive: true,
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
