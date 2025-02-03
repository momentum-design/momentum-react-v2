import React, { useEffect, useRef, useState } from 'react';

import { Template } from '../../storybook/helper.stories.templates';
import VirtualizedWrapper from './VirtualizedWrapper';
import { VirtualizedWrapperProps, VirtualizedWrapperRefObject } from '.';
import List from '../List';
import ListItemBase from '../ListItemBase';
import Text from '../Text';

export default {
  title: 'Momentum UI/VirtualizedWrapper',
  component: VirtualizedWrapper,
  parameters: {
    expanded: true,
    // docs: {
    //   page: DocumentationPage(Documentation, StyleDocs),
    //   source: { type: 'code' },
    // },
  },
};

const TEST_LIST_SIZE = 500;

const Common = Template<VirtualizedWrapperProps>(() => {
  const virtualizedRef = useRef<VirtualizedWrapperRefObject>();

  const renderList = (items, measureElement, style) => (
    <List
      listSize={TEST_LIST_SIZE}
      noLoop
      shouldFocusOnPress
      shouldItemFocusBeInset
      style={style}
    >
      {items.map((virtualRow) => {
        return (
          <ListItemBase ref={measureElement} key={virtualRow.key as string} itemIndex={virtualRow.index} data-index={virtualRow.index}>
            <Text tagName="p">{`List Item: ${virtualRow.index}`}</Text>
          </ListItemBase>
        );
      })}
    </List>
  );

  return (
    <VirtualizedWrapper ref={virtualizedRef} renderList={renderList} count={TEST_LIST_SIZE} estimateSize={() => 20}/>
  );
}).bind({});

export { Common };
