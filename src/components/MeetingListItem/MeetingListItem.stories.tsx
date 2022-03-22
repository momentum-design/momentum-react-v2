import { action } from '@storybook/addon-actions';
import React from 'react';

import StyleDocs from 'storybook/docs.stories.style.mdx';
import { DocumentationPage } from 'storybook/helper.stories.docs';
import {
  getComponentStates,
  MultiTemplate,
  MultiTemplateWithPseudoStates,
  Template,
} from 'storybook/helper.stories.templates';

import Avatar from 'components/Avatar';
import ButtonCircle from 'components/ButtonCircle';
import ButtonGroup from 'components/ButtonGroup';
import ButtonHyperlink from 'components/ButtonHyperlink';
import ButtonPill from 'components/ButtonPill';
import Icon from 'components/Icon';
import Text from 'components/Text';

import argTypes from './MeetingListItem.stories.args';
import Documentation from './MeetingListItem.stories.docs.mdx';

import MeetingListItem, { MeetingListItemProps, MeetingMarker } from './';

export default {
  title: 'Momentum UI/MeetingListItem',
  component: MeetingListItem,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
  args: {
    children: 'A',
    onPress: action('onPress'),
  },
};

const Example = Template((args) => (
  <>
    {getComponentStates(
      MeetingListItem,
      {
        ...args,
        children: (
          <>
            <Text type="body-primary" key="child1">
              Date
            </Text>
            <Text type="body-secondary" key="child2">
              Normal
            </Text>
          </>
        ),
      },
      {}
    )}
  </>
)).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  buttonGroup: (
    <ButtonGroup spaced>
      <ButtonHyperlink key="link">Link</ButtonHyperlink>
      <div key="participants-list" style={{ paddingRight: 0 }}>
        17
      </div>
      <Icon key="participants-icon" name="participant-list" scale={16} />
      <ButtonPill key="join-button" color="join">
        Join
      </ButtonPill>
    </ButtonGroup>
  ),
  children: (
    <>
      <Text type="body-primary" key="child1">
        Date
      </Text>
      <Text type="body-secondary" key="child2">
        Normal
      </Text>
    </>
  ),
  color: MeetingMarker.AcceptedActive,
  image: <Avatar initials="TU" />,
};

/**
 * Common variants story. This renders multiple variants of a single component.
 */
const Common = MultiTemplateWithPseudoStates(MeetingListItem).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.parameters = {
  variants: [
    {
      label: 'Recording with buttons',
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonCircle key="btn-info" ghost={true}>
            <Icon name="info-circle" />
          </ButtonCircle>
          <ButtonCircle key="btn-share" ghost={true}>
            <Icon name="share-c-native-iph" />
          </ButtonCircle>
          <ButtonCircle key="btn-chat" ghost={true}>
            <Icon name="chat" />
          </ButtonCircle>
        </ButtonGroup>
      ),
      children: (
        <>
          <Text type="header-primary" key="first-line">
            Today
          </Text>
          <Text type="body-secondary" key="second-line">
            11:00 - 12:00
          </Text>
        </>
      ),
      image: (
        <ButtonCircle>
          <Icon key="play-icon" name="play" />
        </ButtonCircle>
      ),
    },
    {
      label: 'Recording with buttons and link',
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink key="link">hyperlink</ButtonHyperlink>
          <ButtonCircle key="btn-info" ghost={true}>
            <Icon name="info-circle" />
          </ButtonCircle>
          <ButtonCircle key="btn-chat" ghost={true}>
            <Icon name="chat" />
          </ButtonCircle>
        </ButtonGroup>
      ),
      children: (
        <>
          <Text type="header-primary" key="first-line">
            Today
          </Text>
          <Text type="body-secondary" key="second-line">
            11:00 - 12:00
          </Text>
        </>
      ),
      image: (
        <ButtonCircle>
          <Icon key="play-icon" name="play" />
        </ButtonCircle>
      ),
    },
    {
      label: 'Active meeting with participant count',
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink key="link">Link</ButtonHyperlink>
          <div key="participant-list" style={{ paddingRight: 0, marginRight: 0 }}>
            17
          </div>
          <Icon key="participant-list-icon" name="participant-list" scale={16} />
          <ButtonPill key="join-button" color="join">
            Join
          </ButtonPill>
        </ButtonGroup>
      ),
      children: (
        <>
          <Text type="header-primary" key="child1">
            Date
          </Text>
          <Text type="body-secondary" key="child2">
            Normal
          </Text>
        </>
      ),
      color: MeetingMarker.AcceptedActive,
      image: <Avatar initials="TU" />,
    },
    {
      label: 'Inactive meeting',
      buttonGroup: (
        <ButtonGroup spaced>
          <Icon key="recurring-icon" name="recurring" />
          <Icon key="calendar-icon" name="calendar-empty" />
        </ButtonGroup>
      ),
      children: (
        <>
          <Text type="body-primary" key="child1">
            Date
          </Text>
          <Text type="body-secondary" key="child2">
            Normal
          </Text>
        </>
      ),
      color: MeetingMarker.AcceptedInactive,
      image: <Avatar initials="TU" />,
    },
    {
      label: 'Active meeting without join button',
      buttonGroup: (
        <ButtonGroup spaced>
          <Icon key="icon-recurring" name="recurring" />
          <Icon key="icon-calendar" name="calendar-empty" />
        </ButtonGroup>
      ),
      children: (
        <>
          <Text type="body-primary" key="child1">
            Date
          </Text>
          <Text type="body-secondary" key="child2">
            Normal
          </Text>
        </>
      ),
      color: MeetingMarker.AcceptedInactive,
      image: <Avatar initials="TU" />,
    },
    {
      label: 'No meetings scheduled',
      children: 'No meetings scheduled',
      color: MeetingMarker.Transparent,
    },
    {
      label: 'Scheduled meeting',
      children: (
        <div key="child-1" style={{ display: 'flex' }}>
          <div key="first-line-group" style={{ display: 'flex', flexDirection: 'column' }}>
            <Text key="first-line" type="body-primary">
              Date
            </Text>
            <Text key="second-line" type="body-secondary">
              Time - Time
            </Text>
          </div>
          <div
            key="third-line"
            style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}
          >
            <div key="third-line-text" style={{ marginRight: '5px' }}>
              Normal
            </div>
            <Icon key="recurring-icon" name="recurring" />
          </div>
        </div>
      ),
      buttonGroup: <Avatar initials="TU" />,
      color: MeetingMarker.Transparent,
    },
    {
      label: 'Three-line item',
      children: (
        <>
          <Text type="body-primary" key="first-line">
            Primary
          </Text>
          <Text type="body-secondary" key="second-line">
            Name
          </Text>
          <Text type="body-secondary" key="third-line">
            Date
          </Text>
        </>
      ),
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink key="link">hyperlink</ButtonHyperlink>
          <ButtonCircle key="button-copy" ghost={true}>
            <Icon name="copy" />
          </ButtonCircle>
          <ButtonCircle key="button-chat" ghost={true}>
            <Icon name="chat" />
          </ButtonCircle>
        </ButtonGroup>
      ),
      image: <Icon key="placeholder-icon" name="placeholder" />,
      large: true,
    },
  ],
};

const Colors = MultiTemplate<MeetingListItemProps>(MeetingListItem).bind({});

Colors.argTypes = { ...argTypes };
delete Colors.argTypes.children;

Colors.parameters = {
  variants: [
    {
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>Link</ButtonHyperlink>
        </ButtonGroup>
      ),
      children: <Text type="body-primary">{MeetingMarker.AcceptedActive}</Text>,
      color: MeetingMarker.AcceptedActive,
      image: <Avatar initials="TU" />,
    },
    {
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>Link</ButtonHyperlink>
        </ButtonGroup>
      ),
      children: <Text type="body-primary">{MeetingMarker.AcceptedInactive}</Text>,
      color: MeetingMarker.AcceptedInactive,
      image: <Avatar initials="TU" />,
    },
    {
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>Link</ButtonHyperlink>
        </ButtonGroup>
      ),
      children: <Text type="body-primary">{MeetingMarker.TentativeActive}</Text>,
      color: MeetingMarker.TentativeActive,
      image: <Avatar initials="TU" />,
    },
    {
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>Link</ButtonHyperlink>
        </ButtonGroup>
      ),
      children: <Text type="body-primary">{MeetingMarker.TentativeInactive}</Text>,
      color: MeetingMarker.TentativeInactive,
      image: <Avatar initials="TU" />,
    },
    {
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>Link</ButtonHyperlink>
        </ButtonGroup>
      ),
      children: <Text type="body-primary">{MeetingMarker.Transparent}</Text>,
      color: MeetingMarker.Transparent,
      image: <Avatar initials="TU" />,
    },
    {
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>Link</ButtonHyperlink>
        </ButtonGroup>
      ),
      children: <Text type="body-primary">{MeetingMarker.Gray}</Text>,
      color: MeetingMarker.Gray,
      image: <Avatar initials="TU" />,
    },
    {
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>Link</ButtonHyperlink>
        </ButtonGroup>
      ),
      children: <Text type="body-primary">{MeetingMarker.GrayStatic}</Text>,
      color: MeetingMarker.GrayStatic,
      image: <Avatar initials="TU" />,
    },
  ],
};

const Sizes = MultiTemplate<MeetingListItemProps>(MeetingListItem).bind({});

Sizes.argTypes = { ...argTypes };
delete Sizes.argTypes.children;

Sizes.parameters = {
  variants: [
    {
      children: (
        <>
          <Text type="body-primary" key="first-line">
            Normal
          </Text>
          <Text type="body-secondary" key="second-line">
            Size
          </Text>
        </>
      ),
    },
    {
      children: (
        <>
          <Text type="body-primary" key="first-line">
            Large
          </Text>
          <Text type="body-secondary" key="second-line">
            Size
          </Text>
          <Text type="body-secondary" key="third-line">
            Item
          </Text>
        </>
      ),
      large: true,
    },
  ],
};

export { Example, Colors, Sizes, Common };
