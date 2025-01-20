import { SpatialNavigation } from './SpatialNavigation';
import * as navUtils from '../../utils/navigation';
import * as utils from './SpatialNavigationProvider.utils';
import { timeout } from '../../utils/promise';

const createMutationObserverMock = () => {
  const connect = jest.fn();
  const observe = jest.fn();
  const disconnect = jest.fn();
  const mutationObserverMock = jest
    .spyOn(global, 'MutationObserver')
    .mockImplementationOnce(() => ({ connect, observe, disconnect } as any));

  return {
    connect,
    observe,
    disconnect,
    mutationObserverMock,
  };
};

describe('SpatialNavigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('#constructor', () => {
    it('it should create new Mutation observer', () => {
      const { mutationObserverMock } = createMutationObserverMock();
      new SpatialNavigation();

      expect(mutationObserverMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('#initActiveElement', () => {
    it('should set the active element to the first focusable element when there is no active element', async () => {
      createMutationObserverMock();
      const activeElement = { focus: jest.fn() };
      jest.spyOn(navUtils, 'getKeyboardFocusableElements').mockReturnValue([activeElement as any]);
      const sn = new SpatialNavigation();
      sn.initActiveElement();

      await timeout();

      expect(activeElement.focus).toHaveBeenCalledTimes(1);
    });

    it('should change the active element to the first focusable when the current one is not in the list', async () => {
      createMutationObserverMock();
      const activeElement = { focus: jest.fn() };
      const focusableElement = { focus: jest.fn() };
      jest
        .spyOn(navUtils, 'getKeyboardFocusableElements')
        .mockReturnValue([focusableElement as any]);

      const sn = new SpatialNavigation();
      sn.setActiveElement(activeElement as any);
      sn.initActiveElement();

      await timeout();

      expect(activeElement.focus).not.toHaveBeenCalled();
      expect(focusableElement.focus).toHaveBeenCalledTimes(1);
    });
  });

  describe('#focusNext', () => {
    it('it should focus on the active element when the focus is somewhere else', () => {
      createMutationObserverMock();
      const element = { focus: jest.fn() };
      jest.spyOn(navUtils, 'getKeyboardFocusableElements').mockReturnValue([element as any]);

      const sn = new SpatialNavigation();
      sn.focusNext('up');

      expect(element.focus).toHaveBeenCalledTimes(1);
    });

    it.each`
      direction
      ${'left'}
      ${'right'}
      ${'up'}
      ${'down'}
    `(
      'should focus the element based on the spatial data attribute and the $direction direction ',
      async ({ direction }) => {
        createMutationObserverMock();

        const element = { focus: jest.fn() };
        const queryMock = jest
          .spyOn(document.body, 'querySelector')
          .mockReturnValue(element as any);

        const activeElement = {
          dataset: {
            spatialLeft: '#left',
            spatialRight: '#right',
            spatialUp: '#up',
            spatialDown: '#down',
          },
          focus: jest.fn(),
        } as any;

        jest.spyOn(document, 'activeElement', 'get').mockReturnValue(activeElement);
        jest.spyOn(navUtils, 'getKeyboardFocusableElements').mockReturnValue([activeElement]);
        const sn = new SpatialNavigation();
        sn.focusNext(direction);

        expect(queryMock).toHaveBeenNthCalledWith(1, `#${direction}`);
        await timeout();

        expect(element.focus).toHaveBeenCalledTimes(1);
      }
    );

    it.each`
      direction
      ${'left'}
      ${'right'}
      ${'up'}
      ${'down'}
    `('should call orderElementsByDistance with $direction direction', async ({ direction }) => {
      createMutationObserverMock();

      const activeElement = { focus: jest.fn(), dataset: {} } as any;
      const newActiveElement = { focus: jest.fn() } as any;
      jest.spyOn(document, 'activeElement', 'get').mockReturnValue(activeElement);
      jest
        .spyOn(navUtils, 'getKeyboardFocusableElements')
        .mockReturnValue([activeElement, newActiveElement]);
      const orderElementsByDistanceMock = jest
        .spyOn(utils, 'orderElementsByDistance')
        .mockReturnValue([{ element: newActiveElement } as any]);

      const sn = new SpatialNavigation();

      sn.focusNext(direction);

      expect(orderElementsByDistanceMock).toHaveBeenNthCalledWith(
        1,
        activeElement,
        [activeElement, newActiveElement],
        direction
      );

      await timeout();

      expect(newActiveElement.focus).toHaveBeenCalledTimes(1);
    });
  });

  describe('#goBack', () => {
    it('should trigger click on focusable element with spatialGoBack data attribute', () => {
      createMutationObserverMock();
      const backElement = { dataset: { spatialGoBack: 'true' }, click: jest.fn() };
      const goBackHandler = jest.fn();
      jest.spyOn(navUtils, 'getKeyboardFocusableElements').mockReturnValue([backElement as any]);

      const sn = new SpatialNavigation(goBackHandler);
      sn.goBack();

      expect(backElement.click).toHaveBeenCalledTimes(1);
      expect(goBackHandler).not.toHaveBeenCalled();
    });

    it('should trigger click on focusable element with spatialGoBack data attribute', () => {
      createMutationObserverMock();
      const goBackHandler = jest.fn();
      jest.spyOn(navUtils, 'getKeyboardFocusableElements').mockReturnValue([]);

      const sn = new SpatialNavigation(goBackHandler);
      sn.goBack();

      expect(goBackHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('#setActiveElement', () => {
    it('should  mutation observer', () => {
      const { disconnect } = createMutationObserverMock();
      const sn = new SpatialNavigation();
      const newActiveElement = null;
      sn.setActiveElement(newActiveElement as any);

      expect(disconnect).toHaveBeenCalledTimes(1);
    });

    it('should observe mutation observer when the new active element is not undefined', () => {
      const { observe } = createMutationObserverMock();
      const sn = new SpatialNavigation();
      const newActiveElementParent = {};
      const newActiveElement = { parentElement: newActiveElementParent };
      sn.setActiveElement(newActiveElement as any);

      expect(observe).toHaveBeenNthCalledWith(1, newActiveElementParent, { childList: true });
    });

    it('should do nothing when called with the same element', () => {
      const { disconnect } = createMutationObserverMock();
      const sn = new SpatialNavigation();

      const newActiveElement = {};
      sn.setActiveElement(newActiveElement as any);
      // called once because activeElement was undefined by default
      disconnect.mockClear();

      sn.setActiveElement(newActiveElement as any);
      expect(disconnect).toHaveBeenCalledTimes(0);
    });
  });

  describe('#setActiveElementAndFocus', () => {
    it('should should call focus on the element with delay', async () => {
      createMutationObserverMock();
      const sn = new SpatialNavigation();
      const activeElement = { focus: jest.fn() };
      sn.setActiveElementAndFocus(activeElement as any);

      await timeout();

      expect(activeElement.focus).toHaveBeenCalledTimes(1);
    });
  });

  describe('#getActiveElement', () => {
    it('should return undefined when active element not initialised', () => {
      createMutationObserverMock();
      const sn = new SpatialNavigation();

      expect(sn.getActiveElement()).toBeUndefined();
    });

    it('should return active element when set it with setActiveElement', () => {
      createMutationObserverMock();
      const sn = new SpatialNavigation();
      const activeElement = {};
      sn.setActiveElement(activeElement as any);

      expect(sn.getActiveElement()).toBe(activeElement);
    });

    it('should return active element when set it with setActiveElementAndFocus ', () => {
      createMutationObserverMock();
      const sn = new SpatialNavigation();
      const activeElement = { focus: jest.fn() };
      sn.setActiveElementAndFocus(activeElement as any);

      expect(sn.getActiveElement()).toBe(activeElement);
    });
  });

  describe('#dispose', () => {
    it('should disconnect Mutation observer', () => {
      const { disconnect } = createMutationObserverMock();
      const sn = new SpatialNavigation();

      sn.dispose();
      expect(disconnect).toHaveBeenCalledTimes(1);
    });
  });
});
