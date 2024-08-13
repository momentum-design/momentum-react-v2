/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement, useRef, RefObject, forwardRef } from 'react';
import classnames from 'classnames';

import ButtonSimple from '../ButtonSimple';
import {
  STYLE,
  DEFAULTS,
  ICON_HEIGHT_MAPPING,
  ARIA_ROLES,
  WARNINGS,
} from './SearchInput.constants';
import { Props } from './SearchInput.types';
import './SearchInput.style.scss';
import { useSearchField } from '@react-aria/searchfield';
import { useSearchFieldState } from '@react-stately/searchfield';
import InputMessage from '../InputMessage';
import { useFocusState } from '../../hooks/useFocusState';

import Icon from '../Icon';
import LoadingSpinner from '../LoadingSpinner';

/**
 *  Search input
 */
const SearchInput = (props: Props, ref: RefObject<HTMLInputElement>): ReactElement => {
  const {
    className,
    id,
    style,
    searching,
    clearButtonAriaLabel,
    label,
    isDisabled,
    height = DEFAULTS.HEIGHT,
    controls,
    isCombobox = DEFAULTS.ISCOMBOBOX,
    isExpanded,
  } = props;

  if (isCombobox && isExpanded === undefined) {
    console.warn(WARNINGS.ISCOMBOBOX_1_ISEXPANDED_0);
  }
  if (!isCombobox && !!controls) {
    console.warn(WARNINGS.ISCOMBOBOX_0_CONTROLS_1);
  }
  if (!isCombobox && typeof isExpanded === 'boolean') {
    console.warn(WARNINGS.ISCOMBOBOX_0_ISEXPANDED_1);
  }

  const state = useSearchFieldState(props);
  const componentRef = useRef(null);
  const inputRef = ref || componentRef;
  const { focusProps, isFocused } = useFocusState(props);

  const containerRef = useRef(null);

  const {
    inputProps: ariaInputProps,
    clearButtonProps,
    labelProps,
  } = useSearchField(props, state, inputRef);

  const { onKeyDown, ...otherAriaInputProps } = ariaInputProps;

  const internalOnKeyDown = (e) => {
    // When the input is empty, pressing escape should be
    // propagated to the parent so that popovers can close
    if (e.key === 'Escape' && !state.value) {
      containerRef.current.dispatchEvent(new KeyboardEvent('keydown', e));
    }

    onKeyDown(e);
  };

  const inputProps = {
    ...otherAriaInputProps,
    onKeyDown: internalOnKeyDown,
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const inputElement = isCombobox ? (
    <input
      aria-controls={controls}
      aria-expanded={isExpanded}
      role={ARIA_ROLES.COMBOBOX}
      {...inputProps}
      {...focusProps}
      ref={inputRef}
    />
  ) : (
    <input {...inputProps} {...focusProps} ref={inputRef} />
  );

  return (
    <div
      className={classnames(className, STYLE.wrapper)}
      id={id}
      onClick={handleClick}
      style={style}
      data-disabled={isDisabled}
      data-focus={isFocused}
      data-height={height}
      ref={containerRef}
    >
      {label && (
        <label htmlFor={labelProps.htmlFor} {...labelProps}>
          {label}
        </label>
      )}
      <div>
        {searching ? (
          <LoadingSpinner scale={ICON_HEIGHT_MAPPING[height]} className={STYLE.searching} />
        ) : (
          <Icon
            weight="bold"
            scale={ICON_HEIGHT_MAPPING[height]}
            className={STYLE.search}
            name={'search'}
          />
        )}
      </div>
      <div className={STYLE.container}>{inputElement}</div>
      {!!state.value && !isDisabled && (
        <ButtonSimple
          className={STYLE.clear}
          {...clearButtonProps}
          aria-label={clearButtonAriaLabel}
          excludeFromTabOrder={false}
          useNativeKeyDown={true}
        >
          <Icon weight="bold" scale={ICON_HEIGHT_MAPPING[height]} name="cancel" />
        </ButtonSimple>
      )}
      <InputMessage />
    </div>
  );
};

const _SearchInput = forwardRef(SearchInput);

_SearchInput.displayName = 'SearchInput';

export default _SearchInput;
