import { getValuePercentage } from './Slider.utils';
import type { SliderState } from '@react-stately/slider';

describe('getValuePercentage', () => {
  it('should return as expected', () => {
    const state = {
      getValuePercent: () => 0.45,
      values: [45],
    } as unknown as SliderState;
    expect(getValuePercentage(state)).toBe(45);
  });
});
