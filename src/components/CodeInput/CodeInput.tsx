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
  );
};

/**
 * TODO: Add description of component here.
 */

export default ReactVerificationInput;

