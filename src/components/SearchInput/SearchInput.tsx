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
import { useProvidedRef } from '../../utils/useProvidedRef';

type RefOrCallbackRef = RefObject<HTMLInputElement> | ((instance: HTMLInputElement) => void);
/**
 *  Search input
 * @deprecated Use the equivalent from momentum.design (NPM: `@momentum-design/components/dist/react`)
 */
const SearchInput = (props: Props, providedRef: RefOrCallbackRef): ReactElement => {
  const {
    className,
    style,
    searching,
    clearButtonAriaLabel,
    label,
    'aria-label': ariaLabel,
    isDisabled,
    height = DEFAULTS.HEIGHT,
    ariaControls,
    isCombobox = DEFAULTS.ISCOMBOBOX,
    isComboboxExpanded,
    onKeyDown: providedKeydown,
    searchIconProps,
  } = props;

  // due to how the prop types are defined, both label and aria-label are valid inputs
  // as this component does not actually have a label component, we should not pass the label prop to the useSearchField hook
  const cleanedProps = {
    ...props,
    label: undefined,
    'aria-label': ariaLabel || label,
  };

  if (isCombobox && isComboboxExpanded === undefined) {
    console.warn(WARNINGS.ISCOMBOBOX_1_ISEXPANDED_0);
  }
  if (!isCombobox && !!ariaControls) {
    console.warn(WARNINGS.ISCOMBOBOX_0_CONTROLS_1);
  }
  if (!isCombobox && typeof isComboboxExpanded === 'boolean') {
    console.warn(WARNINGS.ISCOMBOBOX_0_ISEXPANDED_1);
  }

  const state = useSearchFieldState(cleanedProps);

  const inputRef = useProvidedRef<HTMLInputElement>(providedRef, null);
  const { focusProps, isFocused } = useFocusState(cleanedProps);

  const containerRef = useRef(null);

  const { inputProps: ariaInputProps, clearButtonProps } = useSearchField(
    cleanedProps,
    state,
    inputRef
  );

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
      <div>
        {searching ? (
          <LoadingSpinner
            aria-hidden
            scale={ICON_HEIGHT_MAPPING[height]}
            className={STYLE.searching}
            variant="button"
          />
        ) : (
          <Icon
            weight="bold"
            scale={ICON_HEIGHT_MAPPING[height]}
            className={STYLE.search}
            name="search"
            {...searchIconProps}
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

/**
 * @deprecated Use the equivalent from momentum.design (NPM: `@momentum-design/components/dist/react`)
 */
const _SearchInput = forwardRef(SearchInput);

_SearchInput.displayName = 'SearchInput';

export default _SearchInput;
