import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
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

    // Start
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

      const { getByRole } = render(<RadioGroup label="Test Radio Group" />);

      const radioGroup = getByRole('radiogroup');

      expect(radioGroup).toHaveClass(STYLE.group);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const { getByRole } = render(<RadioGroup label="Test Radio Group" className={className} />);

      const radioGroup = getByRole('radiogroup');

      expect(radioGroup).toHaveClass(className);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const { getByRole } = render(<RadioGroup label="Test Radio Group" id={id} />);

      const radioGroup = getByRole('radiogroup');

      expect(radioGroup.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const { getByRole } = render(<RadioGroup label="Test Radio Group" style={style} />);

      const radioGroup = getByRole('radiogroup');

      expect(radioGroup).toHaveStyle(styleString);
    });

    it('should have child class when className is provided to child', () => {
      expect.assertions(1);

      const className = 'example-class';

      const { getByText } = render(
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

      const radio = getByText('Option 1');

      expect(radio).toHaveClass(className);
    });

    it('should have child id when id is provided to child', () => {
      expect.assertions(1);

      const id = 'example-id';

      const { getByRole } = render(
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
      const radio = getByRole('radio');

      expect(radio.id).toBe(id);
    });

    it('should have child style when style is provided to child', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const { getByText } = render(
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
      const radio = getByText('Option 1');

      expect(radio).toHaveStyle(styleString);
    });

    it('should give only the select element the selected class', () => {
      expect.assertions(2);

      const { getByText } = render(
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

      const option1 = getByText('Option 1').querySelector('.md-radio-button');
      const option2 = getByText('Option 2').querySelector('.md-radio-button');

      expect(option1).toHaveAttribute('data-selected', 'true');
      expect(option2).toHaveAttribute('data-selected', 'false');
    });
  });

  describe('actions', () => {
    it('should change which option is selected when clicked', () => {
      expect.assertions(4);

      const { getByText } = render(
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

      const option1 = getByText('Option 1').querySelector('.md-radio-button');
      const option2 = getByText('Option 2').querySelector('.md-radio-button');

      expect(option1).toHaveAttribute('data-selected', 'true');
      expect(option2).toHaveAttribute('data-selected', 'false');

      userEvent.click(option2);

      expect(option1).toHaveAttribute('data-selected', 'false');
      expect(option2).toHaveAttribute('data-selected', 'true');
    });

    it('should call onChange handler when option is clicked', () => {
      expect.assertions(1);

      const changeHandler = jest.fn();

      const { getByText } = render(
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
          onChange={changeHandler}
        />
      );

      const option2 = getByText('Option 2').querySelector('.md-radio-button');

      userEvent.click(option2);

      expect(changeHandler).toBeCalledWith('option2');
    });

    it('should not call call onChange handler when defualt value is clicked first', () => {
      expect.assertions(1);

      const changeHandler = jest.fn();

      const { getByText } = render(
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
          onChange={changeHandler}
        />
      );

      const option1 = getByText('Option 1').querySelector('.md-radio-button');

      userEvent.click(option1);

      expect(changeHandler).not.toBeCalled();
    });

    it('should call onChange handler only once when an option is clicked several times', () => {
      expect.assertions(2);

      const changeHandler = jest.fn();

      const { getByText } = render(
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
          onChange={changeHandler}
        />
      );

      const option2 = getByText('Option 2').querySelector('.md-radio-button');

      userEvent.click(option2);

      expect(changeHandler).toBeCalledWith('option2');
      expect(changeHandler).toBeCalledTimes(1);
    });

    it('should allow keyboard navigation', () => {
      expect.assertions(2);

      const changeHandler = jest.fn();

      const { getByText } = render(
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
          onChange={changeHandler}
        />
      );

      const option1 = getByText('Option 1').querySelector('.md-radio-button');
      const option2 = getByText('Option 2').querySelector('.md-radio-button');

      userEvent.type(option1, '{arrowdown}');

      expect(changeHandler).toBeCalledWith('option2');

      userEvent.type(option2, '{arrowup}');

      expect(changeHandler).toBeCalledWith('option1');
    });

    it('should not call onChange handler when a disabled option is clicked', () => {
      expect.assertions(1);

      const changeHandler = jest.fn();

      const { getByText } = render(
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
          onChange={changeHandler}
        />
      );

      const option2 = getByText('Option 2').querySelector('.md-radio-button');

      userEvent.click(option2);

      expect(changeHandler).not.toBeCalled();
    });

    it('should not call onChange handler when the group is readonly and an option is clicked', () => {
      expect.assertions(1);

      const changeHandler = jest.fn();

      const { getByText } = render(
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
          onChange={changeHandler}
          isReadOnly={true}
        />
      );

      const option2 = getByText('Option 2').querySelector('.md-radio-button');

      userEvent.click(option2);

      expect(changeHandler).not.toBeCalled();
    });

    it('should not call onChange handler when the group is disabled and an option is clicked', () => {
      expect.assertions(1);

      const changeHandler = jest.fn();

      const { getByText } = render(
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
          onChange={changeHandler}
          isDisabled={true}
        />
      );

      const option2 = getByText('Option 2').querySelector('.md-radio-button');

      userEvent.click(option2);

      expect(changeHandler).not.toBeCalled();
    });

    it('should call setValue on state change if setValue is passed', () => {
      expect.assertions(1);

      const setValue = jest.fn();

      const { getByText } = render(
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

      const option2 = getByText('Option 2').querySelector('.md-radio-button');

      userEvent.click(option2);

      expect(setValue).toBeCalledWith('option2');
    });

    it('should call both onChange and setValue if both are passed', () => {
      expect.assertions(2);

      const setValue = jest.fn();
      const changeHandler = jest.fn();

      const { getByText } = render(
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
          onChange={changeHandler}
          setValue={setValue}
        />
      );

      const option2 = getByText('Option 2').querySelector('.md-radio-button');

      userEvent.click(option2);

      expect(setValue).toBeCalledWith('option2');
      expect(changeHandler).toBeCalledWith('option2');
    });
  });
});
