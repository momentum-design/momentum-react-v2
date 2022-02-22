import React, { ReactElement, useEffect, useState } from 'react';
import classnames from 'classnames';

import { STYLE } from './ComboBox.constants';
import { Props } from './ComboBox.types';
import './ComboBox.style.scss';
import { DismissButton, useOverlay } from '@react-aria/overlays';
import { useSelectState } from '@react-stately/select';

import { useComboBoxState } from '@react-stately/combobox';
import { useComboBox } from '@react-aria/combobox';
import { useFilter } from '@react-aria/i18n';
import ButtonPill from '../ButtonPill';
import Popover from '../Popover';
import ListBoxBase from '../ListBoxBase';
import TextInput from '../TextInput';
import { FocusScope } from 'react-aria';

// eslint-disable-next-line @typescript-eslint/ban-types
function ComboBox<T extends object>(props: Props<T>): ReactElement {
  const { className, id, style, showButton = true } = props;

  // Setup filter function and state.
  const { contains } = useFilter({ sensitivity: 'base' });
  const state = useComboBoxState({ ...props, defaultFilter: contains });

  // Setup refs and get props for child elements.
  const buttonRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const listBoxRef = React.useRef(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  const { overlayProps } = useOverlay(
    {
      onClose: () => state.close(),
      shouldCloseOnBlur: true,
      isOpen: state.isOpen,
      isDismissable: true,
    },
    overlayRef
  );

  const { buttonProps, inputProps, listBoxProps } = useComboBox(
    {
      ...props,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef: overlayRef,
    },
    state
  );

  const listbox = (
    <FocusScope contain restoreFocus>
      <div ref={overlayRef} {...overlayProps} className="md-select-overlay">
        <ListBoxBase
          state={state}
          {...listBoxProps}
          ref={listBoxRef}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={state.focusStrategy || true}
        />
      </div>
    </FocusScope>
  );

  return (
    <div className={classnames(className, STYLE.wrapper)} id={id} style={style}>
      <input {...inputProps} ref={inputRef} aria-label="shut up" />
      <ButtonPill
        ref={buttonRef}
        outline
        {...buttonProps}
        style={{ display: showButton ? 'initial' : 'none' }}
      >
        ^
      </ButtonPill>
      {state.isOpen && listbox}
    </div>
  );
}

export default ComboBox;
