import React from 'react';
import { TabsContext, useTabsContext } from './Tabs.utils';
import { renderHook } from '@testing-library/react-hooks';
import { TabsContextValue } from './Tabs.types';

describe('useTabsContext', () => {
  it('returns null when called outside of Context', () => {
    const { result } = renderHook(() => useTabsContext());

    expect(result.current).toEqual(null);
  });

  it('returns context when used inside of Context', () => {
    const wrapper = ({ children }: { children: unknown }) => {
      return (
        <TabsContext.Provider value={'tabsContext' as unknown as TabsContextValue}>
          {children}
        </TabsContext.Provider>
      );
    };
    const { result } = renderHook(() => useTabsContext(), { wrapper });

    expect(result.current).toBe('tabsContext');
  });
});
