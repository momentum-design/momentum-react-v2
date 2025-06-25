import { CSSProperties, ReactNode } from 'react';
import type { MdcTextProps } from '../../types';

export type AllowedTagNames = MdcTextProps['tagname'];

export interface Props extends Omit<MdcTextProps, 'type'> {
  /**
   * Custom class to be able to override the component's CSS
   */
  className?: string;
  /**
   * the content of the text
   */
  children?: ReactNode;
  /**
   * The token that defines the style (size, weight, line height) of the text
   *
   * Supports old Webex tokens and new momentum-design tokens:
   * https://momentum-design.github.io/momentum-design/en/tokens/font/#apps-body-small-regular
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
   * The tag used to surround the text (NB 'small' included for legacy reasons, it no longer affects the style)
   */
  tagName: AllowedTagNames;
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
  | 'label-compact'
  | MdcTextProps['type'];
