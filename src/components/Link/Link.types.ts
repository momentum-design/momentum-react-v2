import { CSSProperties, ReactNode } from 'react';
import { AriaLinkProps } from '@react-types/link';
import { Props as IconProps } from '../Icon/Icon.types';
import { TooltipTypes } from '../Tooltip/Tooltip.types';

export interface Props extends AriaLinkProps {
  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
  /**
   * Custom class to be able to override the component's CSS
   */
  className?: string;
  /**
   * Child components of this component. This prop replaces primaryText.
   */
  children?: ReactNode;

  /**
   * Whether or not this component is disabled.
   */
  disabled?: boolean;

  /**
   * Whether or not this component has inverted theme colors.
   */
  inverted?: boolean;

  /**
   * title to use for this component.
   */
  title?: string;

  /**
   * whether or not this component has icon【default icon name = pop-out】 in the right
   * icon display needed tooltipContent 
   */
  hasExternalLinkIcon?: boolean;

  /**
   * icon props
   * When use iconProps isWithIcon is necessary
   */
  iconProps?: Partial<IconProps>;

  /**
   * Used for tooltip content
   */
  tooltipContent?: string;

  /**
   * Determines, whether the tooltip is the description or the label of the trigger component, or none
   * `label`、`description`、`none`
   */
  tooltipType?: TooltipTypes;
}
