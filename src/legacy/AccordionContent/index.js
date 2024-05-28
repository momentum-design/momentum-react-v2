/** @component accordion */

import React from 'react';
import PropTypes from 'prop-types';

/**
* @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
**/
const AccordionContent = (props) => {
  const { children, className } = props;
  return (
    <div className={`md-accordion__content` + `${(className && ` ${className}`) || ''}`}>
      {children}
    </div>
  );
};

AccordionContent.displayName = 'AccordionContent';

AccordionContent.propTypes = {
  /** @prop Children nodes to render inside AccordionContent | null */
  children: PropTypes.node,
  /** @prop Optional css class string | ''  */
  className: PropTypes.string,
};

AccordionContent.defaultProps = {
  children: null,
  className: '',
};

export default AccordionContent;
