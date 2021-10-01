import React, { FC, ReactElement, useRef, Children, Fragment } from 'react';
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
import ModalContainer from '../ModalContainer';
import ContentSeparator from '../ContentSeparator';
import { useKeyboard } from '@react-aria/interactions';

const MenuTrigger: FC<Props> = (props: Props) => {
  const {
    className,
    id,
    style,
    closeOnSelect,
    children,
    overlayRadius = DEFAULTS.OVERLAY_RADIUS,
  } = props;

  const state = useMenuTriggerState(props);

  const [menuTrigger, ...menus] = Children.toArray(children);

  if (!verifyTypes(menus, Menu)) {
    console.warn(
      'MenuTrigger: All children (with the exception of 1st child) must be a Menu component.'
    );
  }

  const buttonRef = useRef<HTMLButtonElement>();
  const menuRef = useRef<HTMLUListElement>();
  const overlayRef = useRef<HTMLDivElement>();

  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, buttonRef);

  const { overlayProps } = useOverlay(
    {
      onClose: () => state.close(),
      shouldCloseOnBlur: false,
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

  // This should work out of the box, but for some reason it doesn't
  // Added a temporary fix until I get the time to look deeper
  const { keyboardProps } = useKeyboard({
    onKeyDown: (event) => {
      if (event.key === 'Escape') {
        state.close();
      }
      if (state.isOpen && event.key === 'Tab') {
        state.close();
      }
    },
  });

  // BUG:
  // There is a current bug where if there are more than one menus inside the menu
  // trigger, the focus goes on the first element of the last menu component
  // instead of focusing the very first.

  return (
    <div {...keyboardProps} className={classnames(className, STYLE.wrapper)} id={id} style={style}>
      {React.cloneElement(menuTrigger as ReactElement, {
        ...menuTriggerProps,
        ref: buttonRef,
      })}
      {state.isOpen && (
        <FocusScope restoreFocus contain>
          <ModalContainer
            isPadded
            radius={overlayRadius}
            className={STYLE.overlay}
            {...overlayProps}
            color={DEFAULTS.BACKGROUND}
            elevation={4}
            ref={overlayRef}
          >
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
          </ModalContainer>
        </FocusScope>
      )}
    </div>
  );
};

/**
 * The MenuTrigger component.
 */

export default MenuTrigger;
