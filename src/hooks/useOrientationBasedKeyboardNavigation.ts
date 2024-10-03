import {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';
import { useKeyboard } from '@react-aria/interactions';
import { setNextFocus } from '../components/List/List.utils';
import { ListOrientation } from '../components/List/List.types';
import { useFocusWithinState } from './useFocusState';

type IUseOrientationBasedKeyboardNavigationReturn = {
  keyboardProps: HTMLAttributes<HTMLElement>;
  focusWithinProps: HTMLAttributes<HTMLElement>;
  getContext: () => {
    listSize: number;
    currentFocus: number;
    setCurrentFocus: Dispatch<SetStateAction<number>>;
    shouldFocusOnPress?: boolean;
    shouldItemFocusBeInset?: boolean;
    noLoop?: boolean;
    updateFocusBlocked?: boolean;
    isFocusedWithin?: boolean;
  };
};

export type IUseOrientationBasedKeyboardNavigationProps = {
  listSize: number;
  orientation: ListOrientation;
  noLoop?: boolean;
  initialFocus?: number;
  contextProps?: {
    shouldFocusOnPress?: boolean;
    shouldItemFocusBeInset?: boolean;
  };
};

const useOrientationBasedKeyboardNavigation = (
  props: IUseOrientationBasedKeyboardNavigationProps
): IUseOrientationBasedKeyboardNavigationReturn => {
  const { listSize, orientation, noLoop, contextProps, initialFocus = 0 } = props;
  const [currentFocus, setCurrentFocus] = useState<number>(-1);
  const [updateFocusBlocked, setUpdateFocusBlocked] = useState<boolean>(true);

  const { isFocusedWithin, focusWithinProps } = useFocusWithinState({});

  // When the initial focus changes, we temporarily disable the automatic focus of the currentFocus
  // Once that new focused item has rendered, it will re-enable the automatic focus
  useLayoutEffect(() => {
    if (!isFocusedWithin) {
      setUpdateFocusBlocked(true);
      setCurrentFocus(initialFocus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFocus]);

  const getContext = useCallback(
    () => ({
      listSize,
      currentFocus,
      noLoop,
      setCurrentFocus,
      setUpdateFocusBlocked,
      updateFocusBlocked,
      isFocusedWithin,
      ...contextProps,
    }),
    [listSize, currentFocus, noLoop, updateFocusBlocked, isFocusedWithin, contextProps]
  );

  const { keyboardProps } = useKeyboard({
    onKeyDown: (evt) => {
      const forwardKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
      const backwardKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';

      const context = getContext();

      switch (evt.key) {
        case 'Escape':
          evt.continuePropagation();
          break;
        case backwardKey:
          evt.preventDefault();
          setNextFocus(
            true,
            context.listSize,
            context.currentFocus,
            context.noLoop,
            setCurrentFocus
          );
          break;

        case forwardKey:
          evt.preventDefault();
          setNextFocus(
            false,
            context.listSize,
            context.currentFocus,
            context.noLoop,
            setCurrentFocus
          );
          break;

        default:
          break;
      }
    },
  });

  return {
    keyboardProps,
    focusWithinProps,
    getContext,
  };
};

export default useOrientationBasedKeyboardNavigation;
