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
  let currentIndex: number;

  if (!allItemIndexes) {
    if (!isNumber(currentFocus)) {
      console.warn('Cannot handle non-numeric index without allItemIndexes');
      return;
    }
    currentIndex = currentFocus;
  } else {
    currentIndex = allItemIndexes.indexOf(currentFocus);
  }

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

  if (allItemIndexes) {
    nextIndex = allItemIndexes[nextIndex];
  }
  setFocus(nextIndex);
};

export const onCurrentFocusNotFound = (
  currentFocus: ListItemBaseIndex,
  allItemIndexes: ListItemBaseIndex[],
  previousAllItemIndexes: ListItemBaseIndex[],
  setFocus: Dispatch<SetStateAction<ListItemBaseIndex>>
): void => {
  const previousIndexOfCurrentFocus = previousAllItemIndexes.indexOf(currentFocus);

  const allItemIndexesPositions = allItemIndexes.map((itemIndex) =>
    previousAllItemIndexes.indexOf(itemIndex)
  );

  const differences = allItemIndexesPositions.map((position) =>
    Math.abs(position - previousIndexOfCurrentFocus)
  );

  const nextIndex = allItemIndexes[differences.lastIndexOf(Math.min(...differences))];

  setFocus(nextIndex);
};
