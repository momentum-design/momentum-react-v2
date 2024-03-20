import { CollectionChildren } from '@react-types/shared';
import { PressEvent } from '@react-types/shared/src/events';
import { CSSProperties, RefObject } from 'react';


export type IComboBoxItem = {
  key: string;
  label: string;
};

export type IComboBoxGroup = {
  items: IComboBoxItem[];
  // If there is no need to group items using section, this property is not required.
  section?: string;
};

export interface Props {
  /**
   * Handler that is called when an item is selected in the list.
   * If the selected item matches the selectedKey, the parameter is undefined.
   */
  onSelectionChange?: (item: IComboBoxItem) => void;
  /**
   * Handler that is called when the ComboBox input value changes.
   */
  onInputChange?: (event: InputEvent) => void;
  /**
   * Handler that is called when the arrowButton pressed.
   */
  onArrowButtonPress?: (event: PressEvent) => void;
  /**
   * Handler that is called when isOpen state of list chanages.
   */
  openStateChange?: (isOpen: boolean) => void;
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
   * Override the list box width and ComboBox container width.
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
  comboBoxGroups: IComboBoxGroup[];
  /**
   * The currently disabled keys in the collection.
   */
  disabledKeys?: string[];
  /**
   * The currently selected key in the collection.
   */
  selectedKey?: string; 
  /**
   * Used to get the input DOM within the component.
   */
  inputRef?: RefObject<HTMLInputElement>;
  /**
   * Child components of this component.
   */
  children: CollectionChildren<any>;
}
