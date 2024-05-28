/** @component tabs */

import React from 'react';
import PropTypes from 'prop-types';

/**
* @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
**/
const TabPane = (props) => {
  const { children, active } = props;

  return (
    <div className={`md-tab__pane` + `${active ? ' active' : ''}`}>
      <div className="md-tab__content">{children}</div>
    </div>
  );
};

TabPane.propTypes = {
  /** @prop Determines if TabPane is active | false */
  active: PropTypes.bool,
  /** @prop Children nodes to render inside TabPane | null */
  children: PropTypes.node,
};

TabPane.defaultProps = {
  active: false,
  children: null,
};

TabPane.displayName = 'TabPane';

export default TabPane;
