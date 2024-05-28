/** @component loading-spinner */

import React from 'react';
import PropTypes from 'prop-types';

/**
* @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
**/
const Loading = (props) => {
  const { small } = props;

  return (
    <div className={`md-loading` + `${small ? ' md-loading--small' : ''}`}>
      <span className="md-loading__icon" />
      <span className="md-loading__icon" />
      <span className="md-loading__icon" />
    </div>
  );
};

Loading.propTypes = {
  /** @prop Prop to make the Loading animation small | false */
  small: PropTypes.bool,
};

Loading.defaultProps = {
  small: false,
};

Loading.displayName = 'Loading';

export default Loading;
