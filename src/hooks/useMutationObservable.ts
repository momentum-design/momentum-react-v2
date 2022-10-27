import { useEffect, useState } from 'react';

const DEFAULT_OPTIONS = {
  attributes: false,
  childList: true,
  subtree: true,
};

/**
 * This custom hooks abstracts the usage of the Mutation Observer with React components.
 * Watch for changes being made to the DOM tree and trigger a custom callback.
 *
 * Note: with debounce the intermediate MutationRecords will be lost
 *
 * @param targetEl Observed DOM element
 * @param callback Mutation callback
 * @param config Mutation Observer config and other config
 *
 * @link https://blog.logrocket.com/guide-to-custom-react-hooks-with-mutationobserver/
 */
export const useMutationObservable = (
  targetEl: Node,
  callback: MutationCallback,
  config: MutationObserverInit = DEFAULT_OPTIONS
): void => {
  const [observer, setObserver] = useState<MutationObserver>(null);

  useEffect(() => {
    setObserver(() => new MutationObserver(callback));
  }, [callback, config]);

  useEffect(() => {
    observer?.observe(targetEl, config);
    return () => {
      observer?.disconnect();
    };
  }, [observer, targetEl, config]);
};
