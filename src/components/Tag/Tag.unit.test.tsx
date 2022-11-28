import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { BUTTON_SIMPLE_CONSTANTS } from '../ButtonSimple';

import Tag, { TAG_CONSTANTS as CONSTANTS } from './';

describe('<Tag />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = render(<Tag />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with children', () => {
      expect.assertions(1);

      const container = render(<Tag>example-text</Tag>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = render(<Tag className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = render(<Tag id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = render(<Tag style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', () => {
      expect.assertions(1);

      const color = Object.values(CONSTANTS.COLORS).pop();

      const container = render(<Tag color={color} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with format', () => {
      expect.assertions(1);

      const format = Object.values(CONSTANTS.FORMATS).pop();

      const container = render(<Tag format={format} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with disabled format and color', () => {
      expect.assertions(1);

      const color = Object.values(CONSTANTS.COLORS).pop();
      const format = Object.values(CONSTANTS.FORMATS).pop();

      const container = render(<Tag color={color} format={format} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    const testid = 'test-id';

    it('should extend the <ButtonSimple /> component', async () => {
      expect.assertions(1);

      render(<Tag data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.classList.contains(BUTTON_SIMPLE_CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have class attribute when className prop is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      render(<Tag data-testid={testid} className={className} />);

      const component = await screen.findByTestId(testid);

      expect(component.classList.contains(className)).toBe(true);
    });

    it('should have id attribute when id prop is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      render(<Tag id={id} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.id).toBe(id);
    });

    it('should have style attribute when style prop is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      render(<Tag style={style} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.style.color).toBe(style.color);
    });

    it('should have child text when children prop is provided', async () => {
      expect.assertions(1);

      const children = 'example-text';

      render(<Tag data-testid={testid}>{children}</Tag>);

      const component = await screen.findByTestId(testid);

      expect(component.children[0].innerHTML).toBe(children);
    });

    it('should have data-color attribute when color prop is provided', async () => {
      expect.assertions(1);

      const attribute = 'data-color';
      const color = Object.values(CONSTANTS.COLORS).pop();

      render(<Tag color={color} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.getAttribute(attribute)).toBe(color);
    });

    it('should have data-format attribute when format prop is provided', async () => {
      expect.assertions(1);

      const attribute = 'data-format';
      const format = Object.values(CONSTANTS.FORMATS).pop();

      render(<Tag format={format} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.getAttribute(attribute)).toBe(format);
    });

    it('should have disabled attribute when format prop is disabling', async () => {
      expect.assertions(1);

      const attribute = 'disabled';
      const format = Object.values(CONSTANTS.FORMATS_DISABLED).pop();

      render(<Tag format={format} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.hasAttribute(attribute)).toBe(true);
    });

    it('should have default data-color attribute when format prop is disabling', async () => {
      expect.assertions(1);

      const attribute = 'data-color';
      const color = Object.values(CONSTANTS.COLORS).pop();
      const format = Object.values(CONSTANTS.FORMATS_DISABLED).pop();

      render(<Tag color={color} format={format} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.getAttribute(attribute)).toBe(CONSTANTS.DEFAULTS.COLOR);
    });

    it('should have pressable class when onPress is provided', async () => {
      expect.assertions(1);

      const spy = jest.fn();

      render(<Tag data-testid={testid} onPress={spy} />);

      const component = await screen.findByTestId(testid);

      expect(component.classList.contains('md-tag-pressable')).toBe(true);
    });

    it('should not have pressable class when onPress is not provided', async () => {
      expect.assertions(1);

      render(<Tag data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      expect(component.classList.contains('md-tag-pressable')).toBe(false);
    });

    it('should not have pressable class when disabled', async () => {
      expect.assertions(1);

      const spy = jest.fn();

      render(<Tag data-testid={testid} onPress={spy} isDisabled />);

      const component = await screen.findByTestId(testid);

      expect(component.classList.contains('md-tag-pressable')).toBe(false);
    });
  });

  describe('actions', () => {
    const testid = 'test-id';

    it('should support click event', async () => {
      expect.assertions(1);
      const user = userEvent.setup();

      const spy = jest.fn();

      render(<Tag onPress={spy} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      await user.click(component);

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should support keyboard event', async () => {
      expect.assertions(1);
      const user = userEvent.setup();

      const spy = jest.fn();

      render(<Tag onPress={spy} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      component.focus();

      await user.keyboard('{Enter}');

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should not support click event when disabled', async () => {
      expect.assertions(1);
      const user = userEvent.setup();

      const spy = jest.fn();

      render(<Tag isDisabled onPress={spy} data-testid={testid} />);

      const component = await screen.findByTestId(testid);

      await user.click(component);

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
