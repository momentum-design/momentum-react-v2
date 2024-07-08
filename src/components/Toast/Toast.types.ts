import { CSSProperties, ReactElement } from 'react';

import { ButtonControlProps } from '../ButtonControl';
import { ToastContentProps } from '../ToastContent';
import { ToastDetailsProps } from '../ToastDetails';
import { AllowedTagNames } from '../Text/Text.types';
import type { AriaAttributes } from 'react';

export type SupportedChildren = ToastContentProps | ToastDetailsProps;
export type SupportedControlButtons = ButtonControlProps;

export interface Props {

  /**
   * Aria-live prop as a string. This will be used by a screen reader for live changes.
   */
  ariaLive?: AriaAttributes['aria-live'];

  /**
   * Child components of this Toast.
   */
  children?: ReactElement<SupportedChildren> | Array<ReactElement<SupportedChildren>>;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Content component of this Toast. Overrides the second children prop index value.
   */
  content?: ReactElement<ToastContentProps>;

  /**
   * Control buttons for this Toast. These will be passed to ToastDetails if a title prop is not provided.
   */
  controls?: Array<ReactElement<SupportedControlButtons>>;

  /**
   * Details component of this Toast. Overrides the first children prop index value.
   */
  details?: ReactElement<ToastDetailsProps>;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Title for the header-bar of this Toast.
   */
  title?: string;

  /**
 * Override the tag used to surround the text
 */
  titleTagName?: AllowedTagNames;
}
