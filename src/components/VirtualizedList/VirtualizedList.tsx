import React, { RefObject, forwardRef, useCallback, useEffect } from 'react';

import { Props } from './VirtualizedList.types';
import { VirtualizedList as MdcVirtualizedList } from '@momentum-design/components/dist/react';
import { VirtualizedList as VirtualizedListRef } from '@momentum-design/components';

const VirtualizedList = forwardRef((props: Props, ref: RefObject<VirtualizedListRef>) => {
  const { className, style, id, onScroll, setListData, children, ...virtualizerProps } = props;

  useEffect(() => {
    if (ref.current) {
      ref.current.virtualizerprops = virtualizerProps;
      ref.current.onscroll = onScroll;
    }
  }, [onScroll, ref, virtualizerProps]);

  const handleListDataChange = useCallback(
    ({ virtualItems, measureElement, listStyle }) => {
      setListData((prevListData) =>
        prevListData.virtualItems !== virtualItems
          ? { virtualItems, measureElement, listStyle }
          : prevListData
      );
    },
    [setListData]
  );

  return (
    <MdcVirtualizedList
      style={style}
      id={id}
      className={className}
      ref={ref}
      setlistdata={handleListDataChange}
    >
      {children}
    </MdcVirtualizedList>
  );
});

VirtualizedList.displayName = 'VirtualizedList';

export default VirtualizedList;
