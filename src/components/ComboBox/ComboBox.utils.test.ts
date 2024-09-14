import { filterItems } from './ComboBox.utils';

describe('ComboBox utils', () => {
  describe('filterItems', () => {
    const comboBoxGroupsWithSection = [
      {
        section: 'secitonA',
        items: [
          { key: 'keyA1', label: 'itemA1' },
          { key: 'keyA2', label: 'itemA2' },
          { key: 'keyA3', label: 'itemA3' },
        ],
      },
      {
        section: 'seciontB',
        items: [
          { key: 'keyB1', label: 'itemB1' },
          { key: 'keyB2', label: 'itemB2' },
          { key: 'keyB3', label: 'itemB3' },
        ],
      },
    ];

    const comboBoxGroupsWithoutSection = [
      { key: 'keyA1', label: 'itemA1' },
      { key: 'keyA2', label: 'itemA2' },
      { key: 'keyA3', label: 'itemA3' },
      { key: 'keyB1', label: 'itemB1' },
      { key: 'keyB2', label: 'itemB2' },
      { key: 'keyB3', label: 'itemB3' },
    ];

    it('test case withSection', () => {
      const filterFn = (label: string, input: string): boolean => {
        return label.toLowerCase().includes(input.toLowerCase());
      };

      expect(filterItems(comboBoxGroupsWithSection, '1', filterFn)).toEqual([
        { section: 'secitonA', items: [{ key: 'keyA1', label: 'itemA1' }] },
        { section: 'seciontB', items: [{ key: 'keyB1', label: 'itemB1' }] },
      ]);
      expect(filterItems(comboBoxGroupsWithSection, 'A', filterFn)).toEqual([
        {
          section: 'secitonA',
          items: [
            { key: 'keyA1', label: 'itemA1' },
            { key: 'keyA2', label: 'itemA2' },
            { key: 'keyA3', label: 'itemA3' },
          ],
        },
      ]);
      expect(filterItems(comboBoxGroupsWithoutSection, '1', filterFn)).toEqual([
        { key: 'keyA1', label: 'itemA1' },
        { key: 'keyB1', label: 'itemB1' },
      ]);
      expect(filterItems(comboBoxGroupsWithoutSection, 'A', filterFn)).toEqual([
        { key: 'keyA1', label: 'itemA1' },
        { key: 'keyA2', label: 'itemA2' },
        { key: 'keyA3', label: 'itemA3' },
      ]);
    });
  });
});
