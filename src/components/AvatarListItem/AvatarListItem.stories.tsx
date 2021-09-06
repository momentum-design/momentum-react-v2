import { MultiTemplateWithPseudoStates, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import AvatarListItem, { AvatarListItemProps } from './';
import argTypes from './AvatarListItem.stories.args';
import Documentation from './AvatarListItem.stories.docs.mdx';
import { action } from '@storybook/addon-actions';
import { PresenceType } from '../Avatar/Avatar.types';
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
      isSchedulerAvailable: true,
      displayMoreAction: false,
      displayMuteAction: true,
    },
    {
      label: 'Two lines',
      firstLine: 'Example B',
      secondLine: 'Example second line',
      isSchedulerUnavailable: true,
      displayMoreAction: true,
      displayMuteAction: true,
      isMuted: false,
    },
    {
      label: 'Scheduler Unknown',
      firstLine: 'Example C',
      isSchedulerUnknown: true,
      displayMuteAction: true,
    },
    { label: 'Scheduler Quite Hours', firstLine: 'Example C', isSchedulerQHours: true },
    {
      label: 'With hover action',
      firstLine: 'Example C',
      isSchedulerQHours: true,
      onHoverActionCallback: action('onHoverActionCallback'),
    },
  ],
};

export { Example, Common };
