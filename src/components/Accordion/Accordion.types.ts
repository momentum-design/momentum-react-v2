import { CSSProperties, ReactNode } from 'react';
import { ButtonSimpleProps } from '../ButtonSimple';

export interface Props {
  /**
   * Child components of this Accordion.
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
   * Element to render in the header area.
   */
  heading: ReactNode;

  /**
   * Element to render in the header area, aligned to the right.
   */
  headingRightContent?: ReactNode;

  /**
   * Whether if the accordion should be expanded by default.
   */
  defaultExpanded?: boolean;

  /**
   * Hierarchical level of the accordion within a structure.
   */
  ariaLevel: number;

  /**
   * Extra props to be added to the header button.
   */
  buttonProps?: ButtonSimpleProps;
}
