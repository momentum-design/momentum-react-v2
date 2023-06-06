import type { CSSProperties } from 'react';
import type { SliderState } from '@react-stately/slider';
import React from 'react';

export interface SliderProps {
  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Whether Slider is disabled
   */
  isDisabled: boolean;

  /**
   * Current value of slider - allows for a controlled component
   */
  value: number;

  /**
   * onChange callback of value - allows for a controlled component
   */
  onChange: React.Dispatch<React.SetStateAction<number>>;

  /**
   * Step size of the slider
   */
  step: number;

  /**
   * Min value of the slider
   */
  minValue: number;

  /**
   * Max value of the slider
   */
  maxValue: number;

  /**
   * aria-label to be passed to slider group
   */
  ariaLabel?: string;
}

export interface ThumbProps extends Pick<SliderProps, 'ariaLabel' | 'isDisabled'> {
  state: SliderState;
  trackRef: React.MutableRefObject<HTMLDivElement>;
}

export type SliderHookArgs = Pick<
  SliderProps,
  'onChange' | 'value' | 'minValue' | 'maxValue' | 'isDisabled' | 'step' | 'ariaLabel'
>;

export interface SliderHookReturnType {
  groupProps: React.HTMLAttributes<HTMLElement>;
  trackProps: React.HTMLAttributes<HTMLElement>;
  state: SliderState;
  trackRef: React.MutableRefObject<HTMLDivElement>;
  trackStyle: React.CSSProperties;
}

export type ThumbHookArgs = Pick<SliderHookReturnType, 'state' | 'trackRef'>;

export interface ThumbHookReturnType {
  thumbProps: React.HTMLAttributes<HTMLElement>;
  inputProps: React.HTMLAttributes<HTMLElement>;
  inputRef: React.MutableRefObject<HTMLInputElement>;
}
