import React from 'react';
import { Tabs, TabsContext, useTabsContext } from './TabList.utils';
import { renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { TabsContextValue, TabsProps } from './TabList.types';

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

describe('<Tabs />', () => {
  let result: RenderHookResult<{ children: unknown; props: TabsProps }, TabsContextValue>['result'];
  let rerender: RenderHookResult<
    { children: unknown; props: TabsProps },
    TabsContextValue
  >['rerender'];

  const mountHook = (initialProps: TabsProps) => {
    const wrapper = ({ children, props }: { children: unknown; props: TabsProps }) => {
      return <Tabs {...props}>{children}</Tabs>;
    };
    ({ result, rerender } = renderHook(() => useTabsContext(), {
      wrapper,
      initialProps: {
        children: <></>,
        props: initialProps,
      },
    }));
  };

  it('creates the context', () => {
    mountHook({ selectedTab: 'tab' });

    expect(result.current).toEqual({
      selectedTab: 'tab',
      id: expect.any(String),
      getTabId: expect.any(Function),
      activeTabId: expect.any(String),
      activePanelId: expect.any(String),
    });

    const { id, getTabId, activeTabId, activePanelId } = result.current;
    expect(activeTabId).toBe(`${id}tab`);
    expect(activePanelId).toBe(`${id}tab-TabPanel`);
    expect(getTabId('newtab')).toBe(`${id}newtab`);
  });

  it('creates the context with given id', () => {
    mountHook({ selectedTab: 'tab', id: 'SpaceListTabs' });

    expect(result.current).toEqual({
      selectedTab: 'tab',
      id: 'SpaceListTabs',
      getTabId: expect.any(Function),
      activeTabId: 'SpaceListTabstab',
      activePanelId: 'SpaceListTabstab-TabPanel',
    });

    const { getTabId } = result.current;
    expect(getTabId('newtab')).toBe(`SpaceListTabsnewtab`);
  });

  it('updates the context when selectedTab is changed', () => {
    mountHook({ selectedTab: 'tab-1' });

    // We want to make sure that this isn't updated
    const id = result.current.id;

    rerender({
      children: <></>,
      props: {
        selectedTab: 'tab-2',
      },
    });

    expect(result.current.id).toEqual(id);
    const { activeTabId, activePanelId } = result.current;
    expect(activeTabId).toBe(`${id}tab-2`);
    expect(activePanelId).toBe(`${id}tab-2-TabPanel`);
  });
});
