import React, { FC } from 'react';
import classnames from 'classnames';

import { STYLE } from './Slider.constants';
import type { SliderProps } from './Slider.types';
import './Slider.style.scss';
import { useSliderSideEffects } from './Slider.hooks';

const Slider: FC<SliderProps> = (props: SliderProps) => {
  const { isDisabled, step, minValue, maxValue, ariaLabel, value, onChange, className, id, style } =
    props;

  const { inputRef, handleChange } = useSliderSideEffects({
    onChange,
    value,
    step,
    minValue,
    maxValue,
  });

  return (
    <input
      ref={inputRef}
      type="range"
      value={value}
      min={minValue}
      max={maxValue}
      aria-label={ariaLabel}
      onChange={handleChange}
      step={step}
      className={classnames(className, STYLE.wrapper)}
      id={id}
      style={style}
      disabled={isDisabled}
    />
  );
};

export default Slider;
