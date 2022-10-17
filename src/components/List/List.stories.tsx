/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import { v4 as uuid } from 'uuid';
import List, { ListProps } from './';
import argTypes from './List.stories.args';
import Documentation from './List.stories.docs.mdx';
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
import { action } from '@storybook/addon-actions';
import MeetingListItem from '../MeetingListItem';
import { MeetingMarker } from '../MeetingListItem/MeetingListItem.types';
import ButtonGroup from '../ButtonGroup';
import ButtonHyperlink from '../ButtonHyperlink';
import Badge from '../Badge';
import Menu from '../Menu';
import { Item } from '@react-stately/collections';
import { MenuTrigger } from '..';

const TEST_LIST_SIZE = 30;

export default {
  title: 'Momentum UI/List',
  component: List,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
      source: { type: 'code' },
    },
  },
};

const Example = Template<ListProps>(List).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  listSize: TEST_LIST_SIZE,
  children: Array.from(Array(TEST_LIST_SIZE).keys()).map((index) => (
    <ListItemBase itemIndex={index} key={index} isPadded>
      {`Item ${index}`}
    </ListItemBase>
  )),
};

const Common = MultiTemplate<ListProps>(List).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.args = {
  listSize: TEST_LIST_SIZE,
  shouldItemFocusBeInset: true,
  shouldFocusOnPress: true,
};

Common.parameters = {
  variants: [
    {
      children: (
        <div>
          {Array.from(Array(TEST_LIST_SIZE).keys()).map((index) => {
            return (
              <SpaceListItem
                contextMenuActions={[
                  { text: 'Action 1', action: action('Action') },
                  { text: 'Action 2', action: action('Action 2') },
                ]}
                key={index}
                itemIndex={index}
                firstLine={`Daniel Webex - ${index}`}
                teamColor="gold"
                onPress={action(`List Item Press ${index}`)}
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
                    <ButtonPill disabled color="join" size={28}>
                      Button 3
                    </ButtonPill>
                    <MenuTrigger
                      triggerComponent={
                        <ButtonPill size={28}>
                          <div>Menu</div> <Icon name="arrow-down" weight="bold" autoScale={100} />
                        </ButtonPill>
                      }
                    >
                      <Menu selectionMode="single" key="2">
                        <Item key="one">One</Item>
                        <Item key="two">Two</Item>
                        <Item key="three">Three</Item>
                      </Menu>
                    </MenuTrigger>
                  </Flex>
                }
              />
            );
          })}
        </div>
      ),
    },
  ],
};

const CalendarList = MultiTemplate<ListProps>(List).bind({});

CalendarList.argTypes = { ...argTypes };
delete CalendarList.argTypes.children;

CalendarList.args = {
  listSize: TEST_LIST_SIZE,
  shouldItemFocusBeInset: false,
  shouldFocusOnPress: true,
};

CalendarList.parameters = {
  variants: [
    {
      children: (
        <div>
          {Array.from(Array(TEST_LIST_SIZE).keys()).map((index) => {
            return (
              <>
                {(index % 3 === 0 || index % 7 == 0) && (
                  <ListItemBase isPadded interactive={false}>
                    <Text type="header-primary">This is a header</Text>
                  </ListItemBase>
                )}
                <MeetingListItem
                  key={index}
                  itemIndex={index}
                  image={<Avatar initials="TU" />}
                  color={MeetingMarker.AcceptedActive}
                  buttonGroup={
                    <ButtonGroup spaced>
                      <ButtonHyperlink>Link</ButtonHyperlink>
                    </ButtonGroup>
                  }
                >
                  <Text type="header-primary">This is a meeting</Text>
                  <Text type="body-secondary">10:00 - 11:00</Text>
                </MeetingListItem>
              </>
            );
          })}
        </div>
      ),
    },
  ],
};

/**
 * Example illustrating List works well with lists
 * that change dynamically and preserves keyboard navigation
 */
const DynamicListWrapper = () => {
  const data = [
    { key: uuid(), data: 0 },
    { key: uuid(), data: 1 },
    { key: uuid(), data: 2 },
  ];
  const INTERVAL_COUNT = 5;
  const [list, setList] = useState(data);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((oldTime) => (oldTime + 1) % INTERVAL_COUNT);
    }, 1000);

    const interval = setInterval(() => {
      setList((oldList) => {
        const newList = [...oldList];
        const poppedItem = newList.pop();
        newList.unshift(poppedItem);

        return newList;
      });
    }, INTERVAL_COUNT * 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <Text type="body-primary">
        List will update in:
        <Badge size={18} style={{ display: 'inline' }}>{`${INTERVAL_COUNT - time}`}</Badge>
      </Text>
      <List listSize={list.length}>
        {list.map((item, index) => (
          <ListItemBase itemIndex={index} key={item.key} isPadded>
            {`Item ${item.data}`}
          </ListItemBase>
        ))}
      </List>
    </>
  );
};

const DynamicList = Template<unknown>(DynamicListWrapper).bind({});

export { Example, Common, CalendarList, DynamicList };
