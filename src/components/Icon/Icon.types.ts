import { CSSProperties } from 'react';

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
  | 124;

export type IconWeight = 'light' | 'regular' | 'bold' | 'filled';

export interface Props {
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
   * Color the Icon will be filled and stroked with. This overrides the fillColor and strokeColor props.
   */
  color?: string;

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
  name: string;

  /**
   * Scale represents the size/scale of te icon.
   * @default 32
   */
  scale?: IconScale;

  /**
   * Color the Icon will be stroked with.
   * @internal
   */
  strokeColor?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Provides accessibility label when icon is hovered
   */
  title?: string;

  /**
   * Represents the style of the icon.
   *
   * @remarks
   * Not all icons have all 4 styles.
   */
  weight?: IconWeight;
}
