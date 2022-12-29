import React from 'react';
import { mount } from 'enzyme';
import {
  ButtonCircle,
  ButtonGroupNext as ButtonGroup,
  ButtonPill,
} from '@momentum-ui/react-collaboration';

import { DEFAULTS, STYLE } from './ButtonGroup.constants';

describe('<ButtonPill />', () => {
  const childrenTemplate = [
    <ButtonPill key="0">Example A</ButtonPill>,
    <ButtonCircle key="1">A</ButtonCircle>,
  ];
  let container;

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      container = mount(<ButtonGroup>{childrenTemplate}</ButtonGroup>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with round', () => {
      expect.assertions(1);

      const round = !DEFAULTS.ROUND;

      container = mount(<ButtonGroup round={round}>{childrenTemplate}</ButtonGroup>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when spaced', () => {
      expect.assertions(1);

      const spaced = !DEFAULTS.SPACED;

      container = mount(<ButtonGroup spaced={spaced}>{childrenTemplate}</ButtonGroup>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<ButtonCircle className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<ButtonCircle id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<ButtonCircle style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with role', () => {
      expect.assertions(1);

      const role = 'tablist';

      container = mount(<ButtonGroup role={role}>{childrenTemplate}</ButtonGroup>);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<ButtonGroup>{childrenTemplate}</ButtonGroup>)
        .find(ButtonGroup)
        .getDOMNode();

      expect(element.classList.contains(STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<ButtonCircle className={className} />)
        .find(ButtonCircle)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<ButtonCircle id={id} />)
        .find(ButtonCircle)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<ButtonCircle style={style} />)
        .find(ButtonCircle)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should pass spaced prop', () => {
      expect.assertions(1);

      const spaced = !DEFAULTS.SPACED;

      const element = mount(<ButtonGroup spaced={spaced}>{childrenTemplate}</ButtonGroup>)
        .find(ButtonGroup)
        .getDOMNode();

      expect(element.getAttribute('data-spaced')).toBe(`${spaced}`);
    });

    it('should pass round prop', () => {
      expect.assertions(1);

      const round = !DEFAULTS.ROUND;

      const element = mount(<ButtonGroup round={round}>{childrenTemplate}</ButtonGroup>)
        .find(ButtonGroup)
        .getDOMNode();

      expect(element.getAttribute('data-round')).toBe(`${round}`);
    });

    it('should pass role prop', () => {
      expect.assertions(1);

      const role = 'tablist';

      const element = mount(<ButtonGroup role={role}>{childrenTemplate}</ButtonGroup>)
        .find(ButtonGroup)
        .getDOMNode();

      expect(element.getAttribute('role')).toBe(role);
    });
  });
});
