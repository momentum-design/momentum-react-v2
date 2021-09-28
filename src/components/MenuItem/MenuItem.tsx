/* eslint-disable @typescript-eslint/ban-types */

import React, { ReactElement, useContext } from 'react';
import classnames from 'classnames';

import { STYLE } from './MenuItem.constants';
import { Props } from './MenuItem.types';
import './MenuItem.style.scss';
import ListItemBase from '../ListItemBase';
import { useMenuItem } from '@react-aria/menu';
import ListItemBaseSection from '../ListItemBaseSection';
import Icon from '../Icon';
import { MenuContext } from '../Menu';

/**
 * @internal
 */
const MenuItem = <T extends object>(props: Props<T>): ReactElement => {
  const { className, id, style, item, state, onAction } = props;

  // Get props for the menu item element
  const ref = React.useRef();
  const isDisabled = state.disabledKeys.has(item.key);
  const isSelected = state.selectionManager.selectedKeys.has(item.key);

  const { onClose, closeOnSelect } = useContext(MenuContext);

  const { menuItemProps } = useMenuItem(
    {
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
    <ListItemBase
      className={classnames(className, STYLE.wrapper)}
      id={id}
      style={style}
      {...menuItemProps}
      ref={ref}
      isDisabled={isDisabled}
    >
      <ListItemBaseSection position="fill">{item.rendered}</ListItemBaseSection>
      {isSelected && (
        <ListItemBaseSection position="end">
          <Icon className={STYLE.tickIcon} name="check" weight="bold" scale={16} />
        </ListItemBaseSection>
      )}
    </ListItemBase>
  );
};

export default MenuItem;
