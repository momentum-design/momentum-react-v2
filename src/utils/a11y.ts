import { AriaAttributes } from 'react';

export type AriaLabelRequired =
  | {
      /**
       * Defines a string value that labels the current element.
       */
      'aria-label': AriaAttributes['aria-label'];
    }
  | {
      /**
       * Identifies the element (or elements) that labels the current element.
       */
      'aria-labelledby': AriaAttributes['aria-labelledby'];
    };
