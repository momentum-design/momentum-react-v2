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
export interface Props {
  /**
   * className custom class to be able to override  the icon's CSS
   */
  className?: string;
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
   * If set to true, then the icon size will scale according
   * to the parent element.
   */
  autoScale?: boolean;
  /**
   * Represents the style of the icon.
   * Note: Not all icons have all 4 styles.
   */
  weight?: 'light' | 'regular' | 'bold' | 'filled';
  /**
   * Color to fill the icon. Theming is provided by default (dark/light)
   */
  fillColor?: string;
}
