import { CSSProperties } from 'react';
import { AriaButtonProps } from '@react-types/button';
import { AriaLabelingProps } from '@react-types/shared';
import { InferredIconName } from '../Icon/Icon.types';
import { AriaLabelRequired } from '../../utils/a11y';

export type Props = AriaButtonProps &
  AriaLabelingProps &
  (
    | {
        /**
         * Visible label for this tab
         */
        label: string;
      }
    | ({ label?: never } & AriaLabelRequired)
  ) & {
    // if a label is not provided, an aria-label(lledby) is required
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
     * Size index of this NavTab.
     */
    size?: number;

    /**
     * Size index of this NavTab.
     */
    icon?: InferredIconName;

    /**
     * The amount inside the badge of components of this NavTab. If 0, then it is not shown.
     */
    count?: number;

    /**
     * True if the tab is active.
     */
    active?: boolean;
  };

export type NavTabSize = 40 | 48 | 200;
