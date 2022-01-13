import React, { FC } from 'react';
import './Popover.style.scss';
import { LazyTippy } from './LazyTippy';
import { ModalContainer } from '..';
import { ARROW_ID } from '../ModalContainer/ModalContainer.constants';
import { DEFAULTS, OFFSET } from './Popover.constants';
import { ARROW_HEIGHT } from '../ModalArrow/ModalArrow.constants';
import type { Props } from './Popover.types';
import type { PlacementType } from '../ModalArrow/ModalArrow.types';

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
    trigger = DEFAULTS.TRIGGER,
    triggerComponent,
    containerProps,
    placement = DEFAULTS.PLACEMENT,
    interactive,
    showArrow = DEFAULTS.SHOW_ARROW,
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
          isPadded={containerProps?.isPadded || DEFAULTS.IS_PADDED}
          round={containerProps?.round || DEFAULTS.ROUND}
          elevation={containerProps?.elevation || DEFAULTS.ELEVATION}
          style={style}
          color={color}
          className={className}
        >
          {children}
        </ModalContainer>
      )}
      placement={placement as PlacementType}
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
      // add arrow height to default offset if arrow is shown:
      offset={[0, showArrow ? ARROW_HEIGHT + OFFSET : OFFSET]}
    >
      {triggerComponent}
    </LazyTippy>
  );
};

export default Popover;
