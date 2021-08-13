import React from 'react';
import { mount } from 'enzyme';
import { ButtonGroupNext as ButtonGroup, ButtonPill } from '@momentum-ui/react';

import { DEFAULTS, SEPARATIONS, STYLE } from './ButtonGroup.constants';

describe('<ButtonPill />', () => {
  const childrenTemplate = [
    <ButtonPill key="0">Example A</ButtonPill>,
    <ButtonPill key="1">Example B</ButtonPill>,
    <ButtonPill key="2">Example B</ButtonPill>,
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

    it('should match snapshot with seperation', () => {
      expect.assertions(1);

      const separation = SEPARATIONS[Object.keys(SEPARATIONS)[Object.keys(SEPARATIONS).length - 1]];

      container = mount(<ButtonGroup separation={separation}>{childrenTemplate}</ButtonGroup>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when spaced', () => {
      expect.assertions(1);

      const spaced = !DEFAULTS.SPACED;

      container = mount(<ButtonGroup spaced={spaced}>{childrenTemplate}</ButtonGroup>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when provided a className', () => {
      expect.assertions(1);

      const className = 'test-example-class';

      container = mount(<ButtonGroup className={className}>{childrenTemplate}</ButtonGroup>);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its main class', () => {
      expect.assertions(1);

      const element = mount(<ButtonGroup>{childrenTemplate}</ButtonGroup>)
        .find(ButtonGroup)
        .getDOMNode();

      expect(element.classList.contains(STYLE.wrapper)).toBe(true);
    });

    it('should pass child props with separators', () => {
      expect.assertions(1);

      const element = mount(<ButtonGroup>{childrenTemplate}</ButtonGroup>)
        .find(ButtonGroup)
        .getDOMNode();

      const expectedChildrenLength =
        childrenTemplate.length + Math.floor(childrenTemplate.length - 1);

      expect(element.childNodes.length).toBe(expectedChildrenLength);
    });

    it('should pass className prop', () => {
      expect.assertions(1);

      const className = 'text-example-class';

      const element = mount(<ButtonGroup className={className}>{childrenTemplate}</ButtonGroup>)
        .find(ButtonGroup)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should pass separation prop', () => {
      expect.assertions(1);

      const separation = SEPARATIONS[Object.keys(SEPARATIONS)[Object.keys(SEPARATIONS).length - 1]];

      const element = mount(<ButtonGroup separation={separation}>{childrenTemplate}</ButtonGroup>)
        .find(ButtonGroup)
        .getDOMNode();

      expect(element.getAttribute('data-separation')).toBe(separation);
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
  });
});
