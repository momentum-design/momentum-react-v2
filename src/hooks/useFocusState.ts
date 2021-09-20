import { useState, HTMLAttributes, FocusEvent } from 'react';
import { useFocus } from '@react-aria/interactions';

interface Props {
  onBlur?: (e: FocusEvent<Element>) => void;
  onFocus?: (e: React.FocusEvent<Element>) => void;
}

const useFocusState = (
  props: Props
): { focus: boolean; focusProps: HTMLAttributes<HTMLElement> } => {
  const [focus, setFocus] = useState(false);
  const { focusProps } = useFocus({
    onFocus: (...args) => {
      setFocus(true);
      if (props.onFocus) {
        props.onFocus.apply(this, args);
      }
    },
    onBlur: (...args) => {
      setFocus(false);
      if (props.onBlur) {
        props.onBlur.apply(this, args);
      }
    },
  });
  return { focus, focusProps };
};

export { useFocusState };
