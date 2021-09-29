import React, { FC, ReactElement, useRef, Children, Fragment } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './MenuTrigger.constants';
import { Props } from './MenuTrigger.types';
import './MenuTrigger.style.scss';
import { useMenuTriggerState } from '@react-stately/menu';
import { useMenuTrigger } from '@react-aria/menu';
import Menu, { MenuContext } from '../Menu';
import { useOverlay } from '@react-aria/overlays';
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

  const buttonRef = useRef<HTMLButtonElement>();
  const menuRef = useRef<HTMLUListElement>();
  const overlayRef = useRef<HTMLUListElement>();

  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, buttonRef);

  const { overlayProps } = useOverlay(
    {
      onClose: () => state.close(),
      shouldCloseOnBlur: true,
      isOpen: state.isOpen,
      isDismissable: true,
    },
    overlayRef
  );

  const menuContext = {
    ...menuProps,
    onClose: state.close,
    closeOnSelect,
    ref: menuRef,
  };

  const { separatorProps } = useSeparator({
    elementType: 'li',
  });

  return (
    <div className={classnames(className, STYLE.wrapper)} id={id} style={style}>
      {React.cloneElement(menuTrigger as ReactElement, { ...menuTriggerProps, ref: buttonRef })}
      {state.isOpen && (
        <FocusScope restoreFocus>
          <MenuListBackground
            {...overlayProps}
            className={STYLE.overlay}
            color={DEFAULTS.BACKGROUND}
          >
            <MenuContext.Provider value={menuContext}>
              {menus.map((menu: ReactElement, index) => (
                <Fragment key={`{fragment-${index}}`}>
                  {React.cloneElement(menu)}
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
          </MenuListBackground>
        </FocusScope>
      )}
    </div>
  );
};

/**
 * The MenuTrigger component.
 */

export default MenuTrigger;
