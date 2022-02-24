import React, { FC, ReactElement, useRef, Children, Fragment, useState, useEffect } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './MenuTrigger.constants';
import { Props } from './MenuTrigger.types';
import './MenuTrigger.style.scss';
import { useMenuTriggerState } from '@react-stately/menu';
import { useMenuTrigger } from '@react-aria/menu';
import Menu, { MenuContext } from '../Menu';
import { DismissButton } from '@react-aria/overlays';
import { verifyTypes } from '../../helpers/verifyTypes';
import { FocusScope } from '@react-aria/focus';
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

  const [...menus] = Children.toArray(children);

  if (!verifyTypes(menus, Menu)) {
    console.warn(
      'MenuTrigger: All children (with the exception of 1st child) must be a Menu component.'
    );
  }

  const buttonRef = useRef<HTMLButtonElement>();
  const menuRef = useRef<HTMLUListElement>();

  const { menuTriggerProps, menuProps } = useMenuTrigger({ type: 'menu' }, state, buttonRef);

  const menuContext = {
    ...menuProps,
    onClose: state.close,
    closeOnSelect,
    ref: menuRef,
    autoFocus: state.focusStrategy,
  };

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
