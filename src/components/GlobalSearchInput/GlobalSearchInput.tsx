import React, { FC, useRef } from 'react';
import classnames from 'classnames';

import ButtonSimple from '../ButtonSimple';
import { STYLE } from './GlobalSearchInput.constants';
import { Props } from './GlobalSearchInput.types';
import './GlobalSearchInput.style.scss';
import { useSearchField } from '@react-aria/searchfield';
import { useSearchFieldState } from '@react-stately/searchfield';

import Icon from '../Icon';

/**
 * Global search input. Used for global search only
 */
const GlobalSearchInput: FC<Props> = (props: Props) => {
  const { className, id, style, searching } = props;

  const state = useSearchFieldState(props);
  const ref = useRef();
  const { inputProps, clearButtonProps } = useSearchField(props, state, ref);

  return (
    <div className={classnames(className, STYLE.wrapper)} id={id}>
      <Icon
        weight="light"
        scale={18}
        className="search-icon"
        name={searching ? 'spinner' : 'search'}
      />
      <input style={style} {...inputProps} ref={ref} />
      {state.value && (
        <ButtonSimple className="clear-icon" {...clearButtonProps}>
          <Icon scale={18} name="cancel" />
        </ButtonSimple>
      )}
    </div>
  );
};

export default GlobalSearchInput;
