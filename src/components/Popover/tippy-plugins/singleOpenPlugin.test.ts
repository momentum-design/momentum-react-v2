import { getSingleOpenPlugin } from './singleOpenPlugin';
import { Instance, Props } from 'tippy.js';

const createTippyInstance = (): Instance<Props> =>
  ({
    hide: jest.fn(),
    show: jest.fn(),
    clearDelayTimeouts: jest.fn(),
    destroy: jest.fn(),
    disable: jest.fn(),
    enable: jest.fn(),
    setProps: jest.fn(),
    setContent: jest.fn(),
    popper: document.createElement('div'),
    reference: document.createElement('div'),
    state: { isVisible: false },
  } as unknown as Instance<Props>);

describe('getSingleOpenPlugin', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return undefined if no groupId is provided', () => {
    const plugin = getSingleOpenPlugin();
    expect(plugin).toBeUndefined();
  });

  it('should return the same plugin for the same groupId', () => {
    const groupId = 'test-group';
    const plugin1 = getSingleOpenPlugin(groupId);
    const plugin2 = getSingleOpenPlugin(groupId);

    expect(plugin1).toBe(plugin2);
  });

  it('should create a new plugin if groupId is not in the map', () => {
    const groupId = 'new-group';
    const plugin = getSingleOpenPlugin(groupId);

    expect(plugin).toBeDefined();
    expect(plugin.name).toBe(`singleOpen-${groupId}`);
  });

  it('should hide other instances within the same group when one is shown', () => {
    const groupId = 'group-1';
    const plugin = getSingleOpenPlugin(groupId);

    const tippy1 = createTippyInstance();
    const tippy2 = createTippyInstance();

    const instancePlugin1 = plugin.fn(tippy1);
    const instancePlugin2 = plugin.fn(tippy2);

    instancePlugin1.onShow(tippy1);
    instancePlugin2.onShow(tippy2);

    expect(tippy1.hide).toHaveBeenCalledTimes(1);
    expect(tippy2.hide).toHaveBeenCalledTimes(0);
  });

  it('should not hide instances from different groups', () => {
    const groupId1 = 'group-1';
    const groupId2 = 'group-2';

    const plugin1 = getSingleOpenPlugin(groupId1);
    const plugin2 = getSingleOpenPlugin(groupId2);

    const tippy1 = createTippyInstance();
    const tippy2 = createTippyInstance();

    const instancePlugin1 = plugin1.fn(tippy1);
    const instancePlugin2 = plugin2.fn(tippy2);

    instancePlugin1.onShow(tippy1);
    instancePlugin2.onShow(tippy2);

    expect(tippy1.hide).toHaveBeenCalledTimes(0);
    expect(tippy2.hide).toHaveBeenCalledTimes(0);
  });

  it('should remove the instance from the set on hide', () => {
    const groupId = 'group-3';
    const plugin = getSingleOpenPlugin(groupId);

    const tippy = createTippyInstance();
    const instancePlugin = plugin.fn(tippy);

    instancePlugin.onShow(tippy);
    instancePlugin.onHide(tippy);

    expect(tippy.hide).toHaveBeenCalledTimes(0);
  });
});
