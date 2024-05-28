import { addBackdropPlugin } from './backdropPlugin';
import { PopoverInstance } from '../index';
import { STYLE } from '../Popover.constants';

describe('addBackdropPlugin', () => {
  it('should return plugin correctly', () => {
    expect(addBackdropPlugin).toStrictEqual({
      name: 'addBackdropPlugin',
      fn: expect.any(Function),
    });
  });
  it('calls lifecycle methods correctly', () => {
    document.body.innerHTML = '<div data-tippy-root="" />';
    const hideMock = jest.fn();
    const tippyInstance = {
      props: { trigger: 'click' },
      hide: hideMock,
    } as unknown as PopoverInstance;

    const pluginInstance = addBackdropPlugin.fn(tippyInstance);
    pluginInstance.onMount(tippyInstance);

    expect(hideMock).not.toBeCalled();
    const backdrop = document.querySelector(`.${STYLE.backdrop}`);

    expect(backdrop).toBeDefined();
    expect(backdrop.classList.item(0)).toEqual(STYLE.backdrop);
    expect(backdrop.getAttribute('aria-hidden')).toEqual('true');

    pluginInstance.onHide(tippyInstance);
    expect(document.querySelector(`.${STYLE.backdrop}`)).toEqual(null);
  });

  it('calls the correct functions inside backdrop on click callback', () => {
    document.body.innerHTML = '<div data-tippy-root="" />';
    const eventMocks = {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
    } as unknown as Event;

    const hideMock = jest.fn();
    const tippyInstance = {
      props: { trigger: 'click' },
      hide: hideMock,
    } as unknown as PopoverInstance;

    const pluginInstance = addBackdropPlugin.fn(tippyInstance);
    pluginInstance.onMount(tippyInstance);

    expect(hideMock).not.toBeCalled();
    const backdrop = document.querySelector(`.${STYLE.backdrop}`);

    const event = new Event('click');
    Object.assign(event, eventMocks);

    backdrop.dispatchEvent(event);

    expect(hideMock).toBeCalled();
    expect(eventMocks.stopPropagation).toBeCalled();
    expect(eventMocks.preventDefault).toBeCalled();
  });
});
