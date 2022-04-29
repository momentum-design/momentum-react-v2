import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import MeetingContainer, { MeetingContainerProps } from './';
import argTypes from './MeetingContainer.stories.args';
import Documentation from './MeetingContainer.stories.docs.mdx';
import ButtonGroup from '../ButtonGroup';
import React from 'react';
import ButtonCircle from '../ButtonCircle';
import ButtonPill from '../ButtonPill';
import Icon from '../Icon';
import Avatar from '../Avatar';
import Tag from '../Tag';
import Text from '../Text';
import ButtonHyperlink from '../ButtonHyperlink';
import { CARD_CONSTANTS } from '../Card';

export default {
  title: 'Momentum UI/MeetingContainer',
  component: MeetingContainer,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

// NOTE: Primary story. This renders a single component with all external props.
const Example = Template<MeetingContainerProps>(MeetingContainer).bind({});

const tags = [<Tag key={0}>Messages</Tag>, <Tag key={1}>Recording</Tag>];

const pillButtons = [
  <ButtonPill key={0} outline ghost={true} color="join" size={28}>
    <Icon name="chat" autoScale={100} />
    <Text>Message</Text>
  </ButtonPill>,
  <ButtonPill key={1} color="join" size={28}>
    <Text>Join</Text>
  </ButtonPill>,
];

const circleButtons = [
  <ButtonCircle key={0} outline ghost={true} color="join" size={28}>
    <Icon name="chat" autoScale={100} />
  </ButtonCircle>,
  <ButtonCircle key={1} outline ghost={true} color="join" size={28}>
    <Icon name="info-circle" autoScale={100} />
  </ButtonCircle>,
  <ButtonCircle key={2} outline ghost={true} color="join" size={28}>
    <Icon name="invited-user" autoScale={100} />
  </ButtonCircle>,
];

const spaceLink = <ButtonHyperlink>Example Link</ButtonHyperlink>;

const avatar = <Avatar>BR</Avatar>;

const continueConversation = <ButtonPill size={20}>Continue the conversation</ButtonPill>;

Example.argTypes = { ...argTypes };

// TODO: Provide default arguments for this story here. These populate into the argument table for this component.
Example.args = {
  meetingTitle: 'Test Meeting',
  spaceLink: spaceLink,
  actionButtons: pillButtons,
  tags: tags,
  avatar: avatar,
  scheduleInfoFirst: 'In progress',
  scheduleInfoFirstColor: 'success',
  scheduleInfoSecond: '0:23',
  scheduleInfoSecondColor: 'success',
  statusColor: CARD_CONSTANTS.COLORS.SUCCESS,
  onPress: () => {
    alert('hello');
  },
};

// TODO: Inject additional stories here.

// NOTE: Common variants story. This renders multiple variants of a single component.
const Common = MultiTemplate<MeetingContainerProps>(MeetingContainer).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

// TODO: Provide default arguments for this story here. These populate into the argument table for this component for all variants.
Common.args = {};

Common.parameters = {
  variants: [
    {
      meetingTitle: 'Test Meeting 1',
      spaceLink: spaceLink,
      actionButtons: pillButtons,
      tags: null,
      avatar: avatar,
      scheduleInfoFirst: 'In progress',
      scheduleInfoFirstColor: 'success',
      scheduleInfoSecond: '0:23',
      scheduleInfoSecondColor: 'success',
      disabled: false,
    },
    {
      meetingTitle: 'Test Meeting 2',
      spaceLink: spaceLink,
      actionButtons: pillButtons,
      tags: null,
      avatar: avatar,
      scheduleInfoFirst: '10:00am - 11:00am',
      scheduleInfoFirstColor: null,
      scheduleInfoSecond: 'Mon, Jan 1, 2023',
      scheduleInfoSecondColor: undefined,
      disabled: false,
    },
    {
      meetingTitle: 'Test Meeting 3',
      spaceLink: undefined,
      actionButtons: pillButtons,
      tags: tags,
      avatar: avatar,
      scheduleInfoFirst: '10:00am - 11:00am',
      scheduleInfoFirstColor: 'success',
      scheduleInfoSecond: '0:23',
      scheduleInfoSecondColor: 'success',
      disabled: false,
    },
    {
      meetingTitle: 'Test Meeting 4',
      spaceLink: continueConversation,
      actionButtons: pillButtons,
      tags: tags,
      avatar: avatar,
      scheduleInfoFirst: '10:00am - 11:00am',
      scheduleInfoFirstColor: undefined,
      scheduleInfoSecond: 'In 5 minutes',
      scheduleInfoSecondColor: 'success',
      disabled: false,
    },

    {
      meetingTitle: 'Test Meeting 5',
      spaceLink: continueConversation,
      actionButtons: undefined,
      tags: undefined,
      avatar: undefined,
      scheduleInfoFirst: '10:00am - 11:00am',
      scheduleInfoFirstColor: undefined,
      scheduleInfoSecond: 'In 5 minutes',
      scheduleInfoSecondColor: 'success',
      disabled: false,
      isStatic: true,
      color: CARD_CONSTANTS.COLORS.TRANSPARENT,
    },
  ],
};

// NOTE: Export stories here. The first export should be `Example`, and the last export should be `Common`.
export { Example, Common };
