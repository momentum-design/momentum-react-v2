import { CSSProperties } from 'react';
import type IconKeys from '@momentum-design/icons/dist/types/types';
import { Props as TooltipProps } from '../Tooltip/Tooltip.types';
import type { MdcIconProps } from '../../types';

export type IconWeight = 'light' | 'regular' | 'bold' | 'filled';

type RemoveWeight<T> = T extends `${infer Base}-${IconWeight}` ? Base : T;

export type InferredIconName = RemoveWeight<IconKeys>;

export type IconScale =
  | 8
  | 10
  | 12
  | 14
  | 16
  | 18
  | 20
  | 22
  | 24
  | 28
  | 32
  | 36
  | 40
  | 48
  | 56
  | 64
  | 120
  | 124
  | 'auto'
  | 'inherit';

export interface Props extends Omit<MdcIconProps, 'name'> {
  /**
   * If set to true, then the icon size will scale according to the parent element.
   *
   * @remarks
   * `true` and `100` match in scale value.
   */
  autoScale?: boolean | 25 | 50 | 75 | 100 | 125 | 150 | 175 | 200;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Color the Icon will be filled with.
   * @internal
   */
  fillColor?: string;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Name of the icon. Should be lowercase. See Icon docs for
   * available icons.
   */
  name: InferredIconName;

  /**
   * Scale represents the size/scale of the icon in pixel values or auto | inherit.
   * @default 32
   */
  scale?: IconScale;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Provides visible accessibility label when icon is hovered
   */
  title?: string;

  /**
   * Provides the accessible name of the icon
   * Only needed if icon has an informative non-redundant meaning.
   * Reference: https://www.w3.org/WAI/tutorials/images/decision-tree/
   */
  ariaLabel?: string;

  /**
   * Represents the style of the icon.
   *
   * @remarks
   * Not all icons have all 4 styles.
   */
  weight?: IconWeight;

  /**
   * Due to the fact that some icons don't come with a weight,
   * we need a way to access them without relying on the weight rule.
   * Use this prop to specify if you're trying to use an icon without weight.
   * @remarks
   * An example would be brand icons.
   */
  weightless?: boolean;

  /**
   * For accessibility, meaningful standalone icons needs to be labelled by a tooltip.
   * If provided, a tooltip will be added to the icon and these props will be passed to the tooltip component.
   * `triggerComponent` is controlled by the Icon component and cannot be specified.
   */
  tooltipProps?: Omit<TooltipProps, 'triggerComponent' | 'type'> &
    Partial<Pick<TooltipProps, 'type'>>;
}
