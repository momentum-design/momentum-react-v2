import React, { ReactElement, InputHTMLAttributes, RefObject, forwardRef, useState } from 'react';
import { useTextField } from '@react-aria/textfield';
import { useFocus } from '@react-aria/interactions';
import { useSearchFieldState } from '@react-stately/searchfield';
import classnames from 'classnames';

import './TextInput.style.scss';
import { Props } from './TextInput.types';
import InputMessage, { getFilteredMessages } from '../InputMessage';
import { ButtonSimple, Icon } from '..';

const TextInput = (props: Props, ref: RefObject<HTMLInputElement>): ReactElement => {
  const { helpText, messageArr = [], label, className, clearAriaLabel, inputClassName } = props;

  const inputRef = React.useRef<HTMLInputElement>(null);

  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
    { ...props, description: helpText, errorMessage: messageArr?.[0]?.message },
    ref || inputRef
  );

  const [messageType, messages] = getFilteredMessages(messageArr);
  const [focus, setFocus] = useState(false);
  const state = useSearchFieldState(props);

  const { focusProps } = useFocus({
    onFocus: () => {
      setFocus(true);
    },
    onBlur: () => {
      setFocus(false);
    },
  });

  const onClearButtonPress = () => {
    state.setValue('');
  };

  const { htmlFor, ...otherLabelProps } = labelProps;

  return (
    <div
      data-level={messageType}
      data-focus={focus}
      className={classnames('md-text-input-wrapper', className)}
    >
      {label && (
        <label {...otherLabelProps} htmlFor={htmlFor}>
          {label}
        </label>
      )}
      <div className="md-text-input-container">
        <input
          {...(inputProps as InputHTMLAttributes<HTMLInputElement>)}
          {...focusProps}
          className={inputClassName}
          ref={ref}
        />
        {!!state.value && (
          <ButtonSimple
            className="clear-icon"
            aria-label={clearAriaLabel}
            onPress={onClearButtonPress}
          >
            <Icon scale={18} name="cancel" />
          </ButtonSimple>
        )}
      </div>
      {!!helpText && !messages?.length && (
        <InputMessage
          className="text-input-help"
          level="help"
          {...descriptionProps}
          message={helpText}
        />
      )}
      {messages && !!messages.length && (
        <div {...errorMessageProps} className="md-text-input__messages">
          {messages.map((m, i) => (
            <InputMessage
              className="text-input-error"
              message={m}
              key={`input-message-${i}`}
              level={messageType}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Short text input
 */

const _TextInput = forwardRef(TextInput);

_TextInput.displayName = 'TextInput';

export default _TextInput;
