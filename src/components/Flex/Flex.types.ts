import { ReactNode } from 'react';

export type FlexStyleProps = {
  /**
   * The distribution of space around items along the main axis. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).
   * @default 'stretch'
   */
  justifyContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'left'
    | 'right'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch'
    | 'baseline';
  /**
   * The distribution of space around child items along the cross axis. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content).
   * @default 'start'
   */
  alignContent?:
    | 'start'
    | 'end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch'
    | 'baseline';
  /**
   * The alignment of children within their container. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).
   * @default 'stretch'
   */
  alignItems?: 'start' | 'end' | 'center' | 'stretch' | 'self-start' | 'self-end' | 'baseline';
  /**
   * The direction in which to layout children. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction).
   * @default 'row'
   */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  /**
   * Whether to wrap items onto multiple lines. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap).
   * @default false
   */
  wrap?: boolean | 'wrap' | 'nowrap' | 'wrap-reverse';

  /**
   * If present, it will add a margin-left to all elements except first child
   */
  xgap?: string;

  /**
   * If present, it will add a margin-top to all elements except first child
   */
  ygap?: string;
};

export interface Props extends FlexStyleProps {
  /**
   * className prop description
   */
  className?: string;
  children?: ReactNode;
}
