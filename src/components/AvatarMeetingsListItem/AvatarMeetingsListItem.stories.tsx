import { action } from '@storybook/addon-actions';

import StyleDocs from 'storybook/docs.stories.style.mdx';
import { DocumentationPage } from 'storybook/helper.stories.docs';
import { MultiTemplateWithPseudoStates, Template } from 'storybook/helper.stories.templates';

import { PresenceType } from 'components/Avatar/Avatar.types';

import { SCHEDULER_STATES } from './AvatarMeetingsListItem.constants';
import argTypes from './AvatarMeetingsListItem.stories.args';
import Documentation from './AvatarMeetingsListItem.stories.docs.mdx';
import { AvatarMeetingsListItemActions } from './AvatarMeetingsListItem.types';

import AvatarMeetingsListItem, { AvatarMeetingsListItemProps } from '.';
export default {
  title: 'Momentum UI/AvatarMeetingsListItem',
  component: AvatarMeetingsListItem,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<AvatarMeetingsListItemProps>(AvatarMeetingsListItem).bind({});

Example.args = {
  firstLine: 'This is a first line',
  secondLine: 'This is a second line',
  avatarProps: {
    title: 'Cisco',
    presence: PresenceType.Active,
  },
};

Example.argTypes = { ...argTypes };

const Common = MultiTemplateWithPseudoStates<AvatarMeetingsListItemProps>(
  AvatarMeetingsListItem
).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.args = {
  avatarProps: {
    title: 'Cisco',
    presence: PresenceType.Active,
  },
};

Common.parameters = {
  variants: [
    {
      label: 'Long text',
      firstLine: 'This is a very long first line',
      schedulerState: SCHEDULER_STATES.available,
      displayActions: [AvatarMeetingsListItemActions.mute, AvatarMeetingsListItemActions.more],
      onPressMuteAction: action('onPressMuteAction'),
    },
    {
      label: 'Two lines',
      firstLine: 'Example B',
      secondLine: 'Example second line',
      schedulerState: SCHEDULER_STATES.unavailable,
      displayActions: [AvatarMeetingsListItemActions.mute, AvatarMeetingsListItemActions.more],
      onPressMuteAction: action('onPressMuteAction'),
      isMuted: false,
    },
    {
      label: 'Scheduler Unknown',
      firstLine: 'Example C',
      schedulerState: SCHEDULER_STATES.unknown,
      displayActions: [AvatarMeetingsListItemActions.mute],
      onPressMuteAction: action('onPressMuteAction'),
    },
    {
      label: 'Scheduler Quite Hours',
      firstLine: 'Example C',
      schedulerState: SCHEDULER_STATES.quietHours,
    },
    {
      label: 'With hover action',
      firstLine: 'Example C',
      schedulerState: SCHEDULER_STATES.quietHours,
      onHoverActionCallback: action('onHoverActionCallback'),
      displayActions: [AvatarMeetingsListItemActions.closeOnHover],
    },
  ],
};

export { Example, Common };
