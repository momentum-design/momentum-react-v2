import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

const waitForComponentToPaint = async (wrapper: ReactWrapper): Promise<undefined> => {
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
