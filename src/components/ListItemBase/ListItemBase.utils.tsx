import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export function getKeyboardFocusableElements<T extends HTMLElement>(root: T): Element[] {
  const focusableNodes =
    'a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])';

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
