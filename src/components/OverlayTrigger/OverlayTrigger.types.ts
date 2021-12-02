import { ReactElement } from 'react';

import { ButtonSimpleProps } from '../ButtonSimple';
import { OverlayProps } from '../Overlay';

export type SupportedTrigger = ButtonSimpleProps;

export type SupportedOverlay = OverlayProps;

export type Positioning = 'none' | 'relative';

export type Type = 'dialog' | 'grid' | 'listbox' | 'menu' | 'tree';

export interface Props {
  /**
   * The overlay that appears on hover.
   */
  hoverOverlay?: ReactElement<SupportedOverlay>;

  /**
   * The type for the hover overlay.
   */
  hoverOverlayType?: Type;

  /**
   * Positioning to use when triggering the hover overlay.
   */
  hoverPositioning?: Positioning;

  /**
   * The overlay that appears on press.
   */
  pressOverlay?: ReactElement<SupportedOverlay>;

  /**
   * The type for the press overlay.
   */
  pressOverlayType?: Type;

  /**
   * Positioning to use when triggering the press overlay.
   */
  pressPositioning?: Positioning;

  /**
   * Whether to preserve the hover overlay on press events.
   */
  preserveHoverOnPress?: boolean;

  /**
   * The trigger element for hover and press.
   */
  trigger: ReactElement<SupportedTrigger>;
}
