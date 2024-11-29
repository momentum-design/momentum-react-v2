import React from 'react';

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mountAndWait } from '../../../test/utils';
import Checkbox, { CHECKBOX_CONSTANTS as CONSTANTS } from './';
import Text from '../Text';

describe('<Checkbox />', () => {
  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<Checkbox aria-label="Checkbox" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = await mountAndWait(
        <Checkbox aria-label="Checkbox" className={className} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountAndWait(<Checkbox aria-label="Checkbox" id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = await mountAndWait(<Checkbox aria-label="Checkbox" style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with labelled checkbox', async () => {
      expect.assertions(1);

      const label = 'Example text';

      const container = await mountAndWait(<Checkbox aria-label="Checkbox" label={label} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with labelled checkbox and description', async () => {
      expect.assertions(1);

      const label = 'Example text';
      const description = 'Description';

      const container = await mountAndWait(
        <Checkbox aria-label="Checkbox" label={label} description={description} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with not selected checkbox', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<Checkbox aria-label="Checkbox" isSelected={false} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with selected checkbox', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<Checkbox aria-label="Checkbox" isSelected={true} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with disabled checkbox', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<Checkbox aria-label="Checkbox" isDisabled={true} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with indeterminate checkbox', async () => {
      expect.assertions(1);

      const container = await mountAndWait(
        <Checkbox aria-label="Checkbox" isIndeterminate={true} />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(<Checkbox aria-label="Checkbox" />);
      const element = wrapper.find(Checkbox).getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const wrapper = await mountAndWait(<Checkbox aria-label="Checkbox" className={className} />);
      const element = wrapper.find(Checkbox).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const wrapper = await mountAndWait(<Checkbox aria-label="Checkbox" id={id} />);
      const element = wrapper.find(Checkbox).find('label').getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const wrapper = await mountAndWait(<Checkbox aria-label="Checkbox" style={style} />);
      const element = wrapper.find(Checkbox).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided disabled state when provided', async () => {
      expect.assertions(1);

      const disabled = true;

      const wrapper = await mountAndWait(<Checkbox aria-label="Checkbox" isDisabled={disabled} />);
      const element = wrapper.find(Checkbox).getDOMNode();

      expect(element.getAttribute('data-disabled')).toBe(disabled.toString());
    });

    it('should use label prop for aria-label when provided', async () => {
      expect.assertions(1);

      const label = 'test label';

      const wrapper = await mountAndWait(<Checkbox aria-label="Checkbox" label={label} />);
      const element = wrapper.find('input').getDOMNode();

      expect(element.getAttribute('aria-label')).toBe(label);
    });

    it('should use aria-label prop when label prop not provided', async () => {
      expect.assertions(1);

      const ariaLabel = 'test aria label';
      const wrapper = await mountAndWait(<Checkbox aria-label={ariaLabel} />);
      const element = wrapper.find('input').getDOMNode();

      expect(element.getAttribute('aria-label')).toBe(ariaLabel);
    });

    it('should not add a description when description if not provided', async () => {
      const wrapper = await mountAndWait(<Checkbox label="Checkbox Label" />);

      const descriptionElement = wrapper.find(Text).filter('.md-checkbox-description');
      expect(descriptionElement.exists()).toBe(false);
    });

    it('should add a description when description if provided', async () => {
      const wrapper = await mountAndWait(
        <Checkbox label="Checkbox Label" description="Description" />
      );

      const descriptionElement = wrapper.find(Text).filter('.md-checkbox-description');
      expect(descriptionElement.exists()).toBe(true);
      expect(descriptionElement.text()).toEqual('Description');

      expect(wrapper.find('input').prop('aria-describedby')).toBe(descriptionElement.prop('id'));
    });

    it('should set the aria-describedby prop to aria-describedby given if provided', async () => {
      const wrapper = await mountAndWait(
        <Checkbox label="Checkbox Label" aria-describedby="test-id" />
      );

      const input = wrapper.find('input');
      expect(input.prop('aria-describedby')).toBe('test-id');
    });

    it('should merge description and aria-describedby if not are provided', async () => {
      const wrapper = await mountAndWait(
        <Checkbox label="Checkbox Label" description="Description" aria-describedby="test-id" />
      );

      const input = wrapper.find('input');
      expect(input.prop('aria-describedby')).toBe('checkbox-description-test-ID test-id');
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', async () => {
      expect.assertions(4);
      const user = userEvent.setup();

      const mockCallback = jest.fn();

      const { getByRole } = render(
        <Checkbox aria-label="Checkbox" label="Click me" onChange={mockCallback} />
      );

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

      const { getByRole } = render(
        <Checkbox aria-label="Checkbox" label="Click me" onChange={mockCallback} />
      );

      const input = getByRole('checkbox');

      await user.type(input, '{Space}');
      expect(mockCallback).toBeCalledWith(true);
      expect(input).toBeChecked();
    });
  });
});
