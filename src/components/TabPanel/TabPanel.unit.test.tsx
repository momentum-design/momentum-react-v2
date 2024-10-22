import React from 'react';
import { mount } from 'enzyme';

import TabPanel, { TAB_PANEL_CONSTANTS as CONSTANTS } from './';
import TabsProvider from '../TabsProvider';

describe('<TabPanel />', () => {
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {
      /* NOOP */
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<TabPanel>Hello World</TabPanel>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<TabPanel className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<TabPanel style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with tagName', () => {
      expect.assertions(1);

      const container = mount(<TabPanel tagName="section" />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have the tabpanel role', () => {
      expect.assertions(1);

      const element = mount(<TabPanel />)
        .find(TabPanel)
        .getDOMNode();

      expect(element.getAttribute('role')).toBe('tabpanel');
    });

    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<TabPanel />)
        .find(TabPanel)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<TabPanel className={className} />)
        .find(TabPanel)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should not use a provided id', () => {
      expect.assertions(1);

      const id = 'example-id';

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const element = mount(<TabPanel id={id} />)
        .find(TabPanel)
        .getDOMNode();

      expect(element.id).not.toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<TabPanel style={style} />)
        .find(TabPanel)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should render as the provided tag name', () => {
      const container = mount(
        <TabPanel aria-labelledby="label" className="test" tagName="section">
          Hello World
        </TabPanel>
      );

      expect(container.exists()).toBe(true);
      expect(container.find('section').exists()).toBe(true);
      expect(container.find('section').props()).toStrictEqual({
        'aria-labelledby': 'label',
        className: 'md-tab-panel-wrapper test',
        id: undefined,
        children: 'Hello World',
        role: 'tabpanel',
      });
      expect(consoleWarnSpy).toHaveBeenCalled();
    });

    it('should set the id and aria-labelledby based on selectedTab from <TabsProvider />', () => {
      const wrapper = mount(
        <TabsProvider selectedTab={'tab'} id="TabListUtils">
          <TabPanel>Hello World</TabPanel>
        </TabsProvider>
      );

      const container = wrapper.find(TabPanel);
      const element = container.getDOMNode();

      expect(element.getAttribute('id')).toBe('TabListUtilstab-TabPanel');
      expect(element.getAttribute('aria-labelledby')).toBe('TabListUtilstab');
    });
  });

  describe('actions', () => {
    it('renders with a console.warn outside of <TabsProvider />', () => {
      const container = mount(<TabPanel>Hello World</TabPanel>);

      expect(container.exists()).toBe(true);
      expect(consoleWarnSpy).toHaveBeenCalled();
    });
  });
});
