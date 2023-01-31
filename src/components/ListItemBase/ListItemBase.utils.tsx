import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

/**
 * Same as useEffect but ignores first render.
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
