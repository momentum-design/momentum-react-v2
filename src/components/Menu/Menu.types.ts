import { CSSProperties, HTMLAttributes, MutableRefObject } from 'react';
import { AriaMenuProps } from '@react-types/menu';
import { FocusStrategy } from '@react-types/shared';
import { ListItemBaseSize } from '../ListItemBase/ListItemBase.types';
import { ListOrientation } from '../List/List.types';

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
   * Wether it is part of nested menu items.
   * @default false
   */
  isGroupRole?: boolean;
  
  /**
   * aria-labelledby attribute to associate with the menu items
   */
  ariaLabelledby?: string;
  /**
   * Determines the orientation of the list
   *
   * The orientation of the list change the keyboard navigation in the list:
   *
   * - vertical: up and down arrow keys
   * - horizontal: left and right arrow keys
   *
   * @default 'vertical'
   */
  orientation?: ListOrientation
  tabIndex?: number;
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
