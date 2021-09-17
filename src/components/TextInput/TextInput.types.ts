import type { AriaTextFieldProps } from '@react-types/textfield';

export type Message = {
  message: string;
  type: 'error' | 'warning' | 'success';
};

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
   * Array of Objects with message and type [{error: '', type: 'error, success, warning'}] to display error message and assign class
   */
  messageArr?: Message[];
}

// const interface OldProps {
//   /**
//    * ID to reference for blindness accessibility feature
//    */
//   ariaDescribedBy?: string;
// /**
//  * Text to display for blindness accessibility features
//  */
// ariaLabel ?: string;
// /**
//  * Optional css class name
//  */
// className ?: string;
// /**
//  * Clears Input values
//  */
// clear ?: boolean;
// /**
//  * Optional aria label on the clear button
//  */
// clearAriaLabel ?: string;
// /**
//  * Overall input container size
//  */
// containerSize ?: string;
// /**
//  * Default Value same as value but used when onChange isn't invoked
//  */
// defaultValue ?: string | number;
// /**
//  * Sets the disabled attribute of the Input
//  */
// disabled ?: boolean;
// /**
//  * Array of Objects with message and type [{error: '', type: 'error, success, warning'}] to display error message and assign class
//  */
// messageArr ?: Message[];
// /**
//  * Unique HTML ID used for tying label to HTML input for automated testing
//  */
// htmlId ?: string;
// /**
//  * Optional Icon node that overrides right section of input
//  */
// inputAfter ?: Node;
// /**
//  * Optional Icon node that overrides left section of input
//  */
// inputBefore ?: Node;
// /**
//  * Unique HTML ID used for tying label to HTML input
//  */
// id ?: string;
// /**
//  * Input css class name string
//  */
// inputClassName ?: string;
// /**
//  * Help Text to show form validation rules
//  */
// helpText ?: string;
// /**
//  * Optional Input ref prop type
//  */
// inputRef ?: MutibleReference
// /**
//  * Overall input wrapper size
//  */
// inputSize ?: string;
// /**
//  * Applies the filled attribute of the Input
//  */
// isFilled ?: boolean;
// /**
//  * Input label text
//  */
// label ?: string;
// /**
//  * Optional Input name prop type
//  */
// name ?: string;
// /**
//  * Callback function invoked when user types into the Input field
//  */
// onChange ?: (text: string) => void;
// /**
//  * Callback function invoked when user is done editing Input field
//  */
// onDoneEditing ?: (text: string) => void;
// /**
//  * Callback function invoked when user focuses on the Input field
//  */
// onFocus ?: (text: string) => void;
// /**
//  * Callback function invoked when user presses any key
//  */
// onKeyDown ?: (text: string) => void;
// /**
//  * Callback function invoked when user clicks on the mouse/trackpad
//  */
// onMouseDown ?: (text: string) => void;
// /**
//  * Placeholder text to display when Input is empty
//  */
// placeholder ?: string;
// /**
//  * Determines if Input can be edited
//  */
// readOnly ?: boolean;
// /**
//  * Input type
//  */
// type ?: 'text' | 'number' | 'email';
// /**
//  * Input value
//  */
// value ?: string | number;
// };
// // removed multiline, password(in type), secondaryLabel, shape, nestedLevel, clear
