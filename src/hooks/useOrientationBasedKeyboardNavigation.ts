import {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
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
    setCurrentFocus: Dispatch<SetStateAction<ListItemBaseIndex>>;
    shouldFocusOnPress?: boolean;
    shouldItemFocusBeInset?: boolean;
    noLoop?: boolean;
    updateFocusBlocked?: boolean;
    isFocusedWithin?: boolean;
    getCurrentFocus?: () => ListItemBaseIndex;
    addFocusCallback?: (
      index: ListItemBaseIndex,
      callback: (focused: boolean, focusBlocked: boolean) => void
    ) => void;
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
  const [currentFocus, setCurrentFocusInternal] = useState<number | string>(-1);
  const [updateFocusBlocked, setUpdateFocusBlockedInternal] = useState<boolean>(true);

  const currentFocusRef = useRef(currentFocus);
  const focusCallbacks = useRef({});
  const updateFocusBlockedRef = useRef(updateFocusBlocked);

  const setUpdateFocusBlocked = useCallback((value: boolean) => {
    updateFocusBlockedRef.current = value;
    setUpdateFocusBlockedInternal(value);
  }, []);

  const setCurrentFocus = useCallback((index: ListItemBaseIndex) => {
    currentFocusRef.current = index;
    setCurrentFocusInternal(index);
  }, []);

  const addFocusCallback = useCallback((index, callback) => {
    focusCallbacks.current[index] = callback;

    callback(index === currentFocusRef.current, updateFocusBlockedRef.current);
  }, []);

  const { isFocusedWithin, focusWithinProps } = useFocusWithinState({});

  const lastCurrentFocus = usePrevious(currentFocus);

  useLayoutEffect(() => {
    if (
      lastCurrentFocus !== currentFocus // focuses the new element in up/down navigation
    ) {
      focusCallbacks.current[currentFocus]?.(true, updateFocusBlocked);
      focusCallbacks.current[lastCurrentFocus]?.(false, updateFocusBlocked);
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

  const getCurrentFocus = useCallback(() => currentFocusRef.current, []);

  const { shouldFocusOnPress, shouldItemFocusBeInset } = contextProps || {};

  const context = useMemo(
    () => ({
      noLoop,
      setCurrentFocus,
      setUpdateFocusBlocked,
      isFocusedWithin,
      addFocusCallback,
      getCurrentFocus,
      shouldFocusOnPress,
      shouldItemFocusBeInset,
    }),
    [
      noLoop,
      setCurrentFocus,
      setUpdateFocusBlocked,
      isFocusedWithin,
      addFocusCallback,
      getCurrentFocus,
      shouldFocusOnPress,
      shouldItemFocusBeInset,
    ]
  );

  const getContext = useCallback(() => context, [context]);

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
      onCurrentFocusNotFound(currentFocus, allItemIndexes, previousAllItemIndexes, setCurrentFocus);
    }
  }, [
    allItemIndexes,
    currentFocus,
    initialFocus,
    listSize,
    previousAllItemIndexes,
    setCurrentFocus,
  ]);

  const { keyboardProps } = useKeyboard({
    onKeyDown: (evt) => {
      const forwardKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
      const backwardKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';

      switch (evt.key) {
        case 'Escape':
          evt.continuePropagation();
          break;
        case backwardKey:
          evt.preventDefault();
          setNextFocus(true, listSize, currentFocus, noLoop, setCurrentFocus, allItemIndexes);
          break;

        case forwardKey:
          evt.preventDefault();
          setNextFocus(false, listSize, currentFocus, noLoop, setCurrentFocus, allItemIndexes);
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
