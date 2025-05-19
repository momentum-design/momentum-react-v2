import React from 'react';

import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import MenuTrigger from '../MenuTrigger';
import Menu from '../Menu';
import { Item } from '@react-stately/collections';
import ButtonPill from '../ButtonPill';
import ButtonCircle from '../ButtonCircle';
import ButtonCircleToggle from '../ButtonCircleToggle';
import ButtonPillToggle from '../ButtonPillToggle';
import Icon from '../Icon';

import ButtonGroup, { ButtonGroupProps } from './';
import argTypes from './ButtonGroup.stories.args';
import Documentation from './ButtonGroup.stories.docs.mdx';

export default {
  title: 'Momentum UI/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
  subComponents: { ButtonPill },
};

const commonChildren = [
  <ButtonPill key="0" size={40}>
    Example
  </ButtonPill>,
  <ButtonCircle key="1" size={40} prefixIcon="redo-regular" />,
  <ButtonCircle key="2" size={40} prefixIcon="cancel-regular" />,
];

const Example = Template<ButtonGroupProps>(ButtonGroup).bind({});

Example.args = {
  children: [...commonChildren],
};

Example.argTypes = { ...argTypes };

const Rounding = MultiTemplate<ButtonGroupProps>(ButtonGroup).bind({});

Rounding.args = {
  children: [...commonChildren],
};

Rounding.parameters = {
  variants: [{}, { round: true }],
};

Rounding.argTypes = { ...argTypes };
delete Rounding.argTypes.round;

const Spacing = MultiTemplate<ButtonGroupProps>(ButtonGroup).bind({});

Spacing.args = {
  children: [...commonChildren],
};

Spacing.parameters = {
  variants: [{}, { spaced: true }],
};

Spacing.argTypes = { ...argTypes };
delete Spacing.argTypes.spaced;

const Separator = MultiTemplate<ButtonGroupProps>(ButtonGroup).bind({});

const separatorCommonChildren = [
  <ButtonPill ghost key="0" size={40}>
    Example
  </ButtonPill>,
  <ButtonCircle variant="tertiary" key="1" size={40} prefixIcon="redo-regular" />,
  <ButtonCircle variant="tertiary" key="2" size={40} prefixIcon="cancel-regular" />,
];

const callControlsCommonChildren = [
  <ButtonCircleToggle key="0" size={40} prefixIcon="raise-hand-regular" />,
  <MenuTrigger
    key="1"
    placement="top-end"
    triggerComponent={<ButtonCircle size={40} variant="tertiary" prefixIcon="reactions-regular" />}
    children={[
      <Menu key="0" selectionMode="single">
        <Item>Item 1</Item>
        <Item>Item 2</Item>
      </Menu>,
    ]}
  />,
];

const paginationCommonChildren = [
  <ButtonCircle
    inverted
    disabled
    key="0"
    size={28}
    prefixIcon="arrow-up-regular"
    variant="tertiary"
  />,
  <ButtonCircle inverted key="1" size={28} prefixIcon="arrow-down-regular" variant="tertiary" />,
];

Separator.parameters = {
  variants: [
    { children: separatorCommonChildren },
    { children: separatorCommonChildren, separator: true },
    { children: separatorCommonChildren, round: true },
    { children: separatorCommonChildren, round: true, separator: true },
    {
      style: { marginTop: '1rem' },
      children: callControlsCommonChildren,
      round: true,
      separator: true,
    },
    {
      style: { marginTop: '1rem' },
      orientation: 'vertical',
      children: paginationCommonChildren,
      round: true,
      separator: true,
    },
  ],
};

Separator.argTypes = { ...argTypes };
delete Separator.argTypes.separator;
delete Separator.argTypes.round;
delete Separator.argTypes.compressed;
delete Separator.argTypes.spaced;

const AudioVideoControls = MultiTemplate<ButtonGroupProps>(ButtonGroup).bind({});
AudioVideoControls.argTypes = { ...argTypes };
delete AudioVideoControls.argTypes.round;
delete AudioVideoControls.argTypes.spaced;
delete AudioVideoControls.argTypes.compressed;

AudioVideoControls.parameters = {
  variants: [
    {
      children: [
        <ButtonPill outline ghost key="0" size={40} style={{ minWidth: '6.8rem' }}>
          <Icon key="0" name="microphone-on" autoScale={125} style={{ marginLeft: 'auto' }} />
          <div key="1" style={{ marginRight: 'auto' }}>
            Mute
          </div>
        </ButtonPill>,
        <MenuTrigger
          key="2"
          placement="top-end"
          triggerComponent={
            <ButtonCircle variant="secondary" key="1" size={40} prefixIcon="arrow-down-regular" />
          }
          children={[
            <Menu key="0" selectionMode="single">
              <Item>Item 1</Item>
              <Item>Item 2</Item>
            </Menu>,
          ]}
        />,
      ],
      round: true,
      compressed: true,
    },
    {
      children: [
        <ButtonPill
          disabled
          outline
          disabledOutline
          ghost
          key="0"
          size={40}
          style={{ minWidth: '6.8rem' }}
        >
          <Icon
            key="0"
            name="microphone-muted"
            fillColor="#FC8B98"
            autoScale={125}
            style={{ marginLeft: 'auto' }}
          />
          <div key="1" style={{ marginRight: 'auto' }}>
            Unmute
          </div>
        </ButtonPill>,
        <ButtonCircle key="1" size={40} variant="secondary" prefixIcon="arrow-down-regular" />,
      ],
      round: true,
      compressed: true,
    },
    {
      children: [
        <ButtonPill outline ghost key="0" size={40} style={{ minWidth: '8.3rem' }}>
          <Icon key="0" name="camera-on" autoScale={125} style={{ marginLeft: 'auto' }} />
          <div key="1" style={{ marginRight: 'auto' }}>
            Stop Video
          </div>
        </ButtonPill>,
        <ButtonCircle key="1" size={40} variant="secondary" prefixIcon="arrow-down-regular" />,
      ],
      round: true,
      compressed: true,
    },
    {
      children: [
        <ButtonPill
          outline
          disabled
          disabledOutline
          ghost
          key="0"
          size={40}
          style={{ minWidth: '8.3rem' }}
        >
          <Icon key="0" name="camera-muted" fillColor="#FC8B98" autoScale={125} />
          <div key="1">Start Video</div>
        </ButtonPill>,
        <ButtonCircle key="1" size={40} variant="secondary" prefixIcon="arrow-down-regular" />,
      ],
      round: true,
      compressed: true,
    },
    {
      children: [
        <ButtonPill outline ghost key="0" size={40} style={{ minWidth: '8.3rem' }}>
          <Icon key="0" name="camera-on" autoScale={125} />
          <div key="1">Long Label Possibly German</div>
        </ButtonPill>,
        <ButtonCircle key="1" size={40} variant="secondary" prefixIcon="arrow-down-regular" />,
      ],
      round: true,
      compressed: true,
    },
    {
      children: [
        <ButtonPillToggle
          outline
          size={40}
          style={{ minWidth: '8.3rem' }}
          key="0"
          prefixIcon="camera-on-regular"
        >
          Long Label Possibly German
        </ButtonPillToggle>,
        <ButtonCircleToggle outline size={40} prefixIcon="arrow-down-regular" key="1" />,
      ],
      round: true,
      compressed: true,
    },
  ],
};

const Common = MultiTemplate<ButtonGroupProps>(ButtonGroup).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;
delete Common.argTypes.spaced;
delete Common.argTypes.round;

Common.parameters = {
  variants: [
    {
      children: [
        <ButtonPill key="0">Example</ButtonPill>,
        <ButtonCircle key="1" prefixIcon="redo-regular" size={40} />,
        <ButtonCircle key="2" prefixIcon="cancel-regular" size={40} />,
      ],
      round: true,
    },
    {
      children: [
        <ButtonPill color="message" key="0">
          Message
        </ButtonPill>,
        <ButtonCircle color="message" key="1" prefixIcon="send-regular" size={40} />,
      ],
      round: true,
    },
    {
      children: [
        <ButtonPill color="join" key="0">
          Join
        </ButtonPill>,
        <ButtonCircle color="join" key="1" prefixIcon="enter-room-regular" size={40} />,
      ],
      round: true,
    },
    {
      children: [
        <ButtonPill color="cancel" key="0">
          Cancel
        </ButtonPill>,
        <ButtonCircle color="cancel" size={40} key="1" prefixIcon="cancel-regular" />,
      ],
      round: true,
    },
    {
      children: [
        <ButtonCircle key="0" size={64} prefixIcon="exit-room-regular" variant="tertiary" />,
        <ButtonCircle key="1" size={64} prefixIcon="location-regular" variant="tertiary" />,
        <ButtonCircle key="2" size={64} prefixIcon="room-calendar-regular" variant="tertiary" />,
        <ButtonCircle key="3" size={64} prefixIcon="assign-host-regular" variant="tertiary" />,
        <ButtonCircle key="4" size={64} prefixIcon="settings-regular" variant="tertiary" />,
      ],
      round: true,
      spaced: true,
      style: {
        backgroundColor: 'IndianRed',
      },
    },
    {
      children: [
        <ButtonCircle key="0" size={32} variant="tertiary" prefixIcon="camera-presence-regular" />,
        <ButtonCircle
          key="1"
          size={32}
          variant="tertiary"
          prefixIcon="quiet-hours-presence-regular"
        />,
        <ButtonCircle key="2" size={32} variant="tertiary" prefixIcon="handset-regular" />,
        <ButtonCircle
          key="3"
          size={32}
          variant="tertiary"
          prefixIcon="meetings-presence-regular"
        />,
        <ButtonCircle key="4" size={32} variant="tertiary" prefixIcon="pto-presence-regular" />,
      ],
      round: true,
      spaced: true,
      style: {
        backgroundColor: 'Chocolate',
      },
    },
  ],
};

export { Example, Rounding, Spacing, Separator, AudioVideoControls, Common };
