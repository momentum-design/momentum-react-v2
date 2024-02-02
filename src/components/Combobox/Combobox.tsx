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
import {IComboboxGroup, Props, IComboboxItem} from './Combobox.types';

import classnames from 'classnames';
import './Combobox.style.scss';

const Combobox:React.FC<Props> = (props: Props) => {

  const {
    onAction: onActionCallback,
    onPress: onPressCallback,
    onInputChange: onInputChangeCallback,
    onSelectionChange: onSelectionChangeCallback,
    selectedKey:selectedKeyPayload = DEFAULTS.SELECTEDKEY,
    disabledKeys:disabledKeysPayload = DEFAULTS.DISABLEDKEYS,
    noResultText = DEFAULTS.NO_RESULT_TEXT,
    height = DEFAULTS.HEIGHT,
    width = DEFAULTS.WIDTH,
    iconScale = DEFAULTS.ICON_SCALE,
    error = DEFAULTS.ERROR,
    items: itemsPayload,
    placeholder = '',
    className,
    id,
    style,
    label,
    description,
    children,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedKey, setselectedKey] = useState('');
  const [items, setItems] = useState(itemsPayload);

  const wrapperProps = {
    className: classnames(className, STYLE.wrapper),
    style: {'--local-height':height,'--local-width':width,...style},
    id,
    'data-error': error,
  };
  const containerRef = useRef<HTMLDivElement | null>();

  const isDescendant = (parent: Element, child: EventTarget) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < parent.children.length; i++) {
      if (parent.children[i] === child || isDescendant(parent.children[i], child)) {
        return true;
      }
    }
    return false;
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !isDescendant(containerRef.current, event.target)) {
      if (isOpen) {
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const disabledKeys = [KEYS.INPUT_SEARCH_NO_RESULT, ...disabledKeysPayload];
  const searchItem: (key: string) => IComboboxItem | undefined = useCallback(
    (key: string) => {
      let target;

      itemsPayload.some((group: IComboboxGroup) => {
        const foundItem = group.items.find((item: IComboboxItem) => item.key === key);

        if (foundItem) {
          // eslint-disable-next-line prefer-destructuring
          target = foundItem;

          return true;
        }
        return false;
      });

      return target;
    },
    [itemsPayload]
  );

  const onSelectionChange = (event) => {
    const {currentKey} = event;
    const currentItem = searchItem(currentKey);
    setIsOpen(false);
    if (onSelectionChangeCallback) {
      onSelectionChangeCallback(currentItem!);
    }
  };

  const onInputChange = (event) => {
    if (!isOpen) {
      setIsOpen(true);
    }
    const currentInputValue = event.target.value;

    setInputValue(currentInputValue);
    if (currentInputValue) {
      const query = new RegExp(currentInputValue, 'i');

      const filterItem = itemsPayload
        .map((group: IComboboxGroup) => {
          return {
            ...group,
            items: group.items.filter((item: IComboboxItem) => query.test(item.label)),
          };
        })
        .filter((group: IComboboxGroup) => group.items.length > 0);

      setItems(filterItem);
    } else {
      setItems(itemsPayload);
    }
    if (onInputChangeCallback) {
      onInputChangeCallback(event);
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
    setIsOpen(!isOpen);
    setItems(itemsPayload);
    if (onPressCallback) {
      onPressCallback(event);
    }
  };

  useEffect(() => {
    if (selectedKeyPayload) {
      const defaultItem = searchItem(selectedKeyPayload);

      if (defaultItem) {
        setselectedKey(selectedKeyPayload);
        setInputValue(defaultItem.label);
      }
    }
  }, []);

  return (
    <div {...wrapperProps} ref={containerRef}>
      {label? (<div className={STYLE.label}>{label}</div>) : null}
      <div className={STYLE.inputSection}>
        <Input
          aria-label={STYLE.input}
          placeholder={placeholder}
          className={STYLE.input}
          value={inputValue}  
          onChange={onInputChange}
          autoComplete="off"
        />
        <div className={STYLE.divider}/>
        <ButtonPill ghost  onPress={onPress} className={STYLE.button}>
          <Icon
            className={STYLE.arrowIcon}
            name={isOpen ? 'arrow-up' : 'arrow-down'}
            scale={iconScale}
            weight="filled"
          />
        </ButtonPill>
      </div>
      {isOpen ? (
        <div className={STYLE.selectionContainer}>
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
             {items.length ? children : (  <Item key={KEYS.INPUT_SEARCH_NO_RESULT} textValue={noResultText}>
                <div  aria-label={STYLE.noResultText} className={STYLE.noResultText}>{noResultText}</div>
              </Item>)}
          </Menu>
        </div>
      ) : null}
      {description && !isOpen ? (<div className={STYLE.description}>{description}</div>) : null} 
    </div>
  );
};

export default Combobox;
