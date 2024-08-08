/* eslint-disable @typescript-eslint/ban-types */

import React, { ReactElement, useCallback, useRef, useState } from 'react';

import { STYLE } from './MenuSection.constants';
import { Props } from './MenuSection.types';
import './MenuSection.style.scss';
import MenuItem from '../MenuItem';
import { useMenuSection } from '@react-aria/menu';
import { ListContext, setNextFocus } from '../List/List.utils';
import { useKeyboard } from '@react-aria/interactions';

const MenuSection = <T extends object>(props: Props<T>): ReactElement => {
  const { item, state, onAction, orientation } = props;

  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading: item.rendered,
    'aria-label': item['aria-label'],
  });

  const childItems = Array.from(item.childNodes);
  const listSize = childItems.length;

  const renderItems = useCallback(() => {
    return Array.from(item.childNodes).map((node, index) => (
      <MenuItem itemIndex={index} key={node.key} item={node} state={state} onAction={onAction} />
    ));
  }, [state]);

  const [currentFocus, setCurrentFocus] = useState<number>(0);

  const setContext = useCallback(
    (newFocus) => {
      setCurrentFocus(newFocus);
    },
    [currentFocus, setCurrentFocus, listSize]
  );

  const getContext = useCallback(
    () => ({ listSize, currentFocus, setContext }),
    [currentFocus, setCurrentFocus, listSize]
  );

  const { keyboardProps } = useKeyboard({
    onKeyDown: (evt) => {
      const forwardKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
      const backwardKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';

      switch (evt.key) {
        case 'Escape':
          evt.continuePropagation();
          break;
        case backwardKey:
          evt.preventDefault();
          setNextFocus(true, listSize, currentFocus, false, setCurrentFocus);
          break;

        case forwardKey:
          evt.preventDefault();
          setNextFocus(false, listSize, currentFocus, false, setCurrentFocus);
          break;

        default:
          break;
      }
    },
  });

  const ref = useRef<HTMLUListElement>();


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
        <ul ref={ref} {...groupProps} {...keyboardProps} className={STYLE.wrapper}>
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
