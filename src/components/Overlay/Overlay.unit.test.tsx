import React from 'react';
import { mount } from 'enzyme';
import { FocusScope } from '@react-aria/focus';

import ModalContainer from '../ModalContainer';

import Overlay, { OVERLAY_CONSTANTS as CONSTANTS } from './';

describe('<Overlay />', () => {
  const commonChildren = <div>children</div>;
  const commonTargetPosition = {
    center: {
      x: 100,
      y: 100,
    },
    horizontalEdgeOffset: 50,
    verticalEdgeOffset: 50,
  };

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<Overlay>{commonChildren}</Overlay>);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should extend <ModalContainer />', () => {
      expect.assertions(1);

      const component = mount(<Overlay>{commonChildren}</Overlay>).find(Overlay);
      const target = component.find(ModalContainer);

      expect(target.exists()).toBe(true);
    });

    it('should render when isOpen is true', () => {
      expect.assertions(1);

      const isOpen = true;

      const component = mount(<Overlay isOpen={isOpen}>{commonChildren}</Overlay>).find(
        ModalContainer
      );

      expect(component.exists()).toBe(true);
    });

    it('should not render when isOpen is false', () => {
      expect.assertions(1);

      const isOpen = false;

      const component = mount(<Overlay isOpen={isOpen}>{commonChildren}</Overlay>).find(
        ModalContainer
      );

      expect(component.exists()).toBe(false);
    });

    it("should ammend a top style when positioning is 'bottom'", () => {
      expect.assertions(1);

      const positioning = CONSTANTS.POSITIONINGS.BOTTOM;

      const component = mount(
        <Overlay positioning={positioning} targetPosition={commonTargetPosition}>
          {commonChildren}
        </Overlay>
      ).find(Overlay);

      const target = component.find(ModalContainer);

      const expected = 'position: fixed; left: 100px; top: 150px; transform: translate(-50%, 0);';

      expect(target.getDOMNode().getAttribute('style')).toBe(expected);
    });

    it("should ammend a top style when positioning is 'left'", () => {
      expect.assertions(1);

      const positioning = CONSTANTS.POSITIONINGS.LEFT;

      const component = mount(
        <Overlay positioning={positioning} targetPosition={commonTargetPosition}>
          {commonChildren}
        </Overlay>
      ).find(Overlay);

      const target = component.find(ModalContainer);

      const expected =
        'position: fixed; right: calc(100vw - 50px); top: 100px; transform: translate(0, -50%);';

      expect(target.getDOMNode().getAttribute('style')).toBe(expected);
    });

    it("should ammend a top style when positioning is 'right'", () => {
      expect.assertions(1);

      const positioning = CONSTANTS.POSITIONINGS.RIGHT;

      const component = mount(
        <Overlay positioning={positioning} targetPosition={commonTargetPosition}>
          {commonChildren}
        </Overlay>
      ).find(Overlay);

      const target = component.find(ModalContainer);

      const expected = 'position: fixed; left: 150px; top: 100px; transform: translate(0, -50%);';

      expect(target.getDOMNode().getAttribute('style')).toBe(expected);
    });

    it("should ammend a top style when positioning is 'top'", () => {
      expect.assertions(1);

      const positioning = CONSTANTS.POSITIONINGS.TOP;

      const component = mount(
        <Overlay positioning={positioning} targetPosition={commonTargetPosition}>
          {commonChildren}
        </Overlay>
      ).find(Overlay);

      const target = component.find(ModalContainer);

      const expected = 'position: fixed; left: 100px; transform: translate(-50%, 0);';

      expect(target.getDOMNode().getAttribute('style')).toBe(expected);
    });

    it('should not set style when targetPosition is not supplied with position', () => {
      expect.assertions(1);

      const positioning = Object.values(CONSTANTS.POSITIONINGS).pop();

      const component = mount(<Overlay positioning={positioning}>{commonChildren}</Overlay>).find(
        Overlay
      );

      const target = component.find(ModalContainer);

      expect(target.getDOMNode().getAttribute('style')).toBeNull();
    });

    it('should contain a focus scope', () => {
      expect.assertions(1);

      const component = mount(<Overlay>{commonChildren}</Overlay>).find(Overlay);

      const target = component.find(FocusScope);

      expect(target.exists()).toBe(true);
    });

    it('should pass focus scope props', () => {
      expect.assertions(1);

      const component = mount(<Overlay>{commonChildren}</Overlay>).find(Overlay);

      const target = component.find(FocusScope);

      const expected = {
        autoFocus: CONSTANTS.DEFAULTS.AUTO_FOCUS,
        contain: CONSTANTS.DEFAULTS.CONTAIN,
        restoreFocus: CONSTANTS.DEFAULTS.RESTORE_FOCUS,
      };

      expect(target.props()).toMatchObject(expected);
    });
  });
});
