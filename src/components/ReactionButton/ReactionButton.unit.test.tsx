import React from 'react';
import { mount } from 'enzyme';

import { mountAndWait } from '../../../test/utils';
import ReactionButton, { REACTION_BUTTON_CONSTANTS as CONSTANTS } from './';
import Reaction from '../Reaction';
import { REACTION_NAMES } from '../Reaction/Reaction.constants';

describe('<ReactionButton />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<ReactionButton />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<ReactionButton className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<ReactionButton id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<ReactionButton style={style} />);

      expect(container).toMatchSnapshot();
    });

    /* ...additional snapshot tests... */
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<ReactionButton />)
        .find(ReactionButton)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<ReactionButton className={className} />)
        .find(ReactionButton)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<ReactionButton id={id} />)
        .find(ReactionButton)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<ReactionButton style={style} />)
        .find(ReactionButton)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', async () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const wrapper = await mountAndWait(
        <ReactionButton onPress={mockCallback}>
          <Reaction name={REACTION_NAMES.haha} />
        </ReactionButton>
      );
      const component = wrapper.find(ReactionButton);

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
