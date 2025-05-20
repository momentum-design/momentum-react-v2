import React, { useState } from 'react';
import { renderWithWebComponent } from '../../../test/utils';

import ButtonPillToggle, { BUTTON_PILL_TOGGLE_CONSTANTS as CONSTANTS } from './';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<ButtonPillToggle />', () => {
  const setup = async (component: React.ReactElement) => {
    return renderWithWebComponent(component);
  };

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      const { container } = await setup(<ButtonPillToggle />);

      expect(container).toMatchSnapshot();
    });
    it('should match snapshot with isSelected being true', async () => {
      expect.assertions(1);

      const isSelected = true;

      const { container } = await setup(<ButtonPillToggle isSelected={isSelected} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isSelected being false', async () => {
      expect.assertions(1);

      const isSelected = false;

      const { container } = await setup(<ButtonPillToggle isSelected={isSelected} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with outline being true', async () => {
      expect.assertions(1);

      const outline = true;

      const { container } = await setup(<ButtonPillToggle outline={outline} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with outline being false', async () => {
      expect.assertions(1);

      const outline = false;

      const { container } = await setup(<ButtonPillToggle outline={outline} />);

      expect(container).toMatchSnapshot();
    });

    it("should match snapshot with ariaStateKey being 'aria-expanded' and isSelected being true", async () => {
      expect.assertions(1);

      const ariaStateKey = 'aria-expanded';
      const isSelected = true;

      const { container } = await setup(
        <ButtonPillToggle ariaStateKey={ariaStateKey} isSelected={isSelected} />
      );

      expect(container).toMatchSnapshot();
    });

    it("should match snapshot with ariaStateKey being 'aria-expanded' and isSelected being false", async () => {
      expect.assertions(1);

      const ariaStateKey = 'aria-expanded';
      const isSelected = false;

      const { container } = await setup(
        <ButtonPillToggle ariaStateKey={ariaStateKey} isSelected={isSelected} />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have provided variant as secondary when outline is provided', async () => {
      expect.assertions(1);

      const outline = true;

      const { container } = await setup(<ButtonPillToggle outline={outline} />);
      const element = container.firstChild as HTMLElement;

      expect(element.getAttribute('variant')).toBe('secondary');
    });

    it('should have provided variant as tertiary when outline is provided', async () => {
      expect.assertions(1);

      const outline = false;

      const { container } = await setup(<ButtonPillToggle outline={outline} />);
      const element = container.firstChild as HTMLElement;

      expect(element.getAttribute('variant')).toBe('tertiary');
    });

    it('should have provided active when isSelected is provided', async () => {
      expect.assertions(1);

      const isSelected = true;

      const { container } = await setup(<ButtonPillToggle isSelected={isSelected} />);
      const element = container.firstChild as HTMLElement;

      expect(element.getAttribute('active')).toBe('');
    });

    it('should have provided active as null when isSelected is not provided', async () => {
      expect.assertions(1);

      const isSelected = false;

      const { container } = await setup(<ButtonPillToggle isSelected={isSelected} />);
      const element = container.firstChild as HTMLElement;

      expect(element.getAttribute('active')).toBe(null);
    });

    it.each([[undefined], [false], [true]])(
      'should use default ariaStateKey when ariaStateKey is not provided (isSelected=%s)',
      async (isSelected) => {
        const { container } = await setup(<ButtonPillToggle isSelected={isSelected} />);
        const element = container.firstChild as HTMLElement;

        if (isSelected === undefined) {
          expect(element.getAttribute('aria-pressed')).toBe(null);
        } else {
          expect(element.getAttribute('aria-pressed')).toBe(`${isSelected}`);
          expect(element.getAttribute('aria-expanded')).toBe(null);
        }
      }
    );

    it.each([[false], [true]])(
      'should use provided ariaStateKey when ariaStateKey is provided (isSelected=%s)',
      async (isSelected) => {
        expect.assertions(2);

        const ariaStateKey = 'aria-expanded';

        const { container } = await setup(
          <ButtonPillToggle ariaStateKey={ariaStateKey} isSelected={isSelected} />
        );
        const element = container.firstChild as HTMLElement;

        expect(element.getAttribute('aria-pressed')).toBe(null);
        expect(element.getAttribute('aria-expanded')).toBe(`${isSelected}`);
      }
    );
  });

  describe('actions', () => {
    const user = userEvent.setup();

    it('onChange callback is called correctly when provided when component is uncontrolled', async () => {
      expect.assertions(4);

      const mockCallback = jest.fn();

      const initialIsSelected = false;

      await setup(
        <ButtonPillToggle onChange={mockCallback} initialIsSelected={initialIsSelected} />
      );

      const button = screen.getByRole('button');
      expect(button.attributes['aria-pressed'].value).toBe('false');

      await user.click(button);

      expect(button.attributes['aria-pressed'].value).toBe('true');
      expect(mockCallback).toBeCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith(!initialIsSelected);
    });

    it('onChange callback is called correctly when provided when component is controlled', async () => {
      expect.assertions(2);

      const mockCallback = jest.fn();

      const ExampleParent = () => {
        const [isSelected, setIsSelected] = useState(false);

        const onPress = () => {
          setIsSelected(true);
          mockCallback();
        };

        return <ButtonPillToggle onChange={onPress} isSelected={isSelected} />;
      };

      await renderWithWebComponent(<ExampleParent />);

      const button = screen.getByRole('button');
      expect(button.attributes['aria-pressed'].value).toBe('false');

      await user.click(button);

      expect(button.attributes['aria-pressed'].value).toBe('true');
    });

    it('should handle mouse press events', async () => {
      expect.assertions(4);

      const mockCallback = jest.fn();

      await setup(<ButtonPillToggle onChange={mockCallback} />);

      const button = screen.getByRole('button');

      await user.click(button);
      expect(mockCallback).toHaveBeenCalledWith(true);

      await user.click(button);
      expect(mockCallback).toHaveBeenCalledWith(false);

      await user.click(button);
      expect(mockCallback).toHaveBeenCalledWith(true);

      await user.click(button);
      expect(mockCallback).toHaveBeenCalledWith(false);
    });

    it('should handle mouse press event when disabled', async () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      await setup(<ButtonPillToggle onChange={mockCallback} disabled />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(mockCallback).toBeCalledTimes(0);
    });
  });
});
