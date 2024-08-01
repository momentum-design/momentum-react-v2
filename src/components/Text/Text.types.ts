import { CSSProperties, ReactNode } from 'react';

export type AllowedTagNames =
  | (keyof JSX.IntrinsicElements & 'h1')
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'small';
export interface Props {
  /**
   * Custom class to be able to override the component's CSS
   */
  className?: string;
  /**
   * the content of the text
   */
  children?: ReactNode;
  /**
   * the token that defines the style (size, weight, line height) of the text
   */
  type?: FontStyle;
  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;
  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
  /**
   * Override the tag used to surround the text
   */
  tagName?: AllowedTagNames;
  /**
   * role of the component
   */
  role?: string;
}

export type FontStyle =
  | 'display'
  | 'banner-tertiary'
  | 'banner-primary'
  | 'banner-secondary'
  | 'title'
  | 'header-primary'
  | 'highlight-primary'
  | 'subheader-primary'
  | 'body-primary'
  | 'hyperlink-primary'
  | 'subheader-secondary'
  | 'highlight-secondary'
  | 'header-secondary'
  | 'body-secondary'
  | 'hyperlink-secondary'
  | 'highlight-compact'
  | 'body-compact'
  | 'label-compact';
