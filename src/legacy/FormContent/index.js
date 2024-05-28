/** @component form */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * FormContent helps organize the content within a form section and provides a S wrapper;
 **/

/**
* @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
**/
const FormContent = (props) => {
  const { children } = props;

  return <div className="section__content">{children}</div>;
};

FormContent.propTypes = {
  /** @prop Children node to render inside FormContent | null */
  children: PropTypes.node,
};

FormContent.deafultProps = {
  children: null,
};

FormContent.displayName = 'FormContent';

export default FormContent;
