import { cleanSecondLine } from './SpaceListItem.utils';

describe('cleanSecondLine', () => {
  it.each([
    { secondLine: '', expected: [] },
    { secondLine: null, expected: [] },
    { secondLine: undefined, expected: [] },
    { secondLine: 'one', expected: ['one'] },
    { secondLine: '   one', expected: ['one'] },
    { secondLine: '   one   ', expected: ['one'] },
    { secondLine: ['one'], expected: ['one'] },
    { secondLine: ['one', 'two'], expected: ['one', 'two'] },
    { secondLine: ['one', '   two'], expected: ['one', 'two'] },
    { secondLine: ['one', '   two'], expected: ['one', 'two'] },
    { secondLine: ['one', 'two', 'three'], expected: ['one', 'two', 'three'] },
    { secondLine: ['   ', 'two', '  ', 'four', 'five    '], expected: ['two', 'four', 'five'] },
    { secondLine: [null, 'two', '  ', 'four', 'five    '], expected: ['two', 'four', 'five'] },
    { secondLine: [null, 'two', '', 'four', undefined], expected: ['two', 'four'] },
  ])('cleanSecondLine($i)', ({ secondLine, expected }) => {
    expect(cleanSecondLine(secondLine)).toStrictEqual(expected);
  });
});
