/* eslint-disable @typescript-eslint/ban-types */

import React, { ReactElement } from 'react';

import { useMenuItem } from '@react-aria/menu';

import './MenuItem.style.scss';

import Icon from 'components/Icon';
import ListItemBase from 'components/ListItemBase';
import ListItemBaseSection from 'components/ListItemBaseSection';
import { useMenuContext, useMenuAppearanceContext } from 'components/Menu/Menu';

import { STYLE } from './MenuItem.constants';
import { Props } from './MenuItem.types';

const MenuItem = <T extends object>(props: Props<T>): ReactElement => {
  const { item, state, onAction } = props;

  const ref = React.useRef();
  const isDisabled = state.disabledKeys.has(item.key);
  const isSelected = state.selectionManager.selectedKeys.has(item.key);

  const { onClose, closeOnSelect } = useMenuContext();
  const { itemShape, itemSize, isTickOnLeftSide } = useMenuAppearanceContext();

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

  const tickIcon = (
    <Icon className={STYLE.tickIcon} name="check" weight="bold" scale={16} strokeColor="none" />
  );

  const renderSections = () => {
    if (isTickOnLeftSide) {
      return (
        <>
          <ListItemBaseSection position="start">
            {isSelected ? tickIcon : <div className={STYLE.tickPlaceholder} />}
          </ListItemBaseSection>
          <ListItemBaseSection position="fill">{item.rendered}</ListItemBaseSection>
        </>
      );
    } else {
      return (
        <>
          <ListItemBaseSection position="fill">{item.rendered}</ListItemBaseSection>
          {isSelected && <ListItemBaseSection position="end">{tickIcon}</ListItemBaseSection>}
        </>
      );
    }
  };

  return (
    <ListItemBase
      size={itemSize}
      shape={itemShape}
      className={STYLE.wrapper}
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
