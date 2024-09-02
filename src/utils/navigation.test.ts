import { getKeyboardFocusableElements } from './navigation';

describe('navigation', () => {
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

    it('should exclude tabIndex="" when includeTabbableOnly is true', () => {
      const ids = getKeyboardFocusableElements(
        createRootNodeRef(`
        <button id="1" tabindex='0' />
        <button id="2" disabled tabindex='' />
    `)
      ).map((n) => n.id);

      expect(ids).toEqual(['1']);
    });

    it('should exclude tabIndex="-1" when includeTabbableOnly is false', () => {
      const ids = getKeyboardFocusableElements(
        createRootNodeRef(`
        <button id="1" tabindex='0' />
        <button id="2" disabled tabindex='-1' />
    `),
        false
      ).map((n) => n.id);

      expect(ids).toEqual(['1']);
    });

    it('should exclude data-exclude-focus when allowExclusions is false', () => {
      const ids = getKeyboardFocusableElements(
        createRootNodeRef(`
        <button id="1" tabindex='0' />
        <button id="2" data-exclude-focus />
    `)
      ).map((n) => n.id);

      expect(ids).toEqual(['1']);
    });

    it('should not exclude data-exclude-focus when allowExclusions is true', () => {
      const ids = getKeyboardFocusableElements(
        createRootNodeRef(`
        <button id="1" tabindex='0' />
        <button id="2" data-exclude-focus />
    `),
        true,
        true
      ).map((n) => n.id);

      expect(ids).toEqual(['1', '2']);
    });
  });
});
