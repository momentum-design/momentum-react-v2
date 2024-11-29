/** @component topbar */

import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@momentum-ui/react-collaboration';
import { prefix } from '../utils/index';

/**
 * @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
 **/
class TopbarNav extends React.Component {
  render() {
    const { alignment, children, className, listProps, ...otherProps } = this.props;

    return (
      <nav
        className={
          `${prefix}-top-bar__nav` +
          `${alignment ? ` ${prefix}-top-bar__nav--${alignment}` : ''}` +
          `${(className && ` ${className}`) || ''}`
        }
        {...otherProps}
      >
        <List tabType="horizontal" {...listProps}>
          {children}
        </List>
      </nav>
    );
  }
}

TopbarNav.propTypes = {
  /** @prop Optional flex justify content alignment | '' */
  alignment: PropTypes.string,
  /** @prop Children node to render inside of TopbarNav | null */
  children: PropTypes.node,
  /** @prop Optional CSS class string | '' */
  className: PropTypes.string,
  /** @prop Optional object for List Component props | {} */
  listProps: PropTypes.object,
};

TopbarNav.defaultProps = {
  alignment: null,
  children: null,
  className: '',
  listProps: {},
};

TopbarNav.displayName = 'TopbarNav';

export default TopbarNav;
