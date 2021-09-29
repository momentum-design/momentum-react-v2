/* eslint-disable @typescript-eslint/ban-types */

import React, { forwardRef, ReactElement, RefObject, useContext, useRef } from 'react';
import classnames from 'classnames';

import { STYLE } from './Menu.constants';
import { MenuContextValue, Props } from './Menu.types';
import './Menu.style.scss';
import { useMenu } from '@react-aria/menu';
import { useTreeState } from '@react-stately/tree';
import MenuItem from '../MenuItem';
import { mergeProps } from '@react-aria/utils';
import MenuSection from '../MenuSection';

export const MenuContext = React.createContext<MenuContextValue>({});

export function useMenuContext(): MenuContextValue {
  return useContext(MenuContext);
}

const Menu = <T extends object>(props: Props<T>, providedRef: RefObject<HTMLUListElement>) => {
  const { className, id, style } = props;
  const contextProps = useContext(MenuContext);

  const _props = {
    ...mergeProps(contextProps, props),
  };

  const state = useTreeState({ ..._props });

  const internalRef = useRef();
  const ref = providedRef || internalRef;

  const { menuProps } = useMenu(_props, state, ref);

  return (
    <ul
      className={classnames(className, STYLE.wrapper)}
      id={id}
      style={style}
      ref={ref}
      {...menuProps}
    >
      {[...state.collection].map((item) => {
        if (item.type === 'section') {
          return (
            <MenuSection key={item.key} item={item} state={state} onAction={_props.onAction} />
          );
        }

        let menuItem = (
          <MenuItem key={item.key} item={item} state={state} onAction={_props.onAction} />
        );

        if (item.wrapper) {
          menuItem = item.wrapper(menuItem);
        }

        return menuItem;
      })}
    </ul>
  );
};

/**
 * Menu Element which displays a list of options/actions.
 */

const _Menu = forwardRef(Menu);
_Menu.displayName = '_Menu';

export default _Menu as <T>(
  props: Props<T> & { ref?: RefObject<HTMLUListElement> }
) => ReactElement;
