export type Message = {
  message: string;
  type: 'error' | 'warning' | 'success';
};

export interface Props {
  /**
   * numDigits: the number of input boxes in the code input
   */
  numDigits: number;
  /**
   * onComplete: callback that fires when the user enters the final digit
   */
  onComplete?: (code: string) => void;
  /**
   * ariaLabel: the aria-label passed through to the input
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
}
