/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactElement, useContext } from 'react';

import './ListBoxItem.style.scss';
import { Props } from './ListBoxItem.types';
import { STYLE } from './ListBoxItem.constants';
import { ListBoxContext } from '../ListBoxBase/ListBoxBase';
import { useOption } from '@react-aria/listbox';
import Icon from '../Icon';
import ListItemBaseSection from '../ListItemBaseSection';
import ListItemBase from '../ListItemBase';
import { useKeyboard } from '@react-aria/interactions';

function ListBoxItem<T>(props: Props<T>): ReactElement {
  const { item } = props;
  const ref = React.useRef<HTMLLIElement>(null);
  const { state, shouldVirtualizeItems, shouldWrapItems, shouldItemFocusBeInset } =
    useContext(ListBoxContext);

  const isDisabled = state.disabledKeys.has(item.key);
  const isSelected = state.selectionManager.isSelected(item.key);

  /**
   * Handle keyboard navigation for any focusable elements inside list items
   * Aria is ignoring these, and jumps outside of the list. This prevents that
   */
  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      if (e.key === 'Tab') {
        const focusableElements = ref.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) {
          e.continuePropagation();
          return;
        }

        const first = focusableElements[0] as HTMLElement;
        const last = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (document.activeElement === ref.current) {
          e.preventDefault();
          e.stopPropagation();
          if (first) {
            first.focus();
          }
        } else if (document.activeElement === last) {
          if (e.shiftKey) {
            e.stopPropagation();
            e.preventDefault();
            return;
          } else {
            e.continuePropagation();
          }
        } else {
          e.stopPropagation();
        }
      } else {
        e.continuePropagation();
      }
    },
  });

  const { optionProps } = useOption(
    {
      key: item.key,
      isDisabled,
      'aria-label': item['aria-label'],
      isSelected,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: false,
      isVirtualized: shouldVirtualizeItems,
    },
    state,
    ref
  );

  if (shouldWrapItems) {
    return (
      <ListItemBase
        key={item.key}
        ref={ref}
        {...optionProps}
        isDisabled={isDisabled}
        {...keyboardProps}
        shouldItemFocusBeInset={shouldItemFocusBeInset}
      >
        <ListItemBaseSection position="fill">{item.rendered}</ListItemBaseSection>
        {isSelected && (
          <ListItemBaseSection position="end">
            <Icon className={STYLE.tickIcon} name="check" weight="bold" scale={16} />
          </ListItemBaseSection>
        )}
      </ListItemBase>
    );
  } else {
    if (React.isValidElement(item.rendered)) {
      return React.cloneElement(item.rendered as ReactElement, {
        key: item.key,
        ref,
        isDisabled,
        isSelected,
        ...optionProps,
        ...keyboardProps,
      });
    } else {
      return <>{item.rendered}</>;
    }
  }
}

/**
 * ListBoxItem component used internally as a wrapper for items inside a listbox.
 * It's using the ListItem component internally.
 * @internal
 */

export default ListBoxItem;
