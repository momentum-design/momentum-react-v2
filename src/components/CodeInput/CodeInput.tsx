import React, { ReactElement } from 'react';
import VerificationInput from 'react-verification-input';

import './CodeInput.style.scss';
import { Props } from './CodeInput.types';
import InputMessage, { MessageLevel } from '../InputMessage';

const determineMessageType = (array): MessageLevel => {
  return array.reduce((agg, e) => {
    return agg === 'error' ? agg : e.type || '';
  }, '');
};

const filterMessagesByType = (array, value) => {
  return array.reduce((agg, e) => (e.type === value ? agg.concat(e.message) : agg), []);
};


const ReactVerificationInput : React.FC<Props> = (props: Props) : ReactElement => {
  const {numDigits, onComplete, ariaLabel, messageArr=[]} = props;

  const messageType: MessageLevel =
    (messageArr.length > 0 && determineMessageType(messageArr)) || 'none';
  const messages = (messageType && filterMessagesByType(messageArr, messageType)) || null;

  return (
    <div
      className="md-code-input-wrapper"
      data-level={messageType}
    >
      <VerificationInput
        inputProps={{ 'aria-label': ariaLabel }}
        length={numDigits}
        onChange={(value) => {
          if (value.length === numDigits) {
            onComplete(value);
          }
        }}
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

export default ReactVerificationInput;

