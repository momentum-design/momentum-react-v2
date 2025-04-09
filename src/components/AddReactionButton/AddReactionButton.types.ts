import { ButtonCircleProps } from './../ButtonCircle/index';

export type Props = Omit<
  ButtonCircleProps,
  | 'color'
  | 'onPress'
  | 'onPressStart'
  | 'onPressEnd'
  | 'onPressChange'
  | 'onPressUp'
  | 'onFocusChange'
> & {
  /**
   * onClick handler for the button
   * @param e Mouse event
   * @returns
   */
  onClick?: (e: React.MouseEvent) => void;
};
