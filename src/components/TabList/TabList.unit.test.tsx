import { mount } from 'enzyme';
import React from 'react';

import { Orientation } from '@react-types/shared';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as useOrientationBasedKeyboardNavigationHook from '../../hooks/useOrientationBasedKeyboardNavigation';
import Tab from '../Tab';
import TabsProvider from '../TabsProvider';
import TabList, { TAB_LIST_CONSTANTS as CONSTANTS } from './';

describe('<TabList />', () => {
  const detachedCommonProps = (activeTab: string | undefined = 'tab-1') => ({
    children: [
      <Tab key="tab-1" active={activeTab === 'tab-1'}>
        Tab 1
      </Tab>,
      <Tab key="tab-2" active={activeTab === 'tab-2'}>
        Tab 2
      </Tab>,
      <Tab key="tab-3" active={activeTab === 'tab-3'}>
        Tab 3
      </Tab>,
    ],
  });

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<TabList {...detachedCommonProps()} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<TabList {...detachedCommonProps()} className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<TabList {...detachedCommonProps()} id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<TabList {...detachedCommonProps()} style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with hasBackground = true', () => {
      expect.assertions(1);

      const container = mount(<TabList {...detachedCommonProps()} hasBackground />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have role', () => {
      expect.assertions(1);
      const element = mount(<TabList {...detachedCommonProps()} />)
        .find(TabList)
        .getDOMNode<HTMLDivElement>();

      expect(element.getAttribute('role')).toBe('tablist');
    });

    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<TabList {...detachedCommonProps()} />)
        .find(TabList)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<TabList {...detachedCommonProps()} className={className} />)
        .find(TabList)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<TabList {...detachedCommonProps()} id={id} />)
        .find(TabList)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<TabList {...detachedCommonProps()} style={style} />)
        .find(TabList)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should pass isSubTabList prop', () => {
      expect.assertions(1);

      const element = mount(<TabList {...detachedCommonProps()} hasBackground />)
        .find(TabList)
        .getDOMNode();

      expect(element.getAttribute('data-has-background')).toBe(`${true}`);
    });

    it('calls useOrientationBasedKeyboardNavigation with the correct props', () => {
      const keyboardNavigationHookSpy = jest.spyOn(
        useOrientationBasedKeyboardNavigationHook,
        'default'
      );

      mount(
        <TabList orientation="vertical">
          <Tab key={'tab-1'}>Tab 1</Tab>
          <Tab key={'tab-2'}>Tab 2</Tab>
          <Tab key={'disabled'} disabled>
            Disabled
          </Tab>
          <Tab key={'tab-3'}>Tab 3</Tab>
        </TabList>
      );

      expect(keyboardNavigationHookSpy).toHaveBeenCalledWith({
        noLoop: false,
        listSize: 3,
        orientation: 'vertical',
      });
    });

    it('adds role="tab" to <Tab /> children', () => {
      const wrapper = mount(<TabList {...detachedCommonProps('tab-1')} />);

      wrapper.find(Tab).forEach((tab) => {
        expect(tab.props()).toEqual({
          children: expect.any(String),
          role: 'tab',
          onPress: expect.any(Function),
          active: tab.key() === 'tab-1',
          tabIndex: tab.key() === 'tab-1' ? 0 : -1,
        });
      });
    });
  });

  describe('actions', () => {
    it.each`
      keyPress        | startingIndex | endingIndex
      ${'ArrowLeft'}  | ${0}          | ${2}
      ${'ArrowLeft'}  | ${1}          | ${0}
      ${'ArrowLeft'}  | ${2}          | ${1}
      ${'ArrowRight'} | ${0}          | ${1}
      ${'ArrowRight'} | ${1}          | ${2}
      ${'ArrowRight'} | ${2}          | ${0}
    `(
      `changes focus when pressing $keyPress for horizontal ($startingIndex -> $endingIndex)`,
      async ({
        keyPress,
        startingIndex,
        endingIndex,
      }: {
        keyPress: string;
        startingIndex: number;
        endingIndex: number;
      }) => {
        const user = userEvent.setup();

        const { getAllByRole } = render(
          <TabList>
            {[0, 1, 2].map((i) => (
              <Tab key={i} active={startingIndex === i}>{`Tab ${i + 1}`}</Tab>
            ))}
          </TabList>
        );

        const tabs = getAllByRole('tab');

        await user.tab();

        expect(tabs[startingIndex]).toHaveFocus();

        await user.keyboard(`{${keyPress}}`);

        expect(tabs[endingIndex]).toHaveFocus();
      }
    );

    it.each`
      keyPress       | startingIndex | endingIndex
      ${'ArrowUp'}   | ${0}          | ${2}
      ${'ArrowUp'}   | ${1}          | ${0}
      ${'ArrowUp'}   | ${2}          | ${1}
      ${'ArrowDown'} | ${0}          | ${1}
      ${'ArrowDown'} | ${1}          | ${2}
      ${'ArrowDown'} | ${2}          | ${0}
    `(
      `changes focus when pressing $keyPress for vertical ($startingIndex -> $endingIndex)`,
      async ({
        keyPress,
        startingIndex,
        endingIndex,
      }: {
        keyPress: string;
        startingIndex: number;
        endingIndex: number;
      }) => {
        const user = userEvent.setup();

        const { getAllByRole } = render(
          <TabList orientation="vertical">
            {[0, 1, 2].map((i) => (
              <Tab key={i} active={startingIndex === i}>{`Tab ${i + 1}`}</Tab>
            ))}
          </TabList>
        );

        const tabs = getAllByRole('tab');

        await user.tab();

        expect(tabs[startingIndex]).toHaveFocus();

        await user.keyboard(`{${keyPress}}`);

        expect(tabs[endingIndex]).toHaveFocus();
      }
    );

    it.each`
      orientation     | keyPress
      ${'horizontal'} | ${'ArrowUp'}
      ${'horizontal'} | ${'ArrowDown'}
      ${'vertical'}   | ${'ArrowLeft'}
      ${'vertical'}   | ${'ArrowRight'}
    `(
      `doesn't change focus when pressing $keyPress for $orientation`,
      async ({ orientation, keyPress }: { orientation: Orientation; keyPress: string }) => {
        const user = userEvent.setup();

        const { getAllByRole } = render(
          <TabList orientation={orientation}>
            {[0, 1, 2].map((i) => (
              <Tab key={i}>{`Tab ${i + 1}`}</Tab>
            ))}
          </TabList>
        );

        const tabs = getAllByRole('tab');

        await user.tab();

        expect(tabs[0]).toHaveFocus();

        await user.keyboard(`{${keyPress}}`);

        expect(tabs[0]).toHaveFocus();
      }
    );

    it('skips over disabled elements when using keyboard navigation', async () => {
      const user = userEvent.setup();

      const { getAllByRole } = render(
        <TabList>
          <Tab key="tab-1" active>
            Tab 1
          </Tab>
          <Tab key="tab-2">Tab 2</Tab>
          <Tab key="disabled" disabled>
            Disabled
          </Tab>
          <Tab key="tab-3">Tab 3</Tab>
        </TabList>
      );

      const tabs = getAllByRole('tab');

      await user.tab();
      expect(tabs[0]).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      await user.keyboard('{ArrowRight}');
      expect(tabs[3]).toHaveFocus();

      await user.keyboard('{ArrowLeft}');
      expect(tabs[1]).toHaveFocus();
    });

    it('sets the tabindex correctly when a disabled element is in the list', async () => {
      const { getAllByRole } = render(
        <TabList>
          <Tab key="tab-1">Tab 1</Tab>
          <Tab key="tab-2">Tab 2</Tab>
          <Tab key="disabled" disabled>
            Disabled
          </Tab>
          <Tab key="tab-3" active>
            Tab 3
          </Tab>
        </TabList>
      );

      const tabs = getAllByRole('tab');

      expect(tabs[0].tabIndex).toBe(-1);
      expect(tabs[1].tabIndex).toBe(-1);
      expect(tabs[2].tabIndex).toBe(-1);
      expect(tabs[3].tabIndex).toBe(0);
    });

    it('fires onTabSelection when a tab is clicked', async () => {
      const user = userEvent.setup();

      const onTabSelection = jest.fn();

      const { getByText } = render(
        <TabList onTabSelection={onTabSelection} {...detachedCommonProps()} />
      );

      await user.click(getByText('Tab 2'));
      expect(onTabSelection).toHaveBeenCalledWith('tab-2');
    });

    it('fires onTabSelection when a tab is activated by keyboard', async () => {
      const user = userEvent.setup();

      const onTabSelection = jest.fn();

      const { getByText, getAllByRole } = render(
        <TabList onTabSelection={onTabSelection} {...detachedCommonProps()} />
      );

      await user.tab();
      await user.keyboard('{ArrowRight}');
      await user.keyboard('{Enter}');
      expect(onTabSelection).toHaveBeenCalledWith('tab-2');
    });

    it(`resets the focused element when tabbing out`, async () => {
      const user = userEvent.setup();

      const { getAllByRole } = render(<TabList {...detachedCommonProps('tab-2')} />);
      const tabs = getAllByRole('tab');

      await user.tab();
      expect(tabs[1]).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      expect(tabs[2]).toHaveFocus();

      await user.tab();
      tabs.forEach((tab) => {
        expect(tab).not.toHaveFocus();
      });

      await user.tab({ shift: true });
      expect(tabs[1]).toHaveFocus();

      await user.keyboard('{ArrowLeft}');
      expect(tabs[0]).toHaveFocus();

      await user.tab({ shift: true });
      tabs.forEach((tab) => {
        expect(tab).not.toHaveFocus();
      });

      await user.tab();
      expect(tabs[1]).toHaveFocus();
    });
  });

  describe('within <TabsProvider />', () => {
    const TABS: { key: React.Key; label: string; disabled?: boolean }[] = [
      { key: 'tab-1', label: 'Tab 1' },
      { key: 'tab-2', label: 'Tab 2' },
      { key: 'tab-3', label: 'Tab 3' },
    ];

    const Component = ({ defaultSelectedTab = 'tab-1' }: { defaultSelectedTab?: string }) => {
      const [selectedTab, setSelectedTab] = React.useState<React.Key>(defaultSelectedTab);

      return (
        <TabsProvider selectedTab={selectedTab} id="TestComponent">
          <TabList onTabSelection={setSelectedTab}>
            {TABS.map((tab) => (
              <Tab key={tab.key}>{tab.label}</Tab>
            ))}
          </TabList>
        </TabsProvider>
      );
    };

    describe('snapshot', () => {
      it('matches snapshot', () => {
        const container = mount(<Component />);

        expect(container).toMatchSnapshot();
      });

      it('matches snapshot when defining the selected tab', () => {
        const container = mount(<Component defaultSelectedTab="tab-2" />);

        expect(container).toMatchSnapshot();
      });
    });

    describe('attributes', () => {
      it('sets the attributes correctly on tabs', () => {
        const container = mount(<Component />);

        const tabs = container.find(Tab);

        tabs.forEach((tab) => {
          let props: Record<string, unknown> = {
            role: 'tab',
            onPress: expect.any(Function),
            children: expect.any(String),
          };

          if (tab.key() === 'tab-1') {
            // this should be the active element

            props = {
              ...props,
              tabIndex: 0,
              active: true,
              'aria-selected': true,
              'aria-controls': 'TestComponenttab-1-TabPanel',
              id: 'TestComponenttab-1',
            };
          } else {
            // all of these shouldn't be active

            props = {
              ...props,
              tabIndex: -1,
              active: false,
              'aria-selected': false,
              'aria-controls': undefined,
              id: `TestComponent${tab.key()}`,
            };
          }

          expect(tab.props()).toEqual(props);
        });
      });
    });
  });
});
