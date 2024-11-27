/** @component link */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
 **/
const Link = ({ className, children, color, disabled, tag, theme, ...props }) => {
  return React.createElement(
    tag,
    {
      className:
        'md-link' +
        `${(color && ` md-link--${color}`) || ''}` +
        `${(theme && ` md-link--${theme}`) || ''}` +
        `${(className && ` ${className}`) || ''}`,
      disabled: disabled,
      ...(!disabled && { tabIndex: 0 }),
      ...props,
    },
    children
  );
};

Link.propTypes = {
  /** @prop Children nodes to render inside Link Component | null */
  children: PropTypes.node.isRequired,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Optional color css styling | 'blue' */
  color: PropTypes.string,
  /** @prop Sets the attribute disabled to the Link | false */
  disabled: PropTypes.bool,
  /** @prop Set HTML tag type | 'a' */
  tag: PropTypes.oneOf(['a', 'div', 'span']),
  /** @prop Set Link theme | ''  */
  theme: PropTypes.string,
};

Link.defaultProps = {
  children: null,
  className: '',
  color: 'blue',
  disabled: false,
  tag: 'a',
  theme: '',
};

Link.displayName = 'Link';

export default Link;
