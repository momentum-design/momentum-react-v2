import React from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import SpaceRowContent, { SpaceRowContentProps } from '.';
import argTypes from './SpaceRowContent.stories.args';
import Documentation from './SpaceRowContent.stories.docs.mdx';
import { PresenceType } from '../Avatar/Avatar.types';
import ButtonPill from '../ButtonPill';
import Flex from '../Flex';
import Text from '../Text';
import { TEAM_COLORS } from '../ThemeProvider/ThemeProvider.constants';
import Icon from '../Icon';
import Avatar from '../Avatar';
import { TeamColor } from '../ThemeProvider/ThemeProvider.types';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Momentum UI/SpaceRowContent',
  component: SpaceRowContent,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation),
    },
  },
};

const Example = Template<SpaceRowContentProps>(SpaceRowContent).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  firstLine: 'Cisco Webex',
  secondLine: 'Webex Teams',
  onPress: action(`Space Row Content Press`),
};

const Common = MultiTemplate<SpaceRowContentProps>(SpaceRowContent).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.args = {
  firstLine: 'Cisco Webex',
  secondLine: 'Webex Teams',
};

Common.parameters = {
  variants: [
    {
      avatar: <Avatar title="C" presence={PresenceType.Away} size={32} />,
      isNewActivity: true,
    },
    {
      avatar: (
        <Avatar
          title="C"
          presence={PresenceType.Meet}
          size={32}
          color={TEAM_COLORS.gold as TeamColor}
        />
      ),
      isNewActivity: true,
      isUnread: true,
      teamColor: TEAM_COLORS.gold,
    },
    {
      avatar: (
        <Avatar
          title="C"
          presence={PresenceType.Meet}
          size={32}
          color={TEAM_COLORS.gold as TeamColor}
        />
      ),
      isMention: true,
      teamColor: TEAM_COLORS.gold,
    },

    {
      avatar: (
        <Avatar
          title="C"
          presence={PresenceType.DND}
          size={32}
          color={TEAM_COLORS.pink as TeamColor}
        />
      ),
      isEnterRoom: true,
      teamColor: TEAM_COLORS.pink,
    },

    {
      avatar: (
        <Avatar
          title="C"
          presence={PresenceType.Default}
          size={32}
          color={TEAM_COLORS.purple as TeamColor}
        />
      ),
      isAlertMuted: true,
      teamColor: TEAM_COLORS.purple,
    },

    {
      avatar: (
        <Avatar
          title="C"
          presence={PresenceType.Schedule}
          size={32}
          color={TEAM_COLORS.slate as TeamColor}
        />
      ),
      isError: true,
      teamColor: TEAM_COLORS.slate,
    },

    {
      avatar: (
        <Avatar
          title="C"
          presence={PresenceType.Schedule}
          size={32}
          color={TEAM_COLORS.slate as TeamColor}
        />
      ),
      isError: true,
      teamColor: TEAM_COLORS.slate,
      secondLine: ['Test', 'Another Test'],
    },
    {
      avatar: (
        <Avatar
          title="C"
          presence={PresenceType.Schedule}
          size={32}
          color={TEAM_COLORS.slate as TeamColor}
        />
      ),
      isAlert: true,
      teamColor: TEAM_COLORS.slate,
      secondLine: ['Test', 'Another Test', 'Last Test'],
    },
    {
      avatar: (
        <Avatar
          title="C"
          presence={PresenceType.Active}
          size={32}
          color={TEAM_COLORS.mint as TeamColor}
        />
      ),
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
