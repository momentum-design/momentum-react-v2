import { DependencyList, EffectCallback, useEffect, useRef } from 'react';
import { KEYS } from './ListItemBase.constants';
import { ListContextValue } from '../List/List.types';

/**
 * Returns all focusable child elements as an Element Array
 * @param root - root node to search in
 * @param tabOnly - whether only tabbable children should be returned or all
 * children that can be focused. Element with 0 tabindex can be tabbed to,
 * while elements with any tabindex value can be manually focused
 */
export function getKeyboardFocusableElements<T extends HTMLElement>(
  root: T,
  tabOnly = true
): Element[] {
  const focusableNodes = 'a[href], button, input, textarea, select, details,'.concat(
    tabOnly ? '[tabindex]:not([tabindex="-1"]' : '[tabindex]:not([tabindex=""]'
  );

  return Array.from(root.querySelectorAll(focusableNodes)).filter(
    (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true'
  );
}
/**
 * Same as useEffect but ignores first render.
 * @param fn - use effect callback
 * @param inputs dependencies
 */
export const useDidUpdateEffect = (fn: EffectCallback, inputs: DependencyList): void => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return fn();
    }
    didMountRef.current = true;
  }, inputs);
};

/**
 * Handles left and right arrow key navigation for the given Element Array
 * @param event - keyboard trigger event
 * @param navigableElements - Element Array to navigate through
 */
export const handleLeftRightArrowNavigation = (
  event: KeyboardEvent,
  navigableElements: Element[]
): void => {
  const { key, target } = event;
  if (key === KEYS.RIGHT_KEY) {
    let newTarget;
    const index = navigableElements.indexOf(target as Element);
    if (index > -1) {
      if (index + 1 < navigableElements.length) {
        newTarget = navigableElements[index + 1];
      } else {
        newTarget = navigableElements[0];
      }
    } else {
      newTarget = navigableElements[0];
    }
    event.preventDefault();
    event.stopPropagation();
    newTarget.focus();
  } else if (key === KEYS.LEFT_KEY) {
    let newTarget;
    const index = navigableElements.indexOf(target as Element);
    if (index > -1) {
      if (index > 0) {
        newTarget = navigableElements[index - 1];
      } else {
        newTarget = navigableElements[navigableElements.length - 1];
      }
    } else {
      newTarget = navigableElements[navigableElements.length - 1];
    }
    event.preventDefault();
    event.stopPropagation();
    newTarget.focus();
  }
};

/**
 * Returns the intended tabIndex for the ListItemBase
 */
export const getListItemBaseTabIndex = ({
  interactive,
  listContext,
  focus,
}: {
  interactive: boolean;
  listContext?: ListContextValue;
  focus: boolean;
}): number => {
  if (!interactive || (listContext && !focus)) {
    return -1;
  } else {
    return 0;
  }
};
