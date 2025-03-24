import React from 'react';
import { render, waitFor } from '@testing-library/react';

import DividerDot, { DIVIDER_DOT_CONSTANTS as CONSTANTS } from './';

describe('<DividerDot />', () => {
  const setup = async (component: any) => {
    const { container } = render(component);

    // we have to wait for the web component to be rendered
    await waitFor(() => {
      expect(container.querySelector('mdc-bullet')).toBeTruthy();
    });

    return container;
  };

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(2);

      const container = await setup(<DividerDot />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(2);

      const className = 'example-class';

      const container = await setup(<DividerDot className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(2);

      const id = 'example-id';

      const container = await setup(<DividerDot id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(2);

      const style = { color: 'pink' };

      const container = await setup(<DividerDot style={style} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(2);

      const container = await setup(<DividerDot />);
      const element = container.querySelector('mdc-bullet');

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(2);

      const className = 'example-class';

      const container = await setup(<DividerDot className={className} />);
      const element = container.querySelector('mdc-bullet');

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(2);

      const id = 'example-id';

      const container = await setup(<DividerDot id={id} />);
      const element = container.querySelector('mdc-bullet');

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(2);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const container = await setup(<DividerDot style={style} />);
      const element = container.querySelector('mdc-bullet');

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided size when size is provided', async () => {
      expect.assertions(2);

      const size = 'large';

      const container = await setup(<DividerDot size={size} />);
      const element = container.querySelector('mdc-bullet');

      expect(element.getAttribute('size')).toBe(size);
    });
  });
});
