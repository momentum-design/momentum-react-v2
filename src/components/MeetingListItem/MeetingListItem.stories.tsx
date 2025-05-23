import React from 'react';
import {
  getComponentStates,
  MultiTemplate,
  MultiTemplateWithPseudoStates,
  Template,
} from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import MeetingListItem, { MeetingListItemProps, MeetingMarker } from './';
import argTypes from './MeetingListItem.stories.args';
import Documentation from './MeetingListItem.stories.docs.mdx';
import Icon from '../Icon';
import Avatar from '../Avatar';
import ButtonHyperlink from '../ButtonHyperlink';
import ButtonPill from '../ButtonPill';
import ButtonGroup from '../ButtonGroup';
import ButtonCircle from '../ButtonCircle';
import Text from '../Text';
import { action } from '@storybook/addon-actions';
import List from '../List';

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

const Wrapper = (args) => {
  return (
    <List listSize={1}>
      <MeetingListItem itemIndex={0} {...args} />
    </List>
  );
};

const Example = Template<MeetingListItemProps>((args) => (
  <>
    {getComponentStates(
      Wrapper,
      {
        ...args,
        children: (
          <>
            <Text type="body-primary" tagName="p" key="child1">
              Date
            </Text>
            <Text type="body-secondary" tagName="small" key="child2">
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
      <Text type="body-primary" tagName="p" key="child1">
        Date
      </Text>
      <Text type="body-secondary" tagName="small" key="child2">
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
          <ButtonCircle key="btn-info" variant="tertiary" prefixIcon="info-circle-regular" />
          <ButtonCircle
            key="btn-share"
            variant="tertiary"
            prefixIcon="share-c-native-iph-regular"
          />
          <ButtonCircle key="btn-chat" variant="tertiary" prefixIcon="chat-regular" />
        </ButtonGroup>
      ),
      children: (
        <>
          <Text type="header-primary" tagName="h3" key="first-line">
            Today
          </Text>
          <Text type="body-secondary" tagName="small" key="second-line">
            11:00 - 12:00
          </Text>
        </>
      ),
      image: <ButtonCircle prefixIcon="play-regular" />,
    },
    {
      label: 'Recording with buttons and link',
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink key="link">hyperlink</ButtonHyperlink>
          <ButtonCircle key="btn-info" variant="tertiary" prefixIcon="info-circle-regular" />
          <ButtonCircle key="btn-chat" variant="tertiary" prefixIcon="chat-regular" />
        </ButtonGroup>
      ),
      children: (
        <>
          <Text type="header-primary" tagName="h3" key="first-line">
            Today
          </Text>
          <Text type="body-secondary" tagName="small" key="second-line">
            11:00 - 12:00
          </Text>
        </>
      ),
      image: <ButtonCircle prefixIcon="play-regular" />,
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
          <Text type="header-primary" tagName="h3" key="child1">
            Date
          </Text>
          <Text type="body-secondary" tagName="small" key="child2">
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
          <Text type="body-primary" tagName="p" key="child1">
            Date
          </Text>
          <Text type="body-secondary" tagName="small" key="child2">
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
          <Text type="body-primary" tagName="p" key="child1">
            Date
          </Text>
          <Text type="body-secondary" tagName="small" key="child2">
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
            <Text key="first-line" type="body-primary" tagName="p">
              Date
            </Text>
            <Text key="second-line" type="body-secondary" tagName="small">
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
          <Text type="body-primary" tagName="p" key="first-line">
            Primary
          </Text>
          <Text type="body-secondary" tagName="small" key="second-line">
            Name
          </Text>
          <Text type="body-secondary" tagName="small" key="third-line">
            Date
          </Text>
        </>
      ),
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink key="link">hyperlink</ButtonHyperlink>
          <ButtonCircle key="button-copy" variant="tertiary" prefixIcon="copy-regular" />
          <ButtonCircle key="button-chat" variant="tertiary" prefixIcon="chat-regular" />
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
          <ButtonHyperlink>
            Link for Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a type specimen book. It
            has survived not only five centuries, but also the leap
          </ButtonHyperlink>
        </ButtonGroup>
      ),
      children: (
        <Text type="body-primary" tagName="p">
          {MeetingMarker.AcceptedActive}
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap
        </Text>
      ),
      color: MeetingMarker.AcceptedActive,
      image: <Avatar initials="TU" />,
    },
    {
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>Link</ButtonHyperlink>
        </ButtonGroup>
      ),
      children: (
        <Text type="body-primary" tagName="p">
          {MeetingMarker.AcceptedInactive}
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap
        </Text>
      ),
      color: MeetingMarker.AcceptedInactive,
      image: <Avatar initials="TU" />,
    },
    {
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>
            Link for Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a type specimen book. It
            has survived not only five centuries, but also the leap
          </ButtonHyperlink>
        </ButtonGroup>
      ),
      children: (
        <Text type="body-primary" tagName="p">
          {MeetingMarker.TentativeActive}
        </Text>
      ),
      color: MeetingMarker.TentativeActive,
      image: <Avatar initials="TU" />,
    },
    {
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>Link</ButtonHyperlink>
        </ButtonGroup>
      ),
      children: (
        <Text type="body-primary" tagName="p">
          {MeetingMarker.TentativeInactive}
        </Text>
      ),
      color: MeetingMarker.TentativeInactive,
      image: <Avatar initials="TU" />,
    },
    {
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>Link</ButtonHyperlink>
        </ButtonGroup>
      ),
      children: (
        <Text type="body-primary" tagName="p">
          {MeetingMarker.Transparent}
        </Text>
      ),
      color: MeetingMarker.Transparent,
      image: <Avatar initials="TU" />,
    },
    {
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>Link</ButtonHyperlink>
        </ButtonGroup>
      ),
      children: (
        <Text type="body-primary" tagName="p">
          {MeetingMarker.Gray}
        </Text>
      ),
      color: MeetingMarker.Gray,
      image: <Avatar initials="TU" />,
    },
    {
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>Link</ButtonHyperlink>
        </ButtonGroup>
      ),
      children: (
        <Text type="body-primary" tagName="p">
          {MeetingMarker.GrayStatic}
        </Text>
      ),
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
          <Text type="body-primary" tagName="p" key="first-line">
            Normal
          </Text>
          <Text type="body-secondary" tagName="small" key="second-line">
            Size
          </Text>
        </>
      ),
    },
    {
      children: (
        <>
          <Text type="body-primary" tagName="p" key="first-line">
            Large
          </Text>
          <Text type="body-secondary" tagName="small" key="second-line">
            Size
          </Text>
          <Text type="body-secondary" tagName="small" key="third-line">
            Item
          </Text>
        </>
      ),
      large: true,
    },
  ],
};

export { Example, Colors, Sizes, Common };
