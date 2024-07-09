import { renderHook } from '@testing-library/react-hooks';
import { useProvidedRef } from './useProvidedRef';

describe('useProvidedRef', () => {
  it('should return an internal ref with initial value if no ref is provided', () => {
    const { result } = renderHook(() => useProvidedRef(null, 'initial'));
    expect(result.current.current).toBe('initial');
  });

  it('should use the provided object ref', () => {
    const providedRef = { current: 'provided' };
    const { result } = renderHook(() => useProvidedRef(providedRef));

    expect(result.current).toBe(providedRef);
    expect(result.current.current).toBe('provided');
  });

  it('should call the provided function ref', () => {
    const refCallback = jest.fn();
    const { result } = renderHook(() => useProvidedRef(refCallback, 'initial'));

    expect(refCallback).toHaveBeenCalledWith('initial');
    expect(result.current.current).toBe('initial');
  });
});
