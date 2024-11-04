import { ReactElement } from 'react';

import { ButtonGroupProps } from '../ButtonGroup';
import { TabProps } from '../Tab';
import { AriaLabelRequired } from '../../utils/a11y';

interface TabListProps extends ButtonGroupProps {
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

export type Props = TabListProps & AriaLabelRequired;
