/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { AriaToolbar, AriaToolbarItem, ListItemBaseSection, MenuTrigger, SearchInput } from '..';
import { omit } from 'lodash';
import { ListRefObject } from './List.types';

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

Common.argTypes = omit({ ...argTypes }, ['children']);

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

const HorizontalList = MultiTemplate<ListProps>(List).bind({});

HorizontalList.argTypes = omit({ ...argTypes }, ['children']);

HorizontalList.args = {
  listSize: TEST_LIST_SIZE,
  shouldItemFocusBeInset: true,
  shouldFocusOnPress: true,
  orientation: 'horizontal',

  style: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
};

HorizontalList.parameters = {
  variants: [
    {
      children: Array.from(Array(TEST_LIST_SIZE).keys()).map((index) => {
        return (
          <ListItemBase
            itemIndex={index}
            key={index}
            style={{ display: 'inline-block', width: '11rem', padding: '0.5rem', height: 'auto' }}
          >
            <ButtonPill style={{ width: '100%' }}>Item {index + 1}</ButtonPill>
          </ListItemBase>
        );
      }),
    },
  ],
};

const CalendarList = MultiTemplate<ListProps>(List).bind({});

CalendarList.argTypes = omit({ ...argTypes }, ['children']);

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
 * Example illustrating search + list.
 */
const ListSearchWrapper = () => {
  const defaultItems = [
    { key: '1', data: 'one' },
    { key: '2', data: 'two' },
    { key: '3', data: 'three' },
    { key: '4', data: 'four' },
    { key: '5', data: 'five' },
    { key: '6', data: 'six' },
  ];
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return defaultItems.filter((item) => item.data.indexOf(query) !== -1);
  }, [query, defaultItems]);

  return (
    <>
      <SearchInput value={query} onChange={setQuery} clearButtonAriaLabel="Clear" />
      <List shouldItemFocusBeInset listSize={filtered.length}>
        {filtered &&
          filtered.map((item, index) => (
            <ListItemBase itemIndex={index} key={item.key} isPadded>
              {`Item ${item.data}-${index}`}
            </ListItemBase>
          ))}
      </List>
    </>
  );
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
const Search = Template<unknown>(ListSearchWrapper).bind({});

const ProgramaticFocus = Template<ListProps>((args) => {
  const ref = useRef<ListRefObject>();
  const handleOnPress = (i) => {
    ref.current.focusOnIndex(i);
  };

  return (
    <>
      <Flex xgap="0.5rem">
        {Array.from(Array(10).keys()).map((index) => (
          <ButtonPill outline size={20} key={index} onPress={() => handleOnPress(index)}>
            Focus on {index}
          </ButtonPill>
        ))}
      </Flex>

      <List {...args} listSize={10} ref={ref} shouldFocusOnPress>
        {Array.from(Array(10).keys()).map((index) => (
          <ListItemBase itemIndex={index} key={index} isPadded>
            {`Item ${index}`}
          </ListItemBase>
        ))}
      </List>
    </>
  );
}).bind({});

const ListWithAriaToolbarWrapper = () => {
  return (
    <>
      <ButtonPill>Before</ButtonPill>
      <List listSize={2}>
        <ListItemBase size="auto" itemIndex={0} key={0}>
          <ListItemBaseSection position="fill">
            <Text>List Item 0</Text>
            <AriaToolbar ariaLabel="toolbar" ariaToolbarItemsSize={2}>
              <AriaToolbarItem itemIndex={0}>
                <ButtonPill>Toolbar Button 1</ButtonPill>
              </AriaToolbarItem>
              <AriaToolbarItem itemIndex={1}>
                <ButtonPill>Toolbar Button 2</ButtonPill>
              </AriaToolbarItem>
            </AriaToolbar>
          </ListItemBaseSection>
        </ListItemBase>
        <ListItemBase itemIndex={1} key={1}>
          <Text>List Item 1</Text>
        </ListItemBase>
      </List>
      <ButtonPill>After</ButtonPill>
    </>
  );
};
const ListWithAriaToolbar = Template<unknown>(ListWithAriaToolbarWrapper).bind({});

const ListWithButtonsWrapper = () => {
  return (
    <>
      <List shouldFocusOnPress listSize={3}>
        <ListItemBase itemIndex={0} key={0}>
          <ButtonPill>0</ButtonPill>
        </ListItemBase>
        <ListItemBase focusChild size="auto" itemIndex={1} key={1}>
          <ListItemBaseSection position="fill">
            <ButtonPill>1</ButtonPill>
            <ButtonPill>1a</ButtonPill>
            <ButtonPill>1b</ButtonPill>
          </ListItemBaseSection>
        </ListItemBase>
        <ListItemBase itemIndex={2} key={2}>
          <ButtonPill>2</ButtonPill>
        </ListItemBase>
      </List>
      <ButtonPill>after</ButtonPill>
    </>
  );
};
const ListWithButtons = Template<unknown>(ListWithButtonsWrapper).bind({});

const ListWithNonFocusableChildrenWrapper = () => {
  return (
    <>
      <List shouldFocusOnPress listSize={2}>
        <ListItemBase size="auto" itemIndex={0} key={0}>
          <ButtonPill data-preserve-tabindex tabIndex={-1}>
            Non-focusable button
          </ButtonPill>
        </ListItemBase>
        <ListItemBase itemIndex={1} key={1}>
          <ButtonPill>Focusable button</ButtonPill>
        </ListItemBase>
      </List>
    </>
  );
};
const ListWithNonFocusableChildren = Template<unknown>(ListWithNonFocusableChildrenWrapper).bind(
  {}
);

const ListWithInitialFocusWrapper = () => {
  const [listOne, setListOne] = useState(true);

  const onPressCallback = useCallback(() => {
    setListOne((s) => !s);
  }, []);

  const toggleButton = <ButtonPill onPress={onPressCallback}>Toggle</ButtonPill>;

  let contents;

  if (listOne) {
    contents = [0, 1].map((index) => (
      <ListItemBase key={`list_1${index}`} id="list_1" itemIndex={index}>
        <ButtonPill>1</ButtonPill>
      </ListItemBase>
    ));
  } else {
    contents = [0, 1, 2, 3, 4].map((index) => (
      <ListItemBase key={`list_2${index}`} id="list_2" itemIndex={index}>
        <ButtonPill>2</ButtonPill>
      </ListItemBase>
    ));
  }

  return (
    <>
      {toggleButton}
      <List
        id={'mylist 2'}
        shouldFocusOnPress
        initialFocus={listOne ? 1 : 4}
        listSize={listOne ? 2 : 5}
      >
        {contents}
      </List>
    </>
  );
};
const ListWithInitialFocus = Template<unknown>(ListWithInitialFocusWrapper).bind({});

const ListWithFocusHandlingWrapper = () => {
  const logMessage = useCallback((message) => {
    // eslint-disable-next-line no-console
    console.log(message);
  }, []);

  return (
    <>
      <List listSize={3}>
        <ListItemBase
          onFocusWithin={() => {
            logMessage('on focus within');
          }}
          onFocus={() => {
            logMessage('on focus');
          }}
          onBlur={() => logMessage('on blur')}
          onBlurWithin={() => {
            logMessage('on blur within');
          }}
          itemIndex={0}
        >
          <ButtonPill>0</ButtonPill>
        </ListItemBase>
        <ListItemBase
          size="auto"
          onFocusWithin={() => {
            logMessage('on focus within');
          }}
          onFocus={() => {
            logMessage('on focus');
          }}
          onBlur={() => logMessage('on blur')}
          onBlurWithin={() => {
            logMessage('on blur within');
          }}
          itemIndex={1}
        >
          <ListItemBaseSection position="fill">
            <ButtonPill>1</ButtonPill>
            <ButtonPill>1a</ButtonPill>
          </ListItemBaseSection>
        </ListItemBase>
        <ListItemBase itemIndex={2}>
          <ButtonPill>2</ButtonPill>
        </ListItemBase>
      </List>
      <ButtonPill>after</ButtonPill>
    </>
  );
};

const ListWithFocusHandling = Template<unknown>(ListWithFocusHandlingWrapper).bind({});

const DynamicListWithInitialFocusWrapper = () => {
  const [numItems, setNumItems] = useState(3);

  useEffect(() => {
    const handle = setInterval(() => {
      setNumItems((oldNumItems) => Math.max((oldNumItems + 1) % 10, 3));
    }, 5000);

    return () => clearInterval(handle);
  });

  return (
    <List initialFocus={numItems - 1} listSize={numItems}>
      {Array.from(Array(numItems).keys()).map((index) => (
        <ListItemBase itemIndex={index} key={index}>
          {`Item ${index}`}
        </ListItemBase>
      ))}
    </List>
  );
};

const DynamicListWithInitialFocus = Template<unknown>(DynamicListWithInitialFocusWrapper).bind({});

const DynamicListWithInitialFocusWrapper2 = () => {
  const [showBefore, setShowBefore] = useState(false);

  useEffect(() => {
    const handle = setInterval(() => {
      setShowBefore((oldShowBefore) => !oldShowBefore);
    }, 3000);

    return () => clearInterval(handle);
  });

  let offset = 0;
  if (showBefore) {
    offset = 1;
  }

  return (
    <List listSize={showBefore ? 6 : 5}>
      {showBefore && (
        <ListItemBase itemIndex={0} key={3}>
          Item 2
        </ListItemBase>
      )}
      <ListItemBase id="test" itemIndex={0 + offset} key={5}>
        Item 3
      </ListItemBase>
      <ListItemBase itemIndex={1 + offset} key={6}>
        Item 4
      </ListItemBase>
      <ListItemBase itemIndex={2 + offset} key={7}>
        Item 5
      </ListItemBase>
      <ListItemBase itemIndex={3 + offset} key={8}>
        Item 6
      </ListItemBase>
      <ListItemBase itemIndex={4 + offset} key={9}>
        Item 7
      </ListItemBase>
    </List>
  );
};

const DynamicListWithInitialFocus2 = Template<unknown>(DynamicListWithInitialFocusWrapper2).bind(
  {}
);

const DynamicListWithInitialFocusWrapper3 = () => {
  const [showBefore, setShowBefore] = useState(false);

  useEffect(() => {
    const handle = setInterval(() => {
      setShowBefore((oldShowBefore) => !oldShowBefore);
    }, 3000);

    return () => clearInterval(handle);
  });

  let offset = 0;
  if (showBefore) {
    offset = 1;
  }

  return (
    <List listSize={showBefore ? 7 : 5}>
      {showBefore && (
        <ListItemBase itemIndex={0} key={0}>
          Item 0
        </ListItemBase>
      )}
      <ListItemBase id="test" itemIndex={offset + 0} key={1}>
        Item 1
      </ListItemBase>
      <ListItemBase itemIndex={offset + 1} key={2}>
        Item 2
      </ListItemBase>
      <ListItemBase itemIndex={offset + 2} key={3}>
        Item 3
      </ListItemBase>
      <ListItemBase itemIndex={offset + 3} key={4}>
        Item 4
      </ListItemBase>
      <ListItemBase itemIndex={offset + 4} key={5}>
        Item 5
      </ListItemBase>
      {showBefore && (
        <ListItemBase itemIndex={offset + 5} key={6}>
          Item 6
        </ListItemBase>
      )}
    </List>
  );
};

const DynamicListWithInitialFocus3 = Template<unknown>(DynamicListWithInitialFocusWrapper3).bind(
  {}
);

const SingleItemListWrapper = () => {
  return (
    <List listSize={1}>
      <ListItemBase itemIndex={0} key={0}>
        Item 0
      </ListItemBase>
    </List>
  );
};

const SingleItemList = Template<unknown>(SingleItemListWrapper).bind({});

const ListWithTextSelectWrapper = () => {
  return (
    <List shouldFocusOnPress listSize={3}>
      <ListItemBase allowTextSelection itemIndex={0} key={0}>
        Item 0
      </ListItemBase>
      <ListItemBase allowTextSelection itemIndex={1} key={1}>
        Item 1
      </ListItemBase>
      <ListItemBase allowTextSelection itemIndex={2} key={2}>
        Item 2
      </ListItemBase>
    </List>
  );
};

const ListWithTextSelect = Template<unknown>(ListWithTextSelectWrapper).bind({});

export {
  Example,
  Common,
  HorizontalList,
  CalendarList,
  DynamicList,
  Search,
  ProgramaticFocus,
  ListWithAriaToolbar,
  ListWithButtons,
  ListWithNonFocusableChildren,
  ListWithInitialFocus,
  ListWithFocusHandling,
  DynamicListWithInitialFocus,
  DynamicListWithInitialFocus2,
  DynamicListWithInitialFocus3,
  SingleItemList,
  ListWithTextSelect,
};
