/** @component sidebar */

import React from 'react';
import PropTypes from 'prop-types';

/**
* @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
**/
const SidebarHeader = (props) => {
  const { children, className, ...otherProps } = props;
  return (
    <div
      className={`md-sidebar__header` + `${(className && ` ${className}`) || ''}`}
      {...otherProps}
    >
      {children}
    </div>
  );
};

SidebarHeader.displayName = 'SidebarHeader';

SidebarHeader.propTypes = {
  /** @prop Children nodes to render inside SidebarHeader | null */
  children: PropTypes.node,
  /** @prop Optional css class string | ''  */
  className: PropTypes.string,
};

SidebarHeader.defaultProps = {
  children: null,
  className: '',
};

export default SidebarHeader;
