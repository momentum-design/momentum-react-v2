import React from 'react';
import { mountAndWait } from '../../../test/utils';

import Reaction, { REACTION_CONSTANTS as CONSTANTS } from './';

describe('<Reaction/>', () => {
  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<Reaction name="haha" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = await mountAndWait(<Reaction name="haha" className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountAndWait(<Reaction name="haha" id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = await mountAndWait(<Reaction name="haha" style={style} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(<Reaction name="haha" />);
      const element = wrapper.find(Reaction).getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const wrapper = await mountAndWait(<Reaction name="haha" className={className} />);
      const element = wrapper.find(Reaction).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const wrapper = await mountAndWait(<Reaction name="haha" id={id} />);
      const element = wrapper.find(Reaction).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const wrapper = await mountAndWait(<Reaction name="haha" style={style} />);
      const element = wrapper.find(Reaction).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided size when size is provided', async () => {
      expect.assertions(1);

      const size = 16;
      const wrapper = await mountAndWait(<Reaction name="haha" size={size} />);
      const element = wrapper.find(Reaction).getDOMNode();

      expect(element.getAttribute('data-size')).toBe(`${size}`);
    });
  });

  describe('actions', () => {
    const wrapper = await mountAndWait(<Reaction name="haha" size={size} />);
    const element = wrapper.find(Reaction).getDOMNode();

    expect(element.getAttribute('data-size')).toBe(`${size}`);
  });
});
