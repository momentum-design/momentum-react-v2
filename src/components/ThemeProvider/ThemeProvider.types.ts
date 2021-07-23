import { ReactNode } from 'react';

export type ThemeNames = 'darkBronze' |
  'darkIndigo' |
  'darkJade' |
  'darkLavender' |
  'darkRose' |
  'darkWebex' |
  'lightBronze' |
  'lightIndigo' |
  'lightJade' |
  'lightLavender' |
  'lightRose' |
  'lightWebex';

export interface Props {
  /**
   * The child components of this component.
   */
  children?: ReactNode;

  /**
   * The theme name to provide styles from to all child components.
   */
  theme?: ThemeNames
}
