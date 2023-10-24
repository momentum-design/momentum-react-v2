import { CSSProperties, ReactElement } from 'react';

import { ButtonCircleProps } from '../ButtonCircle';
import { ButtonPillProps } from '../ButtonPill';

export type SupportedComponents = ButtonCircleProps | ButtonPillProps;
export type ButtonGroupOrientation = 'horizontal' | 'vertical';

export interface Props {
  /**
   * Button shaped components.
   *
   * NOTE: if passing in wrapper around buttons (using a HTMLElement),
   * each wrapper needs to have `data-childof="button-group"` to be set and
   * using the same `fontSize` as the Button it is wrapping.
   *
   * `data-compressed` is also required to be set on the wrapper, if `compressed` is set to true on the button group.
   */
  children?:
    | ReactElement<SupportedComponents>
    | Array<ReactElement<SupportedComponents>>
    | Array<HTMLElement>;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Whether this <ButtonGroup /> is rounded.
   */
  round?: boolean;

  /**
   * Whether to include spacing around <SupportedComponents />.
   */
  spaced?: boolean;

  /**
   * Whether to compress horizontal space and remove inner borders between <SupportedComponents />.
   */
  compressed?: boolean;

  /**
   * Whether to to add a separator line between <SupportedComponents />.
   */
  separator?: boolean;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Role for adding accessibility
   */
  role?: string;

  /**
   * Orientation of ButtonGroup
   *
   * Default: `horizontal`
   */
  orientation?: ButtonGroupOrientation;
}
