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

    it('should match snapshot with multiple children and orientation horizontal', () => {
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
          orientation="horizontal"
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
      expect.assertions(4);

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

      const option1 = screen.getByText('Option 1').children[1];
      const option1Input = screen.getByRole('radio', { name: 'Option 1' });
      const option2 = screen.getByText('Option 2').children[1];
      const option2Input = screen.getByRole('radio', { name: 'Option 2' });

      expect(option1).toHaveAttribute('data-selected', 'true');
      expect(option1Input).toBeChecked();
      expect(option2).toHaveAttribute('data-selected', 'false');
      expect(option2Input).not.toBeChecked();
    });
  });

  describe('actions', () => {
    it('should change which option is selected when clicked', () => {
      expect.assertions(4);

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

      const option1 = screen.getByText('Option 1').children[1];
      const option2 = screen.getByText('Option 2').children[1];

      expect(option1).toHaveAttribute('data-selected', 'true');
      expect(option2).toHaveAttribute('data-selected', 'false');

      userEvent.click(option2);

      expect(option1).toHaveAttribute('data-selected', 'false');
      expect(option2).toHaveAttribute('data-selected', 'true');
    });

    it('should call setValue when option is clicked', () => {
      expect.assertions(1);

      const setValue = jest.fn();

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
          setValue={setValue}
        />
      );

      const option2 = screen.getByText('Option 2');

      userEvent.click(option2);

      expect(setValue).toBeCalledWith('option2');
    });

    it('should not call call setValue when defualt value is clicked first', () => {
      expect.assertions(1);

      const setValue = jest.fn();

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
          setValue={setValue}
        />
      );

      const option1 = screen.getByText('Option 1');

      userEvent.click(option1);

      expect(setValue).not.toBeCalled();
    });

    it('should call setValue only once when an option is clicked several times', () => {
      expect.assertions(2);

      const setValue = jest.fn();

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
          setValue={setValue}
        />
      );

      const option2 = screen.getByText('Option 2');

      userEvent.click(option2);

      expect(setValue).toBeCalledWith('option2');
      expect(setValue).toBeCalledTimes(1);
    });

    it('should allow keyboard navigation', () => {
      expect.assertions(2);

      const setValue = jest.fn();

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
          setValue={setValue}
        />
      );

      const option1 = screen.getByText('Option 1');
      const option2 = screen.getByText('Option 2');

      userEvent.type(option1, '{arrowdown}');

      expect(setValue).toBeCalledWith('option2');

      userEvent.type(option2, '{arrowup}');

      expect(setValue).toBeCalledWith('option1');
    });

    it('should not call setValue when a disabled option is clicked', () => {
      expect.assertions(2);

      const setValue = jest.fn();

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
          setValue={setValue}
        />
      );

      const option2 = screen.getByText('Option 2');
      const option2Input = screen.getByRole('radio', { name: 'Option 2' });

      expect(option2Input).toBeDisabled();

      userEvent.click(option2);

      expect(setValue).not.toBeCalled();
    });

    it('should not call setValue when the group is readonly and an option is clicked', () => {
      expect.assertions(1);

      const setValue = jest.fn();

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
          setValue={setValue}
          isReadOnly={true}
        />
      );

      const option2 = screen.getByText('Option 2');

      userEvent.click(option2);

      expect(setValue).not.toBeCalled();
    });

    it('should not call setValue when the group is disabled and an option is clicked', () => {
      expect.assertions(3);

      const setValue = jest.fn();

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
          setValue={setValue}
          isDisabled={true}
        />
      );

      const option1Input = screen.getByRole('radio', { name: 'Option 1' });
      const option2Input = screen.getByRole('radio', { name: 'Option 2' });
      const option2 = screen.getByText('Option 2');

      expect(option1Input).toBeDisabled();
      expect(option2Input).toBeDisabled();

      userEvent.click(option2);

      expect(setValue).not.toBeCalled();
    });

    it('should focus selected option on keyboard input', () => {
      expect.assertions(5);

      const setValue = jest.fn();

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
          setValue={setValue}
        />
      );

      const option1 = screen.getByText('Option 1');
      const opiton1Input = screen.getByRole('radio', { name: 'Option 1' });
      const option2Input = screen.getByRole('radio', { name: 'Option 2' });

      userEvent.tab();

      expect(opiton1Input).toHaveFocus();
      expect(setValue).not.toBeCalled();

      userEvent.type(option1, '{arrowdown}');

      expect(option2Input).toHaveFocus();
      expect(option2Input).toBeChecked();

      expect(setValue).toBeCalledWith('option2');
    });
  });
});
