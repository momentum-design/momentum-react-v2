/** @component list-item */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
 **/
const ListItemSection = (props) => {
  const { children, className, position, ...otherProps } = props;

  return (
    <div
      className={`md-list-item__${position}` + `${(className && ` ${className}`) || ''}`}
      {...otherProps}
    >
      {children}
    </div>
  );
};

ListItemSection.propTypes = {
  /** @prop Children nodes to render inside ListItemSection | null */
  children: PropTypes.node,
  /** @prop Optional css class name | '' */
  className: PropTypes.string,
  /** @prop Determine the ListItemSection's position | 'center' */
  position: PropTypes.oneOf(['left', 'center', 'right', 'center-align']),
};

ListItemSection.defaultProps = {
  children: null,
  className: '',
  position: 'center',
};

ListItemSection.displayName = 'ListItemSection';

export default ListItemSection;
