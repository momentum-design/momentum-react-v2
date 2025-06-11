import React from 'react';
import { renderWithWebComponent } from '../../../test/utils';
import TextArea, { TEXT_AREA_CONSTANTS as CONSTANTS } from './';

describe('<TextArea />', () => {
  const setup = async (component: React.ReactElement) => {
    return renderWithWebComponent(component);
  };

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      const { container } = await setup(<TextArea />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';
      const { container } = await setup(<TextArea className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';
      const { container } = await setup(<TextArea id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const { container } = await setup(<TextArea style={style} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      const { container } = await setup(<TextArea />);
      const element = container.querySelector('mdc-textarea');

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const { container } = await setup(<TextArea className={className} />);
      const element = container.querySelector('mdc-textarea');

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const { container } = await setup(<TextArea id={id} />);
      const element = container.querySelector('mdc-textarea');

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const { container } = await setup(<TextArea style={style} />);
      const element = container.querySelector('mdc-textarea');

      expect(element.getAttribute('style')).toBe(styleString);
    });
  });
});
