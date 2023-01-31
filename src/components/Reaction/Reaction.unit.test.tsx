import React from 'react';
import { mountAndWait } from '../../../test/utils';

import Reaction, { REACTION_CONSTANTS as CONSTANTS } from './';
import lottie from 'lottie-web';
import * as jsonImport from '../../hooks/useDynamicJSONImport';
import { STYLE } from './Reaction.constants';
import { GLYPH_NOT_FOUND } from '../Icon/Icon.constants';
import LoadingSpinner from '../LoadingSpinner';

describe('<Reaction/>', () => {
  describe('snapshot', () => {
    beforeEach(() => {
      console.warn = jest.fn();
    });

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

    it('should match snapshot with glyph not found if error', async () => {
      expect.assertions(1);

      jest.spyOn(jsonImport, 'useDynamicJSONImport').mockReturnValue({ error: new Error('error') });

      const container = await mountAndWait(<Reaction name="haha" size={16} />);

      expect(container.find(`.${STYLE.notFound}`).text()).toEqual(GLYPH_NOT_FOUND);
    });

    it('should match snapshot with spinner while animation data is not defined', async () => {
      expect.assertions(1);

      jest.spyOn(jsonImport, 'useDynamicJSONImport').mockReturnValue({ animationData: undefined });

      const container = await mountAndWait(<Reaction name="haha" size={16} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    beforeEach(() => {
      jest.spyOn(jsonImport, 'useDynamicJSONImport').mockReturnValue({ animationData: 'data' });
      console.warn = jest.fn();
    });

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
    beforeEach(() => {
      console.warn = jest.fn();
    });

    it('should set/remove listeners correctly', async () => {
      const addEventListener = jest.fn();
      const removeEventListener = jest.fn();
      const destroy = jest.fn();
      const onComplete = jest.fn();

      jest
        .spyOn(lottie, 'loadAnimation')
        .mockReturnValue({ addEventListener, removeEventListener, destroy } as never);
      jest.spyOn(jsonImport, 'useDynamicJSONImport').mockReturnValue({ animationData: 'data' });
      const wrapper = await mountAndWait(
        <Reaction name="haha" size={16} onComplete={onComplete} />
      );

      expect(addEventListener).toHaveBeenCalledWith('complete', onComplete);
      expect(removeEventListener).not.toHaveBeenCalledWith('complete', onComplete);

      wrapper.unmount();

      expect(destroy).toBeCalledTimes(1);
      expect(removeEventListener).toBeCalledWith('complete', onComplete);
    });

    it('should not set/remove listeners if onComplete not provided', async () => {
      const addEventListener = jest.fn();
      const removeEventListener = jest.fn();
      const destroy = jest.fn();

      jest
        .spyOn(lottie, 'loadAnimation')
        .mockReturnValue({ addEventListener, removeEventListener, destroy } as never);
      jest.spyOn(jsonImport, 'useDynamicJSONImport').mockReturnValue({ animationData: 'data' });
      const wrapper = await mountAndWait(<Reaction name="haha" size={16} />);

      expect(addEventListener).not.toHaveBeenCalledWith('complete', expect.any(Function));
      expect(removeEventListener).not.toHaveBeenCalledWith('complete', expect.any(Function));

      wrapper.unmount();

      expect(destroy).toBeCalledTimes(1);
      expect(removeEventListener).not.toBeCalledWith('complete', expect.any(Function));
    });

    it('should render glyph not found if error', async () => {
      jest.spyOn(jsonImport, 'useDynamicJSONImport').mockReturnValue({ error: new Error('error') });

      const wrapper = await mountAndWait(<Reaction name="haha" size={16} />);

      expect(wrapper.find(`.${STYLE.notFound}`).text()).toEqual(GLYPH_NOT_FOUND);
    });

    it('should render spinner while animation data is not defined', async () => {
      jest.spyOn(jsonImport, 'useDynamicJSONImport').mockReturnValue({ animationData: undefined });

      const wrapper = await mountAndWait(<Reaction name="haha" size={16} />);

      expect(wrapper.find(LoadingSpinner)).toBeDefined();
    });
  });
});
