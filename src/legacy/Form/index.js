/** @component form */

import React from 'react';
import PropTypes from 'prop-types';

/**
* @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
**/
class Form extends React.PureComponent {
  render() {
    const { name, children, ...props } = this.props;

    return (
      <form name={name} className="md-form" {...props}>
        {children}
      </form>
    );
  }
}

Form.propTypes = {
  /** @prop Children node to render inside Form | null */
  children: PropTypes.node,
  /** @prop Form name */
  name: PropTypes.string.isRequired,
};

Form.defaultProps = {
  children: null,
};

Form.displayName = 'Form';

export default Form;
