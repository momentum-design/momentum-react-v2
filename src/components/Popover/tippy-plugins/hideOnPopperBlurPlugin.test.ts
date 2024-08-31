import { waitFor } from '@testing-library/react';
import { Props } from '../Popover.types';
import { PopoverInstance } from '..';

interface ExtendedProps extends Props {
  hideOnPopperBlur?: boolean;
  isChildPopoverOpen?: boolean;
}

const createPopoverInstance = () => {
  return {
    hide: jest.fn(),
    popper: document.createElement('div'),
    props: {
      hideOnPopperBlur: true,
      isChildPopoverOpen: false,
    } as ExtendedProps,
  } as unknown as PopoverInstance & { props: ExtendedProps };
};

describe('hideOnPopperBlurPlugin', () => {
  it('should return plugin correctly', async () => {
    const { hideOnPopperBlurPlugin } = await import('./hideOnPopperBlurPlugin');
    expect(hideOnPopperBlurPlugin).toStrictEqual({
      name: 'hideOnPopperBlur',
      defaultValue: true,
      fn: expect.any(Function),
    });
  });

  it('should add focusout event listener on create', async () => {
    const { hideOnPopperBlurPlugin } = await import('./hideOnPopperBlurPlugin');
    const popoverInstance = createPopoverInstance();
    const addEventListenerSpy = jest.spyOn(popoverInstance.popper, 'addEventListener');

    const plugin = hideOnPopperBlurPlugin.fn(popoverInstance);
    plugin.onCreate(popoverInstance);

    expect(addEventListenerSpy).toHaveBeenCalledWith('focusout', expect.any(Function));
  });

  it('should hide popover on focusout when conditions are met', async () => {
    const { hideOnPopperBlurPlugin } = await import('./hideOnPopperBlurPlugin');
    const popoverInstance = createPopoverInstance();
    const plugin = hideOnPopperBlurPlugin.fn(popoverInstance);
    plugin.onCreate(popoverInstance);

    const focusOutEvent = new FocusEvent('focusout', {
      relatedTarget: document.createElement('div'),
    });

    popoverInstance.popper.dispatchEvent(focusOutEvent);

    await waitFor(() => {
      expect(popoverInstance.hide).toHaveBeenCalled();
    });
  });

  it('should not hide popover if hideOnPopperBlur is false', async () => {
    const { hideOnPopperBlurPlugin } = await import('./hideOnPopperBlurPlugin');
    const popoverInstance = createPopoverInstance();
    popoverInstance.props.hideOnPopperBlur = false;
    const plugin = hideOnPopperBlurPlugin.fn(popoverInstance);
    plugin.onCreate(popoverInstance);

    const focusOutEvent = new FocusEvent('focusout', {
      relatedTarget: document.createElement('div'),
    });

    popoverInstance.popper.dispatchEvent(focusOutEvent);

    await waitFor(() => {
      expect(popoverInstance.hide).not.toHaveBeenCalled();
    });
  });

  it('should not hide popover if isChildPopoverOpen is true', async () => {
    const { hideOnPopperBlurPlugin } = await import('./hideOnPopperBlurPlugin');
    const popoverInstance = createPopoverInstance();
    popoverInstance.props.isChildPopoverOpen = true;
    const plugin = hideOnPopperBlurPlugin.fn(popoverInstance);
    plugin.onCreate(popoverInstance);

    const focusOutEvent = new FocusEvent('focusout', {
      relatedTarget: document.createElement('div'),
    });

    popoverInstance.popper.dispatchEvent(focusOutEvent);

    await waitFor(() => {
      expect(popoverInstance.hide).not.toHaveBeenCalled();
    });
  });

  it('should not hide popover if relatedTarget is inside popper', async () => {
    const { hideOnPopperBlurPlugin } = await import('./hideOnPopperBlurPlugin');
    const popoverInstance = createPopoverInstance();
    const plugin = hideOnPopperBlurPlugin.fn(popoverInstance);
    plugin.onCreate(popoverInstance);

    const relatedTarget = document.createElement('div');
    popoverInstance.popper.appendChild(relatedTarget);

    const focusOutEvent = new FocusEvent('focusout', {
      relatedTarget,
    });

    popoverInstance.popper.dispatchEvent(focusOutEvent);

    await waitFor(() => {
      expect(popoverInstance.hide).not.toHaveBeenCalled();
    });
  });

  it('should not hide popover if relatedTarget is null', async () => {
    const { hideOnPopperBlurPlugin } = await import('./hideOnPopperBlurPlugin');
    const popoverInstance = createPopoverInstance();
    const plugin = hideOnPopperBlurPlugin.fn(popoverInstance);
    plugin.onCreate(popoverInstance);

    const focusOutEvent = new FocusEvent('focusout', {
      relatedTarget: null,
    });

    popoverInstance.popper.dispatchEvent(focusOutEvent);

    await waitFor(() => {
      expect(popoverInstance.hide).not.toHaveBeenCalled();
    });
  });
});
