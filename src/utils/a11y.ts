import { AriaAttributes, useEffect } from 'react';
import { RequireOneOf } from './types';

export type AriaLabelRequired = RequireOneOf<AriaAttributes, ['aria-label', 'aria-labelledby']>;

/**
 * Check if `aria-label` or `aria-labelledby` are defined and are truthy
 *
 * @param componentName The name of the component
 * @param props The object of props passed to the component
 */
export function useCheckAriaLabel(
  componentName: string,
  props: { 'aria-label'?: string; 'aria-labelledby'?: string }
): void {
  useEffect(() => {
    if (!props['aria-label'] && !props['aria-labelledby']) {
      console.warn(`MRV2: ${componentName} requires aria-label or aria-labelledby.`);
    }
  }, [componentName, props]);
}
