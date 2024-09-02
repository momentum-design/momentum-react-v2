/* eslint-disable @typescript-eslint/no-empty-function */
import { renderHook } from '@testing-library/react-hooks';
import useOrientationBasedKeyboardNavigation, {
  IUseOrientationBasedKeyboardNavigationProps,
} from './useOrientationBasedKeyboardNavigation';
import { KeyboardEvent } from 'react';
import { act } from 'react-test-renderer';

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

    let { currentFocus, direction } = result.current.getContext();
    expect(currentFocus).toStrictEqual(1);
    expect(direction).toStrictEqual('forward');

    act(() => {
      result.current.keyboardProps.onKeyDown(downArrowEvent);
    });

    ({ currentFocus, direction } = result.current.getContext());
    // no loop true so should 0
    expect(currentFocus).toStrictEqual(0);
    expect(direction).toStrictEqual('forward');

    act(() => {
      result.current.keyboardProps.onKeyDown(leftArrowEvent);
    });

    ({ currentFocus, direction } = result.current.getContext());
    expect(currentFocus).toStrictEqual(0);
    expect(direction).toStrictEqual('forward');

    act(() => {
      result.current.keyboardProps.onKeyDown(upArrowEvent);
    });

    ({ currentFocus, direction } = result.current.getContext());
    // no loop true should be 1
    expect(currentFocus).toStrictEqual(1);
    expect(direction).toStrictEqual('backward');
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

    let { currentFocus, direction } = result.current.getContext();
    expect(currentFocus).toStrictEqual(1);
    expect(direction).toStrictEqual('forward');

    act(() => {
      result.current.keyboardProps.onKeyDown(rightArrowEvent);
    });

    ({ currentFocus, direction } = result.current.getContext());
    // no loop false so shouldn't wrap back to 0
    expect(currentFocus).toStrictEqual(1);
    expect(direction).toStrictEqual('forward');

    act(() => {
      result.current.keyboardProps.onKeyDown(leftArrowEvent);
    });

    ({ currentFocus, direction } = result.current.getContext());
    expect(currentFocus).toStrictEqual(0);
    expect(direction).toStrictEqual('backward');

    act(() => {
      result.current.keyboardProps.onKeyDown(leftArrowEvent);
    });

    ({ currentFocus, direction } = result.current.getContext());
    // no loop false so shouldn't wrap back to 1
    expect(currentFocus).toStrictEqual(0);
    expect(direction).toStrictEqual('backward');

    act(() => {
      result.current.keyboardProps.onKeyDown(downArrowEvent);
    });

    ({ currentFocus, direction } = result.current.getContext());
    expect(currentFocus).toStrictEqual(0);
    expect(direction).toStrictEqual('backward');
  });
});
