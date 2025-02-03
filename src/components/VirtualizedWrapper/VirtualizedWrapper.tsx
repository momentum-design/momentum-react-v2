import React, { RefObject, forwardRef, useImperativeHandle, useRef } from 'react';
import classnames from 'classnames';

import { Props, WrapperRefObject } from './VirtualizedWrapper.types';
import { STYLE } from './VirtualizedWrapper.constants';
import { useVirtualizer } from '@tanstack/react-virtual';
import './VirtualizedWrapper.style.scss';

const VirtualizedWrapper = forwardRef((props: Props, ref: RefObject<WrapperRefObject>) => {
  const { className, onScroll, renderList, ...virtualizerProps } = props;

  const scrollRef = useRef<HTMLDivElement>();

  const virtualizer = useVirtualizer({
    ...virtualizerProps,
    getScrollElement: () => scrollRef?.current,
  });

  // Expose imperative methods
  useImperativeHandle(ref, () => ({
    scrollRef: scrollRef?.current,
    virtualizer,
  }));

  const {getVirtualItems, measureElement} = virtualizer;
  const virtualItems = getVirtualItems();

  return (
    <div
      ref={scrollRef}
      onScroll={(e) => onScroll && onScroll(e.currentTarget)}
      className={classnames(className, STYLE.container)}
    >
      <div
        className={STYLE.listWrapper}
        style={{
          height: virtualizer.getTotalSize(),
        }}
      >
        {renderList(virtualItems, measureElement, {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          transform: `translateY(${virtualItems?.[0]?.start ?? 0}px)`,
        })}
      </div>
    </div>
  );
});

VirtualizedWrapper.displayName = 'VirtualizedWrapper';

export default VirtualizedWrapper;
