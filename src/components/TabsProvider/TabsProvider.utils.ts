import { createContext, useContext } from 'react';
import { TabsProviderContextValue } from './TabsProvider.types';

export const TabsProviderContext = createContext<TabsProviderContextValue>(null);

export const useTabsContext: () => TabsProviderContextValue = () => useContext(TabsProviderContext);
