import { ReactNode } from 'react';

export interface Props {
  children?: ReactNode | undefined;

  /**
   * The currently selected tab's key
   */
  selectedTab: React.Key;

  /**
   * The ID prefix for the tabs and the tabpanel
   *
   * By default: a UUIDv4 string will be used
   */
  id?: string;
}

export type TabsProviderContextValue = Required<Omit<Props, 'children'>> & {
  /**
   * The ID property of the active tab
   */
  activeTabId: string;

  /**
   * The ID property of the active tabpanel
   */
  activePanelId: string;

  /**
   * Prefixes the given key with the ID of the context
   */
  getTabId: (key: React.Key) => string;
};
