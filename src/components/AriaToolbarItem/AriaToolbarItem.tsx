import { Props } from './AriaToolbarItem.types';

import React, { forwardRef, useCallback } from 'react';

import { useKeyboard } from '@react-aria/interactions';
import { useAriaToolbarContext } from '../AriaToolbar/AriaToolbar.utils';
import { useProvidedRef } from '../../utils/useProvidedRef';

const AriaToolbarItem = forwardRef<HTMLButtonElement, Props>((props, providedRef) => {
  const { children, itemIndex } = props;

  const ariaToolbarContext = useAriaToolbarContext();

  const ref = useProvidedRef<HTMLButtonElement>(providedRef, null);

  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      if (!ariaToolbarContext) return;

      const { orientation, setCurrentFocus, ariaToolbarItemsSize, currentFocus, onTabPress } =
        ariaToolbarContext;

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
          onTabPress?.(e);
          break;
        }

        default:
          break;
      }
    },
  });

  const getPropsForChildren = useCallback(
    (child, index) => {
      if (!ariaToolbarContext) return;

      const { setCurrentFocus, buttonRefs, currentFocus } = ariaToolbarContext;

      return {
        tabIndex: index === (currentFocus || 0) ? 0 : -1,
        ref: (element: HTMLButtonElement) => {
          buttonRefs.current[index] = element;
          ref.current = element;
        },
        onFocus: (event) => {
          setCurrentFocus?.(index);
          child.props?.onFocus?.(event);
        },
        onPress: () => {
          setCurrentFocus?.(index);
          child.props?.onPress?.();
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
