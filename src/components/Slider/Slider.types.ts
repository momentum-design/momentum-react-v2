import type { CSSProperties } from 'react';

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
  isDisabled?: boolean;

  /**
   * Current value of slider - allows for a controlled component
   */
  value?: number;

  /**
   * onChange callback of value - allows for a controlled component
   */
  onChange?: (value: number) => void;

  /**
   * Step size of the slider
   */
  step?: number;

  /**
   * Min value of the slider
   */
  minValue?: number;

  /**
   * Max value of the slider
   */
  maxValue?: number;

  /**
   * aria-label to be passed to slider group
   */
  ariaLabel?: string;
}

export type SliderHookArgs = Pick<
  SliderProps,
  'value' | 'onChange' | 'step' | 'maxValue' | 'minValue'
>;

export type SliderHookReturn = {
  inputRef: React.MutableRefObject<HTMLInputElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
};
