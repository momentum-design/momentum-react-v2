import React, { ReactElement } from 'react';
import VerificationInput from 'react-verification-input';

import './CodeInput.style.scss';
import { Props } from './CodeInput.types';

const ReactVerificationInput : React.FC<Props> = (props: Props) : ReactElement => {
  const {numDigits, onComplete} = props;

  return (
    <VerificationInput
      length={numDigits}
      onChange={(value) => {
        if (value.length === 6) {
          onComplete(value);
        }
      }}
      removeDefaultStyles={true}
      validChars="0-9"
      placeholder=""
      classNames={{
        container: 'code-input-container',
        character: 'code-input-character',
        characterInactive: 'code-input-character--inactive',
        characterSelected: 'code-input-character--selected',
      }}
    />
  );
};

/**
 * TODO: Add description of component here.
 */

export default ReactVerificationInput;

