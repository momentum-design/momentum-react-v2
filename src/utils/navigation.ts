export const PRESERVE_TABINDEX_CLASSNAME = 'md-nav-preserve-tabindex';
const FOCUSABLE_ELEMENT_SELECTORS = 'a[href], button, input, textarea, select, details, [tabindex]';
const PRESERVE_TABINDEX_SELECTORS = `[data-preserve-tabindex],.${PRESERVE_TABINDEX_CLASSNAME}`;

/**
 * Returns all focusable child elements as an Element Array
 *
 * An element focusable if it:
 * - it is interactive element (anchor with href, button, input, textarea, select and details)
 * - it is not disabled
 * - it is not hidden
 * - it is not aria hidden
 * - it or any of its parents do not have `data-preserve-tabindex` attribute or `
 *   md-nav-preserve-tabindex` class
 * - it has none empty or not "-1" tabindex, see `includeTabbableOnly` parameter
 *
 * @remarks
 * Element with 0 tabindex can be tabbed to, while elements with any tabindex value can be
 * manually focused
 *
 * @param root - root node to search in
 * @param includeTabbableOnly - whether only tabbable children should be returned or all
 */
export function getKeyboardFocusableElements<T extends HTMLElement>(
  root: T,
  includeTabbableOnly = true
): Array<HTMLElement> {
  const tabindex = includeTabbableOnly ? '-1' : '';
  const preserveTabindexContainers = Array.from(root.querySelectorAll(PRESERVE_TABINDEX_SELECTORS));

  return Array.from(root.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS)).filter(
    (el) =>
      !el.hasAttribute('disabled') &&
      el.getAttribute('hidden') === null &&
      el.getAttribute('aria-hidden') !== 'true' &&
      el.getAttribute('tabindex') !== tabindex &&
      // note: container.contains(container) is true
      !preserveTabindexContainers.some((p) => p.contains(el)) &&
      !el.hasAttribute('data-exclude-focus')
  ) as Array<HTMLElement>;
}
