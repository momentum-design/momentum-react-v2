import React from 'react';

export interface Props {
  /**
   * Custom class to be able to override the component's CSS
   */
  className?: string;
  /**
   * label: Label text for associated Input
   */
  label?: string;
  /**
   * htmlFor: id of associated Input (required if no children)
   */
  htmlFor?: string;
  /**
   * id: id of label
   */
  id?: string;
}
