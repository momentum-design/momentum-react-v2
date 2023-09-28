import type { CSSProperties, ReactElement, ReactNode, ComponentProps } from 'react';
import FocusLock from 'react-focus-lock';

import type { ButtonControlProps } from '../ButtonControl';
import type { ButtonSimpleProps } from '../ButtonSimple';
import type { ButtonGroupProps } from '../ButtonGroup';
import type { OverlayProps, OverlayColor } from '../Overlay';
import type { ModalContainerColor } from '../ModalContainer';

export type SupportedActions = ButtonSimpleProps | ButtonGroupProps;
export type SupportedControls = ButtonControlProps;

export interface Props extends OverlayProps {
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
   * Color of the nested modal within this component.
   */
  modalColor?: ModalContainerColor;

  /**
   * Color of the overlay of this component.
   */
  overlayColor?: OverlayColor;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Title for this OverlayAlert.
   */
  title?: string;

  /**
   * Props to be passed to Overlay for FocusLock
   */
  focusLockProps?: Omit<ComponentProps<typeof FocusLock>, 'children'>;
}
