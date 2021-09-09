import React from 'react';
import { mount } from 'enzyme';

import Tab, { TAB_CONSTANTS as CONSTANTS } from './';
const { DEFAULTS } = CONSTANTS;

describe('<Tab />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<Tab>Example label</Tab>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<Tab className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<Tab id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<Tab style={style} />);

      expect(container).toMatchSnapshot();
    });
    it('should match snapshot with active', () => {
      expect.assertions(1);

      const active = DEFAULTS.ACTIVE;

      const container = mount(<Tab active={active} />);

      expect(container).toMatchSnapshot();
    });
    it('should match snapshot with disabled', () => {
      expect.assertions(1);

      const disabled = DEFAULTS.DISABLED;

      const container = mount(<Tab disabled={disabled} />);

      expect(container).toMatchSnapshot();
    });
    it('should match snapshot with open', () => {
      expect.assertions(1);

      const open = DEFAULTS.OPEN;

      const container = mount(<Tab open={open} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<Tab />)
        .find(Tab)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<Tab className={className} />)
        .find(Tab)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<Tab id={id} />)
        .find(Tab)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<Tab style={style} />)
        .find(Tab)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided id when active id is provided', () => {
      expect.assertions(1);

      const active = DEFAULTS.ACTIVE;

      const element = mount(<Tab active={active} />)
        .find(Tab)
        .getDOMNode();

      expect(element.getAttribute('data-active')).toBe(`${active}`);
    });

    it('should have provided disabled when disabled disabled provided', () => {
      expect.assertions(1);

      const disabled = DEFAULTS.DISABLED;

      const element = mount(<Tab disabled={disabled} />)
        .find(Tab)
        .getDOMNode();

      expect(element.getAttribute('data-disabled')).toBe(`${disabled}`);
    });

    it('should have provided open when open is provided', () => {
      expect.assertions(1);

      const open = DEFAULTS.OPEN;

      const element = mount(<Tab active={open} />)
        .find(Tab)
        .getDOMNode();

      expect(element.getAttribute('data-open')).toBe(`${open}`);
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const component = mount(<Tab onPress={mockCallback} />).find(Tab);

      component.props().onPress({
        type: 'press',
        pointerType: 'mouse',
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
        target: component.getDOMNode(),
      });

      expect(mockCallback).toBeCalledTimes(1);
    });
  });
});
