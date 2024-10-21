import { createContext, useContext } from 'react';
import { TabsContextValue } from './Tabs.types';

export const TabsContext = createContext<TabsContextValue>(null);

export const useTabsContext: () => TabsContextValue = () => useContext(TabsContext);
