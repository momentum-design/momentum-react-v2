import { getKeyboardFocusableElements } from './ListItemBase.utils';

describe('getKeyboardFocusableElements', () => {
  const createRootNodeRef = (content = '') => {
    const root = document.createElement('div');
    root.innerHTML = content;
    return { current: root };
  };

  it('should return with empty array when no child of the root node', () => {
    expect(getKeyboardFocusableElements(createRootNodeRef())).toEqual([]);
  });

  it('should return with focusable tags', () => {
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
    `)
    ).map((n) => n.id);

    expect(ids).toEqual(['2', '3', '4', '5', '6', '7', '8']);
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
