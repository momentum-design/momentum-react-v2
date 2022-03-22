import { mount } from 'enzyme';
import React from 'react';

import { mountAndWait } from '../../../test/utils';

import { STYLE, SIZES } from './NavigationTab.constants';
import { NavTabSize } from './NavigationTab.types';

import NavigationTab, { NAVIGATION_TAB_CONSTANTS as CONSTANTS } from './';

describe('<NavigationTab />', () => {
  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<NavigationTab />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = await mountAndWait(<NavigationTab className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountAndWait(<NavigationTab id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = await mountAndWait(<NavigationTab style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size', async () => {
      expect.assertions(1);

      const sizes = Object.values(SIZES).map((size, index) => {
        return <NavigationTab key={index} size={size as NavTabSize} />;
      });
      const container = await mountAndWait(<div>{sizes}</div>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with label', async () => {
      expect.assertions(1);

      const label = 'Example label';

      const container = await mountAndWait(<NavigationTab label={label} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with icon', async () => {
      expect.assertions(1);

      const icon = 'contacts';

      const container = await mountAndWait(<NavigationTab icon={icon} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with count', async () => {
      expect.assertions(1);

      const count = 100;

      const container = await mountAndWait(<NavigationTab count={count} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with active', async () => {
      expect.assertions(1);

      const active = true;

      const container = await mountAndWait(<NavigationTab active={active} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size, label, icon', async () => {
      expect.assertions(1);

      const size = 48;
      const label = 'Contacts';
      const icon = 'contacts';

      const container = await mountAndWait(<NavigationTab size={size} label={label} icon={icon} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size, label, icon, count, active', async () => {
      expect.assertions(1);

      const size = 48;
      const label = 'Contacts';
      const icon = 'contacts';
      const count = 0;
      const active = false;

      const container = await mountAndWait(
        <NavigationTab size={size} label={label} icon={icon} count={count} active={active} />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(<NavigationTab />);
      const element = wrapper.find(NavigationTab).getDOMNode();

      expect(element.classList.contains(STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const wrapper = await mountAndWait(<NavigationTab className={className} />);
      const element = wrapper.find(NavigationTab).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const wrapper = mount(<NavigationTab id={id} />);
      const element = wrapper.find(NavigationTab).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const wrapper = await mountAndWait(<NavigationTab style={style} />);
      const element = wrapper.find(NavigationTab).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided size when size is provided', async () => {
      expect.assertions(1);

      const size = CONSTANTS.DEFAULTS.SIZE;

      const wrapper = await mountAndWait(<NavigationTab size={size} />);
      const element = wrapper.find(NavigationTab).getDOMNode();

      expect(element.getAttribute('data-size')).toBe(`${size}`);
    });

    it('should have provided label when label is provided and size is 200 (size 48 has no label)', async () => {
      expect.assertions(1);

      const label = 'Messaging';

      const wrapper = await mountAndWait(<NavigationTab size={200} label={label} />);
      const element = wrapper.find(NavigationTab).getDOMNode();

      const target = element.getElementsByClassName(STYLE.label)[0];

      expect(target.innerHTML).toBe(label);
    });

    it('should have provided count when count is provided and is >0', async () => {
      expect.assertions(1);

      const count = 1;

      const wrapper = await mountAndWait(<NavigationTab count={count} />);
      const element = wrapper.find(NavigationTab).getDOMNode();

      const target = element.getElementsByClassName(STYLE.count)[0];

      expect(parseInt(target.innerHTML)).toBe(count);
    });

    it('should have provided active when active is provided', async () => {
      expect.assertions(1);

      const active = CONSTANTS.DEFAULTS.ACTIVE;

      const wrapper = await mountAndWait(<NavigationTab active={active} />);
      const element = wrapper.find(NavigationTab).getDOMNode();

      expect(element.getAttribute('data-active')).toBe(`${active}`);
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', async () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const wrapper = await mountAndWait(<NavigationTab onPress={mockCallback} />);
      const component = wrapper.find(NavigationTab);

      component.props().onPress({
        type: 'press',
        pointerType: 'mouse',
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
        target: component.getDOMNode(),
        altKey: false,
      });

      expect(mockCallback).toBeCalledTimes(1);
    });
  });
});
