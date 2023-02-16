import { cartesian, generateReactionsWithSkinTone } from './Reaction.util';

describe('cartesian', () => {
  it('returns the correct value', () => {
    const result = cartesian(['prayer', 'raise_hand'], ['yellow', 'dark']);
    expect(result).toEqual([
      { type: 'prayer', skinTone: 'yellow' },
      { type: 'prayer', skinTone: 'dark' },
      { type: 'raise_hand', skinTone: 'yellow' },
      { type: 'raise_hand', skinTone: 'dark' },
    ]);
  });

  it('returns the correct value when second param is empty', () => {
    const result = cartesian(['prayer', 'raise_hand'], []);
    expect(result).toEqual([]);
  });

  it('returns the correct value when first param is empty', () => {
    const result = cartesian([], ['yellow', 'dark']);
    expect(result).toEqual([]);
  });

  it('returns the correct value when both params are empty', () => {
    const result = cartesian([], []);
    expect(result).toEqual([]);
  });
});

describe('generateReactionsWithSkinTone', () => {
  it('returns the correct result', () => {
    const result = generateReactionsWithSkinTone(
      [
        { type: 'prayer', skinTone: 'yellow' },
        { type: 'prayer', skinTone: 'dark' },
        { type: 'raise_hand', skinTone: 'yellow' },
        { type: 'raise_hand', skinTone: 'dark' },
      ],
      ({ type, skinTone }) => `${type}+${skinTone}`
    );
    expect(result).toEqual({
      'prayer+yellow': 'prayer+yellow',
      'prayer+dark': 'prayer+dark',
      'raise_hand+yellow': 'raise_hand+yellow',
      'raise_hand+dark': 'raise_hand+dark',
    });
  });

  it('returns the correct result', () => {
    const result = generateReactionsWithSkinTone([], ({ type, skinTone }) => `${type}+${skinTone}`);
    expect(result).toEqual({});
  });
});
