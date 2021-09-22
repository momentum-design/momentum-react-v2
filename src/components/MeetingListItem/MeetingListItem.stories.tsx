import React from 'react';
import {
  getComponentStates,
  MultiTemplate,
  MultiTemplateWithPseudoStates,
  Template,
} from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import MeetingListItem, { MeetingListItemProps } from './';
import argTypes from './MeetingListItem.stories.args';
import Documentation from './MeetingListItem.stories.docs.mdx';
import Icon from '../Icon';
import Avatar from '../Avatar';
import ButtonHyperlink from '../ButtonHyperlink';
import ButtonPill from '../ButtonPill';
import ButtonGroup from '../ButtonGroup';
import ButtonCircle from '../ButtonCircle';

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
    // Args provided to all stories by default.
    children: 'A', // Example of a default arg for all stories.
  },
};

/**
 * Primary story. This renders a single component with all external props.
 */
const Example = Template((args) => (
  <>
    {getComponentStates(
      MeetingListItem,
      {
        ...args,
        children: (
          <>
            <div key="child1">Date</div>
            <div key="child2">Normal</div>
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
      <ButtonHyperlink>Link</ButtonHyperlink>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        17 <Icon autoScale name="participant-list" />
      </div>
      <ButtonPill color="join">Join</ButtonPill>
    </ButtonGroup>
  ),
  children: (
    <>
      <div key="child1">Date</div>
      <div key="child2">Normal</div>
    </>
  ),
  color: 'join',
  startImage: <Avatar initials="TU" size={32} />,
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
          <Icon autoScale name="info-circle" />
          <Icon autoScale name="share-c-native-iph" />
          <Icon autoScale name="chat" />
        </ButtonGroup>
      ),
      children: (
        <>
          <div>Today</div>
          <div>11:00 - 12:00</div>
        </>
      ),
      startImage: (
        <ButtonCircle>
          <Icon autoScale name="play" />
        </ButtonCircle>
      ),
    },
    {
      label: 'Recording with buttons and link',
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>hyperlink</ButtonHyperlink>
          <Icon autoScale name="info-circle" />
          <Icon autoScale name="chat" />
        </ButtonGroup>
      ),
      children: (
        <>
          <div>Today</div>
          <div>11:00 - 12:00</div>
        </>
      ),
      startImage: (
        <ButtonCircle>
          <Icon autoScale name="play" />
        </ButtonCircle>
      ),
    },
    {
      label: 'Active meeting with participant count',
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>Link</ButtonHyperlink>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            17 <Icon autoScale name="participant-list" />
          </div>
          <ButtonPill color="join">Join</ButtonPill>
        </ButtonGroup>
      ),
      children: (
        <>
          <div key="child1">Date</div>
          <div key="child2">Normal</div>
        </>
      ),
      color: 'join',
      startImage: <Avatar initials="TU" size={32} />,
    },
    {
      label: 'Inactive meeting',
      buttonGroup: (
        <ButtonGroup spaced>
          <Icon autoScale name="recurring" />
          <Icon autoScale name="calendar-empty" />
        </ButtonGroup>
      ),
      children: (
        <>
          <div key="child1">Date</div>
          <div key="child2">Normal</div>
        </>
      ),
      color: 'inactive',
      startImage: <Avatar initials="TU" size={32} />,
    },
    {
      label: 'Active meeting without join button',
      buttonGroup: (
        <ButtonGroup spaced>
          <Icon autoScale name="recurring" />
          <Icon autoScale name="calendar-empty" />
        </ButtonGroup>
      ),
      children: (
        <>
          <div key="child1">Date</div>
          <div key="child2">Normal</div>
        </>
      ),
      color: 'activeNoJoin',
      startImage: <Avatar initials="TU" size={32} />,
    },
    {
      label: 'No meetings scheduled',
      children: 'No meetings scheduled',
      color: 'empty',
    },
    {
      label: 'Scheduled meeting',
      children: (
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>Date</div>
            <div>Time - Time</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            <div style={{ marginRight: '5px' }}>Normal</div> <Icon autoScale name="recurring" />
          </div>
        </div>
      ),
      buttonGroup: <Avatar initials="TU" size={32} />,
    },
    {
      label: 'Scheduled meeting',
      children: (
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>Date</div>
            <div>Time - Time</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            <div style={{ marginRight: '5px' }}>Normal</div> <Icon autoScale name="recurring" />
          </div>
        </div>
      ),
      buttonGroup: <Avatar initials="TU" size={32} />,
      isDisabled: true,
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
      children: <div>Join</div>,
      color: 'join',
      startImage: <Avatar initials="TU" size={32} />,
    },
    {
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>Link</ButtonHyperlink>
        </ButtonGroup>
      ),
      children: <div>Inactive</div>,
      color: 'inactive',
      startImage: <Avatar initials="TU" size={32} />,
    },
    {
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>Link</ButtonHyperlink>
        </ButtonGroup>
      ),
      children: <div>Active No Join</div>,
      color: 'activeNoJoin',
      startImage: <Avatar initials="TU" size={32} />,
    },
  ],
};

export { Example, Common, Colors };
