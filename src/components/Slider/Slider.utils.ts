import type { SliderState } from '@react-stately/slider';

const getValuePercentage = (state: SliderState): number => {
  return state.getValuePercent(state.values[0]) * 100;
};

export { getValuePercentage };
