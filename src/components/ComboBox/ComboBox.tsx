/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import { useComboBox, useFilter } from 'react-aria';

import './ComboBox.style.scss';
import { Props, IComboBoxGroup, IComboBoxItem } from './ComboBox.types';
import { STYLE, DEFAULTS, EVENT, ICON, KEYS } from './ComboBox.constants';
import { useComboBoxState } from '@react-stately/combobox';
import { useKeyboard } from '@react-aria/interactions';
import Icon from '../Icon';
import ListBoxBase from '../ListBoxBase';
import ButtonSimple from '../ButtonSimple';
import Popover, { PopoverInstance } from '../Popover';
import Text from '../Text';
import { filterItems } from './ComboBox.utils';

// eslint-disable-next-line @typescript-eslint/ban-types
function ComboBox(props: Props, ref: RefObject<HTMLInputElement>): ReactElement {
  const {
    className,
    style,
    id,
    label,
    description,
    direction,
    listboxMaxHeight,
    listboxWidth,
    noResultLabel,
    defaultItems,
  } = props;

  const { contains } = useFilter({ sensitivity: 'base' });
  const { KEY } = EVENT;

  const [filteredItems, setFilteredItems] =
    useState<Array<IComboBoxGroup | IComboBoxItem>>(defaultItems);
  const [items, setItems] = useState<Array<IComboBoxGroup | IComboBoxItem>>(null);
  const [popoverInstance, setPopoverInstance] = useState<PopoverInstance>();

  const hasBeenOpened = useRef<boolean>(false);
  const isFirstOpen = useRef<boolean>(true);
  const isOpen = useRef<boolean>(false);

  const inputRef = ref || useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);

  const addNoResults = (disabledKeys: Iterable<React.Key> = []): Iterable<React.Key> => {
    const keysSet = new Set(disabledKeys);
    keysSet.add(KEYS.NO_RESULT);
    return keysSet;
  };

  const disabledKeys = addNoResults(props.disabledKeys);

  const onInputChange = (value: string) => {
    if (props.onInputChange) {
      props.onInputChange(value);
    }

    isFirstOpen.current = false;
    const newFilteredItems = filterItems(defaultItems, value || '', contains);
    if (newFilteredItems.length === 0) {
      setFilteredItems(noResultLabel ? [{ key: KEYS.NO_RESULT, label: noResultLabel }] : []);
    } else {
      setFilteredItems(newFilteredItems);
    }
  };

  const state = useComboBoxState({
    ...props,
    disabledKeys,
    defaultItems,
    items: props.items ?? items,
    onInputChange,
  });

  const { buttonProps, inputProps, listBoxProps, labelProps } = useComboBox(
    {
      ...props,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef,
    },
    state
  );

  const { onKeyDown } = inputProps;

  inputProps.onKeyDown = (e) => {
    switch (e.key) {
      case KEY.ARROW_DOWN:
      case KEY.ARROW_UP:
        isFirstOpen.current = true;
        break;
      case KEY.TAB:
        if (state.isOpen) {
          e.preventDefault();
          e.stopPropagation();
        }
        break;
      case KEY.ESCAPE:
        if (isOpen.current) {
          state.close();
        } else {
          state.setSelectedKey(null);
        }
        break;
      default:
    }
    onKeyDown(e);
  };

  useEffect(() => {
    isFirstOpen.current = !state.isOpen;
    isOpen.current = state.isOpen;
  }, [state.isOpen]);

  useEffect(() => {
    // display all items when listBox first open
    const items = !isFirstOpen.current ? filteredItems : defaultItems;
    setItems(items);
  }, [filteredItems, defaultItems, state.inputValue]);

  const getArrowIcon = (isOpen: boolean) => (isOpen ? ICON.ARROW_UP : ICON.ARROW_DOWN);

  const handleFocusBackOnTrigger = useCallback(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  useEffect(() => {
    if (popoverInstance) {
      if (!state.isOpen) {
        setItems(defaultItems);
      }
    }
  }, [state.isOpen, popoverInstance, items]);

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
   * Handle closeOnComboBox from @react-aria manually
   */
  const closePopover = useCallback(() => {
    state.close();
  }, []);

  delete buttonProps['aria-label'];
  delete listBoxProps['aria-label'];

  if (props['aria-required']) {
    inputProps['aria-required'] = inputProps.value ? 'false' : 'true';
  }

  const triggerComponent = (
    <span ref={triggerRef} className={STYLE.trigger}>
      <input {...inputProps} className={STYLE.input} ref={inputRef} />
      <ButtonSimple
        {...buttonProps}
        className={STYLE.button}
        tabIndex={-1}
        ref={buttonRef}
        aria-controls={id}
      >
        <span aria-hidden="true">
          <Icon name={getArrowIcon(state.isOpen)} weight="bold" scale={16} />
        </span>
      </ButtonSimple>
    </span>
  );

  const { keyboardProps } = useKeyboard({
    onKeyDown: (event) => {
      if (event.key === KEY.ESCAPE) {
        closePopover();
      }
    },
  });
  // delete color prop which is passed down and used in the ModalContainer
  // because it conflicts with the HTML color property
  return (
    <div
      className={classnames(className, STYLE.wrapper)}
      /* @ts-ignore: next-line */
      style={{ '--local-width': listboxWidth || '100%', ...style }}
      id={id}
    >
      {label && (
        // eslint-disable-next-line jsx-a11y/label-has-for
        <label {...labelProps}>
          <Text>{label}</Text>
        </label>
      )}
      <Popover
        className={STYLE.popover}
        interactive
        showArrow={false}
        ref={popoverRef}
        removeTippyAriaHidden
        triggerComponent={React.cloneElement(triggerComponent, {
          ref: triggerRef,
        })}
        trigger="manual"
        setInstance={setPopoverInstance}
        placement={direction || DEFAULTS.DIRECTION}
        onClickOutside={closePopover}
        onHide={closePopover}
        hideOnEsc={false}
        disableFocusLock
        {...(keyboardProps as Omit<React.HTMLAttributes<HTMLElement>, 'color'>)}
        style={{
          maxHeight: listboxMaxHeight || 'none',
          display: state.isOpen ? undefined : 'none',
        }}
        strategy={listboxWidth ? 'fixed' : 'absolute'}
      >
        <ListBoxBase
          {...listBoxProps}
          ref={listBoxRef}
          state={state}
          className={STYLE.listBox}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={state.focusStrategy || DEFAULTS.FOCUS_STRATEGY}
        />
      </Popover>
      {description && <div className={STYLE.description}>{description}</div>}
    </div>
  );
}

/**
 * Dropdown / ComboBox Element which displays a listbox with options.
 */

const _ComboBox = forwardRef(ComboBox);

_ComboBox.displayName = 'ComboBox';

export default _ComboBox as (props: Props & { ref?: RefObject<HTMLInputElement> }) => ReactElement;
