import { renderHook } from '@testing-library/react-hooks';
import {
  getKeyboardFocusableElements,
  getListItemBaseTabIndex,
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

describe('getListItemBaseTabIndex', () => {
  const listContextWellDefined = { currentFocus: 1 };

  it.each`
    interactive | listContext               | focus    | expected
    ${false}    | ${undefined}              | ${true}  | ${-1}
    ${false}    | ${undefined}              | ${false} | ${-1}
    ${false}    | ${listContextWellDefined} | ${true}  | ${-1}
    ${false}    | ${listContextWellDefined} | ${false} | ${-1}
    ${true}     | ${undefined}              | ${true}  | ${0}
    ${true}     | ${undefined}              | ${false} | ${0}
    ${true}     | ${listContextWellDefined} | ${true}  | ${0}
    ${true}     | ${listContextWellDefined} | ${false} | ${-1}
  `(
    'returns $expected when interactive is $interactive, listContext is $listContext and focus is $focus',
    ({ interactive, listContext, focus, expected }) => {
      const tabIndex = getListItemBaseTabIndex({ interactive, listContext, focus });
      expect(tabIndex).toBe(expected);
    }
  );
});
