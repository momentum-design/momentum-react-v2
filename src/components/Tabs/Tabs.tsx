import React, { FC, useCallback, useMemo, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { Props, TabsContextValue } from './Tabs.types';
import { TabsContext } from './Tabs.utils';

/**
 * The Tabs component.
 */
const Tabs: FC<Props> = (props: Props) => {
  const { selectedTab, id: _id, children } = props;

  const [id] = useState(_id || uuidv4());

  const getTabId = useCallback((key: React.Key) => `${id}${key}`, [id]);
  const getPanelId = useCallback((key: React.Key) => `${getTabId(key)}-TabPanel`, [getTabId]);

  const contextProps = useMemo<TabsContextValue>(
    () => ({
      selectedTab,
      id,
      getTabId,
      activeTabId: getTabId(selectedTab),
      activePanelId: getPanelId(selectedTab),
    }),
    [getPanelId, getTabId, selectedTab, id]
  );

  return <TabsContext.Provider value={contextProps}>{children}</TabsContext.Provider>;
};

export default Tabs;
