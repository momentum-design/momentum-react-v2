import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import ButtonCircle from './';
import { renderWithWebComponent } from '../../../test/utils';
import Icon from '../Icon';

describe('<ButtonCircle />', () => {
  const setup = async (component: React.ReactElement) => {
    return renderWithWebComponent(component);
  };

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      const { container } = await setup(<ButtonCircle />);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with multiple children', async () => {
      const { container } = await setup(
        <ButtonCircle>
          <div>X</div>
          <div>Y</div>
        </ButtonCircle>
      );
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      const className = 'example-class';
      const { container } = await setup(<ButtonCircle className={className} />);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      const id = 'example-id';
      const { container } = await setup(<ButtonCircle id={id} />);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      const style = { color: 'pink' };
      const { container } = await setup(<ButtonCircle style={style} />);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', async () => {
      const color = 'join';
      const { container } = await setup(<ButtonCircle color={color}>X</ButtonCircle>);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size', async () => {
      const size = 52;
      const { container } = await setup(<ButtonCircle size={size}>X</ButtonCircle>);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when disabled', async () => {
      const { container } = await setup(<ButtonCircle disabled>X</ButtonCircle>);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when shallow disabled', async () => {
      const { container } = await setup(<ButtonCircle shallowDisabled>X</ButtonCircle>);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when a ghost', async () => {
      const { container } = await setup(<ButtonCircle ghost>X</ButtonCircle>);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when color is outlined', async () => {
      const { container } = await setup(<ButtonCircle outline>X</ButtonCircle>);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with title', async () => {
      const title = 'Example Text';
      const { container } = await setup(<ButtonCircle title={title} />);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when color is outlined and inverted is set', async () => {
      const { container } = await setup(<ButtonCircle outline inverted />);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when prefixIcon is set', async () => {
      const { container } = await setup(<ButtonCircle prefixIcon="placeholder-regular" />);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when variant is set', async () => {
      const { container } = await setup(<ButtonCircle variant="secondary" />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have variant set to secondary when outline is provided', async () => {
      await setup(<ButtonCircle outline />);
      expect(screen.getByRole('button')).toHaveAttribute('variant', 'secondary');
    });

    it('should have variant set to tertiary when ghost is provided', async () => {
      await setup(<ButtonCircle ghost />);
      expect(screen.getByRole('button')).toHaveAttribute('variant', 'tertiary');
    });

    it('should have variant set to primary when no variant is provided', async () => {
      await setup(<ButtonCircle />);
      expect(screen.getByRole('button')).toHaveAttribute('variant', 'primary');
    });

    it('should have color set to positive when color is join', async () => {
      await setup(<ButtonCircle color="join" />);
      expect(screen.getByRole('button')).toHaveAttribute('color', 'positive');
    });

    it('should have color set to negative when color is cancel', async () => {
      await setup(<ButtonCircle color="cancel" />);
      expect(screen.getByRole('button')).toHaveAttribute('color', 'negative');
    });

    it('should have color set to accent when color is message', async () => {
      await setup(<ButtonCircle color="message" />);
      expect(screen.getByRole('button')).toHaveAttribute('color', 'accent');
    });

    it('should have color set to default when no color is provided', async () => {
      await setup(<ButtonCircle />);
      expect(screen.getByRole('button')).toHaveAttribute('color', 'default');
    });

    it('should have prefixIcon not set when no Icon child is provided', async () => {
      await setup(
        <ButtonCircle>
          <div>Not an Icon</div>
          <div>Also not an Icon</div>
        </ButtonCircle>
      );
      expect(screen.getByRole('button')).not.toHaveAttribute('prefix-icon');
    });

    it('should have prefixIcon set to the icon name when a single Icon child is provided', async () => {
      await setup(
        <ButtonCircle>
          <Icon name="placeholder" weight="bold" />
        </ButtonCircle>
      );
      expect(screen.getByRole('button')).toHaveAttribute('prefix-icon', 'placeholder-bold');
    });

    it('should have prefixIcon set to the icon name and regular weight when a single Icon child without weight is provided', async () => {
      await setup(
        <ButtonCircle>
          <Icon name="placeholder" />
        </ButtonCircle>
      );
      expect(screen.getByRole('button')).toHaveAttribute('prefix-icon', 'placeholder-regular');
    });
  });

  describe('actions', () => {
    it('should call onPress when clicked', async () => {
      const onPress = jest.fn();
      await setup(<ButtonCircle onPress={onPress} />);
      await userEvent.click(screen.getByRole('button'));
      expect(onPress).toHaveBeenCalled();
    });

    it('should not call onPress when disabled', async () => {
      const onPress = jest.fn();
      await setup(<ButtonCircle onPress={onPress} disabled />);
      await userEvent.click(screen.getByRole('button'));
      expect(onPress).not.toHaveBeenCalled();
    });

    it('should call onPress when shallowDisabled', async () => {
      const onPress = jest.fn();
      await setup(<ButtonCircle onPress={onPress} shallowDisabled />);
      await userEvent.click(screen.getByRole('button'));
      expect(onPress).toHaveBeenCalled();
    });
  });
});
