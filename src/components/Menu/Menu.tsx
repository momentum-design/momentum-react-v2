/* eslint-disable @typescript-eslint/ban-types */
import { Node } from '@react-types/shared';
import React, { forwardRef, ReactElement, RefObject, useContext, useRef, useCallback } from 'react';
import classnames from 'classnames';

import { STYLE, DEFAULTS, GROUP } from './Menu.constants';
import { MenuAppearanceContextValue, MenuContextValue, Props } from './Menu.types';
import './Menu.style.scss';
import { useMenu } from '@react-aria/menu';
import { useTreeState, TreeState } from '@react-stately/tree';
import MenuItem from '../MenuItem';
import { mergeProps } from '@react-aria/utils';
import MenuSection from '../MenuSection';
import { ListContext } from '../List/List.utils';
import { DEFAULTS as LIST_DEFAULTS } from '../List/List.constants';
import useOrientationBasedKeyboardNavigation from '../../hooks/useOrientationBasedKeyboardNavigation';


export const MenuContext = React.createContext<MenuContextValue>({});

export function useMenuContext(): MenuContextValue {
  return useContext(MenuContext);
}

export const MenuAppearanceContext = React.createContext<MenuAppearanceContextValue>({});

export function useMenuAppearanceContext(): MenuAppearanceContextValue {
  return useContext(MenuAppearanceContext);
}

const Menu = <T extends object>(props: Props<T>, providedRef: RefObject<HTMLUListElement>) => {
  const {
    className,
    id,
    style,
    isTickOnLeftSide = DEFAULTS.IS_TICK_ON_LEFT_SIDE,
    itemShape = DEFAULTS.ITEM_SHAPE,
    itemSize = DEFAULTS.ITEM_SIZE,
    isGroupRole,
    ariaLabelledby,
    orientation = LIST_DEFAULTS.ORIENTATION,
  } = props;

  const contextProps = useMenuContext();

  const _props = {
    ...mergeProps(contextProps, props),
  };

  const state = useTreeState({ ..._props });

  const internalRef = useRef();
  const ref = providedRef || internalRef;

  const { menuProps } = useMenu(_props, state, ref);
  const itemArray = Array.from(state.collection.getKeys());
  const listSize = itemArray.length;

  const {keyboardProps, getContext} = useOrientationBasedKeyboardNavigation({listSize, orientation});

  const renderItem = useCallback(
    <T extends object>(item: Node<T>, state: TreeState<T>, index: number) => {
      if (item.type === 'section') {
        return <MenuSection key={item.key} item={item} state={state} onAction={_props.onAction} orientation={orientation} />;
      } else {
        // collection.getKeys() return all keys (including sub-keys of child elements)
        // and we don't want to render items twice
        if (item.parentKey !== null) {
          return;
        }

        let menuItem = (
          <MenuItem itemIndex={index} key={item.key} item={item} state={state} onAction={_props.onAction} />
        );

        if (item.wrapper) {
          menuItem = item.wrapper(menuItem);
        }

        return menuItem;
      }
    },
    [state]
  );

  // needs to be removed because when used in Menu Trigger, it will
  // label it by the triggerComponent's id, and that doesn't really make
  // sense especially when there are multiple menus inside.
  delete menuProps['aria-labelledby'];
  
  // ListContext is necessary to prevent changes in parent ListContext
  // for example when Menu is inside a list row
  return (
    <MenuAppearanceContext.Provider value={{ itemShape, itemSize, isTickOnLeftSide }}>
      <ListContext.Provider value={getContext()}>
        <ul
          className={classnames(className, STYLE.wrapper)}
          id={id}
          style={style}
          ref={ref}
          {...menuProps}
          role={isGroupRole ? GROUP : menuProps.role}
          aria-labelledby={ariaLabelledby}
          {...keyboardProps}
        >
          {itemArray.map((key, index) => {
            const item = state.collection.getItem(key) as Node<T>;
            return renderItem(item, state, index);
          })}
        </ul>
      </ListContext.Provider>
    </MenuAppearanceContext.Provider>
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
