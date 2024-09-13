import { CSSProperties, HTMLAttributes, MutableRefObject } from 'react';
import { AriaMenuProps } from '@react-types/menu';
import { CollectionBase, FocusStrategy, MultipleSelection, SelectionMode } from '@react-types/shared';
import { ListItemBaseSize } from '../ListItemBase/ListItemBase.types';


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
   * Wether we should display the tick on the left side.
   * @default false
   */
  isTickOnLeftSide?: boolean;

  /**
   * aria-labelledby attribute to associate with the menu items
   */
  ariaLabelledby?: string;
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
  isTickOnLeftSide?: boolean;
}

export interface SelectionGroupProps<T>
  extends Omit<CollectionBase<T>, 'disabledKeys'>,
    Omit<MultipleSelection, 'disabledKeys' | 'selectionMode'> {
      onAction?: () => void;
      selectionMode: Exclude<SelectionMode, 'none'>
    }
