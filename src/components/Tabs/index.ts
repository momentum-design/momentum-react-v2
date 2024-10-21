import { default as Tabs } from './Tabs';
import * as CONSTANTS from './Tabs.constants';
import { Props } from './Tabs.types';
import { useTabsContext } from './Tabs.utils';

export { CONSTANTS as TABS_CONSTANTS };

export type TabsProps = Props;

export default Tabs;
export { useTabsContext };
