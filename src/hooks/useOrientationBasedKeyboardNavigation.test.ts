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
    it.each([
      { focusedIndex: 0, expectedNextFocus: 0, newListSize: 4 },
      { focusedIndex: 1, expectedNextFocus: 1, newListSize: 4 },
      { focusedIndex: 2, expectedNextFocus: 2, newListSize: 4 },
      { focusedIndex: 3, expectedNextFocus: 3, newListSize: 4 },
      { focusedIndex: 4, expectedNextFocus: 3, newListSize: 4 },
      { focusedIndex: 4, expectedNextFocus: 2, newListSize: 3 },
      { focusedIndex: 4, expectedNextFocus: 1, newListSize: 2 },
      { focusedIndex: 4, expectedNextFocus: 0, newListSize: 1 },
    ])(
      'should handle list size changing with numeric indexes - non-focused item removed',
      ({ focusedIndex, expectedNextFocus, newListSize }) => {
        const { result, rerender } = renderHook(
          (props: any) => useOrientationBasedKeyboardNavigation(props),
          {
            initialProps: { listSize: 5, orientation: 'vertical' },
          }
        );

        expect(result.current.getContext()).toEqual({
          allItemIndexes: undefined,
          currentFocus: 0,
          isFocusedWithin: false,
          listSize: 5,
          noLoop: undefined,
          setCurrentFocus: expect.any(Function),
          setUpdateFocusBlocked: expect.any(Function),
          updateFocusBlocked: true,
        });

        act(() => {
          result.current.getContext().setCurrentFocus(focusedIndex);
        });

        expect(result.current.getContext()).toEqual({
          allItemIndexes: undefined,
          currentFocus: focusedIndex,
          isFocusedWithin: false,
          listSize: 5,
          noLoop: undefined,
          setCurrentFocus: expect.any(Function),
          setUpdateFocusBlocked: expect.any(Function),
          updateFocusBlocked: true,
        });

        act(() => {
          rerender({ listSize: newListSize, orientation: 'vertical' });
        });

        expect(result.current.getContext()).toEqual({
          allItemIndexes: undefined,
          currentFocus: expectedNextFocus,
          isFocusedWithin: false,
          listSize: newListSize,
          noLoop: undefined,
          setCurrentFocus: expect.any(Function),
          setUpdateFocusBlocked: expect.any(Function),
          updateFocusBlocked: true,
        });
      }
    );

    it.each([
      // removing items
      {
        initialIndexes: ['a', 'b', 'c', 'd', 'e'],
        focusedIndex: 'a',
        finalIndexes: ['a', 'b', 'c', 'd'],
        expectedNextFocus: 'a',
      },
      {
        initialIndexes: ['a', 'b', 'c', 'd', 'e'],
        focusedIndex: 'b',
        finalIndexes: ['a', 'b', 'c', 'd'],
        expectedNextFocus: 'b',
      },
      {
        initialIndexes: ['a', 'b', 'c', 'd', 'e'],
        focusedIndex: 'c',
        finalIndexes: ['a', 'b', 'c', 'd'],
        expectedNextFocus: 'c',
      },
      {
        initialIndexes: ['a', 'b', 'c', 'd', 'e'],
        focusedIndex: 'd',
        finalIndexes: ['a', 'b', 'c', 'd'],
        expectedNextFocus: 'd',
      },
      {
        initialIndexes: ['a', 'b', 'c', 'd', 'e'],
        focusedIndex: 'e',
        finalIndexes: ['a', 'b', 'c', 'd'],
        expectedNextFocus: 'a', // This is the unexpected result as it jumps back to the beginning of the list
      },
      {
        initialIndexes: ['a', 'b', 'c', 'd', 'e'],
        focusedIndex: 'a',
        finalIndexes: ['b', 'c', 'd', 'e'],
        expectedNextFocus: 'b',
      },
      {
        initialIndexes: ['a', 'b', 'c', 'd', 'e'],
        focusedIndex: 'b',
        finalIndexes: ['b', 'c', 'd', 'e'],
        expectedNextFocus: 'b',
      },
      {
        initialIndexes: ['a', 'b', 'c', 'd', 'e'],
        focusedIndex: 'c',
        finalIndexes: ['b', 'c', 'd', 'e'],
        expectedNextFocus: 'c',
      },
      {
        initialIndexes: ['a', 'b', 'c', 'd', 'e'],
        focusedIndex: 'd',
        finalIndexes: ['b', 'c', 'd', 'e'],
        expectedNextFocus: 'd',
      },
      {
        initialIndexes: ['a', 'b', 'c', 'd', 'e'],
        focusedIndex: 'e',
        finalIndexes: ['b', 'c', 'd', 'e'],
        expectedNextFocus: 'e',
      },

      // adding items
      {
        initialIndexes: ['a', 'b', 'c', 'd'],
        focusedIndex: 'a',
        finalIndexes: ['a', 'b', 'c', 'd', 'e'],
        expectedNextFocus: 'a',
      },
      {
        initialIndexes: ['a', 'b', 'c', 'd'],
        focusedIndex: 'b',
        finalIndexes: ['a', 'b', 'c', 'd', 'e'],
        expectedNextFocus: 'b',
      },
      {
        initialIndexes: ['a', 'b', 'c', 'd'],
        focusedIndex: 'c',
        finalIndexes: ['a', 'b', 'c', 'd', 'e'],
        expectedNextFocus: 'c',
      },
      {
        initialIndexes: ['a', 'b', 'c', 'd'],
        focusedIndex: 'd',
        finalIndexes: ['a', 'b', 'c', 'd', 'e'],
        expectedNextFocus: 'd',
      },
      {
        initialIndexes: ['a', 'b', 'd', 'e'],
        focusedIndex: 'b',
        finalIndexes: ['a', 'b', 'c', 'd', 'e'],
        expectedNextFocus: 'b',
      },
      {
        initialIndexes: ['a', 'b', 'd', 'e'],
        focusedIndex: 'd',
        finalIndexes: ['a', 'b', 'c', 'd', 'e'],
        expectedNextFocus: 'd',
      },
    ])(
      'should handle list size changing with non-numeric indexes',
      ({ initialIndexes, focusedIndex, finalIndexes, expectedNextFocus }) => {
        const { result, rerender } = renderHook(
          (props: any) => useOrientationBasedKeyboardNavigation(props),
          {
            initialProps: {
              listSize: initialIndexes.length,
              orientation: 'vertical',
              allItemIndexes: initialIndexes,
            },
          }
        );

        expect(result.current.getContext()).toEqual({
          allItemIndexes: initialIndexes,
          currentFocus: initialIndexes[0],
          isFocusedWithin: false,
          listSize: initialIndexes.length,
          noLoop: undefined,
          setCurrentFocus: expect.any(Function),
          setUpdateFocusBlocked: expect.any(Function),
          updateFocusBlocked: true,
        });

        act(() => {
          result.current.getContext().setCurrentFocus(focusedIndex);
        });

        expect(result.current.getContext()).toEqual({
          allItemIndexes: initialIndexes,
          currentFocus: focusedIndex,
          isFocusedWithin: false,
          listSize: initialIndexes.length,
          noLoop: undefined,
          setCurrentFocus: expect.any(Function),
          setUpdateFocusBlocked: expect.any(Function),
          updateFocusBlocked: true,
        });

        act(() => {
          rerender({
            listSize: finalIndexes.length,
            orientation: 'vertical',
            allItemIndexes: finalIndexes,
          });
        });

        expect(result.current.getContext()).toEqual({
          allItemIndexes: finalIndexes,
          currentFocus: expectedNextFocus,
          isFocusedWithin: false,
          listSize: finalIndexes.length,
          noLoop: undefined,
          setCurrentFocus: expect.any(Function),
          setUpdateFocusBlocked: expect.any(Function),
          updateFocusBlocked: true,
        });
      }
    );

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
