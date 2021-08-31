import React from 'react';
<<<<<<< HEAD
import { mountAndWait } from '../../../test/utils';

import Reaction, { REACTION_CONSTANTS as CONSTANTS } from './';

describe('<Reaction/>', () => {
  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<Reaction name="haha" />);
=======
import { mount } from 'enzyme';

import Reaction, { REACTION_CONSTANTS as CONSTANTS } from './';

describe('<Reaction />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<Reaction />);
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)

      expect(container).toMatchSnapshot();
    });

<<<<<<< HEAD
    it('should match snapshot with className', async () => {
=======
    it('should match snapshot with className', () => {
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)
      expect.assertions(1);

      const className = 'example-class';

<<<<<<< HEAD
      const container = await mountAndWait(<Reaction name="haha" className={className} />);
=======
      const container = mount(<Reaction className={className} />);
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)

      expect(container).toMatchSnapshot();
    });

<<<<<<< HEAD
    it('should match snapshot with id', async () => {
=======
    it('should match snapshot with id', () => {
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)
      expect.assertions(1);

      const id = 'example-id';

<<<<<<< HEAD
      const container = await mountAndWait(<Reaction name="haha" id={id} />);
=======
      const container = mount(<Reaction id={id} />);
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)

      expect(container).toMatchSnapshot();
    });

<<<<<<< HEAD
    it('should match snapshot with style', async () => {
=======
    it('should match snapshot with style', () => {
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)
      expect.assertions(1);

      const style = { color: 'pink' };

<<<<<<< HEAD
      const container = await mountAndWait(<Reaction name="haha" style={style} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(<Reaction name="haha" />);
      const element = wrapper.find(Reaction).getDOMNode();
=======
      const container = mount(<Reaction style={style} />);

      expect(container).toMatchSnapshot();
    });

    /* ...additional snapshot tests... */
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<Reaction />)
        .find(Reaction)
        .getDOMNode();
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

<<<<<<< HEAD
    it('should have provided class when className is provided', async () => {
=======
    it('should have provided class when className is provided', () => {
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)
      expect.assertions(1);

      const className = 'example-class';

<<<<<<< HEAD
      const wrapper = await mountAndWait(<Reaction name="haha" className={className} />);
      const element = wrapper.find(Reaction).getDOMNode();
=======
      const element = mount(<Reaction className={className} />)
        .find(Reaction)
        .getDOMNode();
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)

      expect(element.classList.contains(className)).toBe(true);
    });

<<<<<<< HEAD
    it('should have provided id when id is provided', async () => {
=======
    it('should have provided id when id is provided', () => {
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)
      expect.assertions(1);

      const id = 'example-id';

<<<<<<< HEAD
      const wrapper = await mountAndWait(<Reaction name="haha" id={id} />);
      const element = wrapper.find(Reaction).getDOMNode();
=======
      const element = mount(<Reaction id={id} />)
        .find(Reaction)
        .getDOMNode();
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)

      expect(element.id).toBe(id);
    });

<<<<<<< HEAD
    it('should have provided style when style is provided', async () => {
=======
    it('should have provided style when style is provided', () => {
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

<<<<<<< HEAD
      const wrapper = await mountAndWait(<Reaction name="haha" style={style} />);
      const element = wrapper.find(Reaction).getDOMNode();
=======
      const element = mount(<Reaction style={style} />)
        .find(Reaction)
        .getDOMNode();
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)

      expect(element.getAttribute('style')).toBe(styleString);
    });

<<<<<<< HEAD
    it('should have provided size when size is provided', async () => {
      expect.assertions(1);

      const size = 16;

      const wrapper = await mountAndWait(<Reaction name="haha" size={size} />);
      const element = wrapper.find(Reaction).getDOMNode();

      expect(element.getAttribute('data-size')).toBe(`${size}`);
    });
=======
    /* ...additional attribute tests... */
  });

  describe('actions', () => {
    /* ...action tests... */
>>>>>>> ff1f59009 (feat(reactions): implement SVG reactions)
  });
});
