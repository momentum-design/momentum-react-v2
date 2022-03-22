import Tippy, { TippyProps } from '@tippyjs/react';
import React, { FC } from 'react';

export type LazyTippyProps = TippyProps;

/**
 * The LazyTippy component is used to "lazify" the Popover.
 * By default the `tippy.js` library mounts the content of the Popover in the DOM (hidden through styling), before it is shown
 * (which means that it could, if its used a lot, polute the DOM tree). Therefore the Popover has to be
 * lazified so that it will only be mounted to the DOM, whenever it is triggered to do so.
 */
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
