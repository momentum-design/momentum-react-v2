import { ReactElement } from 'react';

import { ButtonGroupProps } from '../ButtonGroup';
import { TabProps } from '../Tab';

export interface Props extends ButtonGroupProps {
  /**
   * Child components of this TabList.
   */
  children?: ReactElement<TabProps> | ReactElement<TabProps>[];

  /**
   * Handler that is called when a tab is pressed. If <Tab /> has a defined `onPress`, this handler is not called.
   */
  onTabSelection?: (tab: React.Key) => void;

  /**
   * Whether the tab list should have a gray background
   */
  hasBackground?: boolean;
}
