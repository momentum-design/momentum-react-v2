import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

/**
 * Same as useEffect but ignores first render.
 * @param fn - use effect callback
 * @param inputs dependencies
 */
export const useDidUpdateEffect = (fn: EffectCallback, inputs: DependencyList): void => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return fn();
    }
    didMountRef.current = true;
  }, inputs);
};
