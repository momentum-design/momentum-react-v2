import {
  getIconScaleFromButtonPillSize,
  getTextTypeFromButtonPillSize,
} from './ButtonPillFixedWidthContent.utils';

describe('getTextTypeFromButtonPillSize', () => {
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

describe('getIconScaleFromButtonPillSize', () => {
  it.each([
    [20, 16],
    [24, 16],
    [28, 16],
    [32, 16],
    [40, 20],
  ])('returns the correct text type for buttonPillSize %s', (buttonPillsize, expected) => {
    expect(getIconScaleFromButtonPillSize(buttonPillsize)).toEqual(expected);
  });
});
