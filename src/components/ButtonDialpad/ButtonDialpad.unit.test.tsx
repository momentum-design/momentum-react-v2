import React from 'react';
import { renderWithWebComponent } from '../../../test/utils';
import { ButtonDialpad } from '@momentum-ui/react-collaboration';
import userEvent from '@testing-library/user-event';
import { DEFAULTS, STYLE } from './ButtonDialpad.constants';
import { screen } from '@testing-library/react';

describe('<ButtonPill />', () => {
  const setup = async (component: React.ReactElement) => {
    return renderWithWebComponent(component);
  };

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      const { container } = await setup(<ButtonDialpad primaryText="1" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with primaryText', async () => {
      expect.assertions(1);

      const { container } = await setup(<ButtonDialpad primaryText="1" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with secondaryText', async () => {
      expect.assertions(1);

      const { container } = await setup(<ButtonDialpad secondaryText="ABC" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with primaryText and secondaryText', async () => {
      expect.assertions(1);

      const { container } = await setup(<ButtonDialpad primaryText="1" secondaryText="ABC" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when disabled', async () => {
      expect.assertions(1);

      const disabled = !DEFAULTS.DISABLED;

      const { container } = await setup(
        <ButtonDialpad disabled={disabled} primaryText="Example Text" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with title', async () => {
      expect.assertions(1);

      const title = 'Example Text';

      const { container } = await setup(<ButtonDialpad title={title} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its main class', async () => {
      expect.assertions(1);

      await setup(<ButtonDialpad primaryText="Example Text" />);
      const element = screen.getByRole('button');

      expect(element.classList.contains(STYLE.wrapper)).toBe(true);
    });

    it('should pass disabled prop', async () => {
      expect.assertions(1);

      await setup(<ButtonDialpad disabled={true} primaryText="Example Text" />);
      const element = screen.getByRole('button');

      expect(element.getAttribute('disabled')).not.toBeNull();
    });

    it('should have custom class if provided', async () => {
      const testClass = 'testClass';

      await setup(<ButtonDialpad className={testClass} primaryText="Example Text" />);
      const element = screen.getByRole('button');

      expect(element.classList.contains(testClass)).toBe(true);
    });

    it('should pass primaryText prop', async () => {
      expect.assertions(1);

      const primaryText = '1';

      await setup(<ButtonDialpad primaryText={primaryText} />);
      const element = screen.getByRole('button');
      const target = element.getElementsByClassName(STYLE.primaryText)[0];

      expect(target.innerHTML).toBe(primaryText);
    });

    it('should pass secondaryText prop', async () => {
      expect.assertions(1);

      const secondaryText = 'ABC';

      await setup(<ButtonDialpad secondaryText={secondaryText} />);
      const element = screen.getByRole('button');
      const target = element.getElementsByClassName(STYLE.secondaryText)[0];

      expect(target.innerHTML).toBe(secondaryText);
    });

    it('should have provided title when title is provided', async () => {
      expect.assertions(1);

      const title = 'Example Text';

      await setup(<ButtonDialpad title={title} primaryText="Example Text" />);
      const element = screen.getByRole('button');

      expect(element.getAttribute('title')).toBe(title);
    });

    it('should render MdcButton', async () => {
      expect.assertions(1);

      const { container } = await setup(<ButtonDialpad primaryText="Example Text" />);
      const element = container.querySelector('mdc-button');

      expect(element).not.toBeNull();
    });
  });

  describe('actions', () => {
    const user = userEvent.setup();

    it('should handle mouse click events', async () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      await setup(<ButtonDialpad onClick={mockCallback} primaryText="Example Text" />);

      const component = screen.getByRole('button');
      await user.click(component);

      expect(mockCallback).toBeCalledTimes(1);
    });
  });
});
