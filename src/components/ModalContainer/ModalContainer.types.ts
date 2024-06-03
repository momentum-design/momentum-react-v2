import { CSSProperties, ReactNode, ComponentProps } from 'react';
import type { PlacementType } from '../ModalArrow/ModalArrow.types';
import { FocusScope } from 'react-aria';

export type Color = 'primary' | 'secondary' | 'tertiary' | 'quaternary';
export type Elevation = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Round = 0 | 25 | 50 | 75 | 100 | 125 | 150;

export interface Props {
  /**
   * Whether the arrow should be shown
   *
   * @default false
   */
  showArrow?: boolean;

  /**
   * Placement of the Modal relative to the trigger component. The
   * arrow will be placed accordingly.
   *
   * Possible values: `top`, `top-start`, `top-end`, `right`, `right-start`, `right-end`, `bottom`, `bottom-start`, `bottom-end`,
   * `left`, `left-start`, `left-end`, `auto`, `auto-start`, `auto-end`
   *
   * @default `bottom`
   */
  placement?: PlacementType;

  /**
   * Child components of this ModalContainer.
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Color of this ModalContainer.
   */
  color?: Color;

  /**
   * The elevation of this ModalContainer.
   */
  elevation?: Elevation;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * If this ModalContainer is padded.
   */
  isPadded?: boolean;

  /**
   * If this ModalContainer is round and to what degree.
   *
   * Can be 0 | 25 | 50 | 75 | 100 | 125 | 150
   */
  round?: Round;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Custom id for the arrow.
   */
  arrowId?: string;

  /**
   * Role for this modal.
   */
  role?: string;

  /**
   * Boolean for aria modal.
   */
  ariaModal?: boolean;

  /**
   * Props to be passed to FocusLock
   */
  focusLockProps?: Omit<ComponentProps<typeof FocusScope>, 'children' | 'key' | 'css'>;
}
