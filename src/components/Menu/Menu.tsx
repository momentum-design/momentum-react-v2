/* eslint-disable @typescript-eslint/ban-types */
import { Node } from '@react-types/shared';
import React, { forwardRef, ReactElement, RefObject, useContext, useRef, useCallback } from 'react';
import classnames from 'classnames';

import { STYLE, DEFAULTS } from './Menu.constants';
import {
  MenuAppearanceContextValue,
  MenuContextValue,
  Props,
  SelectionGroupAppearanceProps,
} from './Menu.types';
import './Menu.style.scss';
import { useMenu } from '@react-aria/menu';
import { useTreeState, TreeState } from '@react-stately/tree';
import MenuItem from '../MenuItem';
import { mergeProps } from '@react-aria/utils';
import MenuSection from '../MenuSection';
import MenuSelectionGroup from '../MenuSelectionGroup';
import ContentSeparator from '../ContentSeparator';
import { defaults } from 'lodash';
import { ListContext } from '../List/List.utils';

export const MenuContext = React.createContext<MenuContextValue>({});

export function useMenuContext(props: Partial<MenuContextValue> = {}): MenuContextValue {
  const context = useContext(MenuContext);

  return defaults({}, props, context);
}

export const MenuAppearanceContext = React.createContext<MenuAppearanceContextValue>({});

export function useMenuAppearanceContext(
  props: Partial<SelectionGroupAppearanceProps> = {}
): MenuAppearanceContextValue {
  const menuAppearance = useContext(MenuAppearanceContext);

  return defaults({}, props, menuAppearance);
}

const Menu = <T extends object>(props: Props<T>, providedRef: RefObject<HTMLDivElement>) => {
  const {
    className,
    classNameSelectedItem,
    id,
    style,
    tickPosition = DEFAULTS.TICK_POSITION,
    itemShape = DEFAULTS.ITEM_SHAPE,
    itemSize = DEFAULTS.ITEM_SIZE,
    ariaLabelledby,
    shouldItemFocusBeInset,
  } = props;

  const contextProps = useMenuContext();

  const _props = {
    ...mergeProps(contextProps, props),
  };

  const state = useTreeState({ ..._props });

  const internalRef = useRef();
  const ref = providedRef || internalRef;
  const itemArray = Array.from(state.collection.getKeys());

  // Ensure all separators are in the disabledKeys set so they are not interactable
  // This may need copying instead of modifying due to how React works
  itemArray.forEach((key) => {
    const item = state.collection.getItem(key);
    if (item.props?._isSeparator) {
      state.disabledKeys.add(key);
    }
  });

  const { menuProps } = useMenu(_props, state, ref);

  const renderItem = useCallback(
    <T extends object>(item: Node<T>, state: TreeState<T>) => {
      if (item.type === 'section') {
        if (item.props?.selectionGroup) {
          return (
            <MenuSelectionGroup
              item={item}
              state={state}
              onAction={_props.onAction}
              key={item.key}
              {...item.props}
            />
          );
        }
        return <MenuSection key={item.key} item={item} state={state} onAction={_props.onAction} />;
      } else {
        // collection.getKeys() return all keys (including sub-keys of child elements)
        // and we don't want to render items twice
        if (item.parentKey !== null) {
          return;
        }

        if (item.props?._isSeparator) {
          const props = { ...item.props };
          delete props._isSeparator;

          return <ContentSeparator {...props} />;
        }

        let menuItem = (
          <MenuItem key={item.key} item={item} state={state} onAction={_props.onAction} />
        );

        if (item.wrapper) {
          menuItem = item.wrapper(menuItem);
        }

        return menuItem;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  // needs to be removed because when used in Menu Trigger, it will
  // label it by the triggerComponent's id, and that doesn't really make
  // sense especially when there are multiple menus inside.
  delete menuProps['aria-labelledby'];

  // ListContext is necessary to prevent changes in parent ListContext
  // for example when Menu is inside a list row
  return (
    <MenuAppearanceContext.Provider
      value={{ itemShape, itemSize, tickPosition, classNameSelectedItem }}
    >
      <ListContext.Provider value={{ shouldItemFocusBeInset: shouldItemFocusBeInset }}>
        <div
          className={classnames(className, STYLE.wrapper)}
          id={id}
          style={style}
          ref={ref}
          aria-labelledby={ariaLabelledby}
          {...menuProps}
        >
          {itemArray.map((key) => {
            const item = state.collection.getItem(key) as Node<T>;
            return renderItem(item, state);
          })}
        </div>
      </ListContext.Provider>
    </MenuAppearanceContext.Provider>
  );
};

/**
 * Menu Element which displays a list of options/actions.
 */

const _Menu = forwardRef(Menu);
_Menu.displayName = '_Menu';

export default _Menu as <T>(props: Props<T> & { ref?: RefObject<HTMLDivElement> }) => ReactElement;
