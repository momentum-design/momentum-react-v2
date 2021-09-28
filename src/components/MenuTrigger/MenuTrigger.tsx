import React, { FC, ReactElement, useRef, Children } from 'react';
import classnames from 'classnames';

import { STYLE } from './MenuTrigger.constants';
import { Props } from './MenuTrigger.types';
import './MenuTrigger.style.scss';
import { useMenuTriggerState } from '@react-stately/menu';
import { useMenuTrigger } from '@react-aria/menu';
import { MenuContext } from '../Menu';
import { useOverlay, useOverlayPosition } from '@react-aria/overlays';
import MenuListBackground from '../MenuListBackground';
import { useSeparator } from '@react-aria/separator';

/**
 * The MenuTrigger component.
 */
const MenuTrigger: FC<Props> = (props: Props) => {
  const { className, id, style, closeOnSelect, children } = props;

  const state = useMenuTriggerState(props);

  const [menuTrigger, ...menus] = Children.toArray(children);

  const buttonRef = useRef();
  const menuRef = useRef<HTMLUListElement>();
  const overlayRef = useRef<HTMLUListElement>();

  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, buttonRef);

  const menuListBackgroundRef = useRef<HTMLUListElement>();

  const { overlayProps: overlayPosition } = useOverlayPosition({
    targetRef: buttonRef,
    overlayRef: menuListBackgroundRef,
    scrollRef: menuRef,
    placement: 'bottom',
    shouldFlip: true,
    isOpen: state.isOpen,
    onClose: state.close,
  });

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
    autoFocus: false,
  };

  const { separatorProps } = useSeparator({
    elementType: 'li',
  });

  return (
    <div className={classnames(className, STYLE.wrapper)} id={id} style={style}>
      {React.cloneElement(menuTrigger as ReactElement, { ...menuTriggerProps, ref: buttonRef })}
      {state.isOpen && (
        <MenuListBackground
          {...menuProps}
          {...overlayProps}
          style={{ ...overlayPosition.style }}
          className={classnames(className, STYLE.wrapper)}
          color={'primary'}
        >
          <MenuContext.Provider value={menuContext}>
            {menus.map((menu: ReactElement) => (
              <>
                {React.cloneElement(menu, menuProps)}{' '}
                <li {...separatorProps} className={STYLE.separator} />
              </>
            ))}
          </MenuContext.Provider>
        </MenuListBackground>
      )}
    </div>
  );
};

export default MenuTrigger;
