import React, { RefObject, forwardRef, useCallback, useEffect, useRef } from 'react';

import { Props } from './VirtualizedList.types';
import { VirtualizedList as MdcVirtualizedList } from '@momentum-design/components/dist/react';
import { VirtualizedList as VirtualizedListRef } from '@momentum-design/components';

const VirtualizedList = forwardRef((props: Props, ref: RefObject<VirtualizedListRef>) => {
  const { className, style, id, onScroll, setListData, children, ...virtualizerProps } = props;

  const _ref = useRef(null);
  const virtualizedListRef = ref ?? _ref;

  useEffect(() => {
    if (virtualizedListRef?.current) {
      virtualizedListRef.current.virtualizerprops = virtualizerProps;
      virtualizedListRef.current.onscroll = onScroll;
    }
  }, [onScroll, ref, virtualizedListRef, virtualizerProps]);

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
      ref={virtualizedListRef}
      setlistdata={handleListDataChange}
    >
      {children}
    </MdcVirtualizedList>
  );
});

VirtualizedList.displayName = 'VirtualizedList';

export default VirtualizedList;
