import React from 'react';
import {
  MultiTemplate,
  MultiTemplateWithLabel,
  Template,
} from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import MeetingRowContent, { MeetingRowContentProps } from './';
import argTypes from './MeetingRowContent.stories.args';
import Documentation from './MeetingRowContent.stories.docs.mdx';
import ButtonGroup from '../ButtonGroup';
import ButtonHyperlink from '../ButtonHyperlink';
import ButtonPill from '../ButtonPill';
import Text from '../Text';
import { MeetingMarker } from '../MeetingListItem';
import Avatar from '../Avatar';
import Icon from '../Icon';
import ButtonCircle from '../ButtonCircle';

export default {
  title: 'Momentum UI/MeetingRowContent',
  component: MeetingRowContent,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<MeetingRowContentProps>((args: MeetingRowContentProps) => (
  <div style={{ position: 'relative' }}>
    <MeetingRowContent {...args} />
  </div>
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
const Common = MultiTemplateWithLabel<MeetingRowContentProps>((args: MeetingRowContentProps) => (
  <div style={{ position: 'relative' }}>
    <MeetingRowContent {...args} />
  </div>
)).bind({});

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

const Colors = MultiTemplate<MeetingRowContentProps>((args: MeetingRowContentProps) => {
  return (
    <div style={{ position: 'relative' }}>
      <MeetingRowContent {...args} />
    </div>
  );
}).bind({});

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

export { Example, Colors, Common };
