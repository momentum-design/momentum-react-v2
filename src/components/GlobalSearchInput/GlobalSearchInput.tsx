import React, { FC, useRef, useState } from 'react';
import classnames from 'classnames';
import { useFocus } from '@react-aria/interactions';

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
  const { className, id, style, searching, searchContext } = props;
  const [focus, setFocus] = useState(false);

  const state = useSearchFieldState(props);
  const ref = useRef();
  const { focusProps } = useFocus({
    onFocus: () => {
      setFocus(true);
    },
    onBlur: () => {
      setFocus(false);
    },
  });
  const { inputProps, clearButtonProps } = useSearchField(props, state, ref);

  const additionalClasses = [];
  if (focus) {
    additionalClasses.push('search-input-focus');
  }

  return (
    <div className={classnames(className, STYLE.wrapper, ...additionalClasses)} id={id}>
      <Icon
        weight="light"
        scale={18}
        className="search-icon"
        name={searching ? 'spinner' : 'search'}
      />
      {searchContext && (
        <div className="search-context-container">
          <p>{searchContext}</p>
        </div>
      )}
      <input style={style} {...inputProps} {...focusProps} ref={ref} />
      {state.value && (
        <ButtonSimple className="clear-icon" {...clearButtonProps}>
          <Icon scale={18} name="cancel" />
        </ButtonSimple>
      )}
    </div>
  );
};

export default GlobalSearchInput;
