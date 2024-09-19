import { CSSProperties, HTMLAttributes, Key, MutableRefObject } from 'react';
import { AriaMenuProps } from '@react-types/menu';
import {
  CollectionBase,
  FocusStrategy,
  MultipleSelection,
  SelectionMode,
  SectionProps,
} from '@react-types/shared';
import { ListItemBaseSize } from '../ListItemBase/ListItemBase.types';

export type TickPosition = 'left' | 'right' | 'none';

export interface Props<T> extends AriaMenuProps<T> {
  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Size of the list item
   * @default 40
   */
  itemSize?: ListItemBaseSize;

  /**
   * The shape of the list item container
   * @default "rectangle"
   */
  itemShape?: 'rectangle' | 'isPilled';

  /**
   * Position of the tick when selected, none when no tick
   * @default right
   */
  tickPosition?: TickPosition;

  /**
   * aria-labelledby attribute to associate with the menu items
   */
  ariaLabelledby?: string;

  /**
   * Custom class for overriding this component's items CSS when selected.
   */
  classNameSelectedItem?: string;
}

export interface MenuContextValue extends HTMLAttributes<HTMLElement> {
  onClose?: () => void;
  closeOnSelect?: boolean;
  shouldFocusWrap?: boolean;
  autoFocus?: boolean | FocusStrategy;
  ref?: MutableRefObject<HTMLUListElement>;
}

export interface MenuAppearanceContextValue {
  itemShape?: 'rectangle' | 'isPilled';
  itemSize?: ListItemBaseSize;
  tickPosition?: TickPosition;
  classNameSelectedItem?: string;
}

export interface SelectionGroupAppearanceProps {
  tickPosition?: TickPosition;
  classNameSelectedItem?: string;
  itemSize?: ListItemBaseSize;
}

export interface SelectionGroupProps<T>
  extends Omit<SectionProps<T>, 'children' | 'items'>,
    Omit<CollectionBase<T>, 'disabledKeys'>,
    Omit<MultipleSelection, 'disabledKeys' | 'selectionMode'> {
  onAction?: (key: Key) => void;
  selectionMode: Exclude<SelectionMode, 'none'>;
  tickPosition?: TickPosition;
  classNameSelectedItem?: string;
  className?: string;
  itemSize?: ListItemBaseSize;
}
