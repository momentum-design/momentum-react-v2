import { renderHook } from '@testing-library/react-hooks';
import { usePrevious } from './usePrevious';

describe('usePrevious', () => {
  it('returns with undefined at first time', async () => {
    const hook = renderHook(() => usePrevious(42));

    expect(hook.result.current).toBe(undefined);
  });

  it('should return with the previous value after the first call', async () => {
    const hook = renderHook(() => usePrevious(42));

    hook.rerender();

    expect(hook.result.current).toBe(42);
  });
});
