import { AriaAttributes, useEffect } from 'react';
import { RequireOneOf } from './types';

export type AriaLabelRequired = RequireOneOf<AriaAttributes, ['aria-label', 'aria-labelledby']>;

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
