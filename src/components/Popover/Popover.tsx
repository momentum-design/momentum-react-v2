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
import { addTippyPlugins } from './Popover.utils';
// eslint-disable-next-line import/no-unresolved
import { v4 as uuidV4 } from 'uuid';
import { PopoverInstance } from '.';

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
    focusBackOnTrigger: focusBackOnTriggerFromProps,
    closeButtonPlacement = DEFAULTS.CLOSE_BUTTON_PLACEMENT,
    closeButtonProps,
    strategy = DEFAULTS.STRATEGY,
    role = DEFAULTS.ROLE,
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
    autoFocus = DEFAULTS.AUTO_FOCUS,
    appendTo = DEFAULTS.APPEND_TO,
    ...rest
  } = props;

  const focusBackOnTrigger =
    focusBackOnTriggerFromProps ??
    (interactive
      ? DEFAULTS.FOCUS_BACK_ON_TRIGGER_COMPONENT_INTERACTIVE
      : DEFAULTS.FOCUS_BACK_ON_TRIGGER_COMPONENT_NON_INTERACTIVE);

  const popoverInstance = React.useRef<PopoverInstance>(undefined);

  const triggerComponentId = triggerComponent.props?.id || uuidV4();

  const modalConditionalProps = {
    ...(interactive && {
      'aria-labelledby': triggerComponentId,
      focusLockProps: { restoreFocus: focusBackOnTrigger, autoFocus },
    }),
  };

  // memoize arrow id to avoid memory leak (arrow will be different, but JS still tries to find old ones):
  const arrowId = React.useMemo(() => `${ARROW_ID}${uuidV4()}`, []);

  const popoverSetInstance = useCallback(
    (instance?: PopoverInstance) => {
      popoverInstance.current = instance;
      setInstance?.(instance);
    },
    [setInstance]
  );

  const handleOnCloseButtonClick = useCallback(() => {
    popoverInstance.current?.hide();
  }, []);

  // needs special handling since FocusScope doesn't work with the Popover from Tippy
  // needs to focus back to the reference item when the popover is completely hidden
  const handleOnPopoverHidden = useCallback(() => {
    if (focusBackOnTrigger) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      popoverInstance.current?.reference?.focus();
    }
  }, [focusBackOnTrigger]);

  useEffect(() => {
    firstFocusElement?.focus();
  }, [firstFocusElement]);

  const triggerComponentCommonProps = {
    id: interactive ? triggerComponentId : triggerComponent.props?.id,
  };

  if (interactive) {
    triggerComponentCommonProps['aria-haspopup'] =
      triggerComponent?.props?.['aria-haspopup'] || 'dialog';
  }

  const mrv2Props = isMRv2Button(triggerComponent) ? { useNativeKeyDown: true } : {};

  const clonedTriggerComponent = React.cloneElement(triggerComponent, {
    ...triggerComponentCommonProps,
    ...mrv2Props,
  });

  return (
    <LazyTippy
      ref={ref}
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
          role={role}
          ariaModal={interactive}
          {...modalConditionalProps}
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
      appendTo={appendTo}
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
        onHide,
        onMount,
        onShow,
        onShown,
        onTrigger,
        onUntrigger,
        onClickOutside,
      }}
      onHidden={(instance) => {
        handleOnPopoverHidden();
        onHidden?.(instance);
      }}
      setInstance={popoverSetInstance}
    >
      {clonedTriggerComponent}
    </LazyTippy>
  );
});

Popover.displayName = 'Popover';

export default Popover;
