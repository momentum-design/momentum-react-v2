/** @component modal */

import React from 'react';
import PropTypes from 'prop-types';

/**
* @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
**/
const ModalFooter = (props) => {
  const { className, children } = props;
  return (
    <div className={'md-modal__footer' + `${(className && ` ${className}`) || ''}`}>{children}</div>
  );
};

ModalFooter.propTypes = {
  /** @prop Children nodes to render inside of ModalFooter | null */
  children: PropTypes.node,
  /** @prop Optional css class names | '' */
  className: PropTypes.string,
};

ModalFooter.defaultProps = {
  children: null,
  className: '',
};

ModalFooter.displayName = 'ModalFooter';

export default ModalFooter;
