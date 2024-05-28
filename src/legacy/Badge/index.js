/** @component badge */

import React from 'react';
import PropTypes from 'prop-types';

/**
* @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
**/
const Badge = (props) => {
  const { className, rounded, color, ...otherHTMLProps } = props;

  return (
    <span
      className={
        `md-badge` +
        `${(rounded && ' md-badge--round') || ''}` +
        `${(color && ` md-badge--${color}`) || ''}` +
        `${(className && ` ${className}`) || ''}`
      }
      {...otherHTMLProps}
    >
      {props.children}
    </span>
  );
};

Badge.displayName = 'Badge';

Badge.propTypes = {
  /** @prop Children nodes to render inside Accordion | null */
  children: PropTypes.node,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Optional color prop type | null */
  color: PropTypes.string,
  /** @prop Optional rounded corners for the Badge | false */
  rounded: PropTypes.bool,
};

Badge.defaultProps = {
  children: null,
  className: '',
  rounded: false,
};

export default Badge;
