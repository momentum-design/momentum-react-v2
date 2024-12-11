import { CSSProperties } from 'react';
import { AriaSwitchBase } from '@react-types/switch';
import { AriaLabelRequired } from 'src/utils/a11y';

export type Props = Omit<AriaSwitchBase, 'children'> & {
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
} & AriaLabelRequired;
