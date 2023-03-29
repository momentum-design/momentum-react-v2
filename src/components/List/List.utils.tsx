import React, { useContext } from 'react';
import { ListContextValue } from './List.types';

export const ListContext = React.createContext<ListContextValue>(null);

export const useListContext = (): ListContextValue => useContext(ListContext);

export const setNextFocus = (isUp, listSize, currentFocus, noLoop, setFocus) => {
  let nextIndex;

  if (isUp) {
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
