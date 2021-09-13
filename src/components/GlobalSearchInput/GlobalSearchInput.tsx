/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, useRef, useState } from 'react';
import classnames from 'classnames';
import { useFocus } from '@react-aria/interactions';

import ButtonSimple from '../ButtonSimple';
import { STYLE } from './GlobalSearchInput.constants';
import { Props } from './GlobalSearchInput.types';
import './GlobalSearchInput.style.scss';
import { useSearchField } from '@react-aria/searchfield';
import { useSearchFieldState } from '@react-stately/searchfield';
import { useIntl } from 'react-intl';

import Icon from '../Icon';
import messages from './translations';
/**
 * Global search input. Used for global search only
 */
const GlobalSearchInput: FC<Props> = (props: Props) => {
  const { className, id, style, searching, onKeyDown, onFiltersChange, filters = [] } = props;
  const [focus, setFocus] = useState(false);
  const { formatMessage } = useIntl();
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
    const { key } = e;
    if (key === 'Backspace') {
      onFiltersChange &&
        filters.length &&
        !e.target.value &&
        onFiltersChange(filters.slice(0, filters.length - 1));
    } else {
      if (onKeyDown) {
        onKeyDown(e);
      }
      inputProps.onKeyDown(e);
    }
  };

  const buildFilters = () => {
    const filterArray = [];
    const labels = [];
    filters.forEach((filter, index) => {
      labels.push(
        formatMessage(messages[`${filter.term}Label${filter.value ? 'Non' : ''}Empty`], {
          value: filter.value,
        })
      );

      const removePadding = index !== filters.length - 1;
      filterArray.push(
        <div
          key={filter.term}
          className={`search-context-container ${removePadding ? 'remove-padding' : ''}`}
        >
          <p>{`${formatMessage(messages[filter.term])} ${filter.value}`}</p>
        </div>
      );
    });

    const label = labels.length ? labels.join('. ') : formatMessage(messages.placeholder);

    return { filterArray, label };
  };

  const { label, filterArray } = buildFilters();

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
      <Icon
        weight="light"
        scale={18}
        className="search-icon"
        name={searching ? 'spinner' : 'search'}
      />
      <div className="input-container">
        {!!filters.length && filterArray}
        <input {...inputProps} {...focusProps} ref={ref} onKeyDown={handleKeyDown} />
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
