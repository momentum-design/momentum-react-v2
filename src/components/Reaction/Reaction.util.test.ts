import { cartesian } from './Reaction.util';

describe('cartesian', () => {
  it('returns the correct value', () => {
    const result = cartesian(['prayer', 'raise-hand'], ['yellow', 'dark']);
    expect(result).toEqual([
      { type: 'prayer', skinTone: 'yellow' },
      { type: 'prayer', skinTone: 'dark' },
      { type: 'raise-hand', skinTone: 'yellow' },
      { type: 'raise-hand', skinTone: 'dark' },
    ]);
  });

  it('returns the correct value when second param is empty', () => {
    const result = cartesian(['prayer', 'raise-hand'], []);
    expect(result).toEqual([]);
  });
});
