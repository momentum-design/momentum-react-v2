import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Input } from '@momentum-ui/react-collaboration';
import { Item } from '@react-stately/collections';
import Menu from '../Menu';
import Icon from '../Icon';
import ButtonPill from '../ButtonPill';

import {
  KEYS,
  STYLE,
  DEFAULTS,
} from './Combobox.constants';
import { IComboboxGroup, Props, IComboboxItem } from './Combobox.types';

import classnames from 'classnames';
import './Combobox.style.scss';

const Combobox: React.FC<Props> = (props: Props) => {

  const {
    onAction: onActionCallback,
    onPress: onPressCallback,
    onInputChange: onInputChangeCallback,
    onSelectionChange: onSelectionChangeCallback,
    selectedKey: selectedKeyPayload = DEFAULTS.SELECTEDKEY,
    disabledKeys: disabledKeysPayload = DEFAULTS.DISABLEDKEYS,
    noResultText = DEFAULTS.NO_RESULT_TEXT,
    width = DEFAULTS.WIDTH,
    placeholder = DEFAULTS.PLACEHOLDER,
    items: itemsPayload,
    className,
    id,
    style,
    label,
    description,
    children,
  } = props;

  const menuRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [shouldFocusItem, setShouldFocusItem] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedKey, setselectedKey] = useState('');
  const [items, setItems] = useState(itemsPayload);

  const wrapperProps = {
    className: classnames(className, STYLE.wrapper),
    style: { '--local-width': width, ...style },
    id,
  };

  const disabledKeys = [KEYS.INPUT_SEARCH_NO_RESULT, ...disabledKeysPayload];


  // utils

  const setInputRef = (ref: HTMLTextAreaElement) => {
    inputRef.current = ref;
  };

  const handleFocusBackToInput = () => {
    inputRef.current?.focus();
  };

  const isDescendant = (parent: Element, child: EventTarget) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < parent.children.length; i++) {
      if (parent.children[i] === child || isDescendant(parent.children[i], child)) {
        return true;
      }
    }
    return false;
  };

  const searchItem: (key: string) => IComboboxItem | undefined = useCallback(
    (key: string) => {
      let target;
      itemsPayload.some((group: IComboboxGroup) => {
        const foundItem = group.items.find((item: IComboboxItem) => item.key === key);
        if (foundItem) {
          target = foundItem;
          return true;
        }
        return false;
      });
      return target;
    },
    [itemsPayload]
  );

  const handleFilter = () => {
    const queryLowerCase = inputValue.toLowerCase().trim();
    const filterItem = itemsPayload
      .map((group: IComboboxGroup) => {
        return {
          ...group,
          items: group.items.filter((item: IComboboxItem) => item.label?.toLowerCase()?.includes(queryLowerCase)),
        };
      })
      .filter((group: IComboboxGroup) => group.items.length > 0);

    setItems(filterItem);
  };

  const handleItemFocus = () => {
    window.requestAnimationFrame(() => {
      const listItems: NodeListOf<any> = containerRef?.current?.querySelectorAll('li[role="menuitemradio"][aria-disabled="false"]');
      if (listItems?.length) {
        const selectedItem = Array.from(listItems).find(item => item?.ariaChecked === 'true');
        if (selectedItem) {
          // prioritize focusing on the selected item
          selectedItem.focus();
        } else {
          listItems[0].focus();
        }
      }
      setShouldFocusItem(false);
    });
  };


  // event

  const handleClickOutside = (event) => {
    if (containerRef.current && !isDescendant(containerRef.current, event.target)) {
      if (isOpen) {
        setIsOpen(false);
      }
    }
  };

  const handleItemFocusChange = (event) => {
    const item = event.target;
    const itemRect = item.getBoundingClientRect();
    const ulRect = menuRef.current.getBoundingClientRect();
    if (itemRect.top < ulRect.top || itemRect.bottom > ulRect.bottom) {
      item.scrollIntoView();
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.code === 'Escape') {
      if (isOpen) {
        setIsOpen(false);
      } else {
        setInputValue('');
      }
    }

    if ((event.code === 'Enter' && !isOpen) || event.code === 'ArrowDown' || event.code === 'ArrowUp') {
      setShouldFocusItem(true);
      if(!isOpen){
        setIsOpen(true);
      }
    }
  };


  // effect

  useEffect(() => {

    document.addEventListener('click', handleClickOutside);
    menuRef?.current?.addEventListener('focusin', handleItemFocusChange);
    inputRef?.current?.addEventListener('keydown', handleInputKeyDown);

    if (!isOpen) {
      handleFocusBackToInput();
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      menuRef?.current?.removeEventListener('focusin', handleItemFocusChange);
      inputRef?.current?.removeEventListener('keydown', handleInputKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    handleFilter();
  }, [inputValue]);

  useEffect(() => {
    if (shouldFocusItem) {
      handleItemFocus();
    }
  }, [shouldFocusItem]);

  useEffect(() => {
    if (selectedKeyPayload) {
      const defaultItem = searchItem(selectedKeyPayload);
      if (defaultItem) {
        setselectedKey(selectedKeyPayload);
        setInputValue(defaultItem.label);
      }
    }
  }, []);

  
  // subcomponent event

  const onInputChange = (event) => {
    const currentInputValue = event.target.value;

    if (!isOpen) {
      setIsOpen(true);
    }
    setInputValue(currentInputValue);
    if (onInputChangeCallback) {
      onInputChangeCallback(event);
    }
  };

  const onSelectionChange = (event) => {
    const { currentKey } = event;
    const currentItem = searchItem(currentKey);

    setIsOpen(false);
    if (onSelectionChangeCallback) {
      onSelectionChangeCallback(currentItem!);
    }
  };

  const onAction = (key: string) => {
    const inputLable = ((searchItem(key) as unknown) as IComboboxItem).label;
    const currentItem = searchItem(key);

    setselectedKey(key);
    setInputValue(inputLable);
    if (onActionCallback) {
      onActionCallback(currentItem!);
    }
  };

  const onPress = (event) => {
    if (!isOpen) {
      setShouldFocusItem(true);
    }
    setIsOpen(!isOpen);
    if (onPressCallback) {
      onPressCallback(event);
    }
  };

  return (
    <>
      {label ? (<div className={STYLE.label}>{label}</div>) : null}
      <div {...wrapperProps} ref={containerRef}>
        <div className={STYLE.inputSection}>
          <Input
            aria-label={STYLE.input}
            placeholder={placeholder}
            className={STYLE.input}
            value={inputValue}
            onChange={onInputChange}
            autoComplete="off"
            inputRef={setInputRef}
          />
          <div className={STYLE.divider} />
          <ButtonPill ghost onPress={onPress} className={STYLE.button}>
            <Icon
              className={STYLE.arrowIcon}
              name={isOpen ? 'arrow-up' : 'arrow-down'}
              scale={12}
              weight="filled"
            />
          </ButtonPill>
        </div>
        {isOpen ? (
          <div className={STYLE.selectionPosition}>
            <div className={STYLE.selectionContainer} ref={menuRef} >
              <Menu
                selectionMode="single"
                aria-label={STYLE.selection}
                items={items}
                onAction={onAction}
                className={STYLE.selection}
                selectedKeys={[selectedKey]}
                onSelectionChange={onSelectionChange}
                disabledKeys={disabledKeys}

              >
                {items.length ? children : (<Item key={KEYS.INPUT_SEARCH_NO_RESULT} textValue={noResultText}>
                  <div aria-label={STYLE.noResultText} className={STYLE.noResultText}>{noResultText}</div>
                </Item>)}
              </Menu>
            </div>
          </div>
        ) : null}
      </div>
      {description && (<div className={STYLE.description}>{description}</div>)}
    </>
  );
};

export default Combobox;
