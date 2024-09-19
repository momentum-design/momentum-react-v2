/* eslint-disable @typescript-eslint/ban-types */

import React, { ReactElement } from 'react';

import { STYLE } from './MenuItem.constants';
import { Props } from './MenuItem.types';
import './MenuItem.style.scss';
import ListItemBase from '../ListItemBase';
import { useMenuItem } from '@react-aria/menu';
import ListItemBaseSection from '../ListItemBaseSection';
import Icon from '../Icon';
import classNames from 'classnames';
import { useMenuContext, useMenuAppearanceContext } from '../Menu/Menu';

const MenuItem = <T extends object>(props: Props<T>): ReactElement => {
  const {
    item,
    state,
    onAction,
    tickPosition,
    classNameSelectedItem,
    itemSize: groupItemSize,
  } = props;

  const ref = React.useRef();
  const isDisabled = state.disabledKeys.has(item.key);
  const isSelected = state.selectionManager.selectedKeys.has(item.key);

  const { onClose, closeOnSelect } = useMenuContext();
  const {
    itemShape,
    itemSize,
    tickPosition: itemTickPosition,
    classNameSelectedItem: itemclassNameSelectedItem,
  } = useMenuAppearanceContext({ tickPosition, classNameSelectedItem, itemSize: groupItemSize });

  const { menuItemProps } = useMenuItem(
    {
      isSelected,
      key: item.key,
      isDisabled,
      onClose,
      closeOnSelect,
      onAction,
      'aria-label': item['aria-label'],
    },
    state,
    ref
  );

  // I think there is a bug in aria, where useMenuItem has default behavior to hover items on hover
  // so deleting these event listeners
  delete menuItemProps.onMouseEnter;
  delete menuItemProps.onMouseLeave;
  delete menuItemProps.onPointerEnter;
  delete menuItemProps.onPointerLeave;
  delete menuItemProps.onKeyDown; // we want our passed onKeyDown to be used instaed of useMenuItem aria's function

  const tickIcon = (
    <Icon className={STYLE.tickIcon} name="check" weight="bold" scale={16} strokeColor="none" />
  );

  const renderSections = () => {
    if (itemTickPosition === 'left') {
      return (
        <>
          <ListItemBaseSection position="start">
            {isSelected ? tickIcon : <div className={STYLE.tickPlaceholder} />}
          </ListItemBaseSection>
          <ListItemBaseSection position="fill" title={item?.textValue}>
            {item.rendered}
          </ListItemBaseSection>
        </>
      );
    } else if (itemTickPosition === 'right') {
      return (
        <>
          <ListItemBaseSection position="fill" title={item?.textValue}>
            {item.rendered}
          </ListItemBaseSection>
          {isSelected && <ListItemBaseSection position="end">{tickIcon}</ListItemBaseSection>}
        </>
      );
    } else {
      return (
        <>
          <ListItemBaseSection position="fill" title={item?.textValue}>
            {item.rendered}
          </ListItemBaseSection>
        </>
      );
    }
  };

  return (
    <ListItemBase
      size={itemSize}
      shape={itemShape}
      className={classNames(STYLE.wrapper, {
        [itemclassNameSelectedItem]: isSelected && itemclassNameSelectedItem,
      })}
      ref={ref}
      isDisabled={isDisabled}
      isPadded={true}
      {...menuItemProps}
    >
      {renderSections()}
    </ListItemBase>
  );
};

/**
 * Should not be exported as part of the library. Used in implementation of Menu component.
 * @internal
 */

export default MenuItem;
