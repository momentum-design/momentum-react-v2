import type { Textarea } from '@momentum-design/components/dist/react';

type MdcTextAreaProps = React.ComponentProps<typeof Textarea>;

export type Props = MdcTextAreaProps & {
  /**
   * Callback function for when the enter key is pressed on the textarea field.
   */
  onKeyDown?: (event: React.KeyboardEvent) => void;
};
