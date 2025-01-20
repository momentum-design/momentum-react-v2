import React, { useContext } from 'react';
import { ListContextValue } from './List.types';
import { ListItemBaseIndex } from '../ListItemBase/ListItemBase.types';
import { isNumber } from 'lodash';

export const ListContext = React.createContext<ListContextValue>(null);

export const useListContext = (): ListContextValue => useContext(ListContext);

/**
 * Calculate the next (or previous) index of a list
 *
 * @param isBackward Increase or decrease the index
 * @param listSize List size
 * @param currentFocus Current index
 * @param noLoop loop back to the front or the back of the list
 * @param allItemIndexes available indexes in order
 */
export const setNextFocus = (
  currentFocus: ListItemBaseIndex,
  listSize: number,
  isBackward: boolean,
  noLoop: boolean,
  allItemIndexes: ListItemBaseIndex[]
): ListItemBaseIndex => {
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
  return nextIndex;
};

export const onCurrentFocusNotFound = (
  currentFocus: ListItemBaseIndex,
  allItemIndexes: ListItemBaseIndex[],
  previousAllItemIndexes: ListItemBaseIndex[],
): ListItemBaseIndex => {
  const previousIndexOfCurrentFocus = previousAllItemIndexes.indexOf(currentFocus);

  const allItemIndexesPositions = allItemIndexes.map((itemIndex) =>
    previousAllItemIndexes.indexOf(itemIndex)
  );

  const differences = allItemIndexesPositions.map((position) =>
    Math.abs(position - previousIndexOfCurrentFocus)
  );

  const nextIndex = allItemIndexes[differences.lastIndexOf(Math.min(...differences))];

  return nextIndex;
};
