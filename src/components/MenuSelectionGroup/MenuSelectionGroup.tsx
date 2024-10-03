/* eslint-disable @typescript-eslint/ban-types */

import React, { ReactElement, useEffect, useMemo } from 'react';
import classNames from 'classnames';

import { STYLE } from './MenuSelectionGroup.constants';
import { Props } from './MenuSelectionGroup.types';
import './MenuSelectionGroup.style.scss';
import MenuItem from '../MenuItem';
import { SelectionManager, useMultipleSelectionState } from '@react-stately/selection';
import { useMenuSection } from '@react-aria/menu';
import ContentSeparator from '../ContentSeparator';

const MenuSelectionGroup = <T extends object>(props: Props<T>): ReactElement => {
  const { item, state, onAction, tickPosition, classNameSelectedItem, className, itemSize } = props;

  const { collection: tree, selectionManager: menuSelectionManager } = state;

  const selectionState = useMultipleSelectionState(props);

  const selectionManager = useMemo(
    () => new SelectionManager(tree, selectionState),
    [tree, selectionState]
  );

  const newState = {
    ...state,
    selectionManager,
  };

  useEffect(() => {
    menuSelectionManager.setFocusedKey(selectionManager.focusedKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectionManager.focusedKey]);

  useEffect(() => {
    selectionManager.setFocused(menuSelectionManager.isFocused);
    selectionManager.setFocusedKey(menuSelectionManager.focusedKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuSelectionManager.focusedKey, menuSelectionManager.isFocused]);

  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading: item.rendered,
    'aria-label': item['aria-label'],
  });

  return (
    <div {...itemProps}>
      {item.rendered && (
        <div className={STYLE.header}>
          {!React.isValidElement(item.rendered) ? (
            <span {...headingProps}>{item.rendered}</span>
          ) : (
            React.cloneElement(item.rendered as ReactElement, { ...headingProps })
          )}
        </div>
      )}
      <ul {...groupProps} className={classNames(STYLE.wrapper, className)}>
        {Array.from(item.childNodes).map((node) => {
          if (node.props?._isSeparator) {
            const props = { ...node.props };
            delete props._isSeparator;

            return <ContentSeparator {...props} />;
          }

          let item = (
            <MenuItem
              key={node.key}
              item={node}
              itemSize={itemSize}
              state={newState}
              tickPosition={tickPosition}
              classNameSelectedItem={classNameSelectedItem}
              onAction={onAction}
            />
          );

          if (node.wrapper) {
            item = node.wrapper(item);
          }

          return item;
        })}
      </ul>
    </div>
  );
};

export default MenuSelectionGroup;
