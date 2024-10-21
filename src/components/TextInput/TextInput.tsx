/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement, InputHTMLAttributes, RefObject, forwardRef, useRef } from 'react';
import { useTextField } from '@react-aria/textfield';
import { useSearchFieldState } from '@react-stately/searchfield';
import classnames from 'classnames';

import './TextInput.style.scss';
import { Props } from './TextInput.types';
import InputMessage, { getFilteredMessages } from '../InputMessage';
import { ButtonSimple, Icon } from '..';
import { STYLE } from './TextInput.constants';
import { useFocusState } from '../../hooks/useFocusState';
import { v4 as uuidV4 } from 'uuid';

const TextInput = (props: Props, ref: RefObject<HTMLInputElement>): ReactElement => {
  const {
    messageArr = [],
    label,
    className,
    clearAriaLabel,
    description,
    inputClassName,
    isDisabled,
    style,
    id,
    inputMaxLen,
  } = props;

  const componentRef = React.useRef<HTMLInputElement>();
  const inputRef = ref || componentRef;

  const [messageType, messages] = getFilteredMessages(messageArr);
  const errorMessage = messageType === 'error' ? messages[0] : undefined;

  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
    { ...props, errorMessage },
    inputRef
  );

  const { isFocused, focusProps } = useFocusState(props);
  const state = useSearchFieldState(props);

  const messageId = useRef(uuidV4());
  const labelId = useRef(uuidV4());
  const clearButtonId = useRef(uuidV4());

  const onClearButtonPress = () => {
    state.setValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      data-level={messageType}
      data-focus={isFocused}
      data-disabled={isDisabled}
      style={style}
      onClick={handleClick}
      className={classnames(STYLE.wrapper, className)}
    >
      {label && (
        <label {...labelProps} htmlFor={labelProps.htmlFor} id={labelId.current}>
          {label}
        </label>
      )}
      <div className={STYLE.container}>
        <input
          {...(inputProps as InputHTMLAttributes<HTMLInputElement>)}
          {...focusProps}
          className={inputClassName}
          ref={inputRef}
          maxLength={inputMaxLen}
          aria-describedby={messages && !!messages.length ? messageId.current : undefined}
        />
        {!!state.value && !isDisabled && (
          <ButtonSimple
            className="clear-icon"
            aria-label={clearAriaLabel}
            onPress={onClearButtonPress}
            id={clearButtonId.current}
            // If there is a visible label, then sr should read for this x button "clearAriaLabel (Ex. 'Clear input') + visible label (Ex. 'Password')"
            // Else, if input was given an id and ideally has an aria-label, then sr should read for this x button "clearAriaLabel (Ex. 'Clear input') + input aria-label (Ex. 'Password')"
            // Else, sr should read for this x button "clearAriaLabel (Ex. 'Clear input')"
            aria-labelledby={
              label
                ? `${clearButtonId.current} ${labelId.current}`
                : id
                ? `${clearButtonId.current} ${id}`
                : clearButtonId.current
            }
          >
            <Icon scale={18} name="cancel" />
          </ButtonSimple>
        )}
      </div>
      {!!description && !messages?.length && (
        <InputMessage
          className={STYLE.help}
          level="help"
          {...descriptionProps}
          message={description}
        />
      )}
      {messages && !!messages.length && (
        <div {...errorMessageProps}>
          {messages.map((m, i) => (
            <InputMessage
              className={STYLE.error}
              message={m}
              key={`input-message-${i}`}
              level={messageType}
              id={messageId.current}
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
