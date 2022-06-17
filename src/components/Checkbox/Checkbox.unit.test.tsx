import React from 'react';

import Checkbox, { CHECKBOX_CONSTANTS as CONSTANTS } from './';
import { mountAndWait } from '../../../test/utils';

describe('<Checkbox />', () => {
  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<Checkbox />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = await mountAndWait(<Checkbox className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountAndWait(<Checkbox id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = await mountAndWait(<Checkbox style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with not selected checkbox', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<Checkbox isSelected={false} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with disabled checkbox', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<Checkbox disabled={true} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with indeterminate checkbox', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<Checkbox isIndeterminate={true} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(<Checkbox />);
      const element = wrapper.find(Checkbox).getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const wrapper = await mountAndWait(<Checkbox className={className} />);
      const element = wrapper.find(Checkbox).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const wrapper = await mountAndWait(<Checkbox id={id} />);
      const element = wrapper.find(Checkbox).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const wrapper = await mountAndWait(<Checkbox style={style} />);
      const element = wrapper.find(Checkbox).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided disabled state when provided', async () => {
      expect.assertions(1);

      const disabled = true;

      const wrapper = await mountAndWait(<Checkbox disabled={disabled} />);
      const element = wrapper.find(Checkbox).getDOMNode();

      expect(element.getAttribute('data-disabled')).toBe(disabled.toString());
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', async () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const wrapper = await mountAndWait(<Checkbox onPress={mockCallback} />);
      const component = wrapper.find(Checkbox);

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
