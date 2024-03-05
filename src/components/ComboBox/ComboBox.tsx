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
  ELEMENT
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
    error = DEFAULTS.ERROR,
    comboBoxGroups: originComboBoxGroups,
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
  const [groups, setGroups] = useState<IComboBoxGroup[]>();

  const [selectionContainerMaxHeight,setSelectionContainerMaxHeight] = useState<number>(null);
  const [selectionPosition, setSelectionPosition] = useState<{x:number,y:number}>(null);

  const wrapperProps = useMemo(()=>({
    className: classnames(className, STYLE.wrapper),
    style: { '--local-width': width, ...style },
    id,
    'data-input-have-value': inputValue !== '',
    'data-error': error,
  }),[className, width, style, id, inputValue, error]);

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


  const getElementPagePosition = (element) => {
    const position = { x: 0, y: 0 };

    while (element) {
        position.x += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        position.y += (element.offsetTop - element.scrollTop + element.clientTop);

        const style = window.getComputedStyle(element);
        if (style.transform && style.transform !== 'none') {
            const match3d = /translate3d\(\s*([^,]*),\s*([^,]*),\s*([^,]*)\)/i.exec(style.transform);
            const match2d = /translate\(\s*([^,]*),\s*([^,]*)\)/i.exec(style.transform);
            if (match3d) {
                position.x += parseFloat(match3d[1]);
                position.y += parseFloat(match3d[2]);
            } else if (match2d) {
                position.x += parseFloat(match2d[1]);
                position.y += parseFloat(match2d[2]);
            }
        }
        element = element.offsetParent;
    }
    return position;
  }

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

    const handleSelectionPosition = useCallback(()=>{
      const inputEle = inputRef?.current;
      if(inputEle){
        const {x,y} = getElementPagePosition(inputEle);
        setSelectionPosition({x,y:y+ELEMENT.INPUTHEIGTH});
      }
    },[inputRef?.current,isOpen]);

  const handleSelectionContainerMaxHeight = useCallback(()=>{
    const windowHeight = window.innerHeight;
    const {y} = getElementPagePosition(inputRef?.current)
    
    const inputDistanceFromViewportBottom = windowHeight - (y + ELEMENT.INPUTHEIGTH);
    if(inputDistanceFromViewportBottom < ELEMENT.SELECTIONCONTAINERMAXHEIGHT + 8){
      setSelectionContainerMaxHeight(inputDistanceFromViewportBottom - 8);
    } else {
      setSelectionContainerMaxHeight(ELEMENT.SELECTIONCONTAINERMAXHEIGHT);
    }

  },[inputRef?.current,isOpen]) 

  
  // event

  const handlerStopPropagation = useCallback((event)=>{
    if(event.code === 'Escape'){
      event.stopPropagation();
    }
  },[])

  const handleTriggerOutside = useCallback((event) => {
    if(isOpen){
      if (containerRef?.current && !containerRef?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }
  }
,[isOpen,containerRef?.current]);

  const handleItemFocusChange = useCallback((event) => {
      const item = event.target;
      const itemRect = item.getBoundingClientRect();
      const ulRect = menuRef.current.getBoundingClientRect();
      if (itemRect.top < ulRect.top || itemRect.bottom > ulRect.bottom) {
        item.scrollIntoView();
      }
    }
  ,[]);

  const handlePreventScroll = useCallback((event)=>{

    if(isOpen && selectionPositionRef?.current){
      if(!selectionPositionRef?.current?.contains(event.target)){
        event.preventDefault();
      }
    }
  }
  ,[isOpen,selectionPositionRef?.current])

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
      }else if(event.code === 'Tab'){
        event.preventDefault();
      }
    }
  ,[isOpen,handleFocusBackToInput]) ;

  const handleGetFocusEle = useCallback((event)=>{
    setIsFocused(containerRef?.current?.contains(event.target));
  },[containerRef?.current])

  const handleGetPreFocusEle = useCallback((event)=>{
    setIsPreFocused(containerRef?.current?.contains(event.target));
  },[containerRef?.current])
  

  // effect

  useEffect(() => {
    handleFilter();
  }, [inputValue,originComboBoxGroups]);

  useEffect(()=>{
    if(selectedKey){
      const currentItem = searchItem(selectedKey);
      if (currentItem.key) {
        setInputValue(currentItem.label);
      }
    }
  },[originComboBoxGroups,selectedKey]);

  useEffect(()=>{
    handleSelectionPosition();
    handleSelectionContainerMaxHeight();
  },[isOpen]);

  useEffect(() => {
    document.addEventListener('focusin',handleGetFocusEle);
    document.addEventListener('mousedown', handleTriggerOutside);
    window.addEventListener('mousewheel',handlePreventScroll,{ passive: false });
    containerRef?.current?.addEventListener('focusout', handleGetPreFocusEle);
    containerRef?.current?.addEventListener('keydown',handlerStopPropagation)
    menuRef?.current?.addEventListener('focusin', handleItemFocusChange);
    menuRef?.current?.addEventListener('keydown', handleMenuKeyDown);
    inputRef?.current?.addEventListener('keydown', handleInputKeyDown);

    return () => {
      document.removeEventListener('focusin',handleGetFocusEle);
      document.removeEventListener('mousedown', handleTriggerOutside);
      window.removeEventListener('mousewheel',handlePreventScroll);
      containerRef?.current?.removeEventListener('focusout', handleGetPreFocusEle);
      containerRef?.current?.removeEventListener('keydown',handlerStopPropagation)
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

  useEffect(()=>{
    if(containerRef?.current){
      if(!isFocused && isPreFocused){
        if(selectedKey){
          const currentItem = searchItem(selectedKey);
          setInputValue(currentItem.label);
        } else {
          setInputValue('');
        }
        setIsOpen(false);
      }
    }
  },[isPreFocused,isFocused,selectedKey])


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
    };
    if (!isOpen) {
      setShouldFocusItem(true);
    };
    setTimeout(()=>{
      setIsOpen(!isOpen);
    });
    if (onArrowButtonPressCallback) {
      onArrowButtonPressCallback(event);
    };
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
          <div className={STYLE.selectionPosition} ref={selectionPositionRef} style={{transform:`translate(${selectionPosition?.x}px, ${selectionPosition?.y}px)`}}>
            <div className={STYLE.selectionContainer} ref={menuRef} style={{maxHeight:`${selectionContainerMaxHeight}px`}}>
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
