import React, { FC } from 'react';
import classnames from 'classnames';

import { STYLE } from './Slider.constants';
import type { SliderProps } from './Slider.types';
import './Slider.style.scss';
import Thumb from './Thumb';
import { useSliderSideEffects } from './Slider.hooks';

const Slider: FC<SliderProps> = (props: SliderProps) => {
  const { isDisabled, step, minValue, maxValue, ariaLabel, value, onChange, className, id, style } =
    props;

  const { groupProps, trackProps, state, trackRef, trackStyle } = useSliderSideEffects({
    value,
    minValue,
    maxValue,
    onChange,
    isDisabled,
    step,
    ariaLabel,
  });

  return (
    <div {...groupProps} className={classnames(className, STYLE.wrapper)} style={style} id={id}>
      <div
        {...trackProps}
        ref={trackRef}
        className={classnames(STYLE.track, {
          disabled: isDisabled,
        })}
        style={trackStyle}
      >
        <Thumb state={state} trackRef={trackRef} ariaLabel={ariaLabel} />
      </div>
    </div>
  );
};

export default Slider;
