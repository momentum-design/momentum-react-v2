import { default as Tabs } from './TabsProvider';
import * as CONSTANTS from './TabsProvider.constants';
import { Props } from './TabsProvider.types';
import { useTabsContext } from './TabsProvider.utils';

export { CONSTANTS as TABS_CONSTANTS };

export type TabsProps = Props;

export default Tabs;
export { useTabsContext };
