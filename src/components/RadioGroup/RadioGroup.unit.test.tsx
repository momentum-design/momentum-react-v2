import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RadioGroup from './';
import { STYLE } from './RadioGroup.constants';

describe('<RadioGroup />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const { asFragment } = render(<RadioGroup label="Test Radio Group" />);

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot when rendered with list of strings passed to options', () => {
      expect.assertions(1);

      const { asFragment } = render(
        <RadioGroup label="Test Radio Group" options={['Option 1', 'Option 2']} />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot when rendered with a mix of strings and props passwed to options', () => {
      expect.assertions(1);

      const { asFragment } = render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            'Option 1',
            {
              label: 'Option 2',
              value: 'option2',
            },
          ]}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const { asFragment } = render(<RadioGroup label="Test Radio Group" className={className} />);

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const { asFragment } = render(<RadioGroup label="Test Radio Group" id={id} />);

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const { asFragment } = render(<RadioGroup label="Test Radio Group" style={style} />);

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with description', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const { asFragment } = render(
        <RadioGroup
          label="Test Radio Group"
          description="The radio group description"
          style={style}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with child', () => {
      expect.assertions(1);

      const { asFragment } = render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
            },
          ]}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with child thats selected', () => {
      expect.assertions(1);

      const { asFragment } = render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
            },
          ]}
          defaultValue="option1"
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with child thats disabled', () => {
      expect.assertions(1);

      const { asFragment } = render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
              isDisabled: true,
            },
          ]}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with child thats disabled and selected', () => {
      expect.assertions(1);

      const { asFragment } = render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
              isDisabled: true,
            },
          ]}
          defaultValue="option1"
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with multiple children', () => {
      expect.assertions(1);

      const { asFragment } = render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
            },
            {
              label: 'Option 2',
              value: 'option2',
            },
            {
              label: 'Option 3',
              value: 'option3',
            },
          ]}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with multiple children with one selected', () => {
      expect.assertions(1);

      const { asFragment } = render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
            },
            {
              label: 'Option 2',
              value: 'option2',
            },
            {
              label: 'Option 3',
              value: 'option3',
            },
          ]}
          defaultValue="option1"
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with multiple children with one disabled', () => {
      expect.assertions(1);

      const { asFragment } = render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
            },
            {
              label: 'Option 2',
              value: 'option2',
            },
            {
              label: 'Option 3',
              value: 'option3',
              isDisabled: true,
            },
          ]}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with multiple children with group disabled', () => {
      expect.assertions(1);

      const { asFragment } = render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
            },
            {
              label: 'Option 2',
              value: 'option2',
            },
            {
              label: 'Option 3',
              value: 'option3',
            },
          ]}
          isDisabled={true}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with child className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const { asFragment } = render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
              className,
            },
          ]}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with child id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const { asFragment } = render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
              id,
            },
          ]}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with child style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const { asFragment } = render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
              style,
            },
          ]}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its group class', () => {
      expect.assertions(1);

      render(<RadioGroup label="Test Radio Group" />);

      const radioGroup = screen.getByRole('radiogroup');

      expect(radioGroup).toHaveClass(STYLE.group);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      render(<RadioGroup label="Test Radio Group" className={className} />);

      const radioGroup = screen.getByRole('radiogroup');

      expect(radioGroup).toHaveClass(className);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      render(<RadioGroup label="Test Radio Group" id={id} />);

      const radioGroup = screen.getByRole('radiogroup');

      expect(radioGroup.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      render(<RadioGroup label="Test Radio Group" style={style} />);

      const radioGroup = screen.getByRole('radiogroup');

      expect(radioGroup).toHaveStyle(styleString);
    });

    it('should have child class when className is provided to child', () => {
      expect.assertions(1);

      const className = 'example-class';

      render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
              className,
            },
          ]}
        />
      );

      const radio = screen.getByText('Option 1');

      expect(radio).toHaveClass(className);
    });

    it('should have child id when id is provided to child', () => {
      expect.assertions(1);

      const id = 'example-id';

      render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
              id,
            },
          ]}
        />
      );
      const radio = screen.getByRole('radio');

      expect(radio.id).toBe(id);
    });

    it('should have child style when style is provided to child', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
              style,
            },
          ]}
        />
      );
      const radio = screen.getByText('Option 1');

      expect(radio).toHaveStyle(styleString);
    });

    it('should give only the select element the selected style', () => {
      expect.assertions(2);

      render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
            },
            {
              label: 'Option 2',
              value: 'option2',
            },
          ]}
          defaultValue="option1"
        />
      );

      const option1 = screen.getByLabelText('Option 1');
      const option2 = screen.getByLabelText('Option 2');

      expect(option1).toBeChecked();
      expect(option2).not.toBeChecked();
    });
  });

  describe('actions', () => {
    it('should change which option is selected when clicked', async () => {
      expect.assertions(4);
      const user = userEvent.setup();

      render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
              id: 'option1',
            },
            {
              label: 'Option 2',
              value: 'option2',
              id: 'option2',
            },
          ]}
          defaultValue="option1"
        />
      );

      const option1 = screen.getByLabelText('Option 1');
      const option2 = screen.getByLabelText('Option 2');

      expect(option1).toBeChecked();
      expect(option2).not.toBeChecked();

      await user.click(option2);

      expect(option1).not.toBeChecked();
      expect(option2).toBeChecked();
    });

    it('should call onChange when option is clicked', async () => {
      expect.assertions(1);
      const user = userEvent.setup();

      const onChange = jest.fn();

      render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
              id: 'option1',
            },
            {
              label: 'Option 2',
              value: 'option2',
              id: 'option2',
            },
          ]}
          defaultValue="option1"
          onChange={onChange}
        />
      );

      const option2 = screen.getByText('Option 2');

      await user.click(option2);

      expect(onChange).toBeCalledWith('option2');
    });

    it('should not call call onChange when defualt value is clicked first', async () => {
      expect.assertions(1);
      const user = userEvent.setup();

      const onChange = jest.fn();

      render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
              id: 'option1',
            },
            {
              label: 'Option 2',
              value: 'option2',
              id: 'option2',
            },
          ]}
          defaultValue="option1"
          onChange={onChange}
        />
      );

      const option1 = screen.getByText('Option 1');

      await user.click(option1);

      expect(onChange).not.toBeCalled();
    });

    it('should call onChange only once when an option is clicked several times', async () => {
      expect.assertions(2);
      const user = userEvent.setup();

      const onChange = jest.fn();

      render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
              id: 'option1',
            },
            {
              label: 'Option 2',
              value: 'option2',
              id: 'option2',
            },
          ]}
          defaultValue="option1"
          onChange={onChange}
        />
      );

      const option2 = screen.getByText('Option 2');

      await user.click(option2);

      expect(onChange).toBeCalledWith('option2');
      expect(onChange).toBeCalledTimes(1);
    });

    it('should allow keyboard navigation', async () => {
      expect.assertions(2);
      const user = userEvent.setup();

      const onChange = jest.fn();

      render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
              id: 'option1',
            },
            {
              label: 'Option 2',
              value: 'option2',
              id: 'option2',
            },
          ]}
          defaultValue="option1"
          onChange={onChange}
        />
      );

      const option1 = screen.getByText('Option 1');
      const option2 = screen.getByText('Option 2');

      await user.type(option1, '{arrowdown}');

      expect(onChange).toBeCalledWith('option2');

      await user.type(option2, '{arrowup}');

      expect(onChange).toBeCalledWith('option1');
    });

    it('should not call onChange when a disabled option is clicked', async () => {
      expect.assertions(2);
      const user = userEvent.setup();

      const onChange = jest.fn();

      render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
              id: 'option1',
            },
            {
              label: 'Option 2',
              value: 'option2',
              id: 'option2',
              isDisabled: true,
            },
          ]}
          defaultValue="option1"
          onChange={onChange}
        />
      );

      const option2 = screen.getByLabelText('Option 2');

      expect(option2).toBeDisabled();

      await user.click(option2);

      expect(onChange).not.toBeCalled();
    });

    it('should not call onChange when the group is readonly and an option is clicked', async () => {
      expect.assertions(1);
      const user = userEvent.setup();

      const onChange = jest.fn();

      render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
              id: 'option1',
            },
            {
              label: 'Option 2',
              value: 'option2',
              id: 'option2',
            },
          ]}
          defaultValue="option1"
          onChange={onChange}
          isReadOnly={true}
        />
      );

      const option2 = screen.getByText('Option 2');

      await user.click(option2);

      expect(onChange).not.toBeCalled();
    });

    it('should not call onChange when the group is disabled and an option is clicked', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const onChange = jest.fn();

      render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
              id: 'option1',
            },
            {
              label: 'Option 2',
              value: 'option2',
              id: 'option2',
            },
          ]}
          defaultValue="option1"
          onChange={onChange}
          isDisabled={true}
        />
      );

      const option1 = screen.getByLabelText('Option 1');
      const option2 = screen.getByLabelText('Option 2');

      expect(option1).toBeDisabled();
      expect(option2).toBeDisabled();

      await user.click(option2);

      expect(onChange).not.toBeCalled();
    });

    it('should focus selected option on keyboard input', async () => {
      expect.assertions(5);
      const user = userEvent.setup();

      const onChange = jest.fn();

      render(
        <RadioGroup
          label="Test Radio Group"
          options={[
            {
              label: 'Option 1',
              value: 'option1',
              id: 'option1',
            },
            {
              label: 'Option 2',
              value: 'option2',
              id: 'option2',
            },
          ]}
          defaultValue="option1"
          onChange={onChange}
        />
      );

      const option1 = screen.getByLabelText('Option 1');
      const option2 = screen.getByLabelText('Option 2');

      await user.tab();

      expect(option1).toHaveFocus();
      expect(onChange).not.toBeCalled();

      await user.type(option1, '{arrowdown}');

      expect(option2).toHaveFocus();
      expect(option2).toBeChecked();

      expect(onChange).toBeCalledWith('option2');
    });
  });
});
