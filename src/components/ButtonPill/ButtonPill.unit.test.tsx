import React from 'react';

import ButtonPill, { BUTTON_PILL_CONSTANTS as CONSTANTS } from './';
import '@testing-library/jest-dom';
import { renderWithWebComponent } from '../../../test/utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const { COLORS, DEFAULTS, SIZES, STYLE } = CONSTANTS;

describe('<ButtonPill />', () => {
  const setup = async (component: React.ReactElement) => {
    return renderWithWebComponent(component);
  };

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      const { container } = await setup(<ButtonPill>Example Text</ButtonPill>);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const { container } = await setup(<ButtonPill className={className} />);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const { container } = await setup(<ButtonPill id={id} />);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const { container } = await setup(<ButtonPill style={style} />);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', async () => {
      expect.assertions(1);

      const color = COLORS[Object.keys(COLORS)[Object.keys(COLORS).length - 1]];

      const { container } = await setup(<ButtonPill color={color}>Example Text</ButtonPill>);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size', async () => {
      expect.assertions(1);

      const size = SIZES[Object.keys(SIZES)[Object.keys(SIZES).length - 1]];

      const { container } = await setup(<ButtonPill size={size}>Example Text</ButtonPill>);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when disabled', async () => {
      expect.assertions(1);

      const disabled = true;

      const { container } = await setup(<ButtonPill disabled={disabled}>Example Text</ButtonPill>);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when shallow disabled', async () => {
      expect.assertions(1);

      const shallowDisabled = !DEFAULTS.SHALLOW_DISABLED;

      const { container } = await setup(
        <ButtonPill shallowDisabled={shallowDisabled}>Example Text</ButtonPill>
      );
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when disabledOutline', async () => {
      expect.assertions(1);

      const disabledOutline = !DEFAULTS.DISABLED_OUTLINE;

      const { container } = await setup(
        <ButtonPill disabledOutline={disabledOutline}>Example Text</ButtonPill>
      );
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when disabledOutline and disabled and outline', async () => {
      expect.assertions(1);

      const disabledOutline = !DEFAULTS.DISABLED_OUTLINE;
      const outline = !DEFAULTS.OUTLINE;
      const disabled = true;

      const { container } = await setup(
        <ButtonPill outline={outline} disabled={disabled} disabledOutline={disabledOutline}>
          Example Text
        </ButtonPill>
      );
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when a ghost', async () => {
      expect.assertions(1);

      const ghost = !DEFAULTS.GHOST;

      const { container } = await setup(<ButtonPill ghost={ghost}>Example Text</ButtonPill>);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when a ghost and disabled', async () => {
      expect.assertions(1);

      const ghost = !DEFAULTS.GHOST;
      const disabled = true;

      const { container } = await setup(
        <ButtonPill ghost={ghost} disabled={disabled}>
          Example Text
        </ButtonPill>
      );
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when color is outlined', async () => {
      expect.assertions(1);

      const outline = !DEFAULTS.OUTLINE;

      const { container } = await setup(<ButtonPill outline={outline}>Example Text</ButtonPill>);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when width is grown', async () => {
      expect.assertions(1);

      const grown = !DEFAULTS.GROWN;

      const { container } = await setup(<ButtonPill grown={grown}>Example Text</ButtonPill>);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when color is outlined and inverted is set', async () => {
      expect.assertions(1);

      const outline = !DEFAULTS.OUTLINE;
      const inverted = true;

      const { container } = await setup(
        <ButtonPill outline={outline} inverted={inverted}>
          Example Text
        </ButtonPill>
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      await setup(<ButtonPill>Example Text</ButtonPill>);

      expect(screen.getByRole('button')).toHaveClass(STYLE.wrapper);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      await setup(<ButtonPill className={className} />);
      expect(screen.getByRole('button')).toHaveClass(className);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      await setup(<ButtonPill id={id} />);
      expect(screen.getByRole('button')).toHaveAttribute('id', id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      await setup(<ButtonPill style={style} />);
      expect(screen.getByRole('button')).toHaveStyle('color: pink');
    });

    it('should pass disabled prop', async () => {
      expect.assertions(1);

      const disabled = true;

      await setup(<ButtonPill disabled={disabled} />);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should pass shallow disabled prop', async () => {
      expect.assertions(2);

      const shallowDisabled = !DEFAULTS.SHALLOW_DISABLED;

      await setup(<ButtonPill shallowDisabled={shallowDisabled} />);
      expect(screen.getByRole('button')).toHaveAttribute('soft-disabled');
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });

    it('should pass disabled outline prop', async () => {
      expect.assertions(1);

      const disabledOutline = !DEFAULTS.DISABLED_OUTLINE;

      await setup(<ButtonPill disabledOutline={disabledOutline} />);
      expect(screen.getByRole('button')).toHaveAttribute(
        'data-disabled-outline',
        `${disabledOutline}`
      );
    });

    it('should pass ghost prop', async () => {
      expect.assertions(1);

      const ghost = !DEFAULTS.GHOST;

      await setup(<ButtonPill ghost={ghost} />);
      expect(screen.getByRole('button')).toHaveAttribute('variant', 'tertiary');
    });

    it('should pass outline prop', async () => {
      expect.assertions(1);

      const outline = !DEFAULTS.OUTLINE;

      await setup(<ButtonPill outline={outline} />);
      expect(screen.getByRole('button')).toHaveAttribute('variant', 'secondary');
    });

    it('should pass grown prop', async () => {
      expect.assertions(1);

      const grown = !DEFAULTS.GROWN;

      await setup(<ButtonPill grown={grown} />);
      expect(screen.getByRole('button')).toHaveAttribute('data-grown', `${grown}`);
    });

    it('should pass inverted prop', async () => {
      expect.assertions(1);

      const inverted = true;

      await setup(<ButtonPill inverted={inverted} />);
      expect(screen.getByRole('button')).toHaveAttribute('inverted');
    });

    it('should pass size prop', async () => {
      expect.assertions(1);

      const size = SIZES[Object.keys(SIZES)[Object.keys(SIZES).length - 1]];

      await setup(<ButtonPill size={size} />);
      expect(screen.getByRole('button')).toHaveAttribute('size', `${size}`);
    });

    it('should pass color prop', async () => {
      expect.assertions(1);

      const color = COLORS[Object.keys(COLORS)[Object.keys(COLORS).length - 1]];

      await setup(<ButtonPill color={color} />);
      expect(screen.getByRole('button')).toHaveAttribute('color', 'accent');
    });

    it('should render Momentum Design Button', async () => {
      expect.assertions(1);

      const { container } = await setup(<ButtonPill>Example Text</ButtonPill>);
      expect(container.querySelectorAll('mdc-button').length).toBeGreaterThan(0);
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', async () => {
      const onPress = jest.fn();
      await setup(<ButtonPill onPress={onPress} stopPropagation={false} />);
      await userEvent.click(screen.getByRole('button'));
      expect(onPress).toHaveBeenCalled();
    });

    it('should not call onPress when disabled', async () => {
      const onPress = jest.fn();
      await setup(<ButtonPill onPress={onPress} disabled stopPropagation={false} />);
      await userEvent.click(screen.getByRole('button'));
      expect(onPress).not.toHaveBeenCalled();
    });

    it('should call onPress when shallowDisabled', async () => {
      const onPress = jest.fn();
      await setup(<ButtonPill onPress={onPress} shallowDisabled stopPropagation={false} />);
      await userEvent.click(screen.getByRole('button'));
      expect(onPress).toHaveBeenCalled();
    });
  });
});
