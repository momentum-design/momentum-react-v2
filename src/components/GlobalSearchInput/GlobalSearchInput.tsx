/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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
  const { className, id, style, searching, onChange, onKeyDown, numHighlighted } = props;
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
  const { inputProps, clearButtonProps } = useSearchField(props, state, ref);

  const additionalClasses = [];
  if (focus) {
    additionalClasses.push('search-input-focus');
  }

  const handleClick = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    const { keyCode } = e;
    if (keyCode === 8) {
      if (e.target.value.length < numHighlighted + 1) {
        onChange('');
      }
    } else if (keyCode === 37) {
      if (e.target.selectionStart < numHighlighted + 1) {
        e.preventDefault();
      }
    } else {
      if (onKeyDown) {
        onKeyDown(e);
      }
      inputProps.onKeyDown(e);
    }
  };

  return (
    <div
      className={classnames(className, STYLE.wrapper, ...additionalClasses)}
      id={id}
      onClick={handleClick}
    >
      <Icon
        weight="light"
        scale={18}
        className="search-icon"
        name={searching ? 'spinner' : 'search'}
      />
      <div className="input-container">
        <input
          className="real-input"
          style={style}
          {...inputProps}
          {...focusProps}
          ref={ref}
          onKeyDown={handleKeyDown}
        />
        {state.value && !!numHighlighted && (
          <div className="search-context-container">
            <p aria-hidden="true">{state.value.slice(0, numHighlighted)}</p>
          </div>
        )}
      </div>
      {state.value && (
        <ButtonSimple className="clear-icon" {...clearButtonProps}>
          <Icon scale={18} name="cancel" />
        </ButtonSimple>
      )}
    </div>
  );
};

export default GlobalSearchInput;
