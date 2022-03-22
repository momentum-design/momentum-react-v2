import { CSSProperties, ReactElement } from 'react';

import { ButtonGroupProps } from 'components/ButtonGroup';

export type SupportedActionsButtons = ButtonGroupProps;

export interface Props {
  /**
   * Colorizable action the actor executed.
   */
  action?: string;

  /**
   * Color to render the action prop as.
   */
  actionColor?: 'cancel' | 'join' | 'success' | 'warning';

  /**
   * Selectable actions that can be taken on behalf of the scope of this ToastDetails.
   */
  actions?: ReactElement<SupportedActionsButtons>;

  /**
   * Actor for the action of this ToastContent.
   */
  actor?: string;

  /**
   * Information associated with this ToastContent. The info prop overrides this.
   */
  children?: string;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Information associated with this ToastContent. This overrides the children prop.
   */
  info?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
