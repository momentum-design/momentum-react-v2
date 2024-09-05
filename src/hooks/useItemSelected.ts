import { useMemo, useState } from 'react';

export type SelectionMode = 'none' | 'single' | 'multiple';

export interface UseItemSelectedProps<TItemId extends string | number> {
  /**
   * Selection mode
   */
  selectionMode: SelectionMode;
  /**
   * List of items that should be selected by default
   */
  selectedByDefault?: Array<TItemId>;
  /**
   * Callback function when selection changes
   */
  onSelectionChange?: (selectedItems: Array<TItemId>) => void;
  /**
   * When it is `true`, at lest one item should be selected in other than `none` selection mode.
   * @default false
   */
  isRequired?: boolean;
}

export interface ItemSelection<TItemId extends string | number> {
  /**
   * Selection mode.
   */
  selectionMode: SelectionMode;
  /**
   * List of selected items.
   */
  selectedItems: Array<TItemId>;
  /**
   * Check if item is selected.
   * @param itemId Item identifier
   */
  isSelected: (itemId: TItemId) => boolean;
  /**
   * Toggle item selection
   *
   * Add `itemId` when `value` is `true`  and remove it when `value` is `false`,
   * if `value` is not provided, it will toggle the selection.
   *
   * When `isRequired` is `true`, it will not remove the last selected item.
   *
   * It should be used when you want to update a single item.
   *
   * @param itemId Item identifier
   * @param value
   */
  toggle: (itemId: TItemId, value?: boolean) => void;
  /**
   * Update selection with new list of selected items.
   * `isRequired` will be ignored.
   *
   * It is useful when you want to batch change the selection,
   * for example, when you want to select all items, or invert selection.
   *
   * It preferred to use this method over `toggle` when you want to update multiple items the same time.
   *
   * @param allSelectedItems List of selected items
   */
  update: (allSelectedItems: Array<TItemId>) => void;
  /**
   * Clear all selected items
   * `isRequired` will be ignored.
   */
  clear: () => void;
}

const getSelection = <T extends Array<unknown>>(mode: SelectionMode, selectedByDefault?: T): T => {
  if (mode === 'none' || !selectedByDefault) {
    console.warn(
      '"None" selection mode does not support any selection, selected items will be ignored'
    );
    return [] as T;
  }
  if (mode === 'single' && selectedByDefault.length > 1) {
    console.warn(
      '"Single" selection mode does not support multiple items, only the first item will be selected'
    );
    return [selectedByDefault[0]] as T;
  }
  return selectedByDefault;
};

/**
 * Hook to manage selected items
 */
export const useItemSelected = <TItemId extends string | number>({
  selectionMode,
  selectedByDefault,
  onSelectionChange,
  isRequired,
}: UseItemSelectedProps<TItemId>): ItemSelection<TItemId> => {
  const [selectedItems, setSelectedItems] = useState<Set<TItemId>>(
    new Set(getSelection(selectionMode, selectedByDefault))
  );

  return useMemo(
    () => ({
      selectionMode,
      selectedItems: Array.from(selectedItems),
      isSelected: (itemId: TItemId) => selectedItems.has(itemId),
      toggle(itemId: TItemId, value?: boolean) {
        if (selectionMode === 'none') return;
        setSelectedItems((prev) => {
          const isSelected = prev.has(itemId);
          const select = value !== undefined ? value : !isSelected;
          const needToRemove =
            !select && isSelected && (!isRequired || prev.size > 1 || !isSelected);
          const needToAdd = select && !isSelected;

          let result = prev;

          if (selectionMode === 'single' && needToAdd) {
            result = new Set([itemId]);
          } else if (selectionMode === 'multiple' && needToAdd) {
            result = new Set(prev);
            result.add(itemId);
          } else if (needToRemove) {
            result = new Set(Array.from(prev).filter((i) => i !== itemId));
          }

          if (result !== prev) {
            onSelectionChange?.(Array.from(result));
          }

          return result;
        });
      },
      update: (allSelectedItems: Array<TItemId>) => {
        if (
          selectionMode !== 'none' &&
          (allSelectedItems.length !== selectedItems.size ||
            !allSelectedItems.every((i) => selectedItems.has(i)))
        ) {
          onSelectionChange?.(allSelectedItems);
          setSelectedItems(new Set(getSelection(selectionMode, allSelectedItems)));
        }
      },
      clear: () => {
        if (selectionMode !== 'none' && selectedItems.size > 0) {
          onSelectionChange?.([]);
          setSelectedItems(new Set());
        }
      },
    }),
    [selectedItems]
  );
};
