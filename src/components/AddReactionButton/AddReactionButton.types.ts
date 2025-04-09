import { ButtonCircleProps } from './../ButtonCircle/index';

export type Props = Omit<ButtonCircleProps, 'color' | 'onPress'> & {
  /**
   * onClick handler for the button
   * @param e Mouse event
   * @returns
   */
  onClick?: (e: React.MouseEvent) => void;
};
