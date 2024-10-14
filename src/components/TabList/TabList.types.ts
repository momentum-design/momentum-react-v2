import { PropsWithChildren, ReactElement } from 'react';
import { TabProps } from '../Tab';
import { ButtonGroupProps } from '../ButtonGroup';

export interface Props extends ButtonGroupProps {
  /**
   * Child components of this TabList.
   */
  children?: ReactElement<TabProps> | ReactElement<TabProps>[];

  /**
   * Handler that is called when a tab is pressed. If <Tab /> has a defined `onPress`, this handler is not called.
   */
  onTabSelection?: (tab: React.Key) => void;
}

export type TabsProps = PropsWithChildren<{
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
}>;

export type TabsContextValue = Required<Omit<TabsProps, 'children'>> & {
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
