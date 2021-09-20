import type { AriaTextFieldProps } from '@react-types/textfield';
import type { Message } from '../InputMessage/InputMessage.types';

export interface Props extends AriaTextFieldProps {
  /**
   * Optional css class name
   */
  className?: string;
  /**
   * Optional aria label on the clear button
   */
  clearAriaLabel?: string;
  /**
   * Input css class name string
   */
  inputClassName?: string;
  /**
   * Help Text to show form validation rules
   */
  helpText?: string;
  /**
   * Optional Input ref prop type
   */
  inputRef?: React.MutableRefObject<HTMLInputElement>;
  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;
  /**
   * Array of Messages with message and type to display below the input
   */
  messageArr?: Message[];
}
