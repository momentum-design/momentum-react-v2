import React, { ForwardedRef, forwardRef, useCallback, useEffect } from 'react';
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
import { applyRef } from '../../utils';
import { addTippyPlugins } from './Popover.utils';
// eslint-disable-next-line import/no-unresolved
import { v4 as uuidV4 } from 'uuid';

/**
 * The Popover component allows adding a Popover to whatever provided
 * `triggerComponent`. It will show the Popover after a specific event, which is
 * defined by the provided `trigger` prop.
 *
 * Popover uses @tippyjs/react under the hood - possible attributes for future modification
 * can be found here: https://atomiks.github.io/tippyjs/v6/all-props/
 */
const Popover = forwardRef((props: Props, ref: ForwardedRef<HTMLElement>) => {
  const {
    children,
    trigger = DEFAULTS.TRIGGER,
    triggerComponent,
    variant = DEFAULTS.VARIANT,
    placement = DEFAULTS.PLACEMENT,
    interactive = DEFAULTS.INTERACTIVE,
    showArrow = DEFAULTS.SHOW_ARROW,
    offsetDistance = DEFAULTS.OFFSET_DISTANCE,
    offsetSkidding = DEFAULTS.OFFSET_SKIDDING,
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
    firstFocusElement,
    ...rest
  } = props;

  const localRef = React.useRef(null);

  // use a callback so that the ref can be duplicated on a local version of it (to be used in this component)
  // as well as the forwarded version (to allow for nesting)
  const tippyRef = useCallback(
    (node: HTMLElement) => {
      applyRef(localRef, node);
      applyRef(ref, node);
    },
    [localRef, ref]
  );

  // memoize arrow id to avoid memory leak (arrow will be different, but JS still tries to find old ones):
  const arrowId = React.useMemo(() => `${ARROW_ID}${uuidV4()}`, []);

  const handleOnCloseButtonClick = useCallback(() => {
    localRef?.current?._tippy?.hide();
  }, [localRef]);

  const handleOnPopoverHide = useCallback(() => {
    if (focusBackOnTrigger) {
      localRef?.current?._tippy?.reference?.focus();
    }
  }, [triggerComponent, localRef, focusBackOnTrigger]);

  React.useEffect(() => {
    if (localRef?.current?._tippy) {
      // will set the instance of the Popover to the _tippy object of the Popover,
      // which will allow showing & hiding from a parent component
      setInstance?.(localRef.current._tippy);
    }
  }, [localRef, setInstance]);

  useEffect(() => {
    firstFocusElement?.focus();
  }, [firstFocusElement]);

  return (
    <LazyTippy
      ref={tippyRef}
      /* needed to prevent the popover from closing when the focus is changed via click events */
      hideOnClick={!trigger.includes('manual')}
      render={(attrs) => (
        <ModalContainer
          id={id}
          showArrow={showArrow}
          arrowId={arrowId}
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
              element: `#${arrowId}`, // use unique arrow Id for each popover instance with an arrow
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
      offset={[offsetSkidding, showArrow ? ARROW_HEIGHT + offsetDistance : offsetDistance]}
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
});

Popover.displayName = 'Popover';

export default Popover;
