import { renderHook, act } from '@testing-library/react-hooks';
import * as PopoverEvents from '../components/Popover/Popover.events';
import { useShouldCloseOnEsc } from './useShouldCloseOnEsc';

describe('useShouldCloseOnEsc', () => {
  const addPopoverInstance = (id: string) => {
    // Simulate adding a Popover instance
    act(() => {
      PopoverEvents.dispatchEvent(PopoverEvents.EventType.TIPPY_INSTANCE_ADDED, id);
    });
  };

  const removePopoverInstance = (id: string) => {
    // Simulate removing a Popover instance
    act(() => {
      PopoverEvents.dispatchEvent(PopoverEvents.EventType.TIPPY_INSTANCE_REMOVED, id);
    });
  };

  it('should be true by default', () => {
    const { result } = renderHook(() => useShouldCloseOnEsc());
    expect(result.current.shouldCloseOnEsc).toBe(true);
  });

  it('should be false when a Popover instance is added', () => {
    const { result } = renderHook(() => useShouldCloseOnEsc());

    addPopoverInstance('popover-1');

    expect(result.current.shouldCloseOnEsc).toBe(false);
  });

  it('should be true when all Popover instances are removed', () => {
    const { result } = renderHook(() => useShouldCloseOnEsc());

    addPopoverInstance('popover-1');

    removePopoverInstance('popover-1');

    expect(result.current.shouldCloseOnEsc).toBe(true);
  });

  it('should work as expected if an instance that was never added is attempted to be removed', () => {
    const { result } = renderHook(() => useShouldCloseOnEsc());

    addPopoverInstance('popover-1');

    removePopoverInstance('popover-2');

    expect(result.current.shouldCloseOnEsc).toBe(false);
  });
});
