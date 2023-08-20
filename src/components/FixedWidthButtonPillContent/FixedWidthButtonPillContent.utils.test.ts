import { getTextTypeFromButtonPillSize } from './FixedWidthButtonPillContent.utils';

describe('getResolvedSVGName', () => {
  it.each([
    [20, 'body-compact'],
    [24, 'body-compact'],
    [28, 'subheader-secondary'],
    [32, 'subheader-primary'],
    [40, 'subheader-primary'],
  ])('returns the correct text type for buttonPillSize %s', (buttonPillsize, expected) => {
    expect(getTextTypeFromButtonPillSize(buttonPillsize)).toEqual(expected);
  });
});
