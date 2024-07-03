import { CSSProperties, HTMLAttributes, MutableRefObject } from 'react';
import { AriaMenuProps } from '@react-types/menu';
import { FocusStrategy } from '@react-types/shared';
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
}

export interface MenuContextValue extends Omit<HTMLAttributes<HTMLElement>, 'autoFocus'> {
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
