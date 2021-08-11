import Icon from '.';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { STYLE } from './Icon.constants';
import { act } from 'react-dom/test-utils';

const mountAndWait = async (component) => {
  const _container = mount(component);
  await waitForComponentToPaint(_container);
  return _container;
};

const waitForComponentToPaint = async (wrapper: ReactWrapper) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    wrapper.update();
  });
};

describe('Icon', () => {
  let container;

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      container = await mountAndWait(<Icon name="accessibility" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with scale', async () => {
      expect.assertions(1);

      container = await mountAndWait(<Icon name="accessibility" scale={16} />);

      expect(container).toMatchSnapshot();
    });

    it("should match snapshot with autoScale set to 'true'", async () => {
      expect.assertions(1);

      container = await mountAndWait(<Icon name="accessibility" autoScale={true} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with autoScale set to a percentage value', async () => {
      expect.assertions(1);

      container = await mountAndWait(<Icon name="accessibility" autoScale={150} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with weight', async () => {
      expect.assertions(1);

      container = await mountAndWait(<Icon name="accessibility" weight="light" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', async () => {
      expect.assertions(1);

      container = await mountAndWait(<Icon name="accessibility" color="red" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with fillColor', async () => {
      expect.assertions(1);

      container = await mountAndWait(<Icon name="accessibility" fillColor="red" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with strokeColor', async () => {
      expect.assertions(1);

      container = await mountAndWait(<Icon name="accessibility" strokeColor="red" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with invalid name', async () => {
      expect.assertions(1);
      jest.setMock('@momentum-ui/icons-rebrand/svg/invalid_icon_name.svg', undefined);

      container = await mountAndWait(<Icon name="invalid_icon_name" />);

      expect(container).toMatchSnapshot();
      jest.dontMock('@momentum-ui/icons-rebrand/svg/invalid_icon_name.svg');
    });
  });

  describe('attributes', () => {
    it('should have its main class', async () => {
      const wrapper = await mountAndWait(<Icon name="accessibility" />);
      const icon = wrapper.find(Icon).getDOMNode();

      expect(icon.classList.contains(STYLE.wrapper));
    });

    it('should have custom class if provided', async () => {
      const testClass = 'testClass';

      const wrapper = await mountAndWait(<Icon name="accessibility" className={testClass} />);
      const svg = wrapper.find('svg').getDOMNode();

      expect(svg.classList.contains(testClass)).toBe(true);
    });

    it('should pass scale prop', async () => {
      const scale = 16;

      const wrapper = await mountAndWait(<Icon name={'accessibility'} scale={scale} />);
      const icon = wrapper.find('svg').getDOMNode();

      expect(icon.getAttribute('data-scale')).toBe(`${scale}`);
    });

    it('should pass autoScale prop and disable scale prop', async () => {
      const autoScale = true;

      const wrapper = await mountAndWait(<Icon name={'accessibility'} autoScale={autoScale} />);
      const icon = wrapper.find('svg').getDOMNode();

      expect(icon.getAttribute('data-autoscale')).toBe(`${autoScale}`);
      expect(icon.getAttribute('data-scale')).toBe('false');
    });

    it('should pass autoScale prop as numeric value when set appropriately', async () => {
      const autoScale = 150;

      const wrapper = await mountAndWait(<Icon name={'accessibility'} autoScale={autoScale} />);
      const icon = wrapper.find('svg').getDOMNode();

      expect(icon.getAttribute('data-autoscale')).toBe(`${autoScale}`);
      expect(icon.getAttribute('data-scale')).toBe('false');
    });

    it('should pass md-icon-coloured class if name of icon contains coloured', async () => {
      const wrapper = await mountAndWait(<Icon name={'accessibility-coloured'} />);
      const icon = wrapper.find('svg').getDOMNode();

      expect(icon.classList.contains('md-icon-coloured')).toBe(true);
    });

    it('should pass color prop', async () => {
      const color = 'blue';

      const wrapper = await mountAndWait(<Icon name={'accessibility'} color={color} />);
      const icon = wrapper.find('svg').getDOMNode();

      expect(icon.getAttribute('style')).toBe(`fill: ${color}; stroke: ${color};`);
    });

    it('should pass fillColor prop', async () => {
      const fillColor = 'blue';

      const wrapper = await mountAndWait(<Icon name={'accessibility'} fillColor={fillColor} />);
      const icon = wrapper.find('svg').getDOMNode();

      expect(icon.getAttribute('style')).toBe(`fill: ${fillColor};`);
    });

    it('should pass strokeColor prop', async () => {
      const strokeColor = 'blue';

      const wrapper = await mountAndWait(<Icon name={'accessibility'} strokeColor={strokeColor} />);
      const icon = wrapper.find('svg').getDOMNode();

      expect(icon.getAttribute('style')).toBe(`stroke: ${strokeColor};`);
    });

    it('should override fillColor and strokeColor when color is provided', async () => {
      const color = 'blue';
      const fillColor = 'green';
      const strokeColor = 'red';

      const wrapper = await mountAndWait(
        <Icon
          name={'accessibility'}
          color={color}
          fillColor={fillColor}
          strokeColor={strokeColor}
        />
      );

      const icon = wrapper.find('svg').getDOMNode();

      expect(icon.getAttribute('style')).toBe(`fill: ${color}; stroke: ${color};`);
    });

    it('should not pass fillColor prop if icon is already coloured', async () => {
      const fillColor = 'blue';

      const wrapper = await mountAndWait(
        <Icon name={'accessibility-coloured'} fillColor={fillColor} />
      );
      const icon = wrapper.find('svg').getDOMNode();

      expect(icon.getAttribute('style')).toBe(null);
    });
  });
});
