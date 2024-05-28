/** @component close-icon */

import React from 'react';
import PropTypes from 'prop-types';

/**
* @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
**/
const CloseIcon = (props) => {
  const { className, onClick, ...otherHTMLProps } = props;

  return (
    <button
      className={`md-close` + `${(className && ` ${className}`) || ''}`}
      onClick={onClick}
      {...otherHTMLProps}
    />
  );
};

CloseIcon.defaultProps = {
  onClick: () => {},
  className: '',
};

CloseIcon.propTypes = {
  /** @prop Handler when the user clicks the CloseIcon | () => {} */
  onClick: PropTypes.func,

  /** @prop Optional css class string | '' */
  className: PropTypes.string,
};

CloseIcon.displayName = 'CloseIcon';

export default CloseIcon;
