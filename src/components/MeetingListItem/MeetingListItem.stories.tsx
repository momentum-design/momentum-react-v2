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
      <div style={{ paddingRight: 0 }}>17</div>
      <Icon name="participant-list" />
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
          <ButtonCircle ghost={true}>
            <Icon name="info-circle" />
          </ButtonCircle>
          <ButtonCircle ghost={true}>
            <Icon name="share-c-native-iph" />
          </ButtonCircle>
          <ButtonCircle ghost={true}>
            <Icon name="chat" />
          </ButtonCircle>
        </ButtonGroup>
      ),
      children: (
        <>
          <div>Today</div>
          <div>11:00 - 12:00</div>
        </>
      ),
      image: (
        <ButtonCircle>
          <Icon name="play" />
        </ButtonCircle>
      ),
    },
    {
      label: 'Recording with buttons and link',
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>hyperlink</ButtonHyperlink>
          <ButtonCircle ghost={true}>
            <Icon name="info-circle" />
          </ButtonCircle>
          <ButtonCircle ghost={true}>
            <Icon name="chat" />
          </ButtonCircle>
        </ButtonGroup>
      ),
      children: (
        <>
          <div>Today</div>
          <div>11:00 - 12:00</div>
        </>
      ),
      image: (
        <ButtonCircle>
          <Icon name="play" />
        </ButtonCircle>
      ),
    },
    {
      label: 'Active meeting with participant count',
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>Link</ButtonHyperlink>
          <div style={{ paddingRight: 0, marginRight: 0 }}>17</div>
          <Icon name="participant-list" />
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
      image: <Avatar initials="TU" />,
    },
    {
      label: 'Inactive meeting',
      buttonGroup: (
        <ButtonGroup spaced>
          <Icon name="recurring" />
          <Icon name="calendar-empty" />
        </ButtonGroup>
      ),
      children: (
        <>
          <div key="child1">Date</div>
          <div key="child2">Normal</div>
        </>
      ),
      color: 'inactive',
      image: <Avatar initials="TU" />,
    },
    {
      label: 'Active meeting without join button',
      buttonGroup: (
        <ButtonGroup spaced>
          <Icon name="recurring" />
          <Icon name="calendar-empty" />
        </ButtonGroup>
      ),
      children: (
        <>
          <div key="child1">Date</div>
          <div key="child2">Normal</div>
        </>
      ),
      color: 'activeNoJoin',
      image: <Avatar initials="TU" />,
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
            <div style={{ marginRight: '5px' }}>Normal</div> <Icon name="recurring" />
          </div>
        </div>
      ),
      buttonGroup: <Avatar initials="TU" />,
      color: 'scheduled',
    },
    {
      label: 'Three-line item',
      children: (
        <>
          <div>Primary</div>
          <div>Name</div>
          <div>Date</div>
        </>
      ),
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>hyperlink</ButtonHyperlink>
          <ButtonCircle ghost={true}>
            <Icon name="copy" />
          </ButtonCircle>
          <ButtonCircle ghost={true}>
            <Icon name="chat" />
          </ButtonCircle>
        </ButtonGroup>
      ),
      image: <Icon name="placeholder" />,
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
      children: <div>Join</div>,
      color: 'join',
      image: <Avatar initials="TU" />,
    },
    {
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>Link</ButtonHyperlink>
        </ButtonGroup>
      ),
      children: <div>Inactive</div>,
      color: 'inactive',
      image: <Avatar initials="TU" />,
    },
    {
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>Link</ButtonHyperlink>
        </ButtonGroup>
      ),
      children: <div>Active No Join</div>,
      color: 'activeNoJoin',
      image: <Avatar initials="TU" />,
    },
    {
      buttonGroup: (
        <ButtonGroup spaced>
          <ButtonHyperlink>Link</ButtonHyperlink>
        </ButtonGroup>
      ),
      children: <div>Active No Join</div>,
      color: 'scheduled',
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
          <div>Normal</div>
          <div>Size</div>
        </>
      ),
    },
    {
      children: (
        <>
          <div>Large</div>
          <div>Size</div>
          <div>Item</div>
        </>
      ),
      large: true,
    },
  ],
};

export { Example, Colors, Sizes, Common };
