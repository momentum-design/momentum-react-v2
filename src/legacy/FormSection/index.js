/** @component form */

import React from 'react';
import PropTypes from 'prop-types';
import { FormInfo, FormContent } from '@momentum-ui/react-collaboration';

/**
* @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
**/
const FormSection = (props) => {
  const { title, description, children } = props;

  return (
    <div className="md-form__section">
      <FormInfo title={title} description={description} />
      <FormContent>{children}</FormContent>
    </div>
  );
};

FormSection.propTypes = {
  /** @prop Children node to render inside FormSection | null */
  children: PropTypes.node,
  /** @prop Optional FormSection description | '' */
  description: PropTypes.string,
  /** @prop Optional FormSection title | null */
  title: PropTypes.string.isRequired,
};

FormSection.defaultProps = {
  children: null,
  description: '',
  title: null,
};

FormSection.displayName = 'FormSection';

export default FormSection;
