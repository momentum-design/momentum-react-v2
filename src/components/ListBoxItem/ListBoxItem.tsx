/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactElement, useContext } from 'react';

import './ListBoxItem.style.scss';
import { Props } from './ListBoxItem.types';
import { STYLE } from './ListBoxItem.constants';
import { ListBoxContext } from '../ListBoxBase/ListBoxBase';
import { useOption } from '@react-aria/listbox';
import Icon from '../Icon';
import ListItem from '../ListItem';
import ListItemSection from '../ListItemSection';

function ListBoxItem<T>(props: Props<T>): ReactElement {
  const { item } = props;
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
 * ListBoxItem component used internally as a wrapper for items inside a listbox.
 * It's using the ListItem component internally.
 * @internal
 */

export default ListBoxItem;
