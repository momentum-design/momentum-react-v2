/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactElement, useContext } from 'react';

import './ListBoxItem.style.scss';
import { useOption } from '@react-aria/listbox';

import Icon from 'components/Icon';
import { ListBoxContext } from 'components/ListBoxBase/ListBoxBase';
import ListItemBase from 'components/ListItemBase';
import ListItemBaseSection from 'components/ListItemBaseSection';

import { STYLE } from './ListBoxItem.constants';
import { Props } from './ListBoxItem.types';

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
    <ListItemBase isPadded key={item.key} ref={ref} {...optionProps} isDisabled={isDisabled}>
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
}

/**
 * ListBoxItem component used internally as a wrapper for items inside a listbox.
 * It's using the ListItem component internally.
 * @internal
 */

export default ListBoxItem;
