import { CSSProperties } from 'react';

export interface Props {
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
   * Size index of this NavTab.
   */
  size?: number;

  /**
   * Size index of this NavTab.
   */
  label?: string;

  /**
   * Size index of this NavTab.
   */
  icon?: string;

  /**
   * Child components of this ButtonPill.
   */
  count?: number;

  /**
   * True if the tab is active.
   */
  active?: boolean;
}
