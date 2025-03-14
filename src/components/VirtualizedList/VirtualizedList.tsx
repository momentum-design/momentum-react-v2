/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { RefObject, forwardRef, useRef } from 'react';

import { Props } from './VirtualizedList.types';
import { VirtualizedList as MdcVirtualizedList } from '@momentum-design/components/dist/react';
import { VirtualizedList as VirtualizedListRef } from '@momentum-design/components';

const VirtualizedList = forwardRef((props: Props, ref: RefObject<VirtualizedListRef>) => {
  const { className, style, id, onScroll, setListData, children, ...virtualizerProps } = props;

  const _ref = useRef(null);
  const virtualizedListRef = ref ?? _ref;

  return (
    <MdcVirtualizedList
      style={style}
      id={id}
      className={className}
      ref={virtualizedListRef}
      // @ts-ignore
      onscroll={onScroll}
      virtualizerProps={virtualizerProps}
      setlistdata={setListData}
    >
      {children}
    </MdcVirtualizedList>
  );
});

VirtualizedList.displayName = 'VirtualizedList';

export default VirtualizedList;
