/** @component tabs */

import React from 'react';
import PropTypes from 'prop-types';

/**
* @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
**/
const TabHeader = (props) => {
  const { heading, subHeading } = props;

  return (
    //Element type required by Momentum UI Style
    <md-tab-heading>
      {heading}
      {subHeading && <div>{subHeading}</div>}
    </md-tab-heading>
  );
};

TabHeader.propTypes = {
  /** @prop TabHeader text */
  heading: PropTypes.string.isRequired,
  /** @prop Subheader text | '' */
  subHeading: PropTypes.string,
};

TabHeader.defaultProps = {
  subHeading: '',
};

TabHeader.displayName = 'TabHeader';

export default TabHeader;
