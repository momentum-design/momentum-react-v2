import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import RadioSimple from '.';
import { STYLE } from './RadioSimple.constants';
import { RadioSimpleGroupContext } from '../RadioSimpleGroup';
import Text from '../Text';
import Icon from '../Icon';

describe('<RadioSimple />', () => {
  const children = (
    <div>
      <Icon name="accessibility" autoScale />
      <Text>Red</Text>
    </div>
  );

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const { asFragment } = render(
        <RadioSimpleGroupContext.Provider value={'red'}>
          <RadioSimple children={children} value='red'/>
        </RadioSimpleGroupContext.Provider>
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with ariaLabel', () => {
      expect.assertions(1);

      const ariaLabel = 'example-ariaLabel';

      const { asFragment } = render(
        <RadioSimpleGroupContext.Provider value={'red'}>
          <RadioSimple children={children} value='red' ariaLabel={ariaLabel}/>
        </RadioSimpleGroupContext.Provider>
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with ariaLabelledBy', () => {
      expect.assertions(1);

      const ariaLabelledBy = 'example-ariaLabel';

      const { asFragment } = render(
        <RadioSimpleGroupContext.Provider value={'red'}>
          <RadioSimple children={children} value='red' ariaLabelledBy={ariaLabelledBy}/>
        </RadioSimpleGroupContext.Provider>
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-className';

      const { asFragment } = render(
        <RadioSimpleGroupContext.Provider value={'red'}>
          <RadioSimple children={children} value='red' className={className}/>
        </RadioSimpleGroupContext.Provider>
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const { asFragment } = render(
        <RadioSimpleGroupContext.Provider value={'red'}>
          <RadioSimple children={children} value='red' id={id}/>
        </RadioSimpleGroupContext.Provider>
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with isDisabled', () => {
      expect.assertions(1);

      const isDisabled = true;

      const { asFragment } = render(
        <RadioSimpleGroupContext.Provider value={'red'}>
          <RadioSimple children={children} value='red'isDisabled={isDisabled}/>
        </RadioSimpleGroupContext.Provider>
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'red' };

      const { asFragment } = render(
        <RadioSimpleGroupContext.Provider value={'red'}>
          <RadioSimple children={children} value='red' style={style}/>
        </RadioSimpleGroupContext.Provider>
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its default wrapper class', () => {
      expect.assertions(1);

      const { container } = render(
        <RadioSimpleGroupContext.Provider value={'red'}>
          <RadioSimple children={children} value='red'/>
        </RadioSimpleGroupContext.Provider>
      );

      const radioSimple = container.querySelector('label');

      expect(radioSimple).toHaveClass(STYLE.wrapper);
    });

    it('should have provided ariaLabel when ariaLabel is provided', () => {
      expect.assertions(1);

      const ariaLabel = 'example-ariaLabel';

      const { container } = render(
        <RadioSimpleGroupContext.Provider value={'red'}>
          <RadioSimple children={children} value='red' ariaLabel={ariaLabel}/>
        </RadioSimpleGroupContext.Provider>
      );

      const radioSimple = container.querySelector('input');

      expect(radioSimple.getAttribute('aria-label')).toBe(ariaLabel);
    });

    it('should have provided ariaLabel when ariaLabelledBy is provided', () => {
      expect.assertions(1);

      const ariaLabelledBy = 'example-ariaLabelledBy';

      const { container } = render(
        <RadioSimpleGroupContext.Provider value={'red'}>
          <RadioSimple children={children} value='red' ariaLabelledBy={ariaLabelledBy}/>
        </RadioSimpleGroupContext.Provider>
      );

      const radioSimple = container.querySelector('input');

      expect(radioSimple.getAttribute('aria-labelledby')).toBe(ariaLabelledBy);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-className';

      const { container } = render(
        <RadioSimpleGroupContext.Provider value={'red'}>
          <RadioSimple children={children} value='red' className={className}/>
        </RadioSimpleGroupContext.Provider>
      );

      const radioSimple = container.querySelector('label');

      expect(radioSimple).toHaveClass(className);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const { container } = render(
        <RadioSimpleGroupContext.Provider value={'red'}>
          <RadioSimple children={children} value='red' id={id}/>
        </RadioSimpleGroupContext.Provider>
      );

      const radioSimple = container.querySelector('label');

      expect(radioSimple.getAttribute('id')).toBe(id);
    });

    it('should have provided isDisabled when isDisabled is provided', () => {
      expect.assertions(1);

      const isDisabled = true;

      const { container } = render(
        <RadioSimpleGroupContext.Provider value={'red'}>
          <RadioSimple children={children} value='red' isDisabled={isDisabled}/>
        </RadioSimpleGroupContext.Provider>
      );

      const radioSimple = container.querySelector('label');

      expect(radioSimple.getAttribute('data-disabled')).toBe('true');
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const { container } = render(
        <RadioSimpleGroupContext.Provider value={'red'}>
          <RadioSimple children={children} value='red' style={style}/>
        </RadioSimpleGroupContext.Provider>
      );

      const radioSimple = container.querySelector('label');

      expect(radioSimple).toHaveStyle(style);
    });
  });
});
