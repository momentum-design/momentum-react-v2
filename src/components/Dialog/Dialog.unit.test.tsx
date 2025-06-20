import React from 'react';

import ButtonPill from '../ButtonPill';
import Dialog from './';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithWebComponent } from '../../../test/utils';

describe('<Dialog />', () => {
  const defaultProps = { 'aria-label': 'Overlay alert', onClose: () => null };

  const setup = async (component: React.ReactElement) => {
    return renderWithWebComponent(component, 'mdc-dialog');
  };

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      const { container } = await setup(<Dialog {...defaultProps} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      const className = 'example-class';

      const { container } = await setup(<Dialog {...defaultProps} className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      const id = 'example-id';

      const { container } = await setup(<Dialog {...defaultProps} id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      const style = { color: 'pink' };

      const { container } = await setup(<Dialog {...defaultProps} style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with headerText', async () => {
      const headerText = 'example-title';

      const { container } = await setup(<Dialog {...defaultProps} headerText={headerText} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with description', async () => {
      const description = 'example-description';

      const { container } = await setup(<Dialog {...defaultProps} descriptionText={description} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with footerButtonPrimary', async () => {
      const footerButtonPrimary = <ButtonPill>Button Pill</ButtonPill>;

      const { container } = await setup(
        <Dialog {...defaultProps} footerButtonPrimary={footerButtonPrimary} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with footerButtonSecondary', async () => {
      const footerButtonSecondary = <ButtonPill>Button Pill</ButtonPill>;

      const { container } = await setup(
        <Dialog {...defaultProps} footerButtonSecondary={footerButtonSecondary} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with aria props', async () => {
      const ariaLabel = 'test-aria-label';
      const ariaLabelledby = 'test-aria-labelledby';
      const ariaDescribedby = 'test-aria-describedby';
      const children = 'example-children';

      const { container } = await setup(
        <Dialog
          {...defaultProps}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
        >
          {children}
        </Dialog>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have provided class when className is provided', async () => {
      const className = 'example-class';

      await setup(<Dialog {...defaultProps} className={className} />);

      expect(screen.getByRole('dialog')).toHaveClass(className);
    });

    it('should have provided id when id is provided', async () => {
      const id = 'example-id';

      await setup(<Dialog {...defaultProps} id={id} />);
      expect(screen.getByRole('dialog')).toHaveAttribute('id', id);
    });

    it('should have provided style & zindex when both are provided', async () => {
      const style = { color: 'pink' };
      const styleString = 'color: pink; z-index: 5000;';

      await setup(<Dialog {...defaultProps} style={style} zIndex={5000} />);
      expect(screen.getByRole('dialog')).toHaveAttribute('style', styleString);
    });

    it('should have provided size when provided', async () => {
      const size = 'large';

      await setup(<Dialog {...defaultProps} size={size} />);

      expect(screen.getByRole('dialog')).toHaveAttribute('size', size);
    });

    it('should have provided children when details and children are provided', async () => {
      expect.assertions(2);

      const children = 'children-example';

      await setup(<Dialog {...defaultProps}>{children}</Dialog>);
      const textContent = screen.getByRole('dialog').textContent;

      expect(textContent.includes(children)).toBe(true);
    });
  });
});
