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
  const [items, setItems] = useState(null);

  useEffect(() => {
    const items = virtualizedRef?.current?.virtualItems;
    if (items) {
      setItems(items);
    }
  }, [items]);

  return (
    <VirtualizedWrapper ref={virtualizedRef} count={TEST_LIST_SIZE} estimateSize={() => 20}>
      {items && (
        <List
          listSize={TEST_LIST_SIZE}
          noLoop
          shouldFocusOnPress
          shouldItemFocusBeInset
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${items[0]?.start ?? 0}px)`,
          }}
        >
          {items.map((virtualRow) => {
            return (
              <ListItemBase key={virtualRow.key as string} itemIndex={virtualRow.index}>
                <Text tagName="p">{`List Item: ${virtualRow.index}`}</Text>
              </ListItemBase>
            );
          })}
        </List>
      )}
    </VirtualizedWrapper>
  );
}).bind({});

export { Common };
