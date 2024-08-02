import React, { Dispatch, SetStateAction, useContext } from 'react';
import { ListContextValue } from './List.types';

export const ListContext = React.createContext<ListContextValue>(null);

export const useListContext = (): ListContextValue => useContext(ListContext);

export const setNextFocus = (
  isBackward: boolean,
  listSize: number,
  currentFocus: number,
  noLoop: boolean,
  setFocus: Dispatch<SetStateAction<number>>
): void => {
  let nextIndex: number;

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

  setFocus(nextIndex);
};
