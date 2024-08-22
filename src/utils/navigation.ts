const FOCUSABLE_ELEMENT_SELECTORS =
  'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex=""])';
const FOCUSABLE_AND_TABBABLE_ONLY_ELEMENT_SELECTORS =
  'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';

/**
 * Returns all focusable child elements as an Element Array
 * @param root - root node to search in
 * @param includeTabbableOnly - whether only tabbable children should be returned or all
 * children that can be focused. Element with 0 tabindex can be tabbed to,
 * while elements with any tabindex value can be manually focused
 */
export function getKeyboardFocusableElements<T extends HTMLElement>(
  root: T,
  includeTabbableOnly = true
): Array<HTMLElement> {
  const focusableNodes = includeTabbableOnly
    ? FOCUSABLE_AND_TABBABLE_ONLY_ELEMENT_SELECTORS
    : FOCUSABLE_ELEMENT_SELECTORS;

  return Array.from(root.querySelectorAll(focusableNodes)).filter(
    (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true'
  ) as Array<HTMLElement>;
}

/**
 * Returns all focusable child elements as an Element Array
 *
 * @param element
 * @param includeTabbableOnly
 */
export const isFocusableNode = (element: HTMLElement, includeTabbableOnly = true): boolean => {
  return element.matches(
    includeTabbableOnly
      ? FOCUSABLE_AND_TABBABLE_ONLY_ELEMENT_SELECTORS
      : FOCUSABLE_ELEMENT_SELECTORS
  );
};
