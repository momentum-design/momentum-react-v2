import React from 'react';
import { mount } from 'enzyme';
import { ButtonPill } from '@momentum-ui/react';

import { STYLE } from './ButtonPill.constants';


describe('<ButtonPill />', () => {
  let container;

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      container = mount(<ButtonPill>Example Text</ButtonPill>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', () => {
      expect.assertions(1);

      container = mount(<ButtonPill color="join">Example Text</ButtonPill>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when disabled', () => {
      expect.assertions(1);

      container = mount(<ButtonPill disabled>Example Text</ButtonPill>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when a ghost', () => {
      expect.assertions(1);

      container = mount(<ButtonPill ghost>Example Text</ButtonPill>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when a ghost and disabled', () => {
      expect.assertions(1);

      container = mount(<ButtonPill ghost disabled>Example Text</ButtonPill>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when color is outlined', () => {
      expect.assertions(1);

      container = mount(<ButtonPill outline>Example Text</ButtonPill>);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its main class', () => {
      expect.assertions(1);

      const component = mount(<ButtonPill />).childAt(0);

      expect(component.hasClass(STYLE.wrapper)).toBe(true);
    });

    it('should pass disabled prop', () => {
      expect.assertions(1);

      const disabled = true;

      const component = mount(<ButtonPill disabled={disabled} />).childAt(0);

      expect(component.prop('data-disabled')).toBe(true);
    });

    it('should pass disabled prop', () => {
      expect.assertions(1);

      const ghost = true;

      const component = mount(<ButtonPill ghost={ghost} />).childAt(0);

      expect(component.prop('data-ghost')).toBe(true);
    });

    it('should pass disabled prop', () => {
      expect.assertions(1);

      const outline = true;

      const component = mount(<ButtonPill outline={outline} />).childAt(0);

      expect(component.prop('data-outline')).toBe(true);
    });

    it('should pass size prop', () => {
      expect.assertions(1);

      const size = 3;

      const component = mount(<ButtonPill size={size} />).childAt(0);

      expect(component.prop('data-size')).toBe(size);
    });

    it('should pass color prop', () => {
      expect.assertions(1);

      const color = 'join';

      const component = mount(<ButtonPill color={color} />).childAt(0);

      expect(component.prop('data-color')).toBe(color);
    });

    it('should pass onClick prop', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const component = mount(<ButtonPill onClick={mockCallback} />).childAt(0);

      component.simulate('click');

      expect(mockCallback.mock.calls.length).toEqual(1);
    });
  });
});
