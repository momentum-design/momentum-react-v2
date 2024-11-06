import { AriaAttributes, useEffect } from 'react';

export type AriaLabelRequired =
  | {
      /**
       * Defines a string value that labels the current element.
       */
      'aria-label': AriaAttributes['aria-label'];
    }
  | {
      /**
       * Identifies the element (or elements) that labels the current element.
       */
      'aria-labelledby': AriaAttributes['aria-labelledby'];
    };

/**
 * Check if `aria-labelledby` or `aria-label` are defined and are truthy
 *
 * @param componentName The name of the component
 * @param props The object of props passed to the component
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export function useCheckForScreenReaderLabel(componentName: string, props: any): void {
  useEffect(() => {
    if (!props['aria-labelledby'] && !props['aria-label']) {
      console.warn(`MRV2: ${componentName} requires aria-labelledby or aria-label.`);
    }
  }, [componentName, props]);
}
