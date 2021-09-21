/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, useRef } from 'react';
import classnames from 'classnames';

import ButtonSimple from '../ButtonSimple';
import { STYLE } from './SearchInput.constants';
import { Props } from './SearchInput.types';
import './SearchInput.style.scss';
import { useSearchField } from '@react-aria/searchfield';
import { useSearchFieldState } from '@react-stately/searchfield';
import InputMessage from '../InputMessage';
import { useFocusState } from '../../hooks/useFocusState';

import Icon from '../Icon';

/**
 *  Search input
 */
const SearchInput: FC<Props> = (props: Props) => {
  const { className, id, style, searching, clearButtonAriaLabel, label, isDisabled } = props;
  const state = useSearchFieldState(props);
  const ref = useRef(null);
  const { focusProps, focus } = useFocusState(props);

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
      {label && (
        <label htmlFor={labelProps.htmlFor} {...labelProps}>
          {label}
        </label>
      )}
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
