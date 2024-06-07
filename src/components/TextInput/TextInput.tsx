/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement, InputHTMLAttributes, RefObject, forwardRef } from 'react';
import { useTextField } from '@react-aria/textfield';
import { useSearchFieldState } from '@react-stately/searchfield';
import classnames from 'classnames';

import './TextInput.style.scss';
import { Props } from './TextInput.types';
import InputMessage, { getFilteredMessages } from '../InputMessage';
import { ButtonSimple, Icon } from '..';
import { STYLE } from './TextInput.constants';
import { useFocusState } from '../../hooks/useFocusState';

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
        <label {...labelProps} htmlFor={labelProps.htmlFor}>
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
