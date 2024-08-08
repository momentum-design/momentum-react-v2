import { CSSProperties, ReactNode } from 'react';
import { PressEvents } from '@react-types/shared';

/**
 * TreeNodeBase size options
 */
export type TreeNodeBaseSize = 32 | 40 | 50 | 70 | 'auto';

export interface Props extends PressEvents {
  /**
   * className prop description
   * Child components of this ButtonPill.
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Tree node Identifier
   */
  id: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Determines if this item is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Determines if this item is selected
   * @default false
   */
  isSelected?: boolean;

  /**
   * Determines if this item is padded
   * @default false
   */
  isPadded?: boolean;

  /**
   * Size of the tree node
   * @default 40
   */
  size?: TreeNodeBaseSize;

  /**
   * The shape of the tree node container
   * @default "rectangle"
   */
  shape?: 'rectangle' | 'isPilled';

  /**
   * Determines whether the focus for this item should be inset or outset
   * @default false
   */
  shouldItemFocusBeInset?: boolean;

  /**
   * Determines if the tree node is interactive (usually used as a header when false)
   * @default true
   */
  interactive?: boolean;

  /**
   * lang attribute if necessary.
   */
  lang?: string;

  /**
   * The toggle function to open/close the tree node
   * It makes the tree node compatible with Virtualized Trees
   *
   * By default, it will use the toggle function from the Tree context
   */
  externalToggleFn?: () => void;
}
