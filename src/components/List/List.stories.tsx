/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import List, { ListProps } from './';
import argTypes from './List.stories.args';
import Documentation from './List.stories.docs.mdx';
import { Item } from '@react-stately/collections';
import ListItemBase from '../ListItemBase';
import SpaceListItem from '../SpaceListItem';
import { PresenceType } from '../Avatar/Avatar.types';
import { TEAM_COLORS } from '../ThemeProvider/ThemeProvider.constants';
import { TeamColor } from '../ThemeProvider/ThemeProvider.types';
import Avatar from '../Avatar';
import Flex from '../Flex';
import Icon from '../Icon';
import ButtonPill from '../ButtonPill';
import Text from '../Text';

export default {
  title: 'Momentum UI/List',
  component: List,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<ListProps<any>>(List).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  selectionMode: 'single',
  disabledKeys: ['1'],
  defaultSelectedKeys: ['2'],
  children: [
    <Item key="1">
      <ListItemBase isPadded>Red</ListItemBase>
    </Item>,
    <Item key="2">
      <ListItemBase isPadded>Green</ListItemBase>
    </Item>,
    <Item key="3">
      <ListItemBase isPadded>Blue</ListItemBase>
    </Item>,
    <Item key="4">
      <ListItemBase isPadded>Yellow</ListItemBase>
    </Item>,
  ],
};

const Common = MultiTemplate<ListProps<any>>(List).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.args = {
  children: 'Example',
  shouldFocusWrap: false,
};

Common.parameters = {
  variants: [
    {
      children: Array.from(Array(100).keys()).map((i) => (
        <Item key={i}>
          <SpaceListItem
            firstLine={`Daniel Webex - ${i}`}
            teamColor="gold"
            avatar={
              <Avatar
                title="D"
                presence={PresenceType.Meet}
                size={32}
                color={TEAM_COLORS.gold as TeamColor}
              />
            }
            action={
              <Flex alignItems="center" xgap="0.5rem">
                <Flex alignItems="center" xgap="0.125rem">
                  <Text type="body-secondary">23</Text>
                  <Icon name="participant-list" weight="bold" strokeColor="none" scale={16} />
                </Flex>
                <ButtonPill color="join" size={28}>
                  00:00
                </ButtonPill>
                <ButtonPill color="join" size={28}>
                  Button 2
                </ButtonPill>
                <ButtonPill color="join" size={28}>
                  Button 2
                </ButtonPill>
              </Flex>
            }
          />
        </Item>
      )),
    },
  ],
};

export { Example, Common };
