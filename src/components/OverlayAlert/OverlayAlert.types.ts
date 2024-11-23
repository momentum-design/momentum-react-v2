import type { CSSProperties, ReactElement, ReactNode, ComponentProps } from 'react';
import FocusLock from 'react-focus-lock';

import type { ButtonControlProps } from '../ButtonControl';
import type { ButtonSimpleProps } from '../ButtonSimple';
import type { ButtonGroupProps } from '../ButtonGroup';
import type { OverlayProps, OverlayColor } from '../Overlay';
import type { ModalContainerColor } from '../ModalContainer';
import { AriaLabelingProps } from '@react-types/shared';
import { AriaLabelRequired } from 'src/utils/a11y';

export type SupportedActions = ButtonSimpleProps | ButtonGroupProps;
export type SupportedControls = ButtonControlProps;

export type Props = OverlayProps &
  AriaLabelingProps &
  (
    | {
        /**
         * Title for this OverlayAlert.
         */
        title: string;
      }
    | ({ title?: never } & AriaLabelRequired) // if a title is not provided, a label is required
  ) & {
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
     * Props to be passed to Overlay for FocusLock, default `{returnFocus: true}`
     */
    focusLockProps?: Omit<ComponentProps<typeof FocusLock>, 'children'>;

    /**
     * Callback function to be fired when Escape key is pressed.
     */
    onClose: () => void;
  };
