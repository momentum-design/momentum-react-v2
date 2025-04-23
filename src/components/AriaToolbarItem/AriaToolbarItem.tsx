/* eslint-disable react/display-name */
import { Props } from './AriaToolbarItem.types';

import React, { forwardRef, useCallback } from 'react';
import { useAriaToolbarContext } from '../AriaToolbar/AriaToolbar.utils';
import { useProvidedRef } from '../../utils/useProvidedRef';
import { defaults } from 'lodash';

const AriaToolbarItem = forwardRef<HTMLButtonElement, Props>((props, providedRef) => {
  const { children, itemIndex, ...rest } = props;

  const ariaToolbarContext = useAriaToolbarContext();

  const ref = useProvidedRef<HTMLButtonElement>(providedRef, null);

  const onKeyDown = useCallback(
    (e) => {
      if (!ariaToolbarContext) return;

      const { orientation, setCurrentFocus, ariaToolbarItemsSize, currentFocus, onTabPress } =
        ariaToolbarContext;

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
    [ariaToolbarContext]
  );

  const getPropsForChildren = useCallback(
    (child, index) => {
      if (!ariaToolbarContext) return;

      const { setCurrentFocus, buttonRefs, currentFocus } = ariaToolbarContext;

      return defaults(
        {
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
          onKeyDown,
        },
        children?.props, // specified props of children should take precedent over drilled props from parent
        rest
      );
    },
    [ariaToolbarContext, onKeyDown, children.props, rest, ref]
  );

  return React.cloneElement(children, getPropsForChildren(children, itemIndex));
});

export default AriaToolbarItem;
