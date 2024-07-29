import React from 'react';
import { mount } from 'enzyme';

import ReactionPicker, { REACTION_PICKER_CONSTANTS as CONSTANTS } from './';
import ReactionButton from '../ReactionButton';
import AriaToolbarItem from '../AriaToolbarItem';

describe('<ReactionPicker />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(
        <ReactionPicker ariaToolbarItemsSize={0} ariaLabel="test-aria-label" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(
        <ReactionPicker
          className={className}
          ariaToolbarItemsSize={0}
          ariaLabel="test-aria-label"
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(
        <ReactionPicker id={id} ariaToolbarItemsSize={0} ariaLabel="test-aria-label" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(
        <ReactionPicker style={style} ariaToolbarItemsSize={0} ariaLabel="test-aria-label" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with children', () => {
      expect.assertions(1);

      const children = (
        <AriaToolbarItem itemIndex={0}>
          <ReactionButton />
        </AriaToolbarItem>
      );

      const container = mount(
        <ReactionPicker ariaToolbarItemsSize={1} ariaLabel="test-aria-label">
          {children}
        </ReactionPicker>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<ReactionPicker ariaToolbarItemsSize={0} ariaLabel="test-aria-label" />)
        .find(ReactionPicker)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(
        <ReactionPicker
          className={className}
          ariaToolbarItemsSize={0}
          ariaLabel="test-aria-label"
        />
      )
        .find(ReactionPicker)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(
        <ReactionPicker id={id} ariaToolbarItemsSize={0} ariaLabel="test-aria-label" />
      )
        .find(ReactionPicker)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(
        <ReactionPicker style={style} ariaToolbarItemsSize={0} ariaLabel="test-aria-label" />
      )
        .find(ReactionPicker)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });
  });
});
