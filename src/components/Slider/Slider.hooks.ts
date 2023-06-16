import type { SliderHookArgs, SliderHookReturn } from './Slider.types';
import { useRef, useLayoutEffect } from 'react';
import { setLocalValueOnElement } from './Slider.utils';

export const useSliderSideEffects = ({
  onChange,
  value,
  step,
  maxValue,
  minValue,
}: SliderHookArgs): SliderHookReturn => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputElement = e.currentTarget;
    setLocalValueOnElement(inputElement);
    onChange?.(+inputElement.value);
  };

  useLayoutEffect(() => {
    if (inputRef?.current) {
      setLocalValueOnElement(inputRef.current);
    }
  }, [value, step, maxValue, minValue]);

  return { inputRef, handleChange };
};
