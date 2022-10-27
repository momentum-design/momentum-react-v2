export function getKeyboardFocusableElements<T extends HTMLElement>(root: T): Element[] {
  const focusableNodes =
    'a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])';

  return Array.from(root.querySelectorAll(focusableNodes)).filter(
    (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true'
  );
}
