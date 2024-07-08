import { Props } from './AriaToolbarItem.types';

import React, { forwardRef, useCallback } from 'react';

import { useKeyboard } from '@react-aria/interactions';
import { useAriaToolbarContext } from '../AriaToolbar/AriaToolbar.utils';

const AriaToolbarItem = forwardRef<HTMLButtonElement, Props>((props, providedRef) => {
  const { children, itemIndex } = props;

  const {
    currentFocus,
    setCurrentFocus,
    buttonRefs,
    orientation,
    onTabPress,
    ariaToolbarItemsSize,
  } = useAriaToolbarContext();

  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      // for the escape key (and other key presses), continue propagation to let Popovers / Modals know that
      // they should close
      e.continuePropagation();

      switch (e.key) {
        case orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp':
          e.preventDefault();
          setCurrentFocus((ariaToolbarItemsSize + (currentFocus || 0) - 1) % ariaToolbarItemsSize);
          break;

        case orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown':
          e.preventDefault();
          setCurrentFocus((ariaToolbarItemsSize + (currentFocus || 0) + 1) % ariaToolbarItemsSize);
          break;

        case 'Tab': {
          if (onTabPress) {
            onTabPress(e);
          }
          break;
        }

        default:
          break;
      }
    },
  });

  const getPropsForChildren = useCallback(
    (child, index) => {
      return {
        tabIndex: index === (currentFocus || 0) ? 0 : -1,
        ref: (e: HTMLButtonElement) => {
          buttonRefs.current[index] = e;
          if (providedRef) {
            if (typeof providedRef === 'function') {
              providedRef(e);
            }
          }
        },
        onFocus: (e) => {
          setCurrentFocus(index);
          if (child.props.onFocus) {
            child.props.onFocus(e);
          }
        },
        onPress: () => {
          setCurrentFocus(index);
          if (child.props.onPress) {
            child.props.onPress();
          }
        },
        useNativeKeyDown: true,
        ...keyboardProps,
      };
    },
    [currentFocus]
  );

  return React.cloneElement(children, getPropsForChildren(children, itemIndex));
});

export default AriaToolbarItem;
