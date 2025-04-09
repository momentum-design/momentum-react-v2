import React from 'react';
import Badge from '.';
import { renderWithWebComponent } from '../../../test/utils';

describe('Badge', () => {
  let container;

  describe('snapshot', () => {
    const setup = async (component: any) => {
      return renderWithWebComponent(component, 'mdc-badge');
    };

    it('should match snapshot without attributes', async () => {
      expect.assertions(2);
      container = await setup(<Badge className="test" />);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with type = dot', async () => {
      expect.assertions(2);
      container = await setup(<Badge type="dot" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with type = icon', async () => {
      expect.assertions(2);
      container = await setup(<Badge type="icon" iconName="accessibility-regular" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with type = counter', async () => {
      expect.assertions(2);
      container = await setup(<Badge type="counter" counter={9} maxCounter={20} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with type = success', async () => {
      expect.assertions(2);
      container = await setup(<Badge type="success" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with type = warning', async () => {
      expect.assertions(2);
      container = await setup(<Badge type="warning" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with type = error', async () => {
      expect.assertions(2);
      container = await setup(<Badge type="error" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with overlay = true', async () => {
      expect.assertions(2);
      container = await setup(<Badge overlay />);

      expect(container).toMatchSnapshot();
    });
  });
});
