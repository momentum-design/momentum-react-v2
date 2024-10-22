import React, { FC, useCallback, useMemo, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { Props, TabsProviderContextValue } from './TabsProvider.types';
import { TabsProviderContext } from './TabsProvider.utils';

/**
 * The Tabs component.
 */
const TabsProvider: FC<Props> = (props: Props) => {
  const { selectedTab, id: _id, children } = props;

  const [id] = useState(_id || uuidv4());

  const getTabId = useCallback((key: React.Key) => `${id}${key}`, [id]);
  const getPanelId = useCallback((key: React.Key) => `${getTabId(key)}-TabPanel`, [getTabId]);

  const contextProps = useMemo<TabsProviderContextValue>(
    () => ({
      selectedTab,
      id,
      getTabId,
      activeTabId: getTabId(selectedTab),
      activePanelId: getPanelId(selectedTab),
    }),
    [getPanelId, getTabId, selectedTab, id]
  );

  return (
    <TabsProviderContext.Provider value={contextProps}>{children}</TabsProviderContext.Provider>
  );
};

export default TabsProvider;
