import Label from '.';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

describe('Label', () => {
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
      const container = await mountAndWait(<Label label="Some input"/>);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have custom class if provided', async () => {
      const testClass = 'testClass';

      const wrapper = await mountAndWait(
        <Label label="Some input" className={testClass} />
      );
      const element = wrapper.find(Label).getDOMNode();

      expect(element.classList.contains(testClass)).toBe(true);
    });
    it('should have htmlFor if provided', async () => {
      const testFor = 'testFor';

      const wrapper = await mountAndWait(
        <Label label="Some input" htmlFor={testFor} />
      );
      const element = wrapper.find(Label).getDOMNode();

      expect(element.getAttribute('for')).toEqual(testFor);
    });
    it('should have id if provided', async () => {
      const testId = 'testId';

      const wrapper = await mountAndWait(
        <Label label="Some input" id={testId} />
      );
      const element = wrapper.find(Label).getDOMNode();

      expect(element.id).toEqual(testId);
    });
  });
});
