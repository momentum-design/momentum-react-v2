import { renderHook } from '@testing-library/react-hooks';
import {
  getKeyboardFocusableElements,
  handleLeftRightArrowNavigation,
  useDidUpdateEffect,
} from './ListItemBase.utils';

describe('getKeyboardFocusableElements', () => {
  const createRootNodeRef = (content = '') => {
    const root = document.createElement('div');
    root.innerHTML = content;
    return root;
  };

  it('should return with empty array when no child of the root node', () => {
    expect(getKeyboardFocusableElements(createRootNodeRef())).toEqual([]);
  });

  it('should return with focusable tags for only elements which can be focused with tab', () => {
    const ids = getKeyboardFocusableElements(
      createRootNodeRef(`
      <a id='1'/>
      <a href="#" id='2'/>
      <button id='3'/>
      <input id='4'/>
      <textarea id='5'></textarea>
      <select id='6'></select>
      <details id='7'></details>
      <div tabindex='0' id='8'>
      <div tabindex='-1' id='9'>
      <div id='10'></div>
    `)
    ).map((n) => n.id);

    expect(ids).toEqual(['2', '3', '4', '5', '6', '7', '8']);
  });

  it('should return with focusable tags for any elements which can be focused', () => {
    const ids = getKeyboardFocusableElements(
      createRootNodeRef(`
      <a id='1'/>
      <a href="#" id='2'/>
      <button id='3'/>
      <input id='4'/>
      <textarea id='5'></textarea>
      <select id='6'></select>
      <details id='7'></details>
      <div tabindex='0' id='8'>
      <div tabindex='-1' id='9'>
      <div id='10'></div>
    `),
      false
    ).map((n) => n.id);

    expect(ids).toEqual(['2', '3', '4', '5', '6', '7', '8', '9']);
  });
  it('should return filter out disabled and aria hidden nodes', () => {
    const ids = getKeyboardFocusableElements(
      createRootNodeRef(`
        <button disabled id='1' />
        <button aria-hidden='true' id='2' />
        <button aria-hidden='false' id='3'/>
    `)
    ).map((n) => n.id);

    expect(ids).toEqual(['3']);
  });
});

describe('useDidUpdateEffect', () => {
  it('does not run the effect on initial render', async () => {
    const effect = jest.fn();
    const { rerender } = renderHook(({ input, effect }) => useDidUpdateEffect(effect, input), {
      initialProps: { effect, input: ['one'] },
    });
    expect(effect).not.toBeCalled();
    rerender({ effect, input: ['two'] });
    expect(effect).toBeCalled();
  });
});

describe('handleLeftRightArrowNavigation', () => {
  const preventDefaultSpy = jest.fn();
  const stopPropagationSpy = jest.fn();
  const generateEvent = (key: string, target: Record<string, unknown>) => {
    return {
      key: key,
      target: target,
      preventDefault: preventDefaultSpy,
      stopPropagation: stopPropagationSpy,
    };
  };
  const checkFocus = (focusSpy: jest.Mock<any, any>) => {
    expect(preventDefaultSpy).toBeCalledTimes(1);
    expect(stopPropagationSpy).toBeCalledTimes(1);
    expect(focusSpy).toBeCalledTimes(1);
    jest.clearAllMocks();
  };
  it('handles right arrow navigation in a list of elements', () => {
    const focusSpies = new Array(3).fill(jest.fn());
    const navigableElements = [
      {
        focus: focusSpies[0],
      },
      {
        focus: focusSpies[1],
      },
      {
        focus: focusSpies[2],
      },
    ];

    handleLeftRightArrowNavigation(
      generateEvent('ArrowRight', null) as unknown as KeyboardEvent,
      navigableElements as unknown as Element[]
    );
    checkFocus(focusSpies[0]);
    handleLeftRightArrowNavigation(
      generateEvent('ArrowRight', navigableElements[0]) as unknown as KeyboardEvent,
      navigableElements as unknown as Element[]
    );
    checkFocus(focusSpies[1]);
    handleLeftRightArrowNavigation(
      generateEvent('ArrowRight', navigableElements[1]) as unknown as KeyboardEvent,
      navigableElements as unknown as Element[]
    );
    checkFocus(focusSpies[2]);
    // loop back
    handleLeftRightArrowNavigation(
      generateEvent('ArrowRight', navigableElements[2]) as unknown as KeyboardEvent,
      navigableElements as unknown as Element[]
    );
    checkFocus(focusSpies[0]);
  });

  it('handles left arrow navigation in a list of elements', () => {
    const focusSpies = new Array(3).fill(jest.fn());
    const navigableElements = [
      {
        focus: focusSpies[0],
      },
      {
        focus: focusSpies[1],
      },
      {
        focus: focusSpies[2],
      },
    ];

    handleLeftRightArrowNavigation(
      generateEvent('ArrowLeft', null) as unknown as KeyboardEvent,
      navigableElements as unknown as Element[]
    );
    checkFocus(focusSpies[2]);
    handleLeftRightArrowNavigation(
      generateEvent('ArrowLeft', navigableElements[0]) as unknown as KeyboardEvent,
      navigableElements as unknown as Element[]
    );
    checkFocus(focusSpies[1]);
    handleLeftRightArrowNavigation(
      generateEvent('ArrowLeft', navigableElements[1]) as unknown as KeyboardEvent,
      navigableElements as unknown as Element[]
    );
    checkFocus(focusSpies[0]);
    // loop back
    handleLeftRightArrowNavigation(
      generateEvent('ArrowLeft', navigableElements[2]) as unknown as KeyboardEvent,
      navigableElements as unknown as Element[]
    );
    checkFocus(focusSpies[2]);
  });
});
