import React, { useRef, useState } from 'react';

import { Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import VirtualizedList from './VirtualizedList';
import { VirtualizedListProps } from '.';
import List from '../List';
import ListItemBase from '../ListItemBase';
import argTypes from './VirtualizedList.stories.args';
import Documentation from './VirtualizedList.stories.docs.mdx';

export default {
  title: 'Momentum UI/VirtualizedList',
  component: VirtualizedList,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
      source: { type: 'code' },
    },
  },
};

type VirtualizedListPropsWithStoryBook = VirtualizedListProps & { scrollToIndex: number };

const TEST_LIST_SIZE = 500;

const Example = Template<VirtualizedListPropsWithStoryBook>(
  ({ scrollToIndex, count, onScroll }) => {
    const [listData, setListData] = useState({
      virtualItems: [],
      measureElement: null,
      listStyle: {},
    });

    const { virtualItems, measureElement, listStyle } = listData;

    const virtualizedListRef = useRef(null);

    const handleScrollToIndex = (index) => {
      if (virtualizedListRef.current) {
        // Scroll to the last item in the list
        virtualizedListRef.current.virtualizer.scrollToIndex(index, { align: 'start' });
      }
    };

    return (
      <div
        style={{
          height: '100%',
        }}
      >
        <button onClick={() => handleScrollToIndex(scrollToIndex)}>
          scroll to index {scrollToIndex}
        </button>
        <div
          style={{
            height: '100%',
            contain: 'strict',
          }}
        >
          <VirtualizedList
            setListData={setListData}
            count={count}
            estimateSize={() => 20}
            onScroll={onScroll}
            ref={virtualizedListRef}
          >
            <List
              listSize={TEST_LIST_SIZE}
              shouldFocusOnPress
              shouldItemFocusBeInset
              style={listStyle}
            >
              {virtualItems.map((virtualRow) => {
                return (
                  <ListItemBase
                    itemIndex={virtualRow.index}
                    ref={measureElement}
                    key={virtualRow.key as string}
                    data-index={virtualRow.index}
                  >
                    {`List Item: ${virtualRow.index}`}
                  </ListItemBase>
                );
              })}
            </List>
          </VirtualizedList>
        </div>
      </div>
    );
  }
).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  count: TEST_LIST_SIZE,
  scrollToIndex: 100,
};

export { Example };
