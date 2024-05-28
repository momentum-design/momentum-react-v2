/** @component input */

import React from 'react';
import PropTypes from 'prop-types';

/** Input Message with required message */
/**
* @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
**/
const InputMessage = ({ message }) => {
  return (
    <div className="md-input__message" role="alert">
      {message}
    </div>
  );
};

InputMessage.propTypes = {
  /** @prop message message for InputMessage component */
  message: PropTypes.string.isRequired,
};

InputMessage.displayName = 'InputMessage';

export default InputMessage;
