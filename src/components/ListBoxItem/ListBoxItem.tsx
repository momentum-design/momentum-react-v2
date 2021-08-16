/* eslint-disable @typescript-eslint/ban-types */
import React, { FC, ReactElement, useContext } from 'react';
import classnames from 'classnames';

import './ListBoxItem.style.scss';
import { Props } from './ListBoxItem.types';
import { DEFAULTS, STYLE } from './ListBoxItem.constants';
import { ListBoxContext } from '../ListBoxBase/ListBoxBase';
import { useOption } from '@react-aria/listbox';
import Icon from '../Icon';
import ListItem from '../ListItem';
import ListItemSection from '../ListItemSection';

/**
 * @internal
 */
function ListBoxItem<T>(props: Props<T>): ReactElement {
  const { item } = props;
  // Get props for the option element
  const ref = React.useRef<HTMLLIElement>(null);
  const state = useContext(ListBoxContext);

  const isDisabled = state.disabledKeys.has(item.key);
  const isSelected = state.selectionManager.isSelected(item.key);
  const { optionProps } = useOption(
    {
      key: item.key,
      isDisabled,
      'aria-label': item['aria-label'],
      isSelected,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: false,
    },
    state,
    ref
  );

  return (
    <ListItem key={item.key} ref={ref} {...optionProps} isDisabled={isDisabled}>
      <ListItemSection position="fill">{item.rendered}</ListItemSection>
      {isSelected && (
        <ListItemSection position="end">
          <Icon className={STYLE.tickIcon} name="check" weight="bold" scale={16} />
        </ListItemSection>
      )}
    </ListItem>
  );
}

/**
 * TODO: Add description of component here.
 */

export default ListBoxItem;
