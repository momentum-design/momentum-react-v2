import React, { RefObject, forwardRef, useImperativeHandle, useRef } from 'react';
import classnames from 'classnames';

import { Props, WrapperRefObject } from './VirtualizedWrapper.types';
import { STYLE } from './VirtualizedWrapper.constants';
import { useVirtualizer } from '@tanstack/react-virtual';
import './VirtualizedWrapper.style.scss';

const VirtualizedWrapper = forwardRef((props: Props, ref: RefObject<WrapperRefObject>) => {
  const { className, virtualizerProps, children, onScroll } = props;

  const wrapperRef = useRef<HTMLDivElement>();

  const virtualizer = useVirtualizer({
    ...virtualizerProps,
    getScrollElement: () => wrapperRef?.current,
  });

  const virtualItems = virtualizer.getVirtualItems();

  // Expose imperative methods
  useImperativeHandle(ref, () => ({
    wrapperRef,
    virtualItems,
    virtualizer,
  }));

  return (
    <div
      ref={wrapperRef}
      onScroll={(e) => onScroll && onScroll(e.currentTarget)}
      className={classnames(className, STYLE.container)}
    >
      <div
        className={STYLE.listWrapper}
        style={{
          height: virtualizer.getTotalSize(),
        }}
      >
        {children}
      </div>
    </div>
  );
});

VirtualizedWrapper.displayName = 'VirtualizedWrapper';

export default VirtualizedWrapper;
