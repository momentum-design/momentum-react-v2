import React, { useState } from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import Documentation from './Popover.stories.docs.mdx';
import { Item } from '@react-stately/collections';
import Text from '../Text';
import Popover, { PopoverProps } from './';
import ButtonPill from '../ButtonPill';
import ButtonSimple from '../ButtonSimple';
import Menu from '../Menu';
import { COLORS } from '../ModalContainer/ModalContainer.constants';
import argTypes from './Popover.stories.args';
import { PLACEMENTS } from '../ModalArrow/ModalArrow.constants';
import Flex from '../Flex';
import AriaToolbar from '../AriaToolbar';

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
  placement: PLACEMENTS.AUTO,
  showArrow: true,
  interactive: false,
  variant: 'small',
  color: COLORS.PRIMARY,
  delay: [0, 0],
  children: <p>Content Text Content Text</p>,
  triggerComponent: (
    <ButtonSimple style={{ margin: '10rem auto', display: 'flex' }}>Click me!</ButtonSimple>
  ),
};

const InteractiveContent = Template<PopoverProps>(Popover).bind({});

InteractiveContent.argTypes = { ...argTypes };

InteractiveContent.args = {
  trigger: 'click',
  placement: PLACEMENTS.BOTTOM,
  showArrow: true,
  interactive: true,
  variant: 'small',
  color: COLORS.TERTIARY,
  delay: [0, 0],
  triggerComponent: (
    <ButtonPill style={{ margin: '10rem auto', display: 'flex' }}>Click me!</ButtonPill>
  ),
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

const PopoverWithFirstFocus = (props) => {
  const [ref, setRef] = useState<HTMLButtonElement>();

  return (
    <Popover firstFocusElement={ref} {...props}>
      <AriaToolbar ariaLabel="toolbar">
        <ButtonPill key={1}>1</ButtonPill>
        <ButtonPill key={2} ref={setRef}>
          2
        </ButtonPill>
        <ButtonPill key={3}>3</ButtonPill>
        <ButtonPill key={4}>4</ButtonPill>
      </AriaToolbar>
    </Popover>
  );
};

const InteractiveFocus = Template<PopoverProps>(PopoverWithFirstFocus).bind({});

InteractiveFocus.argTypes = { ...argTypes };

InteractiveFocus.args = {
  trigger: 'click',
  placement: PLACEMENTS.BOTTOM,
  showArrow: true,
  interactive: true,
  variant: 'small',
  color: COLORS.TERTIARY,
  delay: [0, 0],
  triggerComponent: (
    <ButtonPill style={{ margin: '10rem auto', display: 'flex' }}>Click me!</ButtonPill>
  ),
};

const WithCloseButton = Template<PopoverProps>(Popover).bind({});

WithCloseButton.argTypes = { ...argTypes };

WithCloseButton.args = {
  trigger: 'click',
  placement: PLACEMENTS.BOTTOM,
  showArrow: true,
  interactive: true,
  variant: 'small',
  closeButtonPlacement: 'top-right',
  focusBackOnTrigger: true,
  color: COLORS.TERTIARY,
  delay: [0, 0],
  triggerComponent: (
    <ButtonPill style={{ margin: '10rem auto', display: 'flex' }}>Click me!</ButtonPill>
  ),
  children: (
    <Flex style={{ width: '10rem', height: '10rem' }} justifyContent="center" alignItems="center">
      <Text type="display">🏖</Text>
    </Flex>
  ),
};

const Offset = Template<PopoverProps>(Popover).bind({});

Offset.argTypes = { ...argTypes };

Offset.args = {
  trigger: 'click',
  placement: PLACEMENTS.RIGHT,
  showArrow: true,
  variant: 'small',
  closeButtonPlacement: 'top-right',
  focusBackOnTrigger: true,
  color: COLORS.TERTIARY,
  delay: [0, 0],
  offsetDistance: -150,
  triggerComponent: (
    <ButtonPill style={{ margin: '10rem auto', display: 'flex', width: '30rem' }}>
      Click me!
    </ButtonPill>
  ),
  children: (
    <Flex style={{ width: '10rem', height: '10rem' }} justifyContent="center" alignItems="center">
      <Text type="display">🏖</Text>
    </Flex>
  ),
};

const MultiplePopovers = Template<PopoverProps>(Popover).bind({});

MultiplePopovers.argTypes = { ...argTypes };

MultiplePopovers.args = {
  trigger: 'click',
  placement: PLACEMENTS.TOP,
  showArrow: true,
  interactive: true,
  children: 'Interactive content on click',
  triggerComponent: (
    <Popover
      trigger="mouseenter"
      placement={PLACEMENTS.BOTTOM}
      showArrow
      triggerComponent={
        <ButtonSimple style={{ margin: '10rem auto', display: 'flex' }}>
          Hover or click me!
        </ButtonSimple>
      }
    >
      Description tooltip on hover
    </Popover>
  ),
};

const Common = MultiTemplate<PopoverProps>(Popover).bind({});

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

export {
  Example,
  InteractiveContent,
  InteractiveFocus,
  WithCloseButton,
  Offset,
  MultiplePopovers,
  Common,
};
