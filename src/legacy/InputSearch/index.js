/** @component input-search */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Input } from '@momentum-ui/react-collaboration';
import LoadingSpinner from '../../components/LoadingSpinner';

/**
 * @deprecated - Components in the legacy folder (/src/legacy) are deprecated. Please use a component from the components folder (/src/components) instead. Legacy components may not follow accessibility standards.
 **/
const SearchInput = (props) => {
  const { isLoading, ...otherProps } = props;

  return (
    <Input
      inputBefore={
        isLoading ? (
          <LoadingSpinner scale={20} aria-hidden variant="button" />
        ) : (
          <Icon name="search_20" />
        )
      }
      {...otherProps}
    />
  );
};

SearchInput.propTypes = {
  /** @prop Determines if spinner is present | false */
  isLoading: PropTypes.bool,
};

SearchInput.defaultProps = {
  isLoading: false,
};

SearchInput.displayName = 'SearchInput';

export default SearchInput;
