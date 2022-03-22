import React, { ReactElement } from 'react';

import Reaction, { ReactionProps } from 'components/Reaction';
import { REACTION_NAMES } from 'components/Reaction/Reaction.constants';

import { mountAndWait } from '../../../test/utils';

import ReactionButton, { REACTION_BUTTON_CONSTANTS as CONSTANTS } from './';

describe('<ReactionButton />', () => {
  let children: ReactElement<ReactionProps>;

  beforeEach(() => {
    children = <Reaction name={REACTION_NAMES.haha} />;
  });

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<ReactionButton>{children}</ReactionButton>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = await mountAndWait(
        <ReactionButton className={className}>{children}</ReactionButton>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountAndWait(<ReactionButton id={id}>{children}</ReactionButton>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = await mountAndWait(
        <ReactionButton style={style}>{children}</ReactionButton>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with reacted', async () => {
      expect.assertions(1);

      const container = await mountAndWait(
        <ReactionButton reacted={true}>{children}</ReactionButton>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(<ReactionButton>{children}</ReactionButton>);
      const element = wrapper.find(ReactionButton).getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const wrapper = await mountAndWait(
        <ReactionButton className={className}>{children}</ReactionButton>
      );
      const element = wrapper.find(ReactionButton).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const wrapper = await mountAndWait(<ReactionButton id={id}>{children}</ReactionButton>);
      const element = wrapper.find(ReactionButton).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const wrapper = await mountAndWait(<ReactionButton style={style}>{children}</ReactionButton>);
      const element = wrapper.find(ReactionButton).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided reacted when reacted is provided', async () => {
      expect.assertions(1);

      const reacted = true;

      const wrapper = await mountAndWait(
        <ReactionButton reacted={reacted}>{children}</ReactionButton>
      );
      const element = wrapper.find(ReactionButton).getDOMNode();

      expect(element.getAttribute('data-reacted')).toBe(`${reacted}`);
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', async () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const wrapper = await mountAndWait(
        <ReactionButton onPress={mockCallback}>{children}</ReactionButton>
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
