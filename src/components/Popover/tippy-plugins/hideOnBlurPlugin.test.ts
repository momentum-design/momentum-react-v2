import { PopoverInstance } from '..';
import { PopperBlurPluginProps } from './hideOnBlurPlugin';

const createPopoverInstance = () => {
  return {
    hide: jest.fn(),
    popper: document.createElement('div'),
    props: {
      hideOnBlur: true,
      isChildPopoverOpen: false,
    } as PopperBlurPluginProps,
  } as unknown as PopoverInstance & { props: PopperBlurPluginProps };
};

describe('hideOnBlurPlugin', () => {
  it('should return plugin correctly', async () => {
    const { hideOnBlurPlugin } = await import('./hideOnBlurPlugin');
    expect(hideOnBlurPlugin).toStrictEqual({
      name: 'hideOnBlur',
      defaultValue: false,
      fn: expect.any(Function),
    });
  });

  it('should add focusout event listener on create', async () => {
    const { hideOnBlurPlugin } = await import('./hideOnBlurPlugin');
    const popoverInstance = createPopoverInstance();
    const addEventListenerSpy = jest.spyOn(popoverInstance.popper, 'addEventListener');

    const plugin = hideOnBlurPlugin.fn(popoverInstance);
    plugin.onCreate(popoverInstance);

    expect(addEventListenerSpy).toHaveBeenCalledWith('focusout', expect.any(Function));
  });

  it('should hide popover on focusout when conditions are met', async () => {
    const { hideOnBlurPlugin } = await import('./hideOnBlurPlugin');
    const popoverInstance = createPopoverInstance();
    const plugin = hideOnBlurPlugin.fn(popoverInstance);
    plugin.onCreate(popoverInstance);

    const focusOutEvent = new FocusEvent('focusout', {
      relatedTarget: document.createElement('div'),
    });

    popoverInstance.popper.dispatchEvent(focusOutEvent);

    expect(popoverInstance.hide).toHaveBeenCalled();
  });

  it('should not hide popover if hideOnBlur is false', async () => {
    const { hideOnBlurPlugin } = await import('./hideOnBlurPlugin');
    const popoverInstance = createPopoverInstance();
    popoverInstance.props.hideOnBlur = false;
    const plugin = hideOnBlurPlugin.fn(popoverInstance);
    plugin.onCreate(popoverInstance);

    const focusOutEvent = new FocusEvent('focusout', {
      relatedTarget: document.createElement('div'),
    });

    popoverInstance.popper.dispatchEvent(focusOutEvent);

    expect(popoverInstance.hide).not.toHaveBeenCalled();
  });

  it('should not hide popover if isChildPopoverOpen is true', async () => {
    const { hideOnBlurPlugin } = await import('./hideOnBlurPlugin');
    const popoverInstance = createPopoverInstance();
    popoverInstance.props.isChildPopoverOpen = true;
    const plugin = hideOnBlurPlugin.fn(popoverInstance);
    plugin.onCreate(popoverInstance);

    const focusOutEvent = new FocusEvent('focusout', {
      relatedTarget: document.createElement('div'),
    });

    popoverInstance.popper.dispatchEvent(focusOutEvent);

    expect(popoverInstance.hide).not.toHaveBeenCalled();
  });

  it('should not hide popover if relatedTarget is inside popper', async () => {
    const { hideOnBlurPlugin } = await import('./hideOnBlurPlugin');
    const popoverInstance = createPopoverInstance();
    const plugin = hideOnBlurPlugin.fn(popoverInstance);
    plugin.onCreate(popoverInstance);

    const relatedTarget = document.createElement('div');
    popoverInstance.popper.appendChild(relatedTarget);

    const focusOutEvent = new FocusEvent('focusout', {
      relatedTarget,
    });

    popoverInstance.popper.dispatchEvent(focusOutEvent);

    expect(popoverInstance.hide).not.toHaveBeenCalled();
  });

  it('should not hide popover if relatedTarget is null', async () => {
    const { hideOnBlurPlugin } = await import('./hideOnBlurPlugin');
    const popoverInstance = createPopoverInstance();
    const plugin = hideOnBlurPlugin.fn(popoverInstance);
    plugin.onCreate(popoverInstance);

    const focusOutEvent = new FocusEvent('focusout', {
      relatedTarget: null,
    });

    popoverInstance.popper.dispatchEvent(focusOutEvent);

    expect(popoverInstance.hide).not.toHaveBeenCalled();
  });
});
