/* eslint-disable @typescript-eslint/no-empty-function */
import { act, renderHook } from '@testing-library/react-hooks';
import useOrientationBasedKeyboardNavigation, {
  IUseOrientationBasedKeyboardNavigationProps,
} from './useOrientationBasedKeyboardNavigation';
import { KeyboardEvent } from 'react';

describe('useOrientationBasedKeyboardNavigation', () => {
  const defaultProps = {
    listSize: 2,
    orientation: 'vertical',
    noLoop: false,
    contextProps: {},
  } as IUseOrientationBasedKeyboardNavigationProps;

  const stopPropagation = () => {};
  const preventDefault = () => {};
  const downArrowEvent = {
    key: 'ArrowDown',
    stopPropagation,
    preventDefault,
  } as KeyboardEvent<HTMLElement>;
  const upArrowEvent = {
    key: 'ArrowUp',
    stopPropagation,
    preventDefault,
  } as KeyboardEvent<HTMLElement>;
  const leftArrowEvent = {
    key: 'ArrowLeft',
    stopPropagation,
    preventDefault,
  } as KeyboardEvent<HTMLElement>;
  const rightArrowEvent = {
    key: 'ArrowRight',
    stopPropagation,
    preventDefault,
  } as KeyboardEvent<HTMLElement>;

  it('should navigate correctly by default', () => {
    const { result } = renderHook(() => useOrientationBasedKeyboardNavigation(defaultProps));

    act(() => {
      result.current.keyboardProps.onKeyDown(downArrowEvent);
    });

    let { currentFocus } = result.current.getContext();
    expect(currentFocus).toStrictEqual(1);

    act(() => {
      result.current.keyboardProps.onKeyDown(downArrowEvent);
    });

    ({ currentFocus } = result.current.getContext());
    // no loop true so should 0
    expect(currentFocus).toStrictEqual(0);

    act(() => {
      result.current.keyboardProps.onKeyDown(leftArrowEvent);
    });

    ({ currentFocus } = result.current.getContext());
    expect(currentFocus).toStrictEqual(0);

    act(() => {
      result.current.keyboardProps.onKeyDown(upArrowEvent);
    });

    ({ currentFocus } = result.current.getContext());
    // no loop true should be 1
    expect(currentFocus).toStrictEqual(1);
  });

  it('should navigate correctly when horizontal and noLoop', () => {
    const props = {
      noLoop: true,
      orientation: 'horizontal',
    } as Partial<IUseOrientationBasedKeyboardNavigationProps>;
    const { result } = renderHook(() =>
      useOrientationBasedKeyboardNavigation({ ...defaultProps, ...props })
    );

    act(() => {
      result.current.keyboardProps.onKeyDown(rightArrowEvent);
    });

    let { currentFocus } = result.current.getContext();
    expect(currentFocus).toStrictEqual(1);

    act(() => {
      result.current.keyboardProps.onKeyDown(rightArrowEvent);
    });

    ({ currentFocus } = result.current.getContext());
    // no loop false so shouldn't wrap back to 0
    expect(currentFocus).toStrictEqual(1);

    act(() => {
      result.current.keyboardProps.onKeyDown(leftArrowEvent);
    });

    ({ currentFocus } = result.current.getContext());
    expect(currentFocus).toStrictEqual(0);

    act(() => {
      result.current.keyboardProps.onKeyDown(leftArrowEvent);
    });

    ({ currentFocus } = result.current.getContext());
    // no loop false so shouldn't wrap back to 1
    expect(currentFocus).toStrictEqual(0);

    act(() => {
      result.current.keyboardProps.onKeyDown(downArrowEvent);
    });

    ({ currentFocus } = result.current.getContext());
    expect(currentFocus).toStrictEqual(0);
  });

  describe('list size changes', () => {
    it('should handle list size changing with numeric indexes - last item focused and removed', () => {
      const { result, rerender } = renderHook(
        (props: any) => useOrientationBasedKeyboardNavigation(props),
        {
          initialProps: { listSize: 3, orientation: 'vertical' },
        }
      );

      expect(result.current.getContext()).toEqual({
        allItemIndexes: undefined,
        currentFocus: 0,
        isFocusedWithin: false,
        listSize: 3,
        noLoop: undefined,
        setCurrentFocus: expect.any(Function),
        setUpdateFocusBlocked: expect.any(Function),
        updateFocusBlocked: true,
      });

      act(() => {
        result.current.getContext().setCurrentFocus(2);
      });

      expect(result.current.getContext()).toEqual({
        allItemIndexes: undefined,
        currentFocus: 2,
        isFocusedWithin: false,
        listSize: 3,
        noLoop: undefined,
        setCurrentFocus: expect.any(Function),
        setUpdateFocusBlocked: expect.any(Function),
        updateFocusBlocked: true,
      });

      act(() => {
        rerender({ listSize: 2, orientation: 'vertical' });
      });

      expect(result.current.getContext()).toEqual({
        allItemIndexes: undefined,
        currentFocus: 1,
        isFocusedWithin: false,
        listSize: 2,
        noLoop: undefined,
        setCurrentFocus: expect.any(Function),
        setUpdateFocusBlocked: expect.any(Function),
        updateFocusBlocked: true,
      });
    });

    it('should handle list size changing with numeric indexes - first item focused and removed', () => {
      const { result, rerender } = renderHook(
        (props: any) => useOrientationBasedKeyboardNavigation(props),
        {
          initialProps: { listSize: 3, orientation: 'vertical' },
        }
      );

      expect(result.current.getContext()).toEqual({
        allItemIndexes: undefined,
        currentFocus: 0,
        isFocusedWithin: false,
        listSize: 3,
        noLoop: undefined,
        setCurrentFocus: expect.any(Function),
        setUpdateFocusBlocked: expect.any(Function),
        updateFocusBlocked: true,
      });

      act(() => {
        rerender({ listSize: 2, orientation: 'vertical' });
      });

      expect(result.current.getContext()).toEqual({
        allItemIndexes: undefined,
        currentFocus: 0,
        isFocusedWithin: false,
        listSize: 2,
        noLoop: undefined,
        setCurrentFocus: expect.any(Function),
        setUpdateFocusBlocked: expect.any(Function),
        updateFocusBlocked: true,
      });
    });

    it('should handle list size changing with non-numeric indexes - last item focused and removed', () => {
      const { result, rerender } = renderHook(
        (props: any) => useOrientationBasedKeyboardNavigation(props),
        {
          initialProps: { listSize: 3, orientation: 'vertical', allItemIndexes: ['a', 'b', 'c'] },
        }
      );

      expect(result.current.getContext()).toEqual({
        allItemIndexes: ['a', 'b', 'c'],
        currentFocus: 'a',
        isFocusedWithin: false,
        listSize: 3,
        noLoop: undefined,
        setCurrentFocus: expect.any(Function),
        setUpdateFocusBlocked: expect.any(Function),
        updateFocusBlocked: true,
      });

      act(() => {
        result.current.getContext().setCurrentFocus('c');
      });

      expect(result.current.getContext()).toEqual({
        allItemIndexes: ['a', 'b', 'c'],
        currentFocus: 'c',
        isFocusedWithin: false,
        listSize: 3,
        noLoop: undefined,
        setCurrentFocus: expect.any(Function),
        setUpdateFocusBlocked: expect.any(Function),
        updateFocusBlocked: true,
      });

      act(() => {
        rerender({ listSize: 2, orientation: 'vertical', allItemIndexes: ['a', 'b'] });
      });

      // This result is perhaps unexpected, as the numeric case jumps to the previous item
      // However without the previous version of allItemIndexes we can't determine the previous index
      // So jumping to the first item in the list is the best we can do
      expect(result.current.getContext()).toEqual({
        allItemIndexes: ['a', 'b'],
        currentFocus: 'a',
        isFocusedWithin: false,
        listSize: 2,
        noLoop: undefined,
        setCurrentFocus: expect.any(Function),
        setUpdateFocusBlocked: expect.any(Function),
        updateFocusBlocked: true,
      });
    });

    it('should handle list size changing with non-numeric indexes - first item focused and removed', () => {
      const { result, rerender } = renderHook(
        (props: any) => useOrientationBasedKeyboardNavigation(props),
        {
          initialProps: { listSize: 3, orientation: 'vertical', allItemIndexes: ['a', 'b', 'c'] },
        }
      );

      expect(result.current.getContext()).toEqual({
        allItemIndexes: ['a', 'b', 'c'],
        currentFocus: 'a',
        isFocusedWithin: false,
        listSize: 3,
        noLoop: undefined,
        setCurrentFocus: expect.any(Function),
        setUpdateFocusBlocked: expect.any(Function),
        updateFocusBlocked: true,
      });

      act(() => {
        rerender({ listSize: 2, orientation: 'vertical', allItemIndexes: ['b', 'c'] });
      });

      expect(result.current.getContext()).toEqual({
        allItemIndexes: ['b', 'c'],
        currentFocus: 'b',
        isFocusedWithin: false,
        listSize: 2,
        noLoop: undefined,
        setCurrentFocus: expect.any(Function),
        setUpdateFocusBlocked: expect.any(Function),
        updateFocusBlocked: true,
      });
    });

    it('should gracefully handle non-numeric item indexes without allItemIndexes', () => {
      const { result, rerender } = renderHook(
        (props: any) => useOrientationBasedKeyboardNavigation(props),
        {
          initialProps: { listSize: 3, orientation: 'vertical' },
        }
      );

      jest.spyOn(console, 'warn');

      expect(result.current.getContext()).toEqual({
        allItemIndexes: undefined,
        currentFocus: 0,
        isFocusedWithin: false,
        listSize: 3,
        noLoop: undefined,
        setCurrentFocus: expect.any(Function),
        setUpdateFocusBlocked: expect.any(Function),
        updateFocusBlocked: true,
      });

      act(() => {
        result.current.getContext().setCurrentFocus('c');
      });

      expect(result.current.getContext()).toEqual({
        currentFocus: 'c',
        isFocusedWithin: false,
        listSize: 3,
        noLoop: undefined,
        setCurrentFocus: expect.any(Function),
        setUpdateFocusBlocked: expect.any(Function),
        updateFocusBlocked: true,
      });

      act(() => {
        rerender({ listSize: 2, orientation: 'vertical' });
      });

      // We can't handle non-numeric indexes without allItemIndexes
      // So the current focus remains unchanged
      expect(result.current.getContext()).toEqual({
        allItemIndexes: undefined,
        currentFocus: 'c',
        isFocusedWithin: false,
        listSize: 2,
        noLoop: undefined,
        setCurrentFocus: expect.any(Function),
        setUpdateFocusBlocked: expect.any(Function),
        updateFocusBlocked: true,
      });

      expect(console.warn).toHaveBeenCalledWith(
        'Unable to handle non-numeric index without allItemIndexes',
        'c'
      );
    });
  });
});
