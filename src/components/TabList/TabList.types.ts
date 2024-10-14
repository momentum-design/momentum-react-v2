import { CSSProperties, PropsWithChildren, ReactElement } from 'react';
import { TabProps } from '../Tab';
import { ButtonGroupProps } from '../ButtonGroup';

export interface Props extends ButtonGroupProps {
  /**
   * Child components of this TabList.
   */
  children?: ReactElement<TabProps> | ReactElement<TabProps>[];

  onTabSelection?: (tab: React.Key) => void;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}

export type TabsProps = PropsWithChildren<{
  /**
   * @todo
   */
  selectedTab: React.Key;

  /**
   * @todo
   */
  id?: string;
}>;

export type TabsContextValue = Required<Omit<TabsProps, 'children'>> & {
  /**
   * @todo
   */
  activeTabId: string;

  /**
   * @todo
   */
  activePanelId: string;

  /**
   * @todo
   */
  getTabId: (key: React.Key) => string;
};
