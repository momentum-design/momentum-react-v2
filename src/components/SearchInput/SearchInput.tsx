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
  const { className, id, style, searching, clearButtonAriaLabel, label, isDisabled } = props;
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

  const { inputProps, clearButtonProps, labelProps } = useSearchField(props, state, ref);

  const handleClick = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  return (
    <div
      className={classnames(className, STYLE.wrapper)}
      id={id}
      onClick={handleClick}
      style={style}
      data-disabled={isDisabled}
      data-focus={focus}
    >
      <label htmlFor={inputProps.id} {...labelProps}>
        {label}
      </label>
      <div>
        <Icon
          weight="light"
          scale={18}
          className={STYLE.search}
          name={searching ? 'spinner' : 'search'}
        />
      </div>
      <div className={STYLE.container}>
        <input {...inputProps} {...focusProps} ref={ref} />
      </div>
      {!!state.value && !isDisabled && (
        <ButtonSimple
          className={STYLE.clear}
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
