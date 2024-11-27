/** @component social-list */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
 **/
class SocialList extends React.Component {
  render() {
    const { children } = this.props;

    return <span className="md-social__list">{children}</span>;
  }
}

SocialList.propTypes = {
  /** @prop Children nodes to render inside SocialList | null */
  children: PropTypes.node,
};

SocialList.defaultProps = {
  children: null,
};

SocialList.displayName = 'SocialList';

export default SocialList;
