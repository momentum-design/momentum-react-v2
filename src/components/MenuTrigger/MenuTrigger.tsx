import React, { FC, ReactElement, useRef, Children, Fragment, useState, useEffect } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './MenuTrigger.constants';
import { Props } from './MenuTrigger.types';
import './MenuTrigger.style.scss';
import { useMenuTriggerState } from '@react-stately/menu';
import { useMenuTrigger } from '@react-aria/menu';
import Menu, { MenuContext } from '../Menu';
import { DismissButton, useOverlay } from '@react-aria/overlays';
import { verifyTypes } from '../../helpers/verifyTypes';
import { FocusScope } from '@react-aria/focus';
import { useKeyboard } from '@react-aria/interactions';
import { FocusStrategy } from '@react-types/shared';
import ContentSeparator from '../ContentSeparator';
import Popover from '../Popover';
import { PopoverInstance } from '../Popover/Popover.types';

const MenuTrigger: FC<Props> = (props: Props) => {
  const {
    className,
    id,
    style,
    closeOnSelect,
    children,
    overlayRadius = DEFAULTS.OVERLAY_RADIUS,
    triggerComponent,
  } = props;

  const state = useMenuTriggerState(props);
  const [popoverInstance, setPopoverInstance] = useState<PopoverInstance>();

  const buttonRef = useRef<HTMLButtonElement>();
  const menuRef = useRef<HTMLUListElement>();

  const [...menus] = Children.toArray(children);

  const { menuTriggerProps, menuProps } = useMenuTrigger({ type: 'menu' }, state, buttonRef);

  if (!verifyTypes(menus, Menu)) {
    console.warn(
      'MenuTrigger: All children (with the exception of 1st child) must be a Menu component.'
    );
  }

  const menuContext = {
    ...menuProps,
    onClose: state.close,
    closeOnSelect,
    ref: menuRef,
    autoFocus: 'first' as FocusStrategy,
  };

  useEffect(() => {
    if (!state.isOpen && popoverInstance?.state.isVisible) {
      popoverInstance.hide();
    }
  }, [state.isOpen, popoverInstance]);

  const { keyboardProps } = useKeyboard({
    onKeyDown: (event) => {
      if (event.key === 'Escape') {
        state.close();
      }
      if (state.isOpen && event.key === 'Tab' && menus.length === 1) {
        state.close();
      }
    },
  });

  delete keyboardProps.color;

  return (
    <Popover
      triggerComponent={React.cloneElement(triggerComponent, { ...menuTriggerProps })}
      className={classnames(className, STYLE.wrapper)}
      id={id}
      style={style}
      placement="bottom-start"
      interactive={true}
      trigger="click"
      showArrow={false}
      variant="medium"
      setInstance={setPopoverInstance}
      {...(keyboardProps as Omit<React.HTMLAttributes<HTMLElement>, 'color'>)}
    >
      <FocusScope restoreFocus contain>
        <DismissButton onDismiss={state.close} />
        <MenuContext.Provider value={menuContext}>
          {menus.map((menu: ReactElement, index) => (
            <Fragment key={`{fragment-${index}}`}>
              {menu}
              {index !== menus.length - 1 && <ContentSeparator key={`separator-${index}`} />}
            </Fragment>
          ))}
        </MenuContext.Provider>
        <DismissButton onDismiss={state.close} />
      </FocusScope>
    </Popover>
  );
};

/**
 * The MenuTrigger component.
 */

export default MenuTrigger;
