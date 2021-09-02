import React from 'react';
import { mountAndWait } from '../../../test/utils';

import ReactionBadge, { REACTION_BADGE_CONSTANTS as CONSTANTS } from './';
import Reaction from '../Reaction';

describe('<ReactionBadge name="haha" />', () => {
  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<ReactionBadge name="haha" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = await mountAndWait(<ReactionBadge name="haha" className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountAndWait(<ReactionBadge name="haha" id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = await mountAndWait(<ReactionBadge name="haha" style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with reacted', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<ReactionBadge name="haha" reacted={true} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with count', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<ReactionBadge name="haha" count={1} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(<ReactionBadge name="haha" />);
      const element = wrapper.find(ReactionBadge).getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const wrapper = await mountAndWait(<ReactionBadge name="haha" className={className} />);
      const element = wrapper.find(ReactionBadge).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const wrapper = await mountAndWait(<ReactionBadge name="haha" id={id} />);
      const element = wrapper.find(ReactionBadge).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const wrapper = await mountAndWait(<ReactionBadge name="haha" style={style} />);
      const element = wrapper.find(ReactionBadge).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided reacted when reacted is provided', async () => {
      expect.assertions(1);

      const reacted = true;

      const wrapper = await mountAndWait(<ReactionBadge name="haha" reacted={reacted} />);
      const element = wrapper.find(ReactionBadge).getDOMNode();

      expect(element.getAttribute('data-reacted')).toBe(`${reacted}`);
    });

    it('should have provided count when count is provided', async () => {
      expect.assertions(1);

      const count = 1;

      const wrapper = await mountAndWait(<ReactionBadge name="haha" count={count} />);
      const element = wrapper.find(ReactionBadge).getDOMNode();

      expect(element.getAttribute('data-count')).toBe(`${count}`);
    });

    it('should map the reaction name to the generated child', async () => {
      expect.assertions(1);

      const name = 'haha';
      const reactionName = 'haha';

      const wrapper = await mountAndWait(<ReactionBadge name={name} />);
      const child = wrapper.find(Reaction);

      expect(child.props().name).toBe(reactionName);
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', async () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const wrapper = await mountAndWait(<ReactionBadge name="haha" onPress={mockCallback} />);
      const component = wrapper.find(ReactionBadge);

      component.props().onPress({
        type: 'press',
        pointerType: 'mouse',
        altKey: false,
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
        target: component.getDOMNode(),
      });

      expect(mockCallback).toBeCalledTimes(1);
    });
  });
});
