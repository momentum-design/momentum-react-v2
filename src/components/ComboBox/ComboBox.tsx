import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Item } from '@react-stately/collections';
import TextInput from '../TextInput';
import Icon from '../Icon';
import ButtonPill from '../ButtonPill';
import Menu from '../Menu';
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
    inputRef:inputRefProp,
    className,
    id,
    style,
    label,
    description,
    children,
  } = props;

  const componentInputRef = useRef<HTMLInputElement>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = inputRefProp || componentInputRef ;
  const selectionPositionRef = useRef<HTMLInputElement>(null);

  const [isInit, setIsInit] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFocused,setIsFocused] = useState<boolean>(false);
  const [isPreFocused,setIsPreFocused] = useState<boolean>(false);
  const [shouldFocusItem, setShouldFocusItem] = useState<boolean>(false);
  const [selectionContainerMaxHeight,setSelectionContainerMaxHeight] = useState<number>();
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedKey, setSelectedKey] = useState<string>(selectedKeyPayload);
  const [groups, setGroups] = useState<IComboBoxGroup[]>(originComboBoxGroups);

  const isInputFocused = useRef<boolean>(false);

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
    ,[]);

  const handleFocusBackToInput = useCallback(
    ()=>{
      inputRef?.current?.focus();
    },[inputRef.current]);

  const handleFilter = useCallback(
    (currentInputValue = '') => {
      if(currentInputValue){
        const filterGroup = handleFilterFunc(originComboBoxGroups,currentInputValue);
        setGroups(filterGroup);
      }else{
        setGroups(originComboBoxGroups);
      }
    },[originComboBoxGroups]);

  const handleItemFocus = useCallback(
    ()=>{
      const listItems: NodeListOf<any> = containerRef?.current?.querySelectorAll('li[role="menuitemradio"][aria-disabled="false"]');
      if (listItems?.length) {
        const selectedItem = Array.from(listItems).find(item => item?.ariaChecked === 'true');
        if (selectedItem) {
          // prioritize focusing on the selected item.
          selectedItem.focus();
        } else {
          listItems[0].focus();
        }
      }
      setShouldFocusItem(false);
    },[containerRef.current]);

  // Used to prevent the bottom of the list from exceeding the window boundary.
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
    },[inputRef.current]);

  // Since the positioning of the list uses ‘fix’, it is necessary to calculate the height of all scroll bars of the list’s ancestor elements, 
  // and then set the translate to prevent the positioning of the list from being affected by the scroll bars of the ancestor elements.
  const handleSelectionTranslate = useCallback(
    ()=>{
      if (isOpen && inputRef?.current && selectionPositionRef.current) {
        const scrollTop = getSumScrollTopFunc(inputRef.current);
        selectionPositionRef.current.style.transform = `translateY(${-scrollTop}px)`;
      }
    },[inputRef.current,isOpen]);

  
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
    },[containerRef.current,isOpen]);

  const handleItemFocusChange = useCallback(
    (event) => {
        const item = event.target;
        const itemRect = item.getBoundingClientRect();
        const ulRect = menuRef?.current?.getBoundingClientRect();
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
    },[selectionPositionRef.current,isOpen]);

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
    },[handleFocusBackToInput]) ;

  const handleGetFocusEle = useCallback(
    (event)=>{
      setIsFocused(containerRef?.current?.contains(event.target));
    },[containerRef.current]);

  const handleGetPreFocusEle = useCallback(
    (event)=>{
      setIsPreFocused(containerRef?.current?.contains(event.target));
    },[containerRef.current]);

  const handleGetInputFocus = useCallback(
    (event)=>{
      isInputFocused.current = (inputRef?.current?.contains(event.target));
  },[inputRef.current]);

  const handleInputFocus = useCallback(
    ()=>{
      if(!isOpen){
        handleFilter(inputValue);
      }
    },[handleFilter,inputValue,isOpen]);


  // effect

  useEffect(()=>{
    if(openStateChangeCallBack){
      openStateChangeCallBack(isOpen);
    }
  },[openStateChangeCallBack,isOpen]);

  useEffect(()=>{
    if(isInit){
      // isInit is used to solve the case where the input is focused by default during initialization. 
      // Since isInputFocused is used in the logic as the basis for whether to setInputValue,
      // special handling is needed if the focus is on the input during initialization.
      if(selectedKey){
        // If ‘selected’ exists, a matching item must be found to complete the initialization.
        const currentItem = searchItem(selectedKey,originComboBoxGroups);
        if(currentItem.label){
          handleFilter(currentItem.label);
          setInputValue(currentItem.label); 
          setIsInit(false);
        }
      }else{
        setIsInit(false);
      }
    }else{
      if(isInputFocused.current){
        // If the focus is on the input, it indicates that the user may be operating the input, 
        // so here we do not want the inputValue to change spontaneously.
        handleFilter(inputValue);
      }else {
        const currentItem = searchItem(selectedKey,originComboBoxGroups);
        handleFilter(currentItem.label);
        setInputValue(currentItem.label??''); 
      }
    }
  },[originComboBoxGroups,selectedKey,inputValue,isInit,handleFilter,searchItem]);

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
    // Fix the issue where focusing on the input in certain situations does not correctly filter the expanded items
    inputRef?.current?.addEventListener('focus',handleInputFocus);
    return()=>{
      inputRef?.current?.removeEventListener('focus',handleInputFocus);
    };
  },[inputRef.current,handleInputFocus]);

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
    document.addEventListener('focusin',handleGetInputFocus);
    return()=>{
      document.removeEventListener('focusin',handleGetInputFocus);
    };
  },[handleGetInputFocus]);

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
  }, [inputRef?.current,handleInputKeyDown]);

  useEffect(()=>{
    if(shouldFocusItem && isOpen) {
      handleItemFocus();
    }
  },[shouldFocusItem,isOpen,handleItemFocus]);

  // Used to handle the logic of inputValue when the focus switches from inside the component to outside.
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
  },[containerRef.current,isPreFocused,isFocused,selectedKey,originComboBoxGroups,searchItem,handleFilter]);


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
    },[originComboBoxGroups,handleFocusBackToInput,onSelectionChangeCallback,searchItem,handleFilter]);

  const onArrowButtonPress = useCallback(
    (event)=>{
      if(!isOpen){
        setShouldFocusItem(true);
        if(!shouldFilterOnArrowButton){
            handleFilter();
        }else{
          handleFilter(inputValue);
        }
      }
      if(onArrowButtonPressCallback){
        onArrowButtonPressCallback(event);
      }
      setIsOpen(!isOpen);
    },[isOpen,inputValue,shouldFilterOnArrowButton,handleFilter,onArrowButtonPressCallback]);


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
