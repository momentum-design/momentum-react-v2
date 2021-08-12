import InputMessage from '.';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

describe('InputMessage', () => {
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

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      const container = await mountAndWait(<InputMessage message="some message" level="error" />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should render warning triangle for an error', async () => {
      const component = (
        await mountAndWait(<InputMessage message="some message" level="error" />)
      ).childAt(0);
      expect(component.find('svg').length).toBe(1);
    });

    it('should render warning triangle for a warning', async () => {
      const component = (
        await mountAndWait(<InputMessage message="some message" level="warning" />)
      ).childAt(0);
      expect(component.find('svg').length).toBe(1);
    });

    it('should not render an icon (right now anyway) for the success case', async () => {
      const component = (
        await mountAndWait(<InputMessage message="some message" level="success" />)
      ).childAt(0);
      expect(component.find('svg').length).toBe(0);
    });

    it('should not render an icon for the no level case', async () => {
      const component = (
        await mountAndWait(<InputMessage message="some message" level="none" />)
      ).childAt(0);
      expect(component.find('svg').length).toBe(0);
    });

    it('should have custom class if provided', async () => {
      const testClass = 'testClass';

      const wrapper = await mountAndWait(
        <InputMessage message="some message" className={testClass} />
      );
      const element = wrapper.find(InputMessage).getDOMNode();

      expect(element.classList.contains(testClass)).toBe(true);
    });
  });
});
