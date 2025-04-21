import React from 'react';
import { renderWithWebComponent } from '../../../test/utils';

import ButtonCircleToggle, { BUTTON_CIRCLE_TOGGLE_CONSTANTS as CONSTANTS } from './';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<ButtonCircleToggle />', () => {
  const setup = async (component: React.ReactElement) => {
    return renderWithWebComponent(component);
  };

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      const { container } = await setup(<ButtonCircleToggle />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isSelected being true', async () => {
      expect.assertions(1);

      const isSelected = true;

      const { container } = await setup(<ButtonCircleToggle isSelected={isSelected} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isSelected being false', async () => {
      expect.assertions(1);

      const isSelected = false;

      const { container } = await setup(<ButtonCircleToggle isSelected={isSelected} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with outline being true', async () => {
      expect.assertions(1);

      const outline = true;

      const { container } = await setup(<ButtonCircleToggle outline={outline} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with outline being false', async () => {
      expect.assertions(1);

      const outline = false;

      const { container } = await setup(<ButtonCircleToggle outline={outline} />);

      expect(container).toMatchSnapshot();
    });

    it("should match snapshot with ariaStateKey being 'aria-expanded' and isSelected being true", async () => {
      expect.assertions(1);

      const ariaStateKey = 'aria-expanded';
      const isSelected = true;

      const { container } = await setup(
        <ButtonCircleToggle ariaStateKey={ariaStateKey} isSelected={isSelected} />
      );

      expect(container).toMatchSnapshot();
    });

    it("should match snapshot with ariaStateKey being 'aria-expanded' and isSelected being false", async () => {
      expect.assertions(1);

      const ariaStateKey = 'aria-expanded';
      const isSelected = false;

      const { container } = await setup(
        <ButtonCircleToggle ariaStateKey={ariaStateKey} isSelected={isSelected} />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      await setup(<ButtonCircleToggle />);

      const element = screen.getByRole('button');
      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have variant set to secondary when outline is provided', async () => {
      expect.assertions(1);

      const outline = true;

      await setup(<ButtonCircleToggle outline={outline} />);
      const element = screen.getByRole('button');

      expect(element.getAttribute('variant')).toBe('secondary');
    });

    it('should have variant set to tertiary when outline is not provided', async () => {
      expect.assertions(1);

      const outline = false;

      await setup(<ButtonCircleToggle outline={outline} />);
      const element = screen.getByRole('button');

      expect(element.getAttribute('variant')).toBe('tertiary');
    });

    it('should have provided active as "" when isSelected is provided', async () => {
      expect.assertions(1);

      const isSelected = true;

      await setup(<ButtonCircleToggle isSelected={isSelected} />);
      const element = screen.getByRole('button');

      expect(element.getAttribute('active')).toBe('');
    });

    it('should have provided active as null when isSelected is provided', async () => {
      expect.assertions(1);

      const isSelected = false;

      await setup(<ButtonCircleToggle isSelected={isSelected} />);
      const element = screen.getByRole('button');

      expect(element.getAttribute('active')).toBe(null);
    });

    it.each([[false], [true]])(
      'should use default ariaStateKey when ariaStateKey is not provided (isSelected=%s)',
      async (isSelected) => {
        expect.assertions(2);

        await setup(<ButtonCircleToggle isSelected={isSelected} />);
        const element = screen.getByRole('button');

        expect(element.getAttribute('aria-pressed')).toBe(`${isSelected}`);
        expect(element.getAttribute('aria-expanded')).toBe(null);
      }
    );

    it.each([[false], [true]])(
      'should use provided ariaStateKey when ariaStateKey is provided (isSelected=%s)',
      async (isSelected) => {
        expect.assertions(2);

        const ariaStateKey = 'aria-expanded';

        await setup(<ButtonCircleToggle ariaStateKey={ariaStateKey} isSelected={isSelected} />);
        const element = screen.getByRole('button');

        expect(element.getAttribute('aria-pressed')).toBe(null);
        expect(element.getAttribute('aria-expanded')).toBe(`${isSelected}`);
      }
    );
  });

  describe('actions', () => {
    const user = userEvent.setup();

    it('onChange callback is called correctly when provided', async () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      await setup(<ButtonCircleToggle onChange={mockCallback} />);
      const element = screen.getByRole('button');

      await user.click(element);

      expect(mockCallback).toHaveBeenCalledWith(true);
    });

    it('should handle mouse press events', async () => {
      expect.assertions(4);

      const mockCallback = jest.fn();

      await setup(<ButtonCircleToggle onChange={mockCallback} />);
      const element = screen.getByRole('button');

      await user.click(element);
      expect(mockCallback).toHaveBeenCalledWith(true);

      await user.click(element);
      expect(mockCallback).toHaveBeenCalledWith(false);

      await user.click(element);
      expect(mockCallback).toHaveBeenCalledWith(true);

      await user.click(element);
      expect(mockCallback).toHaveBeenCalledWith(false);
    });

    it('should handle mouse press event when disabled', async () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      await setup(<ButtonCircleToggle onChange={mockCallback} disabled />);
      const element = screen.getByRole('button');

      await user.click(element);
      expect(mockCallback).toBeCalledTimes(0);
    });
  });
});
