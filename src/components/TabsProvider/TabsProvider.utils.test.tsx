import React from 'react';
import { TabsProviderContext, useTabsContext } from './TabsProvider.utils';
import { renderHook } from '@testing-library/react-hooks';
import { TabsProviderContextValue } from './TabsProvider.types';

describe('useTabsContext', () => {
  it('returns null when called outside of Context', () => {
    const { result } = renderHook(() => useTabsContext());

    expect(result.current).toEqual(null);
  });

  it('returns context when used inside of Context', () => {
    const wrapper = ({ children }: { children: unknown }) => {
      return (
        <TabsProviderContext.Provider value={'tabsContext' as unknown as TabsProviderContextValue}>
          {children}
        </TabsProviderContext.Provider>
      );
    };
    const { result } = renderHook(() => useTabsContext(), { wrapper });

    expect(result.current).toBe('tabsContext');
  });
});
