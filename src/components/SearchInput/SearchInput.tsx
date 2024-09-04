/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement, useRef, RefObject, forwardRef, useImperativeHandle } from 'react';
import classnames from 'classnames';

import ButtonSimple from '../ButtonSimple';
import {
  STYLE,
  DEFAULTS,
  ICON_HEIGHT_MAPPING,
  ARIA_ROLES,
  WARNINGS,
} from './SearchInput.constants';
import { Props, SearchInputRefObject } from './SearchInput.types';
import './SearchInput.style.scss';
import { useSearchField } from '@react-aria/searchfield';
import { useSearchFieldState } from '@react-stately/searchfield';
import InputMessage from '../InputMessage';
import { useFocusState } from '../../hooks/useFocusState';

import Icon from '../Icon';
import LoadingSpinner from '../LoadingSpinner';
import { useProvidedRef } from '../../utils/useProvidedRef';


/**
 *  Search input
 */
const SearchInput = (props: Props, ref: RefObject<SearchInputRefObject>): ReactElement => {
  const {
    className,
    style,
    searching,
    clearButtonAriaLabel,
    label,
    isDisabled,
    height = DEFAULTS.HEIGHT,
    ariaControls,
    isCombobox = DEFAULTS.ISCOMBOBOX,
    isComboboxExpanded,
    onKeyDown: providedKeydown,
  } = props;

  if (isCombobox && isComboboxExpanded === undefined) {
    console.warn(WARNINGS.ISCOMBOBOX_1_ISEXPANDED_0);
  }
  if (!isCombobox && !!ariaControls) {
    console.warn(WARNINGS.ISCOMBOBOX_0_CONTROLS_1);
  }
  if (!isCombobox && typeof isComboboxExpanded === 'boolean') {
    console.warn(WARNINGS.ISCOMBOBOX_0_ISEXPANDED_1);
  }

  const state = useSearchFieldState(props);

  const inputRef = useProvidedRef<HTMLInputElement>(ref?.current?.inputRef, null);
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
    if ((e.key === 'Escape' && !state.value) || (e.key === 'Enter' && state.value)) {
      containerRef.current.dispatchEvent(new KeyboardEvent('keydown', e));
    }

    onKeyDown(e);
    providedKeydown && providedKeydown(e);
  };

    // Expose imperative methods
    useImperativeHandle(ref, () => ({
      inputRef,
      containerRef
    }));

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
      aria-controls={ariaControls}
      aria-expanded={isComboboxExpanded}
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
