import '@testing-library/jest-dom';
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { mountAndWait, renderWithWebComponent } from '../../../test/utils';
import Reaction, { REACTION_CONSTANTS as CONSTANTS } from './';

import { REACTIONS, GLYPH_NOT_FOUND } from './Reaction.constants';

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

    it('should match snapshot with glyph not found if error', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<Reaction name="haha" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with spinner while animation data is not defined', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<Reaction name="haha" />);

      expect(container).toMatchSnapshot();
    });

    it('match all available animations', async () => {
      expect.assertions(1);

      const ReactionKeys = () => (
        <div>
          {Object.keys(REACTIONS).map((key) => (
            <p key={key}>{key}</p>
          ))}
        </div>
      );

      const container = await mountAndWait(<ReactionKeys />);
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
      const element = wrapper.find('Animation').getDOMNode();

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

      expect(element.getAttribute('data-scale')).toBe(`${size}`);
    });
  });

  describe('actions', () => {
    it('should render loading spinner first', async () => {
      const { container } = await renderWithWebComponent(<Reaction name="haha" />);

      expect(container.querySelector('.md-loading-spinner-wrapper')).toBeInTheDocument();
    });

    it('should render not loading spinner when hideLoadingSpinner=false passes', async () => {
      const { container } = await renderWithWebComponent(
        <Reaction name="haha" hideLoadingSpinner={false} />
      );

      expect(container.querySelector('.md-loading-spinner-wrapper')).not.toBeInTheDocument();
    });

    it('should render not found when an error happen', async () => {
      const { queryByText, container } = await renderWithWebComponent(
        <Reaction name={'hahaha' as any} />
      );

      await waitFor(() => !container.querySelector('.md-loading-spinner-wrapper'));

      expect(queryByText(GLYPH_NOT_FOUND)).toBeInTheDocument();
    });

    it('should render animation without loading or error message', async () => {
      const { queryByText, container } = await renderWithWebComponent(<Reaction name="haha" />);

      await waitFor(() => !container.querySelector('.md-loading-spinner-wrapper'));

      expect(queryByText(GLYPH_NOT_FOUND)).not.toBeInTheDocument();
      expect(container.querySelector('mdc-animation')).toBeVisible();
    });
  });
});
