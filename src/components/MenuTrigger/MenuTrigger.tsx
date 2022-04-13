import React, { FC, ReactElement, useRef, Children, useState, useEffect, useCallback } from 'react';
import classnames from 'classnames';

import { STYLE, DEFAULTS } from './MenuTrigger.constants';
import { Props } from './MenuTrigger.types';
import './MenuTrigger.style.scss';
import { useMenuTriggerState } from '@react-stately/menu';
import { useMenuTrigger } from '@react-aria/menu';
import { MenuContext } from '../Menu';
import { DismissButton } from '@react-aria/overlays';
import { FocusScope } from '@react-aria/focus';
import { useKeyboard } from '@react-aria/interactions';
import ContentSeparator from '../ContentSeparator';
import Popover from '../Popover';
import type { PopoverInstance, VariantType } from '../Popover/Popover.types';
import type { FocusStrategy } from '@react-types/shared';
import type { PlacementType } from '../ModalArrow/ModalArrow.types';

const MenuTrigger: FC<Props> = (props: Props) => {
  const {
    className,
    id,
    style,
    closeOnSelect,
    children,
    isOpen,
    delay,
    variant = DEFAULTS.VARIANT,
    color = DEFAULTS.COLOR,
    showArrow = DEFAULTS.SHOW_ARROW,
    placement = DEFAULTS.PLACEMENT,
    triggerComponent,
  } = props;

  const state = useMenuTriggerState(props);
  const [popoverInstance, setPopoverInstance] = useState<PopoverInstance>();

  const buttonRef = useRef<HTMLButtonElement>();
  const menuRef = useRef<HTMLUListElement>();

  const [...menus] = Children.toArray(children);

  const { menuTriggerProps, menuProps } = useMenuTrigger({ type: 'menu' }, state, buttonRef);

  /**
   * For some reason restoreFocus prop on <FocusScope> doesn't
   * work. We focus back to trigger manually.
   */
  const handleFocusBackOnTrigger = useCallback(() => {
    buttonRef.current?.focus();
  }, []);

  const menuContext = {
    ...menuProps,
    onClose: state.close,
    closeOnSelect,
    ref: menuRef,
  };

  /**
   * Handle closeOnSelect from @react-aria manually
   */
  useEffect(() => {
    if (!state.isOpen && popoverInstance?.state.isVisible) {
      popoverInstance.hide();
      handleFocusBackOnTrigger();
    }
  }, [state.isOpen, popoverInstance]);

  /**
   * Handle isOpen from @react-aria manually
   */
  useEffect(() => {
    if (popoverInstance) {
      if (isOpen) {
        popoverInstance.show();
      } else {
        popoverInstance.hide();
        state.close();
      }
    }
  }, [isOpen, popoverInstance]);

  /**
   * Add manual keyboard accessibility because our Popover component
   * doesn't work well with @react-aria
   */
  const { keyboardProps } = useKeyboard({
    onKeyDown: (event) => {
      if (event.key === 'Escape') {
        state.close();
      }
      // When there are more than one menus inside the menu trigger, we should not close the overlay
      // according to W-ARIA
      if (state.isOpen && event.key === 'Tab' && menus.length === 1) {
        state.close();
      }
    },
  });

  // delete color prop which is passed down and used in the ModalContainer
  // because it conflicts with the HTML color property
  delete keyboardProps.color;
  // delete the onKeyDown provided by Aria because Popover component will add
  // appropriate keyboard accessibility instead.
  delete menuTriggerProps.onKeyDown;

  return (
    <Popover
      triggerComponent={React.cloneElement(triggerComponent, {
        ...menuTriggerProps,
        ref: buttonRef,
      })}
      className={classnames(className, STYLE.wrapper)}
      trigger="click"
      id={id}
      style={style}
      placement={placement as PlacementType}
      interactive={true}
      showArrow={showArrow}
      variant={variant as VariantType}
      delay={delay}
      color={color}
      onClickOutside={state.close}
      setInstance={setPopoverInstance}
      {...(keyboardProps as Omit<React.HTMLAttributes<HTMLElement>, 'color'>)}
    >
      <FocusScope restoreFocus contain>
        <DismissButton onDismiss={state.close} />
        {menus.map((menu: ReactElement, index) => {
          return (
            <MenuContext.Provider
              value={
                // when we have multiple menus inside the menu trigger, we want only the first menu
                // to autoFocus on open. If we add autoFocus for all Menus, the last menu in the menu
                // trigger will have the first focus, which is wrong
                index === 0 ? { ...menuContext, autoFocus: 'first' as FocusStrategy } : menuContext
              }
              key={`{context-${index}}`}
            >
              {menu}
              {index !== menus.length - 1 && <ContentSeparator key={`separator-${index}`} />}
            </MenuContext.Provider>
          );
        })}
        <DismissButton onDismiss={state.close} />
      </FocusScope>
    </Popover>
  );
};

export default MenuTrigger;
