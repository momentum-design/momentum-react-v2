/** @component breadcrumbs */

import React from 'react';
import PropTypes from 'prop-types';

/**
* @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
**/
class Breadcrumbs extends React.PureComponent {
  static displayName = 'Breadcrumbs';

  static propTypes = {
    /** @prop Children nodes to render inside Breadcrumbs | null */
    children: PropTypes.node,
    /** @prop Optional css class string | '' */
    className: PropTypes.string,
  };

  static defaultProps = {
    children: null,
    className: '',
  };

  render() {
    const { className, children } = this.props;

    const items = React.Children.map(children, (child, idx) => {
      if (children.length - 1 === idx || !children.length) {
        return React.cloneElement(child, { className: 'current' });
      }

      return child;
    });

    return <ul className={'md-breadcrumbs' + ` ${className}`}>{items}</ul>;
  }
}

export default Breadcrumbs;
