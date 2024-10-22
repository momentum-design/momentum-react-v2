import React from 'react';

import TabsProvider from '.';
import { renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { Props, TabsProviderContextValue } from './TabsProvider.types';
import { useTabsContext } from './TabsProvider.utils';

describe('<TabsProvider />', () => {
  let result: RenderHookResult<
    { children: unknown; props: Props },
    TabsProviderContextValue
  >['result'];
  let rerender: RenderHookResult<
    { children: unknown; props: Props },
    TabsProviderContextValue
  >['rerender'];

  const mountHook = (initialProps: Props) => {
    const wrapper = ({ children, props }: { children: unknown; props: Props }) => {
      return <TabsProvider {...props}>{children}</TabsProvider>;
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
