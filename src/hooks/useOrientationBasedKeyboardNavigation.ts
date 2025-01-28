import {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useKeyboard } from '@react-aria/interactions';
import { setNextFocus as defaultSetNextFocus } from '../components/List/List.utils';
import { ListOrientation } from '../components/List/List.types';
import { useFocusWithinState } from './useFocusState';
import { isNumber } from 'lodash';
import { ListItemBaseIndex } from '../components/ListItemBase/ListItemBase.types';

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
  };
};

export type IUseOrientationBasedKeyboardNavigationProps = {
  listSize: number;
  allItemIndexes?: ListItemBaseIndex[];
  orientation: ListOrientation;
  noLoop?: boolean;
  initialFocus?: ListItemBaseIndex;
  setNextFocus?: (
    isBackward: boolean,
    listSize: number,
    currentFocus: ListItemBaseIndex,
    noLoop: boolean,
    setFocus: Dispatch<SetStateAction<ListItemBaseIndex>>,
    allItemIndexes: ListItemBaseIndex[]
  ) => void;
  contextProps?: {
    shouldFocusOnPress?: boolean;
    shouldItemFocusBeInset?: boolean;
  };
};

const useOrientationBasedKeyboardNavigation = (
  props: IUseOrientationBasedKeyboardNavigationProps
): IUseOrientationBasedKeyboardNavigationReturn => {
  const {
    allItemIndexes,
    listSize,
    orientation,
    noLoop,
    contextProps,
    initialFocus = 0,
    setNextFocus = defaultSetNextFocus,
  } = props;
  const [currentFocus, setCurrentFocus] = useState<number | string>(-1);
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
      allItemIndexes,
      ...contextProps,
    }),
    [
      listSize,
      currentFocus,
      noLoop,
      updateFocusBlocked,
      isFocusedWithin,
      allItemIndexes,
      contextProps,
    ]
  );

  useEffect(() => {
    if (!allItemIndexes) {
      if (!isNumber(currentFocus)) {
        console.warn('Unable to handle non-numeric index without allItemIndexes', currentFocus);

        return;
      }

      if (currentFocus >= listSize) {
        setCurrentFocus(listSize - 1);
      }

      return;
    }

    if (currentFocus !== -1 && !allItemIndexes.includes(currentFocus)) {
      const context = getContext();

      setNextFocus(
        null,
        context.listSize,
        context.currentFocus,
        context.noLoop,
        setCurrentFocus,
        context.allItemIndexes
      );
    }
  }, [allItemIndexes, currentFocus, getContext, listSize, setNextFocus]);

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
