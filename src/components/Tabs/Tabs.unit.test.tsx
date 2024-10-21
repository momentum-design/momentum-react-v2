import React from 'react';

import Tabs from './';
import { renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { Props, TabsContextValue } from './Tabs.types';
import { useTabsContext } from './Tabs.utils';

describe('<Tabs />', () => {
  let result: RenderHookResult<{ children: unknown; props: Props }, TabsContextValue>['result'];
  let rerender: RenderHookResult<{ children: unknown; props: Props }, TabsContextValue>['rerender'];

  const mountHook = (initialProps: Props) => {
    const wrapper = ({ children, props }: { children: unknown; props: Props }) => {
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
