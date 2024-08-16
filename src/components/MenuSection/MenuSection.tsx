/* eslint-disable @typescript-eslint/ban-types */

import React, { ReactElement, useCallback } from 'react';

import { STYLE } from './MenuSection.constants';
import { Props } from './MenuSection.types';
import './MenuSection.style.scss';
import MenuItem from '../MenuItem';
import { useMenuSection } from '@react-aria/menu';
import { ListContext } from '../List/List.utils';
import useOrientationBasedKeyboardNavigation from '../../hooks/useOrientationBasedKeyboardNavigation';

const MenuSection = <T extends object>(props: Props<T>): ReactElement => {
  const { item, state, onAction, orientation } = props;

  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading: item.rendered,
    'aria-label': item['aria-label'],
  });
  const childItems = Array.from(item.childNodes);
  const listSize = childItems.length;

  const {keyboardProps, getContext} = useOrientationBasedKeyboardNavigation({listSize, orientation});

  const renderItems = useCallback(() => {
    const retArray = Array.from(item.childNodes).map((node, index) => (
      <MenuItem itemIndex={index} key={node.key} item={node} state={state} onAction={onAction} />
    ));
    return retArray;
  }, [state]);

  return (
    <ul {...itemProps}>
      {!React.isValidElement(item.rendered) && item.rendered ? (
        <span className={STYLE.header} {...headingProps}>
          {item.rendered}
        </span>
      ) : (
        item.rendered && React.cloneElement(item.rendered as ReactElement, { ...headingProps })
      )}
      <ListContext.Provider value={getContext()}>
        <ul {...groupProps} {...keyboardProps} className={STYLE.wrapper}>
          {renderItems()}
        </ul>
      </ListContext.Provider>
    </ul>
  );
};

/**
 * @internal
 * The MenuSection component.
 */

export default MenuSection;
