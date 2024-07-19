/** @component alert */

import React from 'react';
import PropTypes from 'prop-types';

/**
* @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
**/
class AlertContainer extends React.Component {
  render() {
    const { children, className, position, ariaLabel, ...otherProps } = this.props;

    return (
      <section
        className={
          'md-alert__container' +
          ` md-alert__container--${position}` +
          `${(className && ` ${className}`) || ''}`
        }
        aria-label={ariaLabel}
        {...otherProps}
      >
        {children}
      </section>
    );
  }
}

AlertContainer.defaultProps = {
  children: null,
  className: '',
  position: 'bottom-right',
};

AlertContainer.propTypes = {
  /** @prop Required aria-label */
  ariaLabel: PropTypes.string.isRequired,
  /** @prop Children Nodes to Render inside container | null */
  children: PropTypes.node,
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop Define alert's position with css class name | 'bottom-right' */
  position: PropTypes.oneOf([
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ]),
};

AlertContainer.displayName = 'AlertContainer';

export default AlertContainer;
