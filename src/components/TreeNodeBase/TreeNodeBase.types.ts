import { CSSProperties, DetailedHTMLProps, HTMLAttributes, ReactNode, RefObject } from 'react';
import { PressEvents } from '@react-types/shared';
import { TreeNodeId } from '../Tree';

/**
 * TreeNodeBase size options
 */
export type TreeNodeBaseSize = 32 | 40 | 50 | 70 | 'auto';

/**
 * TreeNodeBase ref type
 */
export type TreeNodeBaseRefOrCallbackRef =
  | RefObject<HTMLDivElement>
  | ((instance: HTMLDivElement) => void);

/**
 * TreeNodeBase Props
 */
export interface Props
  extends PressEvents,
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /**
   * Unique identifier for the tree node
   */
  nodeId: TreeNodeId;

  /**
   * Content of the tree node
   */
  children?: ReactNode;

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
   * lang attribute if necessary.
   */
  lang?: string;
}
