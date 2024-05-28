/** @component modal */

import React from 'react';
import PropTypes from 'prop-types';

/**
* @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
**/
const ModalBody = (props) => {
  const {
    className,
    ...other // all other standard html properties
  } = props;

  return (
    <div className={`md-modal__body` + `${(className && ` ${className}`) || ''}`} {...other}>
      {props.children}
    </div>
  );
};

ModalBody.propTypes = {
  /** @prop Children nodes to render inside the ModalBody | null */
  children: PropTypes.node,
  /** @prop Optional css class names | '' */
  className: PropTypes.string,
};

ModalBody.defaultProps = {
  children: null,
  className: '',
};

ModalBody.displayName = 'ModalBody';

export default ModalBody;
