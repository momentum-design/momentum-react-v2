import type { ComboBoxProps } from '@react-types/combobox';
import { CollectionChildren } from '@react-types/shared';
import { CSSProperties } from 'react';

export type IComboBoxItem = {
  key: string;
  label: string;
};

export type IComboBoxGroup = {
  items: IComboBoxItem[];
  // If there is no need to group items using section, this property is not required.
  section?: string;
};

export type Direction = 'top' | 'bottom';

export interface Props extends ComboBoxProps<IComboBoxItem | IComboBoxGroup> {
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
   * Text to display inside the list box when there are no items that match the user's input.
   */
  noResultLabel?: string;

  /**
   * Direction in which the option list will display
   * @default bottom
   */
  direction?: Direction;

  /**
   * To override the list box max height
   */
  listboxMaxHeight?: string;

  /**
   * Override the list box width to allow for fixed popover strategy
   *
   * To style the list box without applying fixed popover strategy, pass in className instead
   *
   * NOTE: if set, the popover strategy will be set to 'fixed'
   */
  listboxWidth?: string;

  /**
   * The list of ComboBox items (uncontrolled).
   */
  items?: Array<IComboBoxItem | IComboBoxGroup>;

  /**
   * The list of ComboBox items (controlled).
   */
  defaultItems?: Array<IComboBoxItem | IComboBoxGroup>;

  children: CollectionChildren<any>;
}
