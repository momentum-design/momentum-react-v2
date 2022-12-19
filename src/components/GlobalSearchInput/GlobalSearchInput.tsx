/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, useRef, useState, useEffect } from 'react';
import classnames from 'classnames';

import ButtonSimple from '../ButtonSimple';
import { STYLE } from './GlobalSearchInput.constants';
import { Props } from './GlobalSearchInput.types';
import './GlobalSearchInput.style.scss';
import { useSearchField } from '@react-aria/searchfield';
import { useSearchFieldState } from '@react-stately/searchfield';
import { difference } from 'lodash';

import Icon from '../Icon';
import { BaseEvent } from '@react-types/shared';
import { useFocusState } from '../../hooks/useFocusState';
/**
 * Global search input. Used for global search only
 */
const GlobalSearchInput: FC<Props> = (props: Props) => {
  const {
    initialLabel = '',
    className,
    id,
    style,
    searching,
    onKeyDown,
    onFiltersChange,
    filters = [],
    clearButtonAriaLabel,
    onClear,
  } = props;
  const [previousFilters, setPreviousFilters] = useState(filters);
  const { isFocused, focusProps } = useFocusState(props);

  const [ariaAlert, setAriaAlert] = useState('');
  const state = useSearchFieldState(props);
  const ref = useRef(null);

  useEffect(() => {
    const newFilters = difference(filters, previousFilters);
    if (newFilters.length) {
      setAriaAlert(newFilters[0].translations.filterAdded);
    }
    setPreviousFilters(filters);
  }, [JSON.stringify(filters)]);

  const onClearPress = () => {
    onFiltersChange([]);
    onClear();
  };

  const { inputProps, clearButtonProps, labelProps } = useSearchField(
    { ...props, placeholder: filters.length ? '' : props.placeholder, onClear: onClearPress },
    state,
    ref
  );

  const handleClick = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;
    if (key === 'Backspace') {
      if (!(target.selectionStart === 0 && target.selectionEnd === 0)) {
        return;
      }
      const filterToRemove = filters[filters.length - 1];
      onFiltersChange && filters.length && onFiltersChange(filters.slice(0, filters.length - 1));
      filterToRemove && setAriaAlert(filterToRemove.translations.filterRemoved);
    } else {
      if (inputProps.onKeyDown) {
        // The `inputProps.onKeyDown()` call also bubbles to the original `onKeyDown` prop.
        inputProps.onKeyDown(e);
      } else if (onKeyDown) {
        onKeyDown(e as BaseEvent<React.KeyboardEvent<HTMLInputElement>>);
      }
    }
  };

  const buildFilters = () => {
    const filterArray = [];
    const labels = [];
    filters.forEach((filter) => {
      labels.push(filter.value ? filter.translations.nonempty : filter.translations.empty);

      filterArray.push(
        <div key={filter.term} className={STYLE.searchContext}>
          <p>{filter.translations.text}</p>
        </div>
      );
    });

    const label = labels.length ? `${labels.join(', ')}:` : initialLabel;

    return { filterArray, label };
  };

  const { label, filterArray } = buildFilters();

  return (
    <div
      className={classnames(className, STYLE.wrapper)}
      id={id}
      onClick={handleClick}
      style={style}
      data-focus={isFocused}
    >
      <label htmlFor={inputProps.id} {...labelProps}>
        {label}
      </label>
      <div>
        <Icon
          weight="light"
          scale={18}
          className={STYLE.search}
          strokeColor="var(--mds-color-theme-text-primary-normal)"
          name={searching ? 'spinner' : 'search'}
        />
      </div>
      <div className={STYLE.container}>
        {filterArray}
        <input {...inputProps} {...focusProps} ref={ref} onKeyDown={handleKeyDown} />
        {ariaAlert && (
          <div className="aria-alert" aria-live="assertive" role="alert">
            {ariaAlert}
          </div>
        )}
      </div>
      {(!!state.value || !!filters.length) && (
        <ButtonSimple
          className={STYLE.clear}
          {...clearButtonProps}
          aria-label={clearButtonAriaLabel}
        >
          <Icon scale={18} name="cancel" />
        </ButtonSimple>
      )}
    </div>
  );
};

export default GlobalSearchInput;
