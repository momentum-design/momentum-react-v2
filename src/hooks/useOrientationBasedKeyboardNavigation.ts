import {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useKeyboard } from '@react-aria/interactions';
import { setNextFocus, onCurrentFocusNotFound } from '../components/List/List.utils';
import { ListOrientation } from '../components/List/List.types';
import { useFocusWithinState } from './useFocusState';
import { isNumber } from 'lodash';
import { ListItemBaseIndex } from '../components/ListItemBase/ListItemBase.types';
import { usePrevious } from './usePrevious';

type IUseOrientationBasedKeyboardNavigationReturn = {
  keyboardProps: HTMLAttributes<HTMLElement>;
  focusWithinProps: HTMLAttributes<HTMLElement>;
  getContext: () => {
    listSize: number;
    currentFocus: ListItemBaseIndex;
    setCurrentFocus: Dispatch<SetStateAction<ListItemBaseIndex>>;
    shouldFocusOnPress?: boolean;
    shouldItemFocusBeInset?: boolean;
    noLoop?: boolean;
    updateFocusBlocked?: boolean;
    isFocusedWithin?: boolean;
    addFocusCallback: (index: ListItemBaseIndex, callback: () => void) => void;
  };
};

export type IUseOrientationBasedKeyboardNavigationProps = {
  listSize: number;
  allItemIndexes?: ListItemBaseIndex[];
  orientation: ListOrientation;
  noLoop?: boolean;
  initialFocus?: ListItemBaseIndex;
  contextProps?: {
    shouldFocusOnPress?: boolean;
    shouldItemFocusBeInset?: boolean;
  };
};

const useOrientationBasedKeyboardNavigation = (
  props: IUseOrientationBasedKeyboardNavigationProps
): IUseOrientationBasedKeyboardNavigationReturn => {
  const { allItemIndexes, listSize, orientation, noLoop, contextProps, initialFocus = 0 } = props;
  const [currentFocus, setCurrentFocus] = useState<number | string>(-1);
  const [updateFocusBlocked, setUpdateFocusBlocked] = useState<boolean>(true);

  const focusCallbacks = useRef({});

  const addFocusCallback = useCallback((index, callback) => {
    focusCallbacks.current[index] = callback;
  }, []);

  const { isFocusedWithin, focusWithinProps } = useFocusWithinState({});

  const lastCurrentFocus = usePrevious(currentFocus);

  useLayoutEffect(() => {
    if (
      lastCurrentFocus !== undefined && // prevents focus of new elements
      lastCurrentFocus !== currentFocus && // focuses the new element in up/down navigation
      // itemHasFocus &&
      !updateFocusBlocked // Don't focus anything at all while the list is finding its initial focus
    ) {
      const callback = focusCallbacks.current[currentFocus];

      if (callback) {
        callback();
      }
    }
  }, [currentFocus, isFocusedWithin, lastCurrentFocus, updateFocusBlocked]);

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
      allItemIndexes,
      addFocusCallback,
      ...contextProps,
    }),
    [
      listSize,
      currentFocus,
      noLoop,
      updateFocusBlocked,
      isFocusedWithin,
      allItemIndexes,
      addFocusCallback,
      contextProps,
    ]
  );

  const previousAllItemIndexes = usePrevious(allItemIndexes);

  useEffect(() => {
    if (!allItemIndexes) {
      if (!isNumber(currentFocus)) {
        console.warn('Unable to handle non-numeric index without allItemIndexes', currentFocus);

        return;
      }

      if (currentFocus >= listSize) {
        const newFocus = listSize - 1;

        if (newFocus >= 0) {
          setCurrentFocus(newFocus);
        } else {
          setCurrentFocus(initialFocus);
        }
      }

      return;
    }

    if (currentFocus !== -1 && !allItemIndexes.includes(currentFocus)) {
      const context = getContext();

      onCurrentFocusNotFound(
        currentFocus,
        context.allItemIndexes,
        previousAllItemIndexes,
        setCurrentFocus
      );
    }
  }, [allItemIndexes, currentFocus, getContext, initialFocus, listSize, previousAllItemIndexes]);

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
            setCurrentFocus,
            context.allItemIndexes
          );
          break;

        case forwardKey:
          evt.preventDefault();
          setNextFocus(
            false,
            context.listSize,
            context.currentFocus,
            context.noLoop,
            setCurrentFocus,
            context.allItemIndexes
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
