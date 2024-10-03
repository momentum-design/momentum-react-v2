import type { IconWeight } from '.';
import { InferredIconName } from './Icon.types';
import { getResolvedSVGName } from './Icon.utils';

describe('getResolvedSVGName', () => {
  it.each([
    ['icon-name', 'regular', false, 'icon-name-regular'],
    ['icon-name', 'bold', false, 'icon-name-bold'],
    ['icon-name', 'thin', false, 'icon-name-thin'],
    ['icon-name', 'filled', false, 'icon-name-filled'],
    ['icon-name', undefined, false, 'icon-name-regular'],
    ['icon-name', undefined, true, 'icon-name'],
    ['icon-name', 'regular', true, 'icon-name'],
    ['icon-name', 'bold', true, 'icon-name'],
    ['icon-name', 'thin', true, 'icon-name'],
    ['icon-name', 'filled', true, 'icon-name'],
  ])('returns the correct name for %s, %s, %s', (name, weight, weightless, expected) => {
    expect(getResolvedSVGName(name as InferredIconName, weight as IconWeight, weightless)).toEqual(
      expected
    );
  });
});
