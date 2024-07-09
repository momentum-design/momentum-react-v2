import { Props } from './AriaToolbarItem.types';

import React, { forwardRef, useCallback } from 'react';

import { useKeyboard } from '@react-aria/interactions';
import { useAriaToolbarContext } from '../AriaToolbar/AriaToolbar.utils';

const AriaToolbarItem = forwardRef<HTMLButtonElement, Props>((props, providedRef) => {
  const { children, itemIndex } = props;

  const ariaToolbarContext = useAriaToolbarContext();

  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      // for the escape key (and other key presses), continue propagation to let Popovers / Modals know that
      // they should close
      e.continuePropagation();

      switch (e.key) {
        case ariaToolbarContext?.orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp':
          e.preventDefault();
          ariaToolbarContext?.setCurrentFocus(
            (ariaToolbarContext?.ariaToolbarItemsSize +
              (ariaToolbarContext?.currentFocus || 0) -
              1) %
              ariaToolbarContext?.ariaToolbarItemsSize
          );
          break;

        case ariaToolbarContext?.orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown':
          e.preventDefault();
          ariaToolbarContext?.setCurrentFocus(
            (ariaToolbarContext?.ariaToolbarItemsSize +
              (ariaToolbarContext?.currentFocus || 0) +
              1) %
              ariaToolbarContext?.ariaToolbarItemsSize
          );
          break;

        case 'Tab': {
          if (ariaToolbarContext?.onTabPress) {
            ariaToolbarContext?.onTabPress(e);
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
        tabIndex: index === (ariaToolbarContext?.currentFocus || 0) ? 0 : -1,
        ref: (e: HTMLButtonElement) => {
          if (ariaToolbarContext.buttonRefs.current) {
            ariaToolbarContext.buttonRefs.current[index] = e;
            if (providedRef) {
              if (typeof providedRef === 'function') {
                providedRef(e);
              }
            }
          }
        },
        onFocus: (e) => {
          ariaToolbarContext?.setCurrentFocus(index);
          if (child.props.onFocus) {
            child.props.onFocus(e);
          }
        },
        onPress: () => {
          ariaToolbarContext?.setCurrentFocus(index);
          if (child.props.onPress) {
            child.props.onPress();
          }
        },
        useNativeKeyDown: true,
        ...keyboardProps,
      };
    },
    [ariaToolbarContext?.currentFocus]
  );

  return React.cloneElement(children, getPropsForChildren(children, itemIndex));
});

export default AriaToolbarItem;
