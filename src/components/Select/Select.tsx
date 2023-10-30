import React, {
  ReactElement,
  useCallback,
  RefObject,
  useRef,
  forwardRef,
  useState,
  useEffect,
} from 'react';
import classnames from 'classnames';

import './Select.style.scss';
import { Props } from './Select.types';
import { DEFAULTS, STYLE } from './Select.constants';
import { useSelectState } from '@react-stately/select';
import { useButton } from '@react-aria/button';
import { FocusScope } from '@react-aria/focus';
import { useKeyboard } from '@react-aria/interactions';
import { HiddenSelect, useSelect } from '@react-aria/select';
import Icon from '../Icon';
import ListBoxBase from '../ListBoxBase';
import Popover, { PopoverInstance } from '../Popover';
import Text from '../Text';

// eslint-disable-next-line @typescript-eslint/ban-types
function Select<T extends object>(props: Props<T>, ref: RefObject<HTMLDivElement>): ReactElement {
  const {
    className,
    style,
    id,
    isDisabled,
    label,
    name,
    placeholder,
    direction = DEFAULTS.DIRECTION,
    title,
    showBorder = DEFAULTS.SHOULD_SHOW_BORDER,
    listboxMaxHeight,
    isInForm = DEFAULTS.IS_IN_FORM,
  } = props;
  const [popoverInstance, setPopoverInstance] = useState<PopoverInstance>();
  const hasBeenOpened = useRef<boolean>(false);

  const selectRef = useRef<HTMLButtonElement>(null);
  const boxRef = useRef<HTMLUListElement>(null);

  const state = useSelectState(props);
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(props, state, selectRef);
  const { buttonProps } = useButton({ ...triggerProps, isDisabled }, selectRef);
  delete buttonProps.color;
  delete buttonProps.onKeyDown;

  const getArrowIcon = (isOpen: boolean) => (isOpen ? 'arrow-up' : 'arrow-down');

  const handleFocusBackOnTrigger = useCallback(() => {
    selectRef.current?.focus();
  }, []);

  useEffect(() => {
    if (popoverInstance) {
      if (state.isOpen) {
        // show popover once state changes to isOpen = true
        popoverInstance.show();
        hasBeenOpened.current = true;
      } else {
        // hide popover once state changes to isOpen = false
        popoverInstance.hide();
        if (hasBeenOpened.current) {
          // only do this if it has been opened previously to prevent unexpected focus
          handleFocusBackOnTrigger();
        }
      }
    }
  }, [state.isOpen, popoverInstance]);

  /**
   * Handle closeOnSelect from @react-aria manually
   */
  const closePopover = useCallback(() => {
    state.close();
  }, []);

  /**
   * Handle onKeyDown from @react-aria manually
   */
  const onKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
      case 'ArrowUp':
        e.preventDefault();
        state.open();
        break;
    }
  }, []);

  const triggerComponent = (
    <button
      id={name}
      {...buttonProps}
      className={classnames(
        STYLE.dropdownInput,
        { [STYLE.selected]: state.selectedItem },
        { [STYLE.open]: state.isOpen },
        { [STYLE.borderLess]: !showBorder }
      )}
      title={title}
      onKeyDown={onKeyDown}
    >
      <span
        title={state.selectedItem?.textValue}
        {...valueProps}
        className={STYLE.selectedItemWrapper}
      >
        {state.selectedItem ? state.selectedItem.rendered : placeholder}
      </span>
      <span aria-hidden="true" className={STYLE.iconWrapper}>
        <Icon name={getArrowIcon(state.isOpen)} weight="bold" scale={16} />
      </span>
    </button>
  );

  const { keyboardProps } = useKeyboard({
    onKeyDown: (event) => {
      if (event.key === 'Escape') {
        closePopover();
      }
    },
  });

  // delete color prop which is passed down and used in the ModalContainer
  // because it conflicts with the HTML color property
  delete keyboardProps.color;

  return (
    <div className={classnames(className, STYLE.wrapper)} ref={ref} style={style} id={id}>
      {label && (
        <label htmlFor={name} {...labelProps}>
          <Text>{label}</Text>
        </label>
      )}
      {isInForm && (
        <HiddenSelect
          isDisabled={isDisabled}
          state={state}
          triggerRef={selectRef}
          label={label}
          name={name}
        />
      )}
      <Popover
        interactive
        showArrow={false}
        triggerComponent={React.cloneElement(triggerComponent, {
          ref: selectRef,
        })}
        trigger="manual"
        setInstance={setPopoverInstance}
        placement={direction}
        onClickOutside={closePopover}
        onHide={closePopover}
        hideOnEsc={false}
        {...(keyboardProps as Omit<React.HTMLAttributes<HTMLElement>, 'color'>)}
        style={{ maxHeight: listboxMaxHeight || 'none' }}
        className={STYLE.popover}
      >
        <FocusScope contain>
          <ListBoxBase
            {...menuProps}
            ref={boxRef}
            state={state}
            disallowEmptySelection
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={state.focusStrategy || DEFAULTS.FOCUS_STRATEGY}
            className={STYLE.menuListBox}
          />
        </FocusScope>
      </Popover>
    </div>
  );
}

/**
 * Dropdown / Select Element which displays a listbox with options.
 */

const _Select = forwardRef(Select);

_Select.displayName = 'Select';

export default _Select as <T>(
  props: Props<T> & { ref?: RefObject<HTMLDivElement> }
) => ReactElement;
