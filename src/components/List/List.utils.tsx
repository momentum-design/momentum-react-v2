import React, { useContext } from 'react';
import { ListContextValue } from './List.types';

export const ListContext = React.createContext<ListContextValue>(null);

export const useListContext = (): ListContextValue => useContext(ListContext);
