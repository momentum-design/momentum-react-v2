import { MultiTemplateWithPseudoStates, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import AvatarListItem, { AvatarListItemProps } from './';
import argTypes from './AvatarListItem.stories.args';
import Documentation from './AvatarListItem.stories.docs.mdx';
import { action } from '@storybook/addon-actions';
import { PresenceType } from '../Avatar/Avatar.types';
import { SCHEDULER_STATES } from './AvatarListItem.constants';
import { AvatarListItemActions } from './AvatarListItem.types';
export default {
  title: 'Momentum UI/AvatarListItem',
  component: AvatarListItem,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<AvatarListItemProps>(AvatarListItem).bind({});

Example.args = {
  firstLine: 'This is a first line',
  secondLine: 'This is a second line',
  avatarProps: {
    title: 'Cisco',
    presence: PresenceType.Active,
  },
};

Example.argTypes = { ...argTypes };

const Common = MultiTemplateWithPseudoStates<AvatarListItemProps>(AvatarListItem).bind({});

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
      displayActions: [AvatarListItemActions.mute, AvatarListItemActions.more],
      onPressMuteAction: action('onPressMuteAction'),
    },
    {
      label: 'Two lines',
      firstLine: 'Example B',
      secondLine: 'Example second line',
      schedulerState: SCHEDULER_STATES.unavailable,
      displayActions: [AvatarListItemActions.mute, AvatarListItemActions.more],
      onPressMuteAction: action('onPressMuteAction'),
      isMuted: false,
    },
    {
      label: 'Scheduler Unknown',
      firstLine: 'Example C',
      schedulerState: SCHEDULER_STATES.unknown,
      displayActions: [AvatarListItemActions.mute],
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
      displayActions: [AvatarListItemActions.closeOnHover],
    },
  ],
};

export { Example, Common };
