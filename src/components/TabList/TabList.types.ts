import { ReactElement } from 'react';
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
