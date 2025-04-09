import React from 'react';
import { renderWithWebComponent } from '../../../test/utils';
import AddReactionButton, { ADD_REACTION_BUTTON_CONSTANTS as CONSTANTS } from './';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

describe('<AddReactionButton />', () => {
  const setup = async (component: any) => {
    return renderWithWebComponent(component);
  };

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      const container = await setup(<AddReactionButton />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = await setup(<AddReactionButton className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await setup(<AddReactionButton id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = await setup(<AddReactionButton style={style} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      await setup(<AddReactionButton />);
      const element = screen.getByRole('button');

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      await setup(<AddReactionButton className={className} />);
      const element = screen.getByRole('button');

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      await setup(<AddReactionButton id={id} />);
      const element = screen.getByRole('button');

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      await setup(<AddReactionButton style={style} />);
      const element = screen.getByRole('button');

      expect(element.getAttribute('style')).toBe(styleString);
    });
  });

  describe('actions', () => {
    const user = userEvent.setup();

    it('should handle mouse click events', async () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      await setup(<AddReactionButton onClick={mockCallback} />);

      const component = screen.getByRole('button');

      await user.click(component);

      expect(mockCallback).toBeCalledTimes(1);
    });
  });
});
