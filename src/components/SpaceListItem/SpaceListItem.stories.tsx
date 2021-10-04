import React from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import SpaceListItem, { SpaceListItemProps } from './';
import argTypes from './SpaceListItem.stories.args';
import Documentation from './SpaceListItem.stories.docs.mdx';
import { PresenceType } from '../Avatar/Avatar.types';
import ButtonPill from '../ButtonPill';
import Flex from '../Flex';
import Text from '../Text';
import { TEAM_COLORS } from '../ThemeProvider/ThemeProvider.constants';
import Icon from '../Icon';

export default {
  title: 'Momentum UI/SpaceListItem',
  component: SpaceListItem,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<SpaceListItemProps>(SpaceListItem).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  firstLine: 'Cisco Webex',
  secondLine: 'Webex Teams',
};

const Common = MultiTemplate<SpaceListItemProps>(SpaceListItem).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.args = {
  firstLine: 'Cisco Webex',
  secondLine: 'Webex Teams',
};

Common.parameters = {
  variants: [
    {
      avatarProps: {
        title: 'CW',
        presence: PresenceType.Away,
      },
      isNewActivity: true,
    },
    {
      avatarProps: {
        title: 'C',
        presence: PresenceType.Meet,
      },
      isMention: true,
      teamColor: TEAM_COLORS.gold,
    },

    {
      avatarProps: {
        title: 'C',
        presence: PresenceType.DND,
      },
      isEnterRoom: true,
      teamColor: TEAM_COLORS.pink,
    },

    {
      avatarProps: {
        title: 'C',
        presence: PresenceType.Default,
      },
      isAlertMuted: true,
      teamColor: TEAM_COLORS.purple,
    },

    {
      avatarProps: {
        title: 'C',
        presence: PresenceType.Schedule,
      },
      isError: true,
      teamColor: TEAM_COLORS.slate,
    },

    {
      avatarProps: {
        title: 'C',
        presence: PresenceType.Schedule,
      },
      isError: true,
      teamColor: TEAM_COLORS.slate,
      secondLine: ['Test', 'Another Test'],
    },
    {
      avatarProps: {
        title: 'C',
        presence: PresenceType.Active,
      },
      // eslint-disable-next-line react/display-name
      action: (
        <Flex alignItems="center" xgap="0.5rem">
          <Flex alignItems="center" xgap="0.125rem">
            <Text type="body-secondary">23</Text>
            <Icon name="participant-list" weight="bold" strokeColor="none" scale={16} />
          </Flex>
          <ButtonPill color="join" size={28}>
            00:00
          </ButtonPill>
        </Flex>
      ) as JSX.Element,
      teamColor: TEAM_COLORS.mint,
    },
  ],
};

export { Example, Common };
