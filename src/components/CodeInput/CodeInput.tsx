import classnames from 'classnames';
import React, { ReactElement, useState, useEffect, useRef } from 'react';
import VerificationInput from 'react-verification-input';

import InputMessage, { getFilteredMessages } from 'components/InputMessage';

import { STYLE } from './CodeInput.constants';
import { Props } from './CodeInput.types';
import './CodeInput.style.scss';

const CodeInput: React.FC<Props> = (props: Props): ReactElement => {
  const {
    numDigits,
    onChange = () => {
      /* Optional */
    },
    onComplete = () => {
      /* Optional */
    },
    ariaLabel,
    messageArr = [],
    disabled = false,
    className,
  } = props;

  const [internalMessageArray, setInternalMessageArray] = useState(messageArr);
  const [isComplete, setComplete] = useState(false);
  const [value, setValue] = useState('');

  const [messageType, messages] = getFilteredMessages(internalMessageArray);

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    onChange(value);
    if (value.length === numDigits) {
      onComplete(value);
      setComplete(true);
    }
  }, [value]);

  useEffect(() => {
    setInternalMessageArray(messageArr);
  }, [JSON.stringify(messageArr)]);

  return (
    <div className={classnames(STYLE.wrapper, className)} data-level={messageType}>
      <VerificationInput
        inputProps={{ 'aria-label': ariaLabel, disabled }}
        length={numDigits}
        onChange={setValue}
        onFocus={() => {
          if (isComplete) {
            // When completed, refocusing the input will clear the code and any messages
            setComplete(false);
            setValue('');
            setInternalMessageArray([]);
          }
        }}
        value={value}
        removeDefaultStyles={true}
        validChars="0-9"
        placeholder=""
        classNames={{
          container: STYLE.container,
          character: STYLE.character,
          characterInactive: STYLE.characterInactive,
          characterSelected: STYLE.characterSelected,
        }}
      />
      {messages && (
        <div className={STYLE.messages}>
          {messages.map((m, i) => (
            <InputMessage
              className={STYLE.message}
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
 * Numeric code input for use with confirmation codes
 */

export default CodeInput;
