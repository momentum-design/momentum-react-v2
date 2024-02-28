import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Item } from '@react-stately/collections';
import TextInput from '../TextInput';
import Menu from '../Menu';
import Icon from '../Icon';
import ButtonPill from '../ButtonPill';

import {
  KEYS,
  STYLE,
  DEFAULTS,
} from './ComboBox.constants';
import { Props, IComboBoxItem, IComboBoxGroup } from './ComboBox.types';

import classnames from 'classnames';
import './ComboBox.style.scss';

import { handleFilter as handleFilterFunc, searchItem as searchItemFunc } from './ComboBox.utils';

const ComboBox: React.FC<Props> = (props: Props) => {

  const {
    onArrowButtonPress: onArrowButtonPressCallback,
    onInputChange: onInputChangeCallback,
    onSelectionChange: onSelectionChangeCallback,
    selectedKey: selectedKeyPayload = DEFAULTS.SELECTEDKEY,
    disabledKeys: disabledKeysPayload = DEFAULTS.DISABLEDKEYS,
    noResultText = DEFAULTS.NO_RESULT_TEXT,
    width = DEFAULTS.WIDTH,
    placeholder = DEFAULTS.PLACEHOLDER,
    shouldFilterOnArrowButton = DEFAULTS.SHOULDFILTERONARROWBUTTON,
    error = DEFAULTS.ERRPR,
    comboBoxGroups: originComboBoxGroups,
    className,
    id,
    style,
    label,
    description,
    children,
  } = props;

  const menuRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [shouldFocusItem, setShouldFocusItem] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedKey, setSelectedKey] = useState<string>(selectedKeyPayload);
  const [groups, setGroups] = useState<IComboBoxGroup[]>(originComboBoxGroups);

  const wrapperProps = {
    className: classnames(className, STYLE.wrapper),
    style: { '--local-width': width, ...style },
    id,
    'data-input-have-value': inputValue !== '',
    'data-error': error,
  };

  const disabledKeys = [KEYS.INPUT_SEARCH_NO_RESULT, ...disabledKeysPayload];


  // utils

  const handleFocusBackToInput = useCallback(
    () => {
      inputRef.current?.focus();
    },[inputRef?.current]);

  const searchItem: (key: string) => IComboBoxItem | undefined = useCallback(
    (key: string) => searchItemFunc(key,originComboBoxGroups)
    ,[originComboBoxGroups]);

  const handleFilter = useCallback(
    () => {
      const filterGroup = handleFilterFunc(originComboBoxGroups,inputValue);
      setGroups(filterGroup);
    },[originComboBoxGroups,inputValue]);

  const handleItemFocus = useCallback(
    () => {
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
    },[containerRef?.current]);


  // event

  const handleClickOutside = useCallback(
    (event) => {
      if (containerRef?.current && !containerRef?.current?.contains(event.target)) {
        if(isOpen){
          setIsOpen(false);
        }
      }
    }
  ,[isOpen,containerRef?.current]) ;

  const handleItemFocusChange = useCallback(
    (event) => {
      const item = event.target;
      const itemRect = item.getBoundingClientRect();
      const ulRect = menuRef.current.getBoundingClientRect();
      if (itemRect.top < ulRect.top || itemRect.bottom > ulRect.bottom) {
        item.scrollIntoView();
      }
    }
  ,[]);

  const handleInputKeyDown = useCallback(
    (event) => {
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
    }
  ,[isOpen]);

  const handleMenuKeyDown = useCallback(
    (event) => {
      if (event.code === 'Escape') {
        if (isOpen) {
          setIsOpen(false);
          handleFocusBackToInput();
        }
      }
    }
  ,[isOpen,handleFocusBackToInput]) ;

  
  // effect

  useEffect(() => {
    handleFilter();
  }, [inputValue]);

  useEffect(()=>{
    if(selectedKey){
      const currentItem = searchItem(selectedKey);
      if (currentItem.key) {
        setInputValue(currentItem.label);
      }
    }
  },[originComboBoxGroups,selectedKey]);


  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    menuRef?.current?.addEventListener('focusin', handleItemFocusChange);
    menuRef?.current?.addEventListener('keydown', handleMenuKeyDown);
    inputRef?.current?.addEventListener('keydown', handleInputKeyDown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      menuRef?.current?.removeEventListener('focusin', handleItemFocusChange);
      menuRef?.current?.removeEventListener('keydown', handleMenuKeyDown);
      inputRef?.current?.removeEventListener('keydown', handleInputKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (shouldFocusItem && isOpen) {
      handleItemFocus();
    }
  }, [shouldFocusItem,isOpen]);


  // subcomponent event

  const onInputChange = useCallback(
    (event) => {
      const currentInputValue = event.target.value;
      if (!isOpen) {
        setIsOpen(true);
      }
      setInputValue(currentInputValue);
      if (onInputChangeCallback) {
        onInputChangeCallback(event);
      }
    }
  ,[isOpen,onInputChangeCallback]);

  const onSelectionChange = useCallback(
    (event) => {
      const { currentKey } = event;
      const currentItem = searchItem(currentKey);
      console.log('onSelectionChange -------',currentItem,currentKey);
      setIsOpen(false);
      if (onSelectionChangeCallback) {
        onSelectionChangeCallback(currentItem);
      }
    }
  ,[onSelectionChangeCallback]);

  const onAction = useCallback(
    (key: string) => {
      setSelectedKey(key);
      handleFocusBackToInput();
    }
  ,[handleFocusBackToInput]);

  const onArrowButtonPress = useCallback((event) => {
    if(!shouldFilterOnArrowButton){
      setGroups(originComboBoxGroups);
    }
    if (!isOpen) {
      setShouldFocusItem(true);
    }
    setTimeout(()=>{
      setIsOpen(!isOpen);
    },0);
    if (onArrowButtonPressCallback) {
      onArrowButtonPressCallback(event);
    }
  },[isOpen,onArrowButtonPressCallback,shouldFilterOnArrowButton,originComboBoxGroups]);

  return (
    <>
      {label ? (<div className={STYLE.label}>{label}</div>) : null}
      <div {...wrapperProps} ref={containerRef}>
        <div className={STYLE.inputSection}>
          <TextInput
            aria-label={STYLE.input}
            placeholder={placeholder}
            value={inputValue}
            className={STYLE.input}
            onInput={onInputChange}
            autoComplete="off"
            ref={inputRef}
          />
          <div className={STYLE.divider} />
          <ButtonPill ghost onPress={onArrowButtonPress} className={STYLE.button}>
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
                items={groups}
                onAction={onAction}
                className={STYLE.selection}
                selectedKeys={[selectedKey]}
                onSelectionChange={onSelectionChange}
                disabledKeys={disabledKeys}
              >
                {groups.length ? children : (<Item key={KEYS.INPUT_SEARCH_NO_RESULT} textValue={noResultText}>
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

export default ComboBox;
