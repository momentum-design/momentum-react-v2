import { useRef, useEffect } from 'react';

/**
 * This is for compare a previous value with the current value. For example a value of prevPops vs props
 * @param value the value need to store
 * @returns the current value of a ref
 */
export const usePrevious = <T>(value: T): undefined | T => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
