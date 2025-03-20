import type { BadgeType } from '@momentum-design/components';
import type IconKeys from '@momentum-design/icons/dist/types/types';
import type { CSSProperties } from 'react';

export interface Props {
  /**
   * Type of the badge, mapping from momentum-design
   * see https://momentum-design.github.io/momentum-design/en/components/ for more information
   */
  type?: BadgeType;

  /**
   * Current counter number
   *
   * When type === counter
   */
  counter?: number;

  /**
   * Max counter number, if `counter` > maxCounter, `+` will be appended
   *
   * When type === counter
   */
  maxCounter?: number;

  /**
   * Max counter number, if `counter` > maxCounter, `+` will be appended
   *
   * When type === icon
   */
  iconName?: IconKeys;

  /**
   * Max counter number, if `counter` > maxCounter, `+` will be appended
   *
   * When type === icon
   */
  variant?: 'primary' | 'secondary';

  /**
   * If the badge should be used as a overlay (having a border)
   * Like placed on a button for indicating notifications.
   */
  overlay?: boolean;

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
}
