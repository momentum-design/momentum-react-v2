import React, { FC, ReactElement, useRef, Children, Fragment } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './MenuTrigger.constants';
import { Props } from './MenuTrigger.types';
import './MenuTrigger.style.scss';
import { useMenuTriggerState } from '@react-stately/menu';
import { useMenuTrigger } from '@react-aria/menu';
import Menu, { MenuContext } from '../Menu';
import { DismissButton, useOverlay } from '@react-aria/overlays';
import MenuListBackground from '../MenuListBackground';
import { useSeparator } from '@react-aria/separator';
import { verifyTypes } from '../../helpers/verifyTypes';
import { FocusScope } from '@react-aria/focus';

const MenuTrigger: FC<Props> = (props: Props) => {
  const { className, id, style, closeOnSelect, children } = props;

  const state = useMenuTriggerState(props);

  const [menuTrigger, ...menus] = Children.toArray(children);

  if (!verifyTypes(menus, Menu)) {
    console.warn(
      'MenuTrigger: All children (with the exception of 1st child) must be a Menu component.'
    );
  }

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>();
  const overlayRef = useRef<HTMLUListElement>();

  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, buttonRef);

  const { overlayProps } = useOverlay(
    {
      onClose: () => state.close(),
      shouldCloseOnBlur: true,
      isOpen: state.isOpen,
      isDismissable: state.isOpen,
      isKeyboardDismissDisabled: false,
    },
    overlayRef
  );

  const menuContext = {
    ...menuProps,
    onClose: state.close,
    closeOnSelect,
    ref: menuRef,
    autoFocus: state.focusStrategy,
  };

  const { separatorProps } = useSeparator({
    elementType: 'li',
  });

  // BUG:
  // There is a current bug where if there are more than one menus inside the menu
  // trigger, the focus goes on the first element of the last menu component
  // instead of focusing the very first.

  return (
    <div className={classnames(className, STYLE.wrapper)} id={id} style={style}>
      {React.cloneElement(menuTrigger as ReactElement, {
        ...menuTriggerProps,
        ref: buttonRef,
      })}
      {state.isOpen && (
        <MenuListBackground className={STYLE.overlay} {...overlayProps} color={DEFAULTS.BACKGROUND}>
          <FocusScope restoreFocus>
            <DismissButton onDismiss={state.close} />
            <MenuContext.Provider value={menuContext}>
              {menus.map((menu: ReactElement, index) => (
                <Fragment key={`{fragment-${index}}`}>
                  {menu}
                  {index !== menus.length - 1 && (
                    <li
                      {...separatorProps}
                      className={STYLE.separator}
                      key={`separator-${index}`}
                    />
                  )}
                </Fragment>
              ))}
            </MenuContext.Provider>
            <DismissButton onDismiss={state.close} />
          </FocusScope>
        </MenuListBackground>
      )}
    </div>
  );
};

/**
 * The MenuTrigger component.
 */

export default MenuTrigger;
