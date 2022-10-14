import { RefObject } from 'react';

export function getKeyboardFocusableElements<T extends HTMLElement>(root: RefObject<T>): Element[] {
  const focusableNodes =
    'a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])';

  return Array.from(root.current.querySelectorAll(focusableNodes)).filter(
    (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true'
  );
}
