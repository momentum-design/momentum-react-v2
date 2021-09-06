import React from 'react';
import { mount } from 'enzyme';

import NavigationTab, { NAVIGATION_TAB_CONSTANTS as CONSTANTS } from './';
import { DEFAULTS, STYLE } from './NavigationTab.constants';
import { mountAndWait } from '../../../test/utils';

describe('<NavigationTab />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<NavigationTab />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<NavigationTab className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<NavigationTab id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<NavigationTab style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size', () => {
      expect.assertions(1);

      const size = 200;

      const container = mount(<NavigationTab size={size} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with label', () => {
      expect.assertions(1);

      const label = 'Example label';

      const container = mount(<NavigationTab label={label} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with icon', () => {
      expect.assertions(1);

      const icon = 'contacts';

      const container = mount(<NavigationTab icon={icon} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with count', () => {
      expect.assertions(1);

      const count = 100;

      const container = mount(<NavigationTab count={count} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with active', () => {
      expect.assertions(1);

      const active = true;

      const container = mount(<NavigationTab active={active} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size, label, icon', () => {
      expect.assertions(1);

      const size = 48;
      const label = 'Contacts';
      const icon = 'contacts';

      const container = mount(<NavigationTab size={size} label={label} icon={icon} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size, label, icon, count, active', () => {
      expect.assertions(1);

      const size = 48;
      const label = 'Contacts';
      const icon = 'contacts';
      const count = 0;
      const active = false;

      const container = mount(
        <NavigationTab size={size} label={label} icon={icon} count={count} active={active} />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<NavigationTab />)
        .find(NavigationTab)
        .getDOMNode();

      expect(element.classList.contains(STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<NavigationTab className={className} />)
        .find(NavigationTab)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<NavigationTab id={id} />)
        .find(NavigationTab)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<NavigationTab style={style} />)
        .find(NavigationTab)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided size when size is provided', () => {
      expect.assertions(1);

      const size = CONSTANTS.DEFAULTS.SIZE;

      const element = mount(<NavigationTab size={size} />)
        .find(NavigationTab)
        .getDOMNode();

      expect(element.getAttribute('data-size')).toBe(`${size}`);
    });

    it('should have provided label when label is provided and size is 200 (size 48 has no label)', () => {
      expect.assertions(1);

      const label = DEFAULTS.LABEL;

      const element = mount(<NavigationTab size={200} label={label} />)
        .find(NavigationTab)
        .getDOMNode();

      const target = element.getElementsByClassName(STYLE.label)[0];

      expect(target.innerHTML).toBe(label);
    });

    it('should have provided count when count is provided', () => {
      expect.assertions(1);

      const count = DEFAULTS.COUNT;

      const element = mount(<NavigationTab count={count} />)
        .find(NavigationTab)
        .getDOMNode();

      const target = element.getElementsByClassName(STYLE.count)[0];

      expect(parseInt(target.innerHTML)).toBe(count);
    });

    it('should have provided active when active is provided', () => {
      expect.assertions(1);

      const active = CONSTANTS.DEFAULTS.ACTIVE;

      const element = mount(<NavigationTab active={active} />)
        .find(NavigationTab)
        .getDOMNode();

      expect(element.getAttribute('data-active')).toBe(`${active}`);
    });
  });

  describe('actions', () => {
    /* ...action tests... */
  });
});
