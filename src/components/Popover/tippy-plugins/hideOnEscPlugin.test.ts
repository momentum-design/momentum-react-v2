import { waitFor } from '@testing-library/react';
import { sypOnEventListener } from '../../../../test/utils';
import * as PopoverEvents from '../Popover.events';

const createTippyInstance = () => {
  return { hide: jest.fn(), show: jest.fn() };
};

describe('hideOnEscPlugin', () => {
  let popoverEventsDispatchEventSpy;
  const eventCommon = { preventDefault: jest.fn(), stopImmediatePropagation: jest.fn() };

  beforeEach(() => {
    eventCommon.preventDefault.mockReset();
    eventCommon.stopImmediatePropagation.mockReset();
    popoverEventsDispatchEventSpy = jest.spyOn(PopoverEvents, 'dispatchEvent');
  });

  afterEach(() => {
    popoverEventsDispatchEventSpy.mockRestore();
  });

  it('should return plugin correctly', async () => {
    const { hideOnEscPlugin } = await import('./hideOnEscPlugin');
    expect(hideOnEscPlugin).toStrictEqual({
      name: 'hideOnEsc',
      defaultValue: true,
      fn: expect.any(Function),
    });
  });

  it('should add and remove esc key listener correctly', async () => {
    const { hideOnEscPlugin } = await import('./hideOnEscPlugin');
    const { addEventListenerSpy, removeEventListenerSpy, eventHandlers } = sypOnEventListener(
      window,
      ['keydown']
    );

    const tippy1 = createTippyInstance() as any;
    const tippy2 = createTippyInstance() as any;
    const plugin1 = hideOnEscPlugin.fn(tippy1);
    const plugin2 = hideOnEscPlugin.fn(tippy2);

    plugin1.onShow(tippy1);
    expect(addEventListenerSpy).toHaveBeenNthCalledWith(1, 'keydown', expect.any(Function));
    await waitFor(() => {
      expect(popoverEventsDispatchEventSpy).toHaveBeenNthCalledWith(
        1,
        'tippyInstanceAdded',
        tippy1
      );
    });

    addEventListenerSpy.mockReset();
    popoverEventsDispatchEventSpy.mockReset();

    plugin2.onShow(tippy2);
    expect(addEventListenerSpy).toHaveBeenCalledTimes(0);
    expect(eventHandlers.keydown.length).toBe(1);
    await waitFor(() => {
      expect(popoverEventsDispatchEventSpy).toHaveBeenNthCalledWith(
        1,
        'tippyInstanceAdded',
        tippy2
      );
    });

    popoverEventsDispatchEventSpy.mockReset();

    plugin1.onHide(tippy1);
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(0);
    await waitFor(() => {
      expect(popoverEventsDispatchEventSpy).toHaveBeenNthCalledWith(
        1,
        'tippyInstanceRemoved',
        tippy1
      );
    });

    popoverEventsDispatchEventSpy.mockReset();

    plugin2.onHide(tippy2);
    expect(removeEventListenerSpy).toHaveBeenNthCalledWith(1, 'keydown', expect.any(Function));
    expect(eventHandlers.keydown.length).toBe(0);
    await waitFor(() => {
      expect(popoverEventsDispatchEventSpy).toHaveBeenNthCalledWith(
        1,
        'tippyInstanceRemoved',
        tippy2
      );
    });
  });

  it('should trigger hide when user press esc', async () => {
    const { hideOnEscPlugin } = await import('./hideOnEscPlugin');
    const { eventHandlers } = sypOnEventListener(window, ['keydown']);

    const tippy = createTippyInstance() as any;
    const plugin = hideOnEscPlugin.fn(tippy);
    plugin.onShow(tippy);

    eventHandlers.keydown[0]({ key: 'Escape', ...eventCommon } as any);

    expect(tippy.hide).toHaveBeenNthCalledWith(1);
  });

  it('should hide tippy instances in reverse order of opening', async () => {
    jest.resetModules();

    const { hideOnEscPlugin } = await import('./hideOnEscPlugin');
    const { eventHandlers } = sypOnEventListener(window, ['keydown']);

    const tippy1 = createTippyInstance() as any;
    const plugin1 = hideOnEscPlugin.fn(tippy1);
    plugin1.onShow(tippy1);

    const tippy2 = createTippyInstance() as any;
    const plugin2 = hideOnEscPlugin.fn(tippy2);
    plugin2.onShow(tippy2);

    eventHandlers.keydown[0]({ key: 'Escape', ...eventCommon } as any);
    expect(tippy2.hide).toHaveBeenNthCalledWith(1);
    expect(tippy1.hide).toHaveBeenCalledTimes(0);

    // hide is mocked so call onHide manually
    plugin2.onHide(tippy2);

    eventHandlers.keydown[0]({ key: 'Escape', ...eventCommon } as any);
    expect(tippy1.hide).toHaveBeenNthCalledWith(1);
  });

  describe('setupHideOnPlugin', () => {
    const init = async () => {
      jest.resetModules();

      const { hideOnEscPlugin, setupHideOnPlugin } = await import('./hideOnEscPlugin');
      const { eventHandlers } = sypOnEventListener(window, ['keydown']);

      const tippy = createTippyInstance() as any;
      const plugin = hideOnEscPlugin.fn(tippy);
      plugin.onShow(tippy);

      return { eventHandlers, tippy, plugin, setupHideOnPlugin };
    };

    it('should overwrite the original hide key(s)', async () => {
      const { eventHandlers, tippy, plugin, setupHideOnPlugin } = await init();

      setupHideOnPlugin({ hideKeys: ['GoBack', 'someRandomKey'], stopEventPropagation: true });

      eventHandlers.keydown[0]({ key: 'Escape', ...eventCommon } as any);
      expect(tippy.hide).toHaveBeenCalledTimes(0);

      eventHandlers.keydown[0]({ key: 'GoBack', ...eventCommon } as any);
      expect(tippy.hide).toHaveBeenCalledTimes(1);

      tippy.hide.mockReset();
      plugin.onShow(tippy);

      eventHandlers.keydown[0]({ key: 'someRandomKey', ...eventCommon } as any);
      expect(tippy.hide).toHaveBeenCalledTimes(1);
    });

    describe('stopImmediatePropagation', () => {
      it('should not call stopImmediatePropagation by default', async () => {
        const { eventHandlers } = await init();

        eventHandlers.keydown[0]({ key: 'Escape', ...eventCommon } as any);
        expect(eventCommon.stopImmediatePropagation).toHaveBeenCalledTimes(0);
      });

      it('should not call stopImmediatePropagation when set to false', async () => {
        const { eventHandlers, setupHideOnPlugin } = await init();

        setupHideOnPlugin({ hideKeys: ['Escape'], stopEventPropagation: false });

        eventHandlers.keydown[0]({ key: 'Escape', ...eventCommon } as any);
        expect(eventCommon.stopImmediatePropagation).toHaveBeenCalledTimes(0);
      });

      it('should call stopImmediatePropagation when set to true', async () => {
        const { eventHandlers, setupHideOnPlugin } = await init();

        setupHideOnPlugin({ hideKeys: ['Escape'], stopEventPropagation: true });

        eventHandlers.keydown[0]({ key: 'Escape', ...eventCommon } as any);
        expect(eventCommon.stopImmediatePropagation).toHaveBeenCalledTimes(1);
      });
    });
  });
});
