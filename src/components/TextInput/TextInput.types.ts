import type { AriaTextFieldProps } from '@react-types/textfield';
import type { CSSProperties } from 'react';
import type { Message } from '../InputMessage/InputMessage.types';
import { RequireOneOf } from '../../utils/types';

/**
 * @link https://html.spec.whatwg.org/#autofill-field
 */
type AutocompleteOption =
  | 'off'
  | 'name'
  | 'honorific-prefix'
  | 'given-name'
  | 'additional-name'
  | 'family-name'
  | 'honorific-suffix'
  | 'nickname'
  | 'organization-title'
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'one-time-code'
  | 'organization'
  | 'street-address'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'address-level4'
  | 'address-level3'
  | 'address-level2'
  | 'address-level1'
  | 'country'
  | 'country-name'
  | 'postal-code'
  | 'cc-name'
  | 'cc-given-name'
  | 'cc-additional-name'
  | 'cc-family-name'
  | 'cc-number'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-csc'
  | 'cc-type'
  | 'transaction-currency'
  | 'transaction-amount'
  | 'language'
  | 'bday'
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'sex'
  | 'url'
  | 'photo'
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-area-code'
  | 'tel-local'
  | 'tel-local-prefix'
  | 'tel-local-suffix'
  | 'tel-extension'
  | 'email'
  | 'impp'
  | (string & Record<never, never>);

interface TextInputProps extends Omit<AriaTextFieldProps, 'errorMessage'> {
  /**
   * Optional css class name
   */
  className?: string;
  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
  /**
   * Aria label on the clear button
   */
  clearAriaLabel: string;
  /**
   * Input css class name string
   */
  inputClassName?: string;
  /**
   * Description text to be displayed below the input
   */
  description?: string;
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
  /**
   * Max amount of characters the input should allow
   */
  inputMaxLen?: number;
  /**
   * Describes the type of autocomplete functionality the input should provide if any.
   *
   * This attribute can be used to specify a large amount of context to the user agent.
   *
   * @example Email Address - "email"
   * @example Home Telephone - "home tel"
   * @example Shipping Address - "shipping street-address"
   *
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
   * @link https://html.spec.whatwg.org/#attr-fe-autocomplete-name
   */
  autoComplete?: AutocompleteOption;
}

export type Props = TextInputProps &
  RequireOneOf<TextInputProps, ['label', 'aria-label', 'aria-labelledby']>;
