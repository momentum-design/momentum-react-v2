import { CSSProperties, MutableRefObject, ReactElement } from 'react';
import { ButtonGroupProps } from '../ButtonGroup';
import { SupportedComponents } from '../ButtonGroup/ButtonGroup.types';
import { AriaLabelingProps } from '@react-types/shared';
import { AriaLabelRequired } from 'src/utils/a11y';

interface AriaToolbarProps extends AriaLabelingProps {
  /**
   * Child components of this AriaToolbar.
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
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * The orientation of the toolbar
   * horizontal -> left/right keys to navigate
   * vertical -> up/down keys to navigate
   * default is horizontal
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * This handler is called when tab is pressed by one of the elements
   * within the toolbar.
   */
  onTabPress?: (e: React.KeyboardEvent) => void;

  /**
   * This prop is used to determine if the toolbar should render as a button group.
   */
  shouldRenderAsButtonGroup?: boolean;

  /**
   * Props to pass to the ButtonGroup component
   */
  buttonGroupProps?: ButtonGroupProps;

  /**
   * Provides context on how many toolbar items are in the aria toolbar. This information is used
   * to calculate the correct item focus.
   */
  ariaToolbarItemsSize: number;
}

export type Props = AriaToolbarProps & AriaLabelRequired;

export interface AriaToolbarContextValue {
  currentFocus?: number;
  setCurrentFocus?: (newFocus: number) => void;
  buttonRefs?: MutableRefObject<Record<string, HTMLButtonElement>>;
  orientation: Props['orientation'];
  onTabPress: Props['onTabPress'];
  ariaToolbarItemsSize: number;
}
