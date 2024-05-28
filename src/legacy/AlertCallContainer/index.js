/** @component alert-call */

import React from 'react';
import PropTypes from 'prop-types';

/**
* @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
**/
const AlertCallContainer = (props) => {
  const { children, ...otherProps } = props;

  return (
    <div className="md-alert__container md-alert__container--call" {...otherProps}>
      {children}
    </div>
  );
};

AlertCallContainer.defaultProps = {
  children: null,
};

AlertCallContainer.propTypes = {
  /** @prop Children Nodes to Render inside container | null */
  children: PropTypes.node,
};

AlertCallContainer.displayName = 'AlertCallContainer';

export default AlertCallContainer;
