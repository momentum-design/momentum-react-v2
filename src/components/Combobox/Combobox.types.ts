import { PressEvent } from '@react-types/shared/src/events';
import { CSSProperties } from 'react';
import { CollectionChildren } from '@react-types/shared/src/collections';


export type IComboboxItem = {
  key: string;
  label: string;
};

export type IComboboxGroup = {
  items: IComboboxItem[];
  section: string;
};

export interface Props {
  /**
   * Handler that is called when the selection changes.
   */
  onSelectionChange?: (item: IComboboxItem) => void;
  /**
   * Handler that is called when the ComboBox input value changes.
   */
  onInputChange?: (event: InputEvent) => void;
  /**
   * Handler that is called when the selection selected.
   */
  onAction?: (item: IComboboxItem) => void;
  /**
   * Handler that is called when the arrowButton pressed.
   */
  onPress?: (event: PressEvent) => void;
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
   * Override the list box width and combobox container width.
   */
  width?: string;
  /**
   * Text to display inside the input when there is no inputValue.
   */
  placeholder?: string;
  /**
   * Text to display inside the list box when there is no item.
   */
  noResultText?: string;
  /**
   * The list of options for this select element.
   */
  items: IComboboxGroup[];
  /**
   * The currently disabled keys in the collection.
   */
  disabledKeys?: string[];
  /**
   * The currently selected keys in the collection.
   */
  selectedKey?: string; 
  /**
   * Child components of this component.
   */
  children: CollectionChildren<any>;
}
