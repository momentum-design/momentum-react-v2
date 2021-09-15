import React from 'react';
import { mountAndWait } from '../../../test/utils';

import Icon from '../Icon';

import ButtonControl, { BUTTON_CONTROL_CONSTANTS as CONSTANTS } from './';

describe('<ButtonControl />', () => {
  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<ButtonControl control="close" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = await mountAndWait(<ButtonControl control="close" className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountAndWait(<ButtonControl control="close" id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = await mountAndWait(<ButtonControl control="close" style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isCircular', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<ButtonControl control="close" isCircular />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(<ButtonControl control="close" />);
      const element = wrapper.find(ButtonControl).getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const wrapper = await mountAndWait(<ButtonControl control="close" className={className} />);
      const element = wrapper.find(ButtonControl).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const wrapper = await mountAndWait(<ButtonControl control="close" id={id} />);
      const element = wrapper.find(ButtonControl).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const wrapper = await mountAndWait(<ButtonControl control="close" style={style} />);
      const element = wrapper.find(ButtonControl).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should map the control name to the generated child', async () => {
      expect.assertions(1);

      const control = CONSTANTS.CONTROLS.CLOSE;
      const icon = CONSTANTS.ICONS[control];

      const wrapper = await mountAndWait(<ButtonControl control={control} />);
      const child = wrapper.find(Icon);

      expect(child.props().name).toBe(icon);
    });

    it('should have provided data-circular when isCircle is provided', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(<ButtonControl control="close" isCircular />);
      const element = wrapper.find(ButtonControl).getDOMNode();

      expect(element.getAttribute('data-circular')).toBe('true');
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', async () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const wrapper = await mountAndWait(<ButtonControl control="close" onPress={mockCallback} />);
      const component = wrapper.find(ButtonControl);

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
