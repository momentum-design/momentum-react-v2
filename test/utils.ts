import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

export const waitForComponentToPaint = async (wrapper: ReactWrapper): Promise<undefined> => {
  return await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    wrapper.update();
  });
};

/**
 * Util function to render and wait for all async side effects to finish (hooks)
 * This is needed because of https://github.com/enzymejs/enzyme/issues/2073
 *
 * @param component component being tested
 * @returns Enzyme react wrapper
 */
export const mountAndWait = async (component: React.ReactElement): Promise<ReactWrapper> => {
  const _container = mount(component);
  await waitForComponentToPaint(_container);
  return _container;
};

/**
 * React-aria handles interactions slightly different, so we must pass exactly
 * these event object for it to pass through
 * @param element
 */
export const triggerPress = (button: ReactWrapper): void => {
  button.simulate('click', {
    button: 0,
    detail: 0,
    nativeEvent: { detail: 0 },
    currentTarget: button.getDOMNode(),
    target: button.getDOMNode(),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    stopPropagation: () => {},
  });
};

export const simulateMouseEnter = (component: ReactWrapper): void => {
  component.simulate('mouseenter', {
    pointerType: 'mouse',
    target: component.getDOMNode(),
    isHovered: false,
    type: 'hoverstart',
  });
};

export const simulateMouseLeave = (component: ReactWrapper): void => {
  component.simulate('mouseleave', {
    currentTarget: component.getDOMNode(),
    pointerType: 'mouse',
    target: component.getDOMNode(),
    isHovered: true,
    type: 'hoverstart',
  });
};
