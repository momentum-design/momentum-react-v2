import React, { ReactElement, InputHTMLAttributes } from 'react';
import { useTextField } from '@react-aria/textfield';
import classnames from 'classnames';

//import './TextInput.style.scss';
import { Props } from './TextInput.types';
import InputMessage, { getFilteredMessages } from '../InputMessage';
import InputHelper from '../InputHelper';
import Label from '../Label';

const TextInput: React.FC<Props> = (props: Props): ReactElement => {
  const {
    helpText,
    messageArr = [],
    label,
    className,
    clearAriaLabel,
    inputClassName,
    inputRef,
  } = props;

  const ref = React.useRef();
  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
    { ...props, description: helpText, errorMessage: messageArr?.[0]?.message },
    inputRef || ref
  );

  const [messageType, messages] = getFilteredMessages(messageArr);

  return (
    <div data-level={messageType} className={classnames('md-text-input-wrapper', className)}>
      {label && <Label {...labelProps}>{label}</Label>}
      <div className="md-text-input-container">
        <input
          {...(inputProps as InputHTMLAttributes<HTMLInputElement>)}
          className={inputClassName}
        />
        <button aria-label={clearAriaLabel}>X</button>
      </div>
      {!!helpText && !messages?.length && <InputHelper {...descriptionProps} message={helpText} />}
      {messages && !!messages.length && (
        <div {...errorMessageProps} className="md-text-input__messages">
          {messages.map((m, i) => (
            <InputMessage message={m} key={`input-message-${i}`} level={messageType} />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Short text input
 */

export default TextInput;
