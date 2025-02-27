import React, { useRef, useState } from 'react';

import { Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import VirtualizedList from './VirtualizedList';
import { VirtualizedListProps } from '.';
import { VirtualizedList as MdcVirtualizedList } from '@momentum-design/components';
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

const TEST_LIST_SIZE = 500;

const Example = Template<VirtualizedListProps>(({ count, onScroll }) => {
  const [listData, setListData] = useState({
    virtualItems: [],
    measureElement: null,
    listStyle: {},
  });

  const virtualizedRef = useRef<MdcVirtualizedList>();

  const { virtualItems, measureElement, listStyle } = listData;

  return (
    <VirtualizedList
      ref={virtualizedRef}
      setListData={setListData}
      count={count}
      estimateSize={() => 20}
      onScroll={onScroll}
    >
      <List listSize={TEST_LIST_SIZE} shouldFocusOnPress shouldItemFocusBeInset style={listStyle}>
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
  );
}).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  count: TEST_LIST_SIZE,
};

export { Example };
