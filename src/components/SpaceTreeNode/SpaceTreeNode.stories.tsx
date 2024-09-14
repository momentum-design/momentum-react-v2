import React from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import SpaceTreeNode, { SpaceTreeNodeProps } from '.';
import argTypes from './SpaceTreeNode.stories.args';
import Documentation from './SpaceTreeNode.stories.docs.mdx';
import { PresenceType } from '../Avatar/Avatar.types';
import ButtonPill from '../ButtonPill';
import Flex from '../Flex';
import Text from '../Text';
import { TEAM_COLORS } from '../ThemeProvider/ThemeProvider.constants';
import Icon from '../Icon';
import Avatar from '../Avatar';
import { TeamColor } from '../ThemeProvider/ThemeProvider.types';
import { action } from '@storybook/addon-actions';
import Tree from '../Tree';
import { createTreeNode } from '../Tree/test.utils';

export default {
  title: 'Momentum UI/SpaceTreeNode',
  component: SpaceTreeNode,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const TreeWrapper = (Story) => (
  <Tree excludeTreeRoot={false} treeStructure={createTreeNode('root', true, [])}>
    <Story />
  </Tree>
);

const Example = Template<SpaceTreeNodeProps>(SpaceTreeNode).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  firstLine: 'Cisco Webex',
  secondLine: 'Webex Teams',
  onPress: action(`Space Tree Node Press`),
  nodeId: 'root',
};

Example.decorators = [TreeWrapper];

const Common = MultiTemplate<SpaceTreeNodeProps>(SpaceTreeNode).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.args = {
  firstLine: 'Cisco Webex',
  secondLine: 'Webex Teams',
  onPress: action(`Space Tree Node Press`),
  title: 'Tooltip that appears even on disabled',
  nodeId: 'root',
};

Common.decorators = [TreeWrapper];

Common.parameters = {
  variants: [
    {
      avatar: <Avatar title="C" presence={PresenceType.Away} size={32} />,
      isNewActivity: true,
      title: 'Tooltip that appears even on disabled',
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
      title: 'Tooltip that appears even on disabled',
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
      title: 'Tooltip that appears even on disabled',
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
      title: 'Tooltip that appears even on disabled',
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
      title: 'Tooltip that appears even on disabled',
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
      title: 'Tooltip that appears even on disabled',
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
      title: 'Tooltip that appears even on disabled',
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
      title: 'Tooltip that appears even on disabled',
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
      title: 'Tooltip that appears even on disabled',
    },
  ],
};

export { Example, Common };
