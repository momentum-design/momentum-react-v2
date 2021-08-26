import React from 'react';
import { mount } from 'enzyme';

import ReactionBadge, { REACTION_BADGE_CONSTANTS as CONSTANTS } from './';

describe('<ReactionBadge />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<ReactionBadge />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<ReactionBadge className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<ReactionBadge id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<ReactionBadge style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with reacted', () => {
      expect.assertions(1);

      const container = mount(<ReactionBadge reacted={true} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with count', () => {
      expect.assertions(1);

      const container = mount(<ReactionBadge count={1} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<ReactionBadge />)
        .find(ReactionBadge)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<ReactionBadge className={className} />)
        .find(ReactionBadge)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<ReactionBadge id={id} />)
        .find(ReactionBadge)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<ReactionBadge style={style} />)
        .find(ReactionBadge)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided reacted when reacted is provided', () => {
      expect.assertions(1);

      const reacted = true;

      const element = mount(<ReactionBadge reacted={reacted} />)
        .find(ReactionBadge)
        .getDOMNode();

      expect(element.getAttribute('data-reacted')).toBe(`${reacted}`);
    });

    it('should have provided count when count is provided', () => {
      expect.assertions(1);

      const count = 1;

      const element = mount(<ReactionBadge count={count} />)
        .find(ReactionBadge)
        .getDOMNode();

      expect(element.getAttribute('data-count')).toBe(`${count}`);
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const component = mount(<ReactionBadge onPress={mockCallback} />).find(ReactionBadge);

      component.props().onPress({
        type: 'press',
        pointerType: 'mouse',
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
        target: component.getDOMNode(),
      });

      expect(mockCallback).toBeCalledTimes(1);
    });
  });
});
