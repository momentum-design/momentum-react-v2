import { ListContextValue } from '../List/List.types';

/**
 * Returns the intended tabIndex for the ListItemBase
 */
export const getListItemBaseTabIndex = ({
  interactive,
  listContext,
  focus,
}: {
  interactive: boolean;
  listContext?: ListContextValue;
  focus: boolean;
}): number => {
  if (!interactive || (listContext && !focus)) {
    return -1;
  } else {
    return 0;
  }
};

export const handleEmptyListItem = ({
  direction,
  itemIndex,
  setDirection,
  setCurrentFocus,
  listSize,
  noLoop,
}: {
  direction: string;
  itemIndex: number;
  setCurrentFocus: (index: number) => void;
  setDirection: (direction: 'forward' | 'backward') => void;
  listSize: number;
  noLoop: boolean;
}): void => {
  let newFocus;
  let newDirection;

  if (direction === 'backward') {
    if (itemIndex <= 0) {
      if (noLoop) {
        newDirection = 'forward';
        newFocus = itemIndex + 1;
      } else {
        newFocus = listSize - 1;
      }
    } else {
      newFocus = itemIndex - 1;
    }
  } else {
    if (itemIndex >= listSize - 1) {
      if (noLoop) {
        newDirection = 'backward';
        newFocus = itemIndex - 1;
      } else {
        newFocus = 0;
      }
    } else {
      newFocus = itemIndex + 1;
    }
  }

  if (setCurrentFocus) {
    if (setDirection && newDirection) {
      setDirection(newDirection);
    }

    setCurrentFocus(newFocus);
  }
};
