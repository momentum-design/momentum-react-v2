import React, { FC } from 'react';
import './Popover.style.scss';
import ModalContainer from '../ModalContainer';
import { LazyTippy } from './LazyTippy';
import { ARROW_ID, ELEVATIONS, ROUNDS } from '../ModalContainer/ModalContainer.constants';
import { ARROW_PADDING, DEFAULTS, OFFSET } from './Popover.constants';
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
    variant = DEFAULTS.VARIANT,
    placement = DEFAULTS.PLACEMENT,
    interactive = DEFAULTS.INTERACTIVE,
    showArrow = DEFAULTS.SHOW_ARROW,
    color,
    delay,
    setInstance,
    className,
    id,
    style,
    onClickOutside,
    boundary = DEFAULTS.BOUNDARY,
    ...rest
  } = props;

  const tippyRef = React.useRef(null);

  React.useEffect(() => {
    if (tippyRef?.current?._tippy) {
      // will set the instance of the Popover to the _tippy object of the Popover,
      // which will allow showing & hiding from a parent component
      setInstance?.(tippyRef.current._tippy);
    }
  }, [tippyRef, setInstance]);

  return (
    <LazyTippy
      ref={tippyRef}
      /* needed to prevent the popover from closing when the focus is changed via click events */
      hideOnClick={!trigger.includes('manual')}
      render={(attrs) => (
        <ModalContainer
          id={id}
          showArrow={showArrow}
          placement={attrs['data-placement']}
          isPadded
          round={variant === 'medium' ? ROUNDS[75] : ROUNDS[50]}
          elevation={ELEVATIONS[3]}
          style={style}
          color={color}
          className={className}
          {...rest}
        >
          {children}
        </ModalContainer>
      )}
      placement={placement as PlacementType}
      /* add focusin automatically if only mouseenter is passed in as a trigger - this is for accessibility reasons */
      trigger={trigger === 'mouseenter' ? 'mouseenter focusin' : trigger}
      interactive={interactive}
      appendTo="parent"
      onClickOutside={onClickOutside}
      popperOptions={{
        modifiers: [
          {
            name: 'arrow',
            enabled: showArrow,
            options: {
              element: `#${ARROW_ID}`, // use arrow div id from Modal container
              padding: ARROW_PADDING,
            },
          },
          {
            name: 'preventOverflow',
            options: {
              altAxis: true,
              boundariesElement: boundary,
            },
          },
        ],
      }}
      animation={false}
      delay={delay}
      // add arrow height to default offset if arrow is shown:
      offset={[0, showArrow ? ARROW_HEIGHT + OFFSET : OFFSET]}
    >
      {React.cloneElement(triggerComponent, { useNativeKeyDown: true })}
    </LazyTippy>
  );
};

export default Popover;
