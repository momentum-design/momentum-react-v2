import React, { ReactElement, useState, useEffect, useRef } from 'react';

//import './TextInput.style.scss';
import { Props } from './TextInput.types';
import InputMessage, { getFilteredMessages } from '../InputMessage';
import InputHelper from '../InputHelper';

const TextInput: React.FC<Props> = (props: Props): ReactElement => {
  const {
    helpText,
    messageArr = [],
  } = props;
  
  const [internalMessageArray, setInternalMessageArray] = useState(messageArr);

  const [messageType, messages] = getFilteredMessages(internalMessageArray);

  return (
    <div data-level={messageType}>
      <input/>
      {!(messages && messages.length) && !!helpText && (
        <InputHelper message={helpText} />
      )}
      {messages && !!messages.length && (
        <div className="md-text-input__messages">
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
