export interface Props {
  /**
   * Custom class to be able to override the component's CSS
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
  scale?: 8 | 10 | 12 | 14 | 16 | 18 | 20 | 22 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 120 | 124;

  /**
   * If set to true, then the icon size will scale according
   * to the parent element.
   */
  autoScale?: boolean | 25 | 50 | 75 | 100 | 125 | 150 | 175 | 200;

  /**
   * Represents the style of the icon.
   * Note: Not all icons have all 4 styles.
   */
  weight?: 'light' | 'regular' | 'bold' | 'filled';

  /**
   * Color the Icon will be filled with.
   * @internal
   */
  fillColor?: string;

  /**
   * Color the Icon will be stroked with.
   * @internal
   */
  strokeColor?: string;

  /**
   * Color the Icon will be filled and stroked with. This overrides the fillColor and strokeColor props.
   */
  color?: string;
}
