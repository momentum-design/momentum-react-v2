import React from 'react';

import Checkbox, { CHECKBOX_CONSTANTS as CONSTANTS } from './';
import { mountAndWait } from '../../../test/utils';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

    it('should match snapshot with labelled checkbox', async () => {
      expect.assertions(1);

      const label = 'Example text';

      const container = await mountAndWait(<Checkbox label={label} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with not selected checkbox', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<Checkbox isSelected={false} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with selected checkbox', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<Checkbox isSelected={true} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with disabled checkbox', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<Checkbox isDisabled={true} />);

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

      const wrapper = await mountAndWait(<Checkbox isDisabled={disabled} />);
      const element = wrapper.find(Checkbox).getDOMNode();

      expect(element.getAttribute('data-disabled')).toBe(disabled.toString());
    });
    it('should use ariaLabel prop when provided', async () => {
      expect.assertions(1);

      const ariaLabel = 'test aria label';

      const wrapper = await mountAndWait(<Checkbox ariaLabel={ariaLabel} />);
      const element = wrapper.find('input').getDOMNode();

      expect(element.getAttribute('aria-label')).toBe(ariaLabel);
    });
    it('should use label prop when ariaLabel prop not provided', async () => {
      expect.assertions(1);

      const label = 'test label';
      const wrapper = await mountAndWait(<Checkbox label={label} />);
      const element = wrapper.find('input').getDOMNode();

      expect(element.getAttribute('aria-label')).toBe(label);
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', async () => {
      expect.assertions(4);
      const user = userEvent.setup();

      const mockCallback = jest.fn();

      const { getByRole } = render(<Checkbox label="Click me" onChange={mockCallback} />);

      const input = getByRole('checkbox');

      await user.click(input);
      expect(mockCallback).toBeCalledTimes(1);
      expect(mockCallback).toBeCalledWith(true);

      await user.click(input);
      expect(mockCallback).toBeCalledTimes(2);
      expect(mockCallback).toBeCalledWith(false);
    });

    it('should handle press space key', async () => {
      expect.assertions(2);
      const user = userEvent.setup();

      const mockCallback = jest.fn();

      const { getByRole } = render(<Checkbox label="Click me" onChange={mockCallback} />);

      const input = getByRole('checkbox');

      await user.type(input, '{Space}');
      expect(mockCallback).toBeCalledWith(true);
      expect(input).toBeChecked();
    });
  });
});
