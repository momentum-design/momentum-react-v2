import React from 'react';

import LoadingSpinner, { LOADING_SPINNER_CONSTANTS as CONSTANTS } from './';
import { mountAndWait } from '../../../test/utils';

describe('<LoadingSpinner />', () => {
  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<LoadingSpinner aria-label="Loading, please wait" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = await mountAndWait(
        <LoadingSpinner aria-label="Loading, please wait" className={className} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountAndWait(
        <LoadingSpinner aria-label="Loading, please wait" id={id} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = await mountAndWait(
        <LoadingSpinner aria-label="Loading, please wait" style={style} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with scale', async () => {
      expect.assertions(1);

      const scale = 32 as const;

      const container = await mountAndWait(
        <LoadingSpinner aria-label="Loading, please wait" scale={scale} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with aria-hidden', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<LoadingSpinner aria-hidden />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      const element = (await mountAndWait(<LoadingSpinner aria-label="Loading, please wait" />))
        .find(LoadingSpinner)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = (
        await mountAndWait(
          <LoadingSpinner aria-label="Loading, please wait" className={className} />
        )
      )
        .find(LoadingSpinner)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = (
        await mountAndWait(<LoadingSpinner aria-label="Loading, please wait" id={id} />)
      )
        .find(LoadingSpinner)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = (
        await mountAndWait(<LoadingSpinner aria-label="Loading, please wait" style={style} />)
      )
        .find(LoadingSpinner)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided correct icons scale when scale is provided', async () => {
      expect.assertions(2);

      const scale = 32 as const;

      (await mountAndWait(<LoadingSpinner aria-label="Loading, please wait" scale={scale} />))
        .find('svg')
        .forEach((icon) => {
          expect(icon.getDOMNode().getAttribute('data-scale')).toBe(`${scale}`);
        });
    });

    it('should have provided aria-hidden when aria-hidden is provided', async () => {
      expect.assertions(1);

      const element = (await mountAndWait(<LoadingSpinner aria-hidden />))
        .find(LoadingSpinner)
        .getDOMNode();

      expect(element.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
