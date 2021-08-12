export interface Props {
  /**
   * Custom class to be able to override the component's CSS
   */
  className?: string;
  /**
   * the content of the text
   */
  children?: string;
  /**
   * the token that defines the style (size, weight, line height) of the text
   */
  type?: fontstyle;
}

export type fontstyle =
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
