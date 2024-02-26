import { PressEvent } from '@react-types/shared/src/events';
import { CSSProperties } from 'react';
import { CollectionChildren } from '@react-types/shared/src/collections';


export type IComboboxItem = {
  key: string;
  label: string;
};

export type IComboboxGroup = {
  items: IComboboxItem[];
  // If there is no need to group items using section, this property is not required.
  section?: string;
};

export interface Props {
  /**
   * Handler that is called when an item is selected in the list.
   * If the selected item matches the selectedKey, the parameter is undefined.
   */
  onAction?: (item: IComboboxItem) => void;
  /**
   * Handler that is called when an item is selected in the list.
   * Even if the selected item does not match the selectedKey, the parameter is still meaningful.
   */
  onSelectionChange?: (item: IComboboxItem) => void;
  /**
   * Handler that is called when the ComboBox input value changes.
   */
  onInputChange?: (event: InputEvent) => void;
  /**
   * Handler that is called when the arrowButton pressed.
   */
  onArrowButtonPress?: (event: PressEvent) => void;
  /**
   * id: id of help message.
   */
  id?: string;
  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
  /**
   * Custom class to be able to override the component's CSS.
   */
  className?: string;
  /**
   * Label/message to be displayed with this component.
   */
  label?: string;
  /**
   * Description associated with this component. Appears below the title.
   */
  description?: string;
  /**
   * Description associated with this component. Appears below the title.
   */
  error?: boolean;
  /**
   * Override the list box width and combobox container width.
   * defaultValue: 16.25rem
   */
  width?: string;
  /**
   * Text to display inside the input when there is no inputValue.
   */
  placeholder?: string;
  /**
   * This property represents whether to filter based on the input value when click the arrowButton.
   */
  shouldFilterOnArrowButton?: boolean;
  /**
   * Text to display inside the list box when there are no items that match the user's input.
   * defaultValue: No results found
   */
  noResultText?: string;
  /**
   * The list of options for this component.
   */
  comboboxGroups: IComboboxGroup[];
  /**
   * The currently disabled keys in the collection.
   */
  disabledKeys?: string[];
  /**
   * The currently selected key in the collection.
   */
  selectedKey?: string; 
  /**
   * Child components of this component.
   */
  children: CollectionChildren<any>;
}
