import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Item } from '@react-stately/collections';
import TextInput from '../TextInput';
import Menu from '../Menu';
import Icon from '../Icon';
import ButtonPill from '../ButtonPill';

import {
  KEYS,
  STYLE,
  DEFAULTS,
  ELEMENT,
  EVENT,
} from './ComboBox.constants';
import { Props, IComboBoxItem, IComboBoxGroup } from './ComboBox.types';

import classnames from 'classnames';
import './ComboBox.style.scss';

import { handleFilter as handleFilterFunc, searchItem as searchItemFunc, getSumScrollTop as getSumScrollTopFunc } from './ComboBox.utils';

const ComboBox: React.FC<Props> = (props: Props) => {

  const {
    onArrowButtonPress: onArrowButtonPressCallback,
    onInputChange: onInputChangeCallback,
    onSelectionChange: onSelectionChangeCallback,
    openStateChange: openStateChangeCallBack,
    comboBoxGroups: originComboBoxGroups,
    selectedKey: selectedKeyPayload = DEFAULTS.SELECTEDKEY,
    disabledKeys: disabledKeysPayload = DEFAULTS.DISABLEDKEYS,
    noResultText = DEFAULTS.NO_RESULT_TEXT,
    width = DEFAULTS.WIDTH,
    placeholder = DEFAULTS.PLACEHOLDER,
    shouldFilterOnArrowButton = DEFAULTS.SHOULDFILTERONARROWBUTTON,
    error = DEFAULTS.ERROR,
    className,
    id,
    style,
    label,
    description,
    children,
  } = props;

  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectionPositionRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFocused,setIsFocused] = useState<boolean>(false);
  const [isPreFocused,setIsPreFocused] = useState<boolean>(false);
  const [shouldFocusItem, setShouldFocusItem] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<string>(selectedKeyPayload);
  const [groups, setGroups] = useState<IComboBoxGroup[]>(originComboBoxGroups);

  const [selectionContainerMaxHeight,setSelectionContainerMaxHeight] = useState<number>(null);

  const wrapperProps = useMemo(()=>({
    className: classnames(className, STYLE.wrapper),
    style: { '--local-width': width, ...style },
    id,
    'data-input-have-value': !!inputValue,
    'data-error': error,
  }),[className, width, style, id, inputValue, error]);

  const disabledKeys = [KEYS.INPUT_SEARCH_NO_RESULT, ...disabledKeysPayload];


  // utils

  const searchItem: (key: string,groups:IComboBoxGroup[]) => IComboBoxItem | undefined = useCallback(
    (key,groups) => searchItemFunc(key,groups)
    ,[searchItemFunc]);

  const handleFocusBackToInput = useCallback(
    ()=>{
      inputRef.current?.focus();
    },[inputRef.current]);

  const handleFilter = useCallback(
    (currentInputValue = '') => {
      if(currentInputValue){
        const filterGroup = handleFilterFunc(originComboBoxGroups,currentInputValue);
        setGroups(filterGroup);
      }else{
        setGroups(originComboBoxGroups);
      }
    },[originComboBoxGroups,handleFilterFunc]);

  const handleItemFocus = useCallback(
    ()=>{
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
    },[containerRef.current]);

  const handleSelectionContainerMaxHeight = useCallback(
    ()=>{
      const windowHeight = window.innerHeight;
      const {bottom} = inputRef?.current?.getBoundingClientRect();
      
      const inputDistanceFromViewportBottom = windowHeight - bottom;
      if(inputDistanceFromViewportBottom < ELEMENT.PROPS.SELECTIONCONTAINERMAXHEIGHT + 8){
        setSelectionContainerMaxHeight(inputDistanceFromViewportBottom - 8);
      } else {
        setSelectionContainerMaxHeight(ELEMENT.PROPS.SELECTIONCONTAINERMAXHEIGHT);
      }
    },[inputRef.current,isOpen]);

  const handleSelectionTranslate = useCallback(
    ()=>{
      if (isOpen && inputRef.current && selectionPositionRef.current) {
        const scrollTop = getSumScrollTopFunc(inputRef.current);
        selectionPositionRef.current.style.transform = `translateY(${-scrollTop}px)`;
      }
    },[isOpen,inputRef.current,selectionPositionRef.current,getSumScrollTopFunc]);

  
  // event

  const handlerStopPropagation = useCallback(
    (event)=>{
      if(event.code === EVENT.KEY.KEYCODE.ESCAPE){
        event.stopPropagation();
      }
    },[]);

  const handleTriggerOutside = useCallback(
    (event) => {
      if(isOpen){
        if (containerRef?.current && !containerRef?.current?.contains(event.target)) {
          setIsOpen(false);
        }
      }
    },[isOpen,containerRef.current]);

  const handleItemFocusChange = useCallback(
    (event) => {
        const item = event.target;
        const itemRect = item.getBoundingClientRect();
        const ulRect = menuRef.current.getBoundingClientRect();
        if (itemRect.top < ulRect.top || itemRect.bottom > ulRect.bottom) {
          item.scrollIntoView();
        }
      }
    ,[menuRef.current]);

  const handlePreventScroll = useCallback(
    (event)=>{
      if(isOpen && selectionPositionRef?.current){
        if(!selectionPositionRef?.current?.contains(event.target)){
          event.preventDefault();
        }
      }
    },[isOpen,selectionPositionRef.current]);

  const handleInputKeyDown = useCallback(
    (event) => {
      if (event.code === EVENT.KEY.KEYCODE.ESCAPE) {
        if (isOpen) {
          setIsOpen(false);
        } else {
          setInputValue('');
          handleFilter();
        }
      }
  
      if (!isOpen && event.code === EVENT.KEY.KEYCODE.ENTER || event.code === EVENT.KEY.KEYCODE.ARROWDOWN || event.code === EVENT.KEY.KEYCODE.ARROWUP) {
        setShouldFocusItem(true);
        setIsOpen(true);
      }
    },[isOpen,handleFilter]);

  const handleMenuKeyDown = useCallback(
    (event) => {
      if (event.code === EVENT.KEY.KEYCODE.ESCAPE) {
        setIsOpen(false);
        handleFocusBackToInput();
      }else if(event.code === EVENT.KEY.KEYCODE.TAB){
        // when the focus is on the listItem, prevent focus escape
        event.preventDefault();
      }
    },[isOpen,handleFocusBackToInput]) ;

  const handleGetFocusEle = useCallback(
    (event)=>{
      setIsFocused(containerRef?.current?.contains(event.target));
    },[containerRef.current]);

  const handleGetPreFocusEle = useCallback(
    (event)=>{
      setIsPreFocused(containerRef?.current?.contains(event.target));
    },[containerRef.current]);


  // effect

  useEffect(()=>{
    if(openStateChangeCallBack){
      openStateChangeCallBack(isOpen);
    }
  },[openStateChangeCallBack,isOpen]);

  useEffect(()=>{
    const currentItem = searchItem(selectedKey,originComboBoxGroups);
    setInputValue(currentItem.label??''); 
    handleFilter(currentItem.label);
  },[originComboBoxGroups,selectedKey,handleFilter]);

  useEffect(()=>{
    handleSelectionTranslate();
    handleSelectionContainerMaxHeight();
  },[handleSelectionTranslate,handleSelectionContainerMaxHeight]);

  useEffect(()=>{
    document.addEventListener('focusin',handleGetFocusEle);
    containerRef?.current?.addEventListener('focusout', handleGetPreFocusEle);
    return()=>{
      document.removeEventListener('focusin',handleGetFocusEle);
      containerRef?.current?.removeEventListener('focusout', handleGetPreFocusEle);
    };
  },[containerRef.current,handleGetFocusEle,handleGetPreFocusEle]);

  useEffect(()=>{
    document.addEventListener('mousedown', handleTriggerOutside);
    return()=>{
      document.removeEventListener('mousedown', handleTriggerOutside);
    };
  },[handleTriggerOutside]);

  useEffect(()=>{
    window.addEventListener('mousewheel',handlePreventScroll,{ passive: false });
    return()=>{
      window.removeEventListener('mousewheel',handlePreventScroll);
    };
  },[handlePreventScroll]);

  useEffect(()=>{
    containerRef?.current?.addEventListener('keydown',handlerStopPropagation);
    return()=>{
      containerRef?.current?.removeEventListener('keydown',handlerStopPropagation);
    };
  },[containerRef.current,handlerStopPropagation]);

  useEffect(()=>{
    menuRef?.current?.addEventListener('focusin', handleItemFocusChange);

    return()=>{
      menuRef?.current?.removeEventListener('focusin', handleItemFocusChange);
    };
  },[menuRef.current,handleItemFocusChange]);

  useEffect(()=>{
    menuRef?.current?.addEventListener('keydown', handleMenuKeyDown);

    return()=>{
      menuRef?.current?.removeEventListener('keydown', handleMenuKeyDown);
    };
  },[menuRef.current,handleMenuKeyDown]);

  useEffect(()=>{
    inputRef?.current?.addEventListener('keydown', handleInputKeyDown);
    return()=>{
      inputRef?.current?.removeEventListener('keydown', handleInputKeyDown);
    };
  }, [inputRef.current,handleInputKeyDown]);

  useEffect(()=>{
    if(shouldFocusItem && isOpen) {
      handleItemFocus();
    }
  },[shouldFocusItem,isOpen,handleItemFocus]);

  useEffect(()=>{
    if(containerRef?.current){
      if(!isFocused && isPreFocused){
        if(selectedKey){
          const currentItem = searchItem(selectedKey,originComboBoxGroups);
          setInputValue(currentItem.label);
          handleFilter(currentItem.label);
        }else{
          setInputValue('');
          handleFilter();
        }
        setIsOpen(false);
      }
    }
  },[containerRef.current,isPreFocused,isFocused,selectedKey,originComboBoxGroups,searchItem]);


  // subcomponent event

  const onInputChange = useCallback(
    (event)=>{
      const currentInputValue = event.target.value;
      if(!isOpen){
        setIsOpen(true);
      }
      setInputValue(currentInputValue);
      handleFilter(currentInputValue);
      if(onInputChangeCallback){
        onInputChangeCallback(event);
      }
    },[isOpen,onInputChangeCallback,handleFilter]);

  const onAction = useCallback(
    (key: string) => {
      setSelectedKey(key);
      const currentItem = searchItem(key,originComboBoxGroups);
      setInputValue(currentItem.label);
      handleFilter(currentItem.label);
      if(onSelectionChangeCallback){
        onSelectionChangeCallback(currentItem);
      }
      setIsOpen(false);
      handleFocusBackToInput();
    },[handleFocusBackToInput,onSelectionChangeCallback,searchItem,handleFilter]);

  const onArrowButtonPress = useCallback(
    (event)=>{
      if(!isOpen){
        setShouldFocusItem(true);
        if(!shouldFilterOnArrowButton){
            handleFilter();
        }else{
          handleFilter(inputValue);
        }
      };
      if(onArrowButtonPressCallback){
        onArrowButtonPressCallback(event);
      }
      setIsOpen(!isOpen);
    },[isOpen,inputValue,shouldFilterOnArrowButton]);


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
          <div className={STYLE.selectionPosition} ref={selectionPositionRef} >
            <div className={STYLE.selectionContainer} ref={menuRef} style={{maxHeight:`${selectionContainerMaxHeight}px`}}>
              <Menu
                selectionMode="single"
                aria-label={STYLE.selection}
                items={groups}
                onAction={onAction}
                className={STYLE.selection}
                selectedKeys={[selectedKey]}
                disabledKeys={disabledKeys}
              >
                {groups.length ? children : (<Item key={KEYS.INPUT_SEARCH_NO_RESULT}  textValue={noResultText}>
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