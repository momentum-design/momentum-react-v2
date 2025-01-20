export const PRESERVE_TABINDEX_CLASSNAME = 'md-nav-preserve-tabindex';
const FOCUSABLE_ELEMENT_SELECTORS = 'a[href], button, input, textarea, select, details, [tabindex]';
const PRESERVE_TABINDEX_SELECTORS = `[data-preserve-tabindex],.${PRESERVE_TABINDEX_CLASSNAME}`;

type Options = {
  /**
   * whether only tabbable children should be returned or all
   */
  includeTabbableOnly?: boolean;
  /**
   * Exclude elements with `data-preserve-tabindex` attribute and all their children
   */
  excludePreserveTabindex?: boolean;
};

const defaultOptions: Required<Options> = {
  includeTabbableOnly: true,
  excludePreserveTabindex: true,
};

/**
 * Returns all focusable child elements as an Element Array
 *
 * An element focusable if it:
 * - it is interactive element (anchor with href, button, input, textarea, select and details)
 * - it is not disabled
 * - it is not hidden
 * - it or any of its parents do not have `aria-hidden=true` attribute
 * - it or any of its parents do not have `data-preserve-tabindex` attribute or `
 *   md-nav-preserve-tabindex` class
 * - it has none empty or not "-1" tabindex, see `includeTabbableOnly` parameter
 *
 * @remarks
 * Element with 0 tabindex can be tabbed to, while elements with any tabindex value can be
 * manually focused
 *
 * @param root Element lookup starts from this element
 * @param options Options to customize the behavior
 */
export function getKeyboardFocusableElements<T extends HTMLElement>(
  root: T,
  options?: Options
): Array<HTMLElement> {
  const { includeTabbableOnly, excludePreserveTabindex } = { ...defaultOptions, ...options };
  const tabindex = includeTabbableOnly ? '-1' : '';
  const preserveTabindexContainers = excludePreserveTabindex
    ? Array.from(root.querySelectorAll(PRESERVE_TABINDEX_SELECTORS))
    : [];

  // Exclude elements with `aris-hidden=true` attribute and all their children
  const ariaHiddenContainers = Array.from(root.querySelectorAll('[aria-hidden="true"]'));

  return Array.from(root.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS)).filter(
    (el) =>
      !el.hasAttribute('disabled') &&
      el.getAttribute('hidden') === null &&
      el.getAttribute('tabindex') !== tabindex &&
      // note: container.contains(container) is true
      !preserveTabindexContainers.some((p) => p.contains(el)) &&
      !ariaHiddenContainers.some((p) => p.contains(el)) &&
      !el.hasAttribute('data-exclude-focus')
  ) as Array<HTMLElement>;
}
