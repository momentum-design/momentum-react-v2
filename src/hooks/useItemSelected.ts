import { useMemo, useState } from 'react';
import { usePrevious } from './usePrevious';

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
  /**
   * List of selected items
   *
   * If it is provided, the selection will be controlled.
   * @default undefined
   *
   * @see {@link https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable Controlling an input with a state variable}
   */
  selectedItems?: Array<TItemId>;
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

const getSelection = <T extends Array<unknown>>(
  mode: SelectionMode,
  selectedByDefault: T = [] as T
): T => {
  if (mode === 'none') {
    if (selectedByDefault && selectedByDefault.length > 0) {
      console.warn(
        '"None" selection mode does not support any selection, selected items will be ignored'
      );
    }
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
 *
 * This hook support controlled and uncontrolled selection, and it works the same way as input components in React.
 *
 * Uncontrolled is the default state, when `selectedItems` is `undefined`.
 * In this case, the hook will manage the selection state internally.
 *
 * @example
 * ```tsx
 * const {selectedItems, isSelected, toggle, update, clear } = useItemSelected({
 *  selectionMode: 'multiple'
 * })
 * ```
 *
 * Controlled selection is when `selectedItems` is provided, and it isn't `undefined`.
 * This way the consumer of the hook can change the selection from outside.
 * Order to update this outside state, the `onSelectionChange` callback should be passed as well
 *
 * @example
 * ```tsx
 * const [selection, setSelection] = useState<Array<string>>([]);
 *
 * const {isSelected, toggle, update, clear } = useItemSelected({
 *  selectionMode: 'multiple',
 *  selectedItems: selection,
 *  onSelectionChange: setSelection,
 *  isRequired: true,
 * })
 * ```
 *
 * @param param Hook options
 */
export const useItemSelected = <TItemId extends string | number>({
  selectionMode,
  selectedByDefault,
  onSelectionChange,
  selectedItems: selectedItemsFromProps = undefined,
  isRequired = false,
}: UseItemSelectedProps<TItemId>): ItemSelection<TItemId> => {
  const isControlled = selectedItemsFromProps !== undefined;

  const prevIsControlled = usePrevious(isControlled);

  // Check if the selection mode is changed from controlled to uncontrolled
  // see "Controlling an input with a state variable" in rect docs
  // https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
  if (prevIsControlled === true && prevIsControlled !== isControlled) {
    console.warn(
      'A component is changing an uncontrolled input to be controlled.' +
        'selectedItems should not alter between array and undefined value.'
    );
  }

  const [internalSelectedItems, setInternalSelectedItems] = useState<Set<TItemId>>(
    new Set(getSelection(selectionMode, selectedByDefault))
  );

  const selectedItems = useMemo(
    () =>
      isControlled
        ? new Set(getSelection(selectionMode, selectedItemsFromProps))
        : internalSelectedItems,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isControlled, selectedItemsFromProps, internalSelectedItems]
  );

  return useMemo(
    () => ({
      selectionMode,
      selectedItems: Array.from(selectedItems),
      isSelected: (itemId: TItemId) => selectedItems.has(itemId),
      toggle(itemId: TItemId, value?: boolean) {
        if (selectionMode === 'none') return;

        const toggleInternal = (prev: Set<TItemId>): Set<TItemId> => {
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
        };

        if (!isControlled) {
          setInternalSelectedItems(toggleInternal);
        } else {
          toggleInternal(selectedItems);
        }
      },
      update: (allSelectedItems: Array<TItemId>) => {
        if (
          selectionMode !== 'none' &&
          (allSelectedItems.length !== selectedItems.size ||
            !allSelectedItems.every((i) => selectedItems.has(i)))
        ) {
          const newSelection = getSelection(selectionMode, allSelectedItems);
          onSelectionChange?.(newSelection);
          if (!isControlled) {
            setInternalSelectedItems(new Set(newSelection));
          }
        }
      },
      clear: () => {
        if (selectionMode !== 'none' && selectedItems.size > 0) {
          onSelectionChange?.([]);
          if (!isControlled) {
            setInternalSelectedItems(new Set());
          }
        }
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedItems]
  );
};
