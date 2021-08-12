import React, { ReactElement, useState, useEffect } from 'react';
import VerificationInput from 'react-verification-input';

import './CodeInput.style.scss';
import { Props } from './CodeInput.types';
import InputMessage, { MessageLevel } from '../InputMessage';
import classnames from 'classnames';

const determineMessageType = (array): MessageLevel => {
  return array.reduce((agg, e) => {
    return agg === 'error' ? agg : e.type || '';
  }, '');
};

const filterMessagesByType = (array, value) => {
  return array.reduce((agg, e) => (e.type === value ? agg.concat(e.message) : agg), []);
};

const CodeInput: React.FC<Props> = (props: Props): ReactElement => {
  const { numDigits, onComplete, ariaLabel, messageArr = [], disabled = false, className } = props;

  const [internalMessageArray, setInternalMessageArray] = useState(messageArr);
  const [isComplete, setComplete] = useState(false);
  const [value, setValue] = useState('');

  const messageType: MessageLevel =
    (internalMessageArray.length > 0 && determineMessageType(internalMessageArray)) || 'none';
  const messages = (messageType && filterMessagesByType(internalMessageArray, messageType)) || null;

  useEffect(() => {
    if (value.length === numDigits) {
      onComplete(value);
      setComplete(true);
    }
  }, [value]);

  useEffect(() => {
    setInternalMessageArray(messageArr);
  }, [JSON.stringify(messageArr)]);

  return (
    <div className={classnames('md-code-input-wrapper', className)} data-level={messageType}>
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
          container: 'md-code-input-container',
          character: 'md-code-input-character',
          characterInactive: 'md-code-input-character--inactive',
          characterSelected: 'md-code-input-character--selected',
        }}
      />
      {messages && (
        <div className="md-code-input__messages">
          {messages.map((m, i) => (
            <InputMessage message={m} key={`input-message-${i}`} level={messageType} />
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
