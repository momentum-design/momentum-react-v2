import React, { FC } from 'react';
import './Popover.style.scss';
import { LazyTippy } from './LazyTippy';
import { ModalContainer } from '..';
import type { Props } from './Popover.types';
import { ARROW_ID } from '../ModalContainer/ModalContainer.constants';

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
    delay,
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
        <ModalContainer
          id={id}
          showArrow={showArrow}
          placement={attrs['data-placement']}
          style={style}
          color={color}
          className={className}
          {...containerProps}
        >
          {children}
        </ModalContainer>
      )}
      placement={placement}
      trigger={trigger}
      interactive={interactive}
      appendTo="parent"
      popperOptions={{
        modifiers: [
          {
            name: 'arrow',
            enabled: showArrow,
            options: {
              element: `#${ARROW_ID}`, // use arrow div id from Modal container
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
      delay={delay}
      // default offset of 5px + 11px (size of arrow standing out of popover)
      offset={[0, showArrow ? 16 : 5]}
    >
      {triggerComponent}
    </LazyTippy>
  );
};

export default Popover;
