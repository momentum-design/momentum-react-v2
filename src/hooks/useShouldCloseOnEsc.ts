import { useEffect, useState } from 'react';

import * as PopoverEvents from '../components/Popover/Popover.events';

/**
 * A custom React hook that manages the ability to close a component which can contain Popovers when the escape key is pressed.
 *
 * The hook listens for custom events indicating the addition or removal of tippy instances
 * that should close when Esc is pressed (e.g., instances with `hideOnEsc = true`).
 * It maintains a set of such instances and provides a `shouldCloseOnEsc` boolean that determines
 * whether the parent component should close on Esc press.
 *
 * The hook leverages two custom events defined in `Popover.events`:
 * - `EventType.TIPPY_INSTANCE_ADDED`: Indicates a new Popover instance has been added.
 * - `EventType.TIPPY_INSTANCE_REMOVED`: Indicates a Popover instance has been removed.
 *
 * Each Popover instance is expected to dispatch these events with the instance itself when it is shown and hidden.
 *
 * @returns An object containing a single property `shouldCloseOnEsc`, which is `true` if no Popover instances
 *          are currently active (i.e., all have been hidden), and `false` otherwise.
 *
 */
export const useShouldCloseOnEsc = (): { shouldCloseOnEsc: boolean } => {
  const [popoverInstances, setPopoverInstances] = useState(new Set());
  const [shouldCloseOnEsc, setShouldCloseOnEsc] = useState(true);

  const add = (e: CustomEvent) => {
    setPopoverInstances((prev) => {
      const newSet = new Set(prev);
      newSet.add(e);
      return newSet;
    });
  };

  const remove = (e: CustomEvent) => {
    setPopoverInstances((prev) => {
      const newSet = new Set(prev);

      newSet.delete(e);
      return newSet;
    });
  };

  useEffect(() => {
    const addId = PopoverEvents.addListener(PopoverEvents.EventType.TIPPY_INSTANCE_ADDED, add);
    const removeId = PopoverEvents.addListener(
      PopoverEvents.EventType.TIPPY_INSTANCE_REMOVED,
      remove
    );

    return () => {
      PopoverEvents.removeListener(PopoverEvents.EventType.TIPPY_INSTANCE_ADDED, addId);
      PopoverEvents.removeListener(PopoverEvents.EventType.TIPPY_INSTANCE_REMOVED, removeId);
    };
  }, []);

  useEffect(() => {
    const newShouldCloseOnEsc = popoverInstances.size === 0;

    if (newShouldCloseOnEsc !== shouldCloseOnEsc) {
      setShouldCloseOnEsc(newShouldCloseOnEsc);
    }
  }, [popoverInstances]);

  return {
    shouldCloseOnEsc,
  };
};
