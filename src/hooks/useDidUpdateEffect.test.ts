import { renderHook } from '@testing-library/react-hooks';
import { useDidUpdateEffect } from './useDidUpdateEffect';

describe('useDidUpdateEffect', () => {
  it('does not run the effect on initial render', async () => {
    const effect = jest.fn();
    const { rerender } = renderHook(({ input, effect }) => useDidUpdateEffect(effect, input), {
      initialProps: { effect, input: ['one'] },
    });
    expect(effect).not.toBeCalled();
    rerender({ effect, input: ['two'] });
    expect(effect).toBeCalled();
  });
});
