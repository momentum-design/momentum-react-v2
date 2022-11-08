import { CSSProperties, ReactElement, ReactNode } from 'react';

import { ButtonControlProps } from '../ButtonControl';
import { ButtonSimpleProps } from '../ButtonSimple';
import { ButtonGroupProps } from '../ButtonGroup';

export type SupportedActions = ButtonSimpleProps | ButtonGroupProps;
export type SupportedControls = ButtonControlProps;

export interface Props {
  /**
   * Actions associated with this OverlayAlert.
   */
  actions?: ReactElement<SupportedActions> | Array<ReactElement<SupportedActions>>;

  /**
   * Child components of this OverlayAlert.
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Controls associated with this OverlayAlert.
   */
  controls?: ReactElement<SupportedControls> | Array<ReactElement<SupportedControls>>;

  /**
   * Details for this OverlayAlert.
   */
  details?: string;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Title for this OverlayAlert.
   */
  title?: string;
}
