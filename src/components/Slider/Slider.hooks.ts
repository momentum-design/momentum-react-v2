import React, { useMemo } from 'react';
import { clamp } from '@react-aria/utils';
import { useSliderState, SliderStateOptions } from '@react-stately/slider';
import { useSlider, useSliderThumb } from '@react-aria/slider';
import { useNumberFormatter } from '@react-aria/i18n';
import { getValuePercentage } from './Slider.utils';
import {
  SliderHookArgs,
  SliderHookReturnType,
  ThumbHookArgs,
  ThumbHookReturnType,
} from './Slider.types';

const useSliderSideEffects = ({
  value,
  minValue,
  maxValue,
  onChange,
  isDisabled,
  step,
  ariaLabel,
}: SliderHookArgs): SliderHookReturnType => {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const numberFormatter = useNumberFormatter();

  const handleChange = (newValues: Array<number>) => {
    onChange(newValues[0]);
  };

  const sliderProps: SliderStateOptions<Array<number>> = {
    isDisabled,
    step,
    minValue,
    maxValue,
    numberFormatter,
    value: [clamp(value, minValue, maxValue)],
    onChange: handleChange,
  };

  const state = useSliderState(sliderProps);
  const { groupProps, trackProps } = useSlider(
    { ...sliderProps, 'aria-label': ariaLabel },
    state,
    trackRef
  );

  // pass css variable of value to track for styling
  const trackStyle = useMemo(
    () => ({ '--local-value': `${getValuePercentage(state)}%` } as React.CSSProperties),
    [state]
  );

  return { groupProps, trackProps, state, trackRef, trackStyle };
};

const useThumbSideEffects = ({ state, trackRef }: ThumbHookArgs): ThumbHookReturnType => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { thumbProps, inputProps } = useSliderThumb(
    {
      index: 0,
      trackRef,
      inputRef,
    },
    state
  );

  return { thumbProps, inputProps, inputRef };
};

export { useSliderSideEffects, useThumbSideEffects };
