import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Slider, { SLIDER_CONSTANTS as CONSTANTS } from './';

describe('<Slider />', () => {
  const defaultProps = {
    isDisabled: false,
    step: 1,
    minValue: 0,
    maxValue: 10,
    value: 2,
    onChange: jest.fn(),
  };

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const { container } = render(<Slider {...defaultProps} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const { container } = render(<Slider {...defaultProps} className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const { container } = render(<Slider {...defaultProps} id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const { container } = render(<Slider {...defaultProps} style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with ariaLabel', () => {
      expect.assertions(1);

      const { container } = render(<Slider {...defaultProps} ariaLabel={'test aria label'} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isDisabled', () => {
      expect.assertions(1);

      const { container } = render(<Slider {...defaultProps} isDisabled={true} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);
      render(<Slider {...defaultProps} />);

      const element = screen.getByRole('slider');

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      render(<Slider {...defaultProps} className={className} />);

      const element = screen.getByRole('slider');

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      render(<Slider {...defaultProps} id={id} />);

      const element = screen.getByRole('slider');

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      render(<Slider {...defaultProps} style={style} />);
      const element = screen.getByRole('slider');

      expect(element.getAttribute('style')).toBe(`${styleString} --local-value: 20%;`);
    });

    it('should have provided ariaLabel when ariaLabel is provided', () => {
      expect.assertions(1);

      const ariaLabel = 'test aria label';

      render(<Slider {...defaultProps} ariaLabel={ariaLabel} />);

      const element = screen.getByRole('slider');

      expect(element.getAttribute('aria-label')).toBe(ariaLabel);
    });
  });

  describe('actions', () => {
    const ControlledComponent = ({ newValue }: { newValue?: number }) => {
      const [value, setValue] = React.useState(defaultProps.value);

      const handleChange = (newValueToSet: number) => {
        setValue(newValueToSet);
        defaultProps.onChange(newValueToSet);
      };

      React.useEffect(() => {
        if (newValue !== undefined) {
          setValue(newValue);
        }
      }, [newValue]);

      return (
        <Slider {...defaultProps} ariaLabel="test label" onChange={handleChange} value={value} />
      );
    };

    it('should be focusable as expected', async () => {
      expect.assertions(2);
      const user = userEvent.setup();

      render(<ControlledComponent />);
      await user.tab();

      const sliderInput = screen.getByRole('slider');
      expect(sliderInput).toHaveFocus();

      await user.tab();

      const sliderInputAfterDefocus = screen.getByRole('slider');
      expect(sliderInputAfterDefocus).not.toHaveFocus();
    });

    it('should change value as expected', async () => {
      expect.assertions(2);
      const { rerender } = render(<ControlledComponent />);

      const sliderInput = screen.getByRole('slider');
      expect(sliderInput.getAttribute('value')).toBe(defaultProps.value.toString());

      const newValue = 8;
      rerender(<ControlledComponent newValue={newValue} />);

      const sliderInputAfterChange = screen.getByRole('slider');
      expect(sliderInputAfterChange.getAttribute('value')).toBe(newValue.toString());
    });

    // NOTE: keyboard interaction tests can't be added yet due to lack of support in RTL:
    // https://github.com/testing-library/user-event/issues/1067
  });
});
