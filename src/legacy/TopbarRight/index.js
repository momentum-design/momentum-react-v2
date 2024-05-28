/** @component topbar */

import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from '../utils/index';

/**
* @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
**/
class TopbarRight extends React.PureComponent {
  render() {
    const { className, children, ...otherProps } = this.props;

    return (
      <div
        className={`${prefix}-top-bar__right` + `${(className && ` ${className}`) || ''}`}
        {...otherProps}
      >
        {children}
      </div>
    );
  }
}

TopbarRight.propTypes = {
  /** @prop Children node to render inside of TopbarRight | null */
  children: PropTypes.node,
  /** @prop Optional CSS class string | '' */
  className: PropTypes.string,
};

TopbarRight.defaultProps = {
  children: null,
  className: '',
};

TopbarRight.displayName = 'TopbarRight';

export default TopbarRight;
