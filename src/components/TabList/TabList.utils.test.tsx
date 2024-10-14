import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { TabPanel, Tabs, TabsContext, useTabsContext } from './TabList.utils';
import { renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { TabPanelProps, TabsContextValue, TabsProps } from './TabList.types';

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

describe('<TabPanel />', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      /* NOOP */
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Outside <Tabs />', () => {
    it('renders with console.error', () => {
      const container = mount(<TabPanel>Hello World</TabPanel>);

      expect(container.exists()).toBe(true);
      expect(container.find('div').exists()).toBe(true);
      expect(container.find('div').props()).toStrictEqual({
        'aria-labelledby': undefined,
        id: undefined,
        children: 'Hello World',
        role: 'tabpanel',
      });
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('renders with props and with console.error', () => {
      const container = mount(
        <TabPanel aria-labelledby="label" id="id" className="test">
          Hello World
        </TabPanel>
      );

      expect(container.exists()).toBe(true);
      expect(container.find('div').exists()).toBe(true);
      expect(container.find('div').props()).toStrictEqual({
        'aria-labelledby': 'label',
        className: 'test',
        id: 'id',
        children: 'Hello World',
        role: 'tabpanel',
      });
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('renders as a section when as="section"', () => {
      const container = mount(
        <TabPanel aria-labelledby="label" id="id" className="test" as="section">
          Hello World
        </TabPanel>
      );

      expect(container.exists()).toBe(true);
      expect(container.find('section').exists()).toBe(true);
      expect(container.find('section').props()).toStrictEqual({
        'aria-labelledby': 'label',
        className: 'test',
        id: 'id',
        children: 'Hello World',
        role: 'tabpanel',
      });
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('Inside <Tabs />', () => {
    let parentWrapper: ReactWrapper;

    let wrapper: ReactWrapper;

    const mountComponent = (tabPanelProps: TabPanelProps = {}) => {
      parentWrapper = mount(
        <Tabs selectedTab={'tab'} id="TabListUtils">
          <TabPanel {...tabPanelProps}>Hello World</TabPanel>
        </Tabs>
      );

      wrapper = parentWrapper.find(TabPanel);
    };

    it(`renders correctly`, () => {
      mountComponent();

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('div').exists()).toBe(true);
      expect(wrapper.find('div').props()).toEqual({
        'aria-labelledby': 'TabListUtilstab',
        id: 'TabListUtilstab-TabPanel',
        children: 'Hello World',
        role: 'tabpanel',
      });

      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it(`renders as a 'section' when as='section'`, () => {
      mountComponent({ as: 'section' });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('section').exists()).toBe(true);
      expect(wrapper.find('section').props()).toEqual({
        'aria-labelledby': 'TabListUtilstab',
        id: 'TabListUtilstab-TabPanel',
        children: 'Hello World',
        role: 'tabpanel',
      });

      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it(`renders with props but ignores the provided aria-labelledby and id`, () => {
      mountComponent({
        id: 'TabPanel',
        'aria-labelledby': 'Tab',
        className: 'test',
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.find('div').exists()).toBe(true);
      expect(wrapper.find('div').props()).toEqual({
        'aria-labelledby': 'TabListUtilstab',
        id: 'TabListUtilstab-TabPanel',
        children: 'Hello World',
        role: 'tabpanel',
        className: 'test',
      });

      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });
  });
});
