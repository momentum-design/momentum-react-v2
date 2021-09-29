/* eslint-disable @typescript-eslint/ban-types */

import React, { ReactElement, useContext } from 'react';

import { STYLE } from './MenuItem.constants';
import { Props } from './MenuItem.types';
import './MenuItem.style.scss';
import ListItemBase from '../ListItemBase';
import { useMenuItem } from '@react-aria/menu';
import ListItemBaseSection from '../ListItemBaseSection';
import Icon from '../Icon';
import { MenuContext } from '../Menu';

const MenuItem = <T extends object>(props: Props<T>): ReactElement => {
  const { item, state, onAction } = props;

  const ref = React.useRef();
  const isDisabled = state.disabledKeys.has(item.key);
  const isSelected = state.selectionManager.selectedKeys.has(item.key);

  const { onClose, closeOnSelect } = useContext(MenuContext);

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

  return (
    <ListItemBase className={STYLE.wrapper} {...menuItemProps} ref={ref} isDisabled={isDisabled}>
      <ListItemBaseSection position="fill">{item.rendered}</ListItemBaseSection>
      {isSelected && (
        <ListItemBaseSection position="end">
          <Icon
            className={STYLE.tickIcon}
            name="check"
            weight="bold"
            scale={16}
            strokeColor="none"
          />
        </ListItemBaseSection>
      )}
    </ListItemBase>
  );
};

/**
 * Should not be exported as part of the library. Used in implementation of Menu component.
 * @internal
 */

export default MenuItem;
