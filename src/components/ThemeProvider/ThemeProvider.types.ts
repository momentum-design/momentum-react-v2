import { CSSProperties, ReactNode } from 'react';

export type ThemeNames =
  | 'darkBronzeWebex'
  | 'darkIndigoWebex'
  | 'darkJadeWebex'
  | 'darkLavenderWebex'
  | 'darkRoseWebex'
  | 'darkWebex'
  | 'lightBronzeWebex'
  | 'lightIndigoWebex'
  | 'lightJadeWebex'
  | 'lightLavenderWebex'
  | 'lightRoseWebex'
  | 'lightWebex';

export type MDTheme = 'webex-dark' | 'webex-light';

export type TeamColor =
  | 'default'
  | 'gold'
  | 'orange'
  | 'lime'
  | 'mint'
  | 'cyan'
  | 'cobalt'
  | 'slate'
  | 'violet'
  | 'purple'
  | 'pink';

export interface Props {
  /**
   * The child components of this component.
   */
  children?: ReactNode;

  /**
   * The id of this component.
   */
  id?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * The theme name to provide styles from to all child components.
   */
  theme?: ThemeNames | MDTheme;
}
