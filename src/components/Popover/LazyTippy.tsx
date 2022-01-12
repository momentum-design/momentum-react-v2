import React, { FC } from 'react';

import Tippy, { TippyProps } from '@tippyjs/react';

export type LazyTippyProps = TippyProps;

export const LazyTippy: FC<LazyTippyProps> = React.forwardRef((props: LazyTippyProps, ref) => {
  const [mounted, setMounted] = React.useState(false);

  const lazyPlugin = {
    fn: () => ({
      onMount: () => setMounted(true),
      onHidden: () => setMounted(false),
    }),
  };

  const computedProps = { ...props };

  computedProps.plugins = [lazyPlugin, ...(props.plugins || [])];

  if (props.render) {
    computedProps.render = (...args) => (mounted ? props.render(...args) : '');
  } else {
    computedProps.content = mounted ? props.content : '';
  }

  return <Tippy ref={ref} {...computedProps} />;
});

LazyTippy.displayName = 'LazyTippy';
