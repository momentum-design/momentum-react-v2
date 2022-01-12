import React, { FC } from 'react';
import ContentContainer from './ContentContainer';
import './Popover.style.scss';
import type { Props } from './Popover.types';
import { LazyTippy } from './LazyTippy';
import Tippy from '@tippyjs/react';

/**
 * The Popover component allows adding a Popover to whatever provided
 * `triggerComponent`. It will show the Popover after a specific event, which is
 * defined by the provided `trigger` prop.
 *
 * Popover uses @tippyjs/react under the hood - possible attributes for future modification
 * can be found here: https://atomiks.github.io/tippyjs/v6/all-props/
 */
const Popover: FC<Props> = (props: Props) => {
  const {
    children,
    trigger = 'click',
    triggerComponent,
    containerProps,
    placement = 'bottom',
    interactive,
    showArrow = true,
    color,
    setInstance,
    className,
    id,
    style,
  } = props;

  const tippyRef = React.useRef(null);

  React.useEffect(() => {
    if (tippyRef?.current?._tippy) {
      setInstance?.(tippyRef.current._tippy);
    }
  }, [tippyRef, setInstance]);

  return (
    <LazyTippy
      ref={tippyRef}
      render={(attrs) => (
        <ContentContainer
          attrs={attrs}
          id={id}
          style={style}
          containerProps={containerProps}
          color={color}
          showArrow={showArrow}
          className={className}
        >
          {children}
        </ContentContainer>
      )}
      placement={placement}
      trigger={trigger}
      interactive={interactive}
      appendTo="parent"
      popperOptions={{
        modifiers: [
          showArrow && {
            name: 'arrow',
            options: {
              element: '#arrow', // css selector to point to arrow div
              padding: 5,
            },
          },
          {
            name: 'preventOverflow',
            options: {
              altAxis: true,
            },
          },
        ],
      }}
      animation={false}
      // default offset of 5px + 11px (size of arrow standing out of popover)
      offset={[0, showArrow ? 16 : 5]}
    >
      {triggerComponent}
    </LazyTippy>
  );
};

export default Popover;
