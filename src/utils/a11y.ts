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
    }
  | {
      /**
       * Defines text representing advisory information related to the element it belongs to.
       *
       * @deprecated - Use aria-label or aria-labelledby, using title has a11y concerns
       * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title#accessibility_concerns
       */
      title: string;
    };
