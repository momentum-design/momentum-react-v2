/** @component avatar */

import React from 'react';
import PropTypes from 'prop-types';

/**
* @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
**/
const CompositeAvatar = (props) => {
  const { children, className, size } = props;

  return (
    <div
      className={
        'md-composite-avatar' +
        `${(size && ` md-composite-avatar--${size}`) || ''}` +
        `${(className && ` ${className}`) || ''}`
      }
    >
      {children}
    </div>
  );
};

CompositeAvatar.displayName = 'CompositeAvatar';

CompositeAvatar.propTypes = {
  /** @prop Children nodes to render inside CompositeAvatar | null */
  children: PropTypes.node,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Sets the size of the CompositeAvatar | 'medium' */
  size: PropTypes.oneOf(['small', 'medium', 'large', 28, 40, 84, 135]),
};

CompositeAvatar.defaultProps = {
  className: '',
  size: 'medium',
  children: null,
};

export default CompositeAvatar;
