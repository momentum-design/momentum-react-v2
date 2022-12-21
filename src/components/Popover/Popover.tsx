import React, { FC, useCallback } from 'react';
import './Popover.style.scss';
import ModalContainer from '../ModalContainer';
import ButtonCircle from '../ButtonCircle';
import Icon from '../Icon';
import { LazyTippy } from './LazyTippy';
import { ARROW_ID, ELEVATIONS, ROUNDS } from '../ModalContainer/ModalContainer.constants';
import { ARROW_PADDING, DEFAULTS, STYLE } from './Popover.constants';
import { ARROW_HEIGHT } from '../ModalArrow/ModalArrow.constants';
import type { Props } from './Popover.types';
import type { PlacementType } from '../ModalArrow/ModalArrow.types';
import classNames from 'classnames';
import { isMRv2Button } from '../../helpers/verifyTypes';
import { addTippyPlugins } from './Popover.utils';

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
    offset = [DEFAULTS.OFFEST_DISTANCE, DEFAULTS.OFFEST_SKIDDING],
    color,
    delay,
    setInstance,
    className,
    id,
    style,
    boundary = DEFAULTS.BOUNDARY,
    hideOnEsc = DEFAULTS.HIDE_ON_ESC,
    addBackdrop = DEFAULTS.ADD_BACKDROP,
    focusBackOnTrigger = DEFAULTS.FOCUS_BACK_ON_TRIGGER_COMPONENT,
    closeButtonPlacement = DEFAULTS.CLOSE_BUTTON_PLACEMENT,
    closeButtonProps,
    strategy = DEFAULTS.STRATEGY,
    onAfterUpdate,
    onBeforeUpdate,
    onCreate,
    onDestroy,
    onHidden,
    onHide,
    onMount,
    onShow,
    onShown,
    onTrigger,
    onUntrigger,
    onClickOutside,
    ...rest
  } = props;

  const tippyRef = React.useRef(null);

  const handleOnCloseButtonClick = useCallback(() => {
    tippyRef?.current?._tippy?.hide();
  }, [tippyRef]);

  const handleOnPopoverHide = useCallback(() => {
    if (focusBackOnTrigger) {
      tippyRef?.current?._tippy?.reference?.focus();
    }
  }, [triggerComponent, tippyRef, focusBackOnTrigger]);

  React.useEffect(() => {
    if (tippyRef?.current?._tippy) {
      // will set the instance of the Popover to the _tippy object of the Popover,
      // which will allow showing & hiding from a parent component
      setInstance?.(tippyRef.current._tippy);
    }
  }, [tippyRef, setInstance]);

  const distance = offset[0] ? offset[0] : DEFAULTS.OFFEST_DISTANCE;

  let skidding: number | undefined;

  if (offset[1]) {
    skidding = showArrow ? ARROW_HEIGHT + offset[1] : offset[1];
  } else {
    skidding = showArrow ? ARROW_HEIGHT + DEFAULTS.OFFEST_SKIDDING : DEFAULTS.OFFEST_SKIDDING;
  }

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
          {closeButtonPlacement !== 'none' && (
            <ButtonCircle
              {...closeButtonProps}
              className={classNames(STYLE.closeButton, closeButtonProps?.className)}
              data-placement={closeButtonPlacement}
              ghost
              size={20}
              onPress={handleOnCloseButtonClick}
            >
              <Icon name="cancel" weight="bold" scale={16} />
            </ButtonCircle>
          )}
          {children}
        </ModalContainer>
      )}
      placement={placement as PlacementType}
      /* add focusin automatically if only mouseenter is passed in as a trigger - this is for accessibility reasons */
      trigger={trigger === 'mouseenter' ? 'mouseenter focusin' : trigger}
      interactive={interactive}
      appendTo="parent"
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
              padding: 8,
              altAxis: true,
              boundariesElement: boundary,
            },
          },
        ],
        strategy,
      }}
      animation={false}
      delay={delay}
      plugins={addTippyPlugins(hideOnEsc, addBackdrop)}
      // add arrow height to default offset if arrow is shown:
      offset={[distance, skidding]}
      {...{
        onAfterUpdate,
        onBeforeUpdate,
        onCreate,
        onDestroy,
        onHidden,
        onMount,
        onShow,
        onShown,
        onTrigger,
        onUntrigger,
        onClickOutside,
      }}
      onHide={(instance) => {
        handleOnPopoverHide();
        if (onHide) {
          onHide(instance);
        }
      }}
    >
      {isMRv2Button(triggerComponent)
        ? React.cloneElement(triggerComponent, {
            useNativeKeyDown: true,
          })
        : triggerComponent}
    </LazyTippy>
  );
};

export default Popover;
