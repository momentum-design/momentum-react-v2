import { Message } from '../InputMessage/InputMessage.types';

export interface Props {
  /**
   * Custom class to be able to override the component's CSS
   */
  className?: string;
  /**
   * numDigits: the number of input boxes in the code input
   */
  numDigits: number;
  /**
   * onChange: callback that fires whenever the entered code changes
   */
  onChange?: (code: string) => void;
  /**
   * onComplete: callback that fires when the user enters the final digit
   */
  onComplete?: (code: string) => void;
  /**
   * ariaLabel: the aria-label passed to the input in case it has no visible label
   */
  ariaLabel?: string;
  /**
   * messageArr: array of messages and their types
   */
  messageArr?: Message[];
  /**
   * disabled: whether code input is disabled
   */
  disabled?: boolean;
  /**
   * inputId: id to be passed to input for the visible label
   * referencing to htmlFor attribute of <label> tag in cantina.
   */
  inputId?: string;
  /**
   * ariaDescribedby: the aria-describedby attribute to be passed to the input
   */
  ariaDescribedby?: string;
  /**
   * clearComplete: whether to clear the input when the code is complete if navigated back to it
   */
  clearComplete?: boolean;
}
