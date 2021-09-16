/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, useRef, useState } from 'react';
import classnames from 'classnames';
import { useFocus } from '@react-aria/interactions';

import ButtonSimple from '../ButtonSimple';
import { STYLE } from './SearchInput.constants';
import { Props } from './SearchInput.types';
import './SearchInput.style.scss';
import { useSearchField } from '@react-aria/searchfield';
import { useSearchFieldState } from '@react-stately/searchfield';
import InputMessage from '../InputMessage';

import Icon from '../Icon';
/**
 *  Search input
 */
const SearchInput: FC<Props> = (props: Props) => {
  const { className, id, style, searching, clearButtonAriaLabel, label } = props;
  const [focus, setFocus] = useState(false);
  const state = useSearchFieldState(props);
  const ref = useRef(null);
  const { focusProps } = useFocus({
    onFocus: () => {
      setFocus(true);
    },
    onBlur: () => {
      setFocus(false);
    },
  });

  const { inputProps, clearButtonProps, labelProps, descriptionProps, errorMessageProps } =
    useSearchField(props, state, ref);

  const additionalClasses = [];
  if (focus) {
    additionalClasses.push('search-input-focus');
  }

  const handleClick = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  return (
    <div
      className={classnames(className, STYLE.wrapper, ...additionalClasses)}
      id={id}
      onClick={handleClick}
      style={style}
    >
      <label htmlFor={inputProps.id} {...labelProps}>
        {label}
      </label>
      <div>
        <Icon
          weight="light"
          scale={18}
          className="search-icon"
          name={searching ? 'spinner' : 'search'}
        />
      </div>
      <div className="input-container">
        <input {...inputProps} {...focusProps} ref={ref} />
      </div>
      {!!state.value && (
        <ButtonSimple
          className="clear-icon"
          {...clearButtonProps}
          aria-label={clearButtonAriaLabel}
        >
          <Icon scale={18} name="cancel" />
        </ButtonSimple>
      )}
      <InputMessage />
    </div>
  );
};

export default SearchInput;
