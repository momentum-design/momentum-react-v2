import React from 'react';

import StyleDocs from 'storybook/docs.stories.style.mdx';
import { DocumentationPage } from 'storybook/helper.stories.docs';
import { MultiTemplate, Template } from 'storybook/helper.stories.templates';

import Avatar from 'components/Avatar';
import ButtonHyperlink from 'components/ButtonHyperlink';
import ButtonPill from 'components/ButtonPill';
import { CARD_CONSTANTS } from 'components/Card';
import Icon from 'components/Icon';
import Tag from 'components/Tag';
import Text from 'components/Text';

import argTypes from './MeetingContainer.stories.args';
import Documentation from './MeetingContainer.stories.docs.mdx';

import MeetingContainer, { MeetingContainerProps } from './';

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

const spaceLink = <ButtonHyperlink>Example Link</ButtonHyperlink>;

const avatar = <Avatar>BR</Avatar>;

const continueConversation = <ButtonPill size={20}>Continue the conversation</ButtonPill>;

Example.argTypes = { ...argTypes };

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

const Common = MultiTemplate<MeetingContainerProps>(MeetingContainer).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.args = {};

Common.parameters = {
  variants: [
    {
      meetingTitle: 'Test Meeting 1',
      spaceLink: spaceLink,
      actionButtons: pillButtons,
      avatar: avatar,
      scheduleInfoFirst: 'In progress',
      scheduleInfoFirstColor: 'success',
      scheduleInfoSecond: '0:23',
      scheduleInfoSecondColor: 'success',
    },
    {
      meetingTitle: 'Test Meeting 2',
      spaceLink: spaceLink,
      actionButtons: pillButtons,
      avatar: avatar,
      scheduleInfoFirst: '10:00am - 11:00am',
      scheduleInfoSecond: 'Mon, Jan 1, 2023',
    },
    {
      meetingTitle: 'Test Meeting 3',
      actionButtons: pillButtons,
      tags: tags,
      avatar: avatar,
      scheduleInfoFirst: '10:00am - 11:00am',
      scheduleInfoFirstColor: 'success',
      scheduleInfoSecond: '0:23',
      scheduleInfoSecondColor: 'success',
    },
    {
      meetingTitle: 'Test Meeting 4',
      spaceLink: continueConversation,
      actionButtons: pillButtons,
      tags: tags,
      avatar: avatar,
      scheduleInfoFirst: '10:00am - 11:00am',
      scheduleInfoSecond: 'In 5 minutes',
      scheduleInfoSecondColor: 'success',
    },

    {
      meetingTitle: 'Test Meeting 5',
      spaceLink: continueConversation,
      scheduleInfoFirst: '10:00am - 11:00am',
      scheduleInfoSecond: 'In 5 minutes',
      scheduleInfoSecondColor: 'success',
      isStatic: true,
      color: CARD_CONSTANTS.COLORS.TRANSPARENT,
    },
    {
      meetingTitle: 'This is a very very annoyingly long title which does not make sense.',
      spaceLink: continueConversation,
      scheduleInfoFirst: '10:00am - 11:00am or maybe later idk',
      scheduleInfoSecond: 'In 5 minutes I will come back and check that this is still truncated.',
      scheduleInfoSecondColor: 'success',
    },
  ],
};

export { Example, Common };
