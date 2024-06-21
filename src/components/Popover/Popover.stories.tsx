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
import Avatar from '../Avatar';
import MeetingListItem from '../MeetingListItem';
import SearchInput from '../SearchInput';

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

const InteractiveHover = Template<PopoverProps>(Popover).bind({});

InteractiveHover.argTypes = { ...argTypes };

InteractiveHover.args = {
  trigger: 'mouseenter',
  placement: PLACEMENTS.BOTTOM,
  showArrow: true,
  interactive: true,
  variant: 'small',
  color: COLORS.TERTIARY,
  delay: [0, 0],
  triggerComponent: (
    <ButtonPill style={{ margin: '10rem auto', display: 'flex' }}>Hover me!</ButtonPill>
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

const AvatarExample = Template<PopoverProps>(Popover).bind({});

AvatarExample.argTypes = { ...argTypes };

AvatarExample.args = {
  trigger: 'mouseenter',
  placement: PLACEMENTS.BOTTOM,
  showArrow: true,
  interactive: true,
  variant: 'small',
  color: COLORS.TERTIARY,
  delay: [0, 0],
  triggerComponent: (
    <Avatar
      onPress={() => {
        alert('avatar on press');
      }}
      icon={'participant-unknown'}
      type={'person'}
    />
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

const MultiplePopovers = Template<PopoverProps>((args: PopoverProps) => {
  const triggerComponent = (
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
  );
  return <Popover {...args} triggerComponent={triggerComponent} />;
}).bind({});

MultiplePopovers.argTypes = { ...argTypes };

MultiplePopovers.args = {
  trigger: 'click',
  placement: PLACEMENTS.TOP,
  showArrow: true,
  interactive: true,
  children: 'Interactive content on click',
  closeButtonPlacement: 'top-right',
};

const NestedPopover = Template<PopoverProps>(Popover).bind({});

NestedPopover.argTypes = { ...argTypes };

NestedPopover.args = {
  trigger: 'click',
  placement: PLACEMENTS.TOP,
  showArrow: true,
  interactive: true,
  children: (
    <p>
      Popover level 1
      <div>
        <Popover
          trigger="click"
          placement={PLACEMENTS.BOTTOM}
          showArrow
          interactive
          triggerComponent={<ButtonSimple>Hover or click me!</ButtonSimple>}
        >
          <p>
            Popover level 2
            <div>
              <Popover
                trigger="mouseenter"
                placement={PLACEMENTS.BOTTOM}
                showArrow
                triggerComponent={<ButtonSimple>Hover or click me!</ButtonSimple>}
              >
                Popover level 3
              </Popover>
            </div>
          </p>
        </Popover>
      </div>
    </p>
  ),
  triggerComponent: (
    <ButtonSimple style={{ margin: '10rem auto', display: 'flex' }}>
      Hover or click me!
    </ButtonSimple>
  ),
};

const WithMeetingListItem = Template<PopoverProps>(Popover).bind({});

WithMeetingListItem.argTypes = { ...argTypes };

WithMeetingListItem.args = {
  trigger: 'click',
  placement: PLACEMENTS.TOP,
  showArrow: true,
  interactive: true,
  children: (
    <div>
      <ButtonSimple>hi</ButtonSimple>
    </div>
  ),
  triggerComponent: (
    <MeetingListItem
      onPress={() => {
        alert('pressed by onPress');
      }}
      style={{ margin: '10rem auto', display: 'flex' }}
    >
      Hover or click me!
    </MeetingListItem>
  ),
};

const WithMeetingListItemWithButtonsWithPopover = Template<PopoverProps>(Popover).bind({});

WithMeetingListItemWithButtonsWithPopover.argTypes = { ...argTypes };

WithMeetingListItemWithButtonsWithPopover.args = {
  trigger: 'click',
  placement: PLACEMENTS.TOP,
  showArrow: true,
  interactive: true,
  children: (
    <div>
      <Popover
        interactive
        trigger="click"
        triggerComponent={
          <Avatar
            onPress={() => {
              alert('avatar on press');
            }}
            initials="AB"
          >
            Hover or click me!
          </Avatar>
        }
      >
        <ButtonSimple>hi</ButtonSimple>
      </Popover>
    </div>
  ),
  triggerComponent: (
    <MeetingListItem style={{ margin: '10rem auto', display: 'flex' }}>
      Hover or click me!
    </MeetingListItem>
  ),
};

const WithSearchInput = Template<PopoverProps>(Popover).bind({});

const SearchInputComponent = () => {
  const [val, setVal] = useState('');

  return (
    <SearchInput
      clearButtonAriaLabel="Clear"
      onChange={(e) => {
        setVal(e);
      }}
      value={val}
    />
  );
};

WithSearchInput.argTypes = { ...argTypes };

WithSearchInput.args = {
  trigger: 'click',
  placement: PLACEMENTS.TOP,
  showArrow: true,
  interactive: true,
  children: <SearchInputComponent />,
  triggerComponent: <ButtonSimple>Open Search</ButtonSimple>,
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
  InteractiveHover,
  InteractiveFocus,
  WithCloseButton,
  Offset,
  MultiplePopovers,
  NestedPopover,
  AvatarExample,
  Common,
  WithMeetingListItem,
  WithMeetingListItemWithButtonsWithPopover,
  WithSearchInput,
};
