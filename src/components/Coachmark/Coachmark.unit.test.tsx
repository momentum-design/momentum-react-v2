import React from 'react';
import { mount } from 'enzyme';

import Coachmark, { CoachmarkProps } from './';

const defaultProps = {
  children: 'This is a coachmark',
  'close-button-aria-label': 'Close',
  id: 'coachmark',
  triggerID: 'trigger',
  'aria-label': 'Coachmark',
};

describe('<Coachmark />', () => {
  const setup = (props: CoachmarkProps) => {
    return mount(
      <div>
        <div id={props.triggerID}>trigger</div>
        <Coachmark {...props} />
      </div>
    );
  };

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = setup(defaultProps);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = setup({ ...defaultProps, className });

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = setup({ ...defaultProps, className })
        .find(Coachmark)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = setup({ ...defaultProps, style })
        .find(Coachmark)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });
  });
});
