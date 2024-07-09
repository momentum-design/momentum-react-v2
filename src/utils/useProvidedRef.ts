import React, { useRef, useLayoutEffect } from 'react';

/**
 * Utility hook to merge provided with internal ref.
 * It works with both callback refs and normal object ref.
 * @param providedRef
 * @param initialValue
 * @returns
 */
export const useProvidedRef = <T>(providedRef: React.ForwardedRef<T>, initialValue: T = null) => {
  let ref = useRef<T>(initialValue);

  if (providedRef && typeof providedRef !== 'function') {
    ref = providedRef;
  }

  useLayoutEffect(() => {
    if (providedRef) {
      if (typeof providedRef === 'function') {
        providedRef(ref.current);
      }
    }
  }, []);

  return ref;
};
