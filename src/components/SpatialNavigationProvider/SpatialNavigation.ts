import { getKeyboardFocusableElements } from '../../utils/navigation';
import { Direction, GoBackHandler } from './SpatialNavigationProvider.types';
import capitalize from 'lodash/capitalize';
import { orderElementsByDistance } from './SpatialNavigationProvider.utils';

/**
 * Track focusable elements in the app and move the focus to the next focusable element.
 */
export class SpatialNavigation {
  /** Root element */
  private root: HTMLElement = document.body;

  /** Currently focused element
   * Use WeakRef to avoid memory leaks
   * */
  private activeElement: undefined | WeakRef<HTMLElement>;

  /**
   * Observer to track the active element changes.
   */
  private activeElementObserver: MutationObserver;

  /**
   * Back navigation handler
   * @private
   */
  private readonly goBackHandler: GoBackHandler | undefined;

  constructor(goBackHandler?: GoBackHandler) {
    this.activeElementObserver = new MutationObserver(this.activeElementObserverCallback);
    this.goBackHandler = goBackHandler;
  }

  /**
   * Mutation Observer callback
   */
  private activeElementObserverCallback: MutationCallback = (): void => {
    const currentActiveElement = this.getActiveElement();
    if (!currentActiveElement || !currentActiveElement.isConnected) {
      this.initActiveElement();
    }
  };

  /**
   * Initialize the spatial navigation.
   */
  initActiveElement(): void {
    const elements = getKeyboardFocusableElements(this.root);
    this.findActiveElement(elements);
  }

  /**
   * Update the list of the focusable elements in the app.
   */
  private findActiveElement(elements: HTMLElement[]): void {
    const currentActiveElement = this.getActiveElement();
    if (!currentActiveElement || !elements.includes(currentActiveElement)) {
      const nextActiveElement = elements[0];
      if (nextActiveElement) {
        this.setActiveElementAndFocus(nextActiveElement);
      }
    }
  }

  /**
   * Focus the next element in the given direction.
   *
   * @param direction User pressed arrow key.
   */
  focusNext(direction: Direction): void {
    const elements = getKeyboardFocusableElements(this.root);
    this.findActiveElement(elements);

    const currentActiveElement = this.getActiveElement();

    if (!currentActiveElement) {
      return;
    }

    if (currentActiveElement !== document.activeElement) {
      return currentActiveElement.focus();
    }

    // Check if the current active element has instruction to find the next element
    const nextElementSelector = currentActiveElement.dataset[`spatial${capitalize(direction)}`];
    if (nextElementSelector) {
      const nextElement = this.root.querySelector<HTMLElement>(nextElementSelector);
      if (nextElement) {
        return this.setActiveElementAndFocus(nextElement);
      }
    }

    // Find the closest element in the given direction
    const results = orderElementsByDistance(currentActiveElement, elements, direction);
    const nextActiveElement = results[0]?.element ?? currentActiveElement;

    if (nextActiveElement) {
      this.setActiveElementAndFocus(nextActiveElement);
    }
  }

  /**
   * Handle back action
   *
   * Either trigger click on goBack element if any
   * otherwise call default go back handler
   */
  goBack(): void {
    const goBackElement = getKeyboardFocusableElements(this.root).find(
      (el) => el.dataset.spatialGoBack
    );
    if (goBackElement) {
      goBackElement.click();
    } else {
      this.goBackHandler?.();
    }
  }

  /**
   * Set the active element.
   *
   * Also connect star tracking the active element.
   * @param element
   */
  setActiveElement(element: HTMLElement): void {
    if (element === this.activeElement?.deref()) return;

    this.activeElementObserver.disconnect();
    if (element) {
      this.activeElement = new WeakRef(element);
      this.activeElementObserver.observe(element.parentElement, { childList: true });
    } else {
      this.activeElement = undefined;
    }
  }

  /**
   * Set the active element and call .focus() on it
   * @param element
   */
  setActiveElementAndFocus(element: HTMLElement): void {
    this.setActiveElement(element);
    // Focus the element asynchronously to make sure all calculations are done before focusing
    queueMicrotask(() => element.focus());
  }

  /**
   * Get active (focused) element
   */
  getActiveElement(): HTMLElement | undefined {
    return this.activeElement?.deref();
  }

  /**
   * Cleanup resources
   */
  dispose(): void {
    this.activeElement = undefined;
    this.activeElementObserver.disconnect();
    this.activeElementObserver = undefined;
  }
}
