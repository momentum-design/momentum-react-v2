import { Dispatch, HTMLAttributes, SetStateAction, useCallback, useState } from 'react';
import { useKeyboard } from '@react-aria/interactions';
import { setNextFocus } from '../components/List/List.utils';
import { ListOrientation } from '../components/List/List.types';

type IUseOrientationBasedKeyboardNavigationReturn = {
  keyboardProps: HTMLAttributes<HTMLElement>;
  getContext: () => {
    listSize: number;
    currentFocus: number;
    setCurrentFocus: Dispatch<SetStateAction<number>>;
    shouldFocusOnPress?: boolean;
    shouldItemFocusBeInset?: boolean;
    noLoop?: boolean;
    setDirection: Dispatch<SetStateAction<'forward' | 'backward'>>;
    direction: 'forward' | 'backward';
  };
};

export type IUseOrientationBasedKeyboardNavigationProps = {
  listSize: number;
  orientation: ListOrientation;
  noLoop?: boolean;
  contextProps?: {
    shouldFocusOnPress?: boolean;
    shouldItemFocusBeInset?: boolean;
  };
};

const useOrientationBasedKeyboardNavigation = (
  props: IUseOrientationBasedKeyboardNavigationProps
): IUseOrientationBasedKeyboardNavigationReturn => {
  const { listSize, orientation, noLoop, contextProps } = props;
  const [currentFocus, setCurrentFocus] = useState<number>(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const getContext = useCallback(
    () => ({
      listSize,
      currentFocus,
      noLoop,
      setCurrentFocus,
      setDirection,
      direction,
      ...contextProps,
    }),
    [currentFocus, setCurrentFocus, listSize]
  );

  const { keyboardProps } = useKeyboard({
    onKeyDown: (evt) => {
      const forwardKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
      const backwardKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';

      switch (evt.key) {
        case 'Escape':
          evt.continuePropagation();
          break;
        case backwardKey:
          setDirection('backward');
          evt.preventDefault();
          setNextFocus(true, listSize, currentFocus, noLoop, setCurrentFocus);
          break;

        case forwardKey:
          setDirection('forward');
          evt.preventDefault();
          setNextFocus(false, listSize, currentFocus, noLoop, setCurrentFocus);
          break;

        default:
          break;
      }
    },
  });

  return {
    keyboardProps,
    getContext,
  };
};

export default useOrientationBasedKeyboardNavigation;
