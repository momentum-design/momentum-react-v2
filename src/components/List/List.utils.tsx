import React, { Dispatch, SetStateAction, useContext } from 'react';
import { ListContextValue } from './List.types';
import { ListItemBaseIndex } from '../ListItemBase/ListItemBase.types';
import { isNumber } from 'lodash';

export const ListContext = React.createContext<ListContextValue>(null);

export const useListContext = (): ListContextValue => useContext(ListContext);

export const setNextFocus = (
  isBackward: boolean,
  listSize: number,
  currentFocus: ListItemBaseIndex,
  noLoop: boolean,
  setFocus: Dispatch<SetStateAction<ListItemBaseIndex>>,
  allItemIndexes: ListItemBaseIndex[]
): void => {
  let nextIndex: ListItemBaseIndex;

  // Default behaviour with numeric index
  if (!allItemIndexes) {
    if (!isNumber(currentFocus)) {
      console.warn('Cannot handle non-numeric index without allItemIndexes');
      return;
    }

    if (isBackward) {
      nextIndex = (listSize + currentFocus - 1) % listSize;

      if (noLoop && nextIndex > currentFocus) {
        return;
      }
    } else {
      nextIndex = (listSize + currentFocus + 1) % listSize;

      if (noLoop && nextIndex < currentFocus) {
        return;
      }
    }
  } else {
    // With allItemIndexes the current index is looked up in the full array
    const currentIndex = allItemIndexes.indexOf(currentFocus);
    if (isBackward) {
      nextIndex = (listSize + currentIndex - 1) % listSize;

      if (noLoop && nextIndex > currentIndex) {
        return;
      }
    } else {
      nextIndex = (listSize + currentIndex + 1) % listSize;

      if (noLoop && nextIndex < currentIndex) {
        return;
      }
    }

    nextIndex = allItemIndexes[nextIndex];
  }

  setFocus(nextIndex);
};
