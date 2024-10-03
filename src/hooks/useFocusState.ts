import React, { useState, HTMLAttributes, FocusEvent } from 'react';
import { useFocus, useFocusWithin } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';

interface FocusProps {
  onBlur?: (e: FocusEvent<Element>) => void;
  onFocus?: (e: React.FocusEvent<Element>) => void;
}

export interface FocusWithinProps {
  onBlurWithin?: (e: FocusEvent<Element>) => void;
  onFocusWithin?: (e: FocusEvent<Element>) => void;
}

const useFocusState = (
  props: FocusProps
): { isFocused: boolean; focusProps: HTMLAttributes<HTMLElement> } => {
  const [isFocused, setFocus] = useState(false);
  const { focusProps } = useFocus({
    onFocus: (...args) => {
      setFocus(true);
      props.onFocus?.(...args);
    },
    onBlur: (...args) => {
      setFocus(false);
      props.onBlur?.(...args);
    },
  });
  return { isFocused, focusProps };
};

const useFocusWithinState = (
  props: FocusWithinProps
): { isFocusedWithin: boolean; focusWithinProps: HTMLAttributes<HTMLElement> } => {
  const [isFocusedWithin, setFocusWithin] = useState(false);
  const { focusWithinProps } = useFocusWithin({
    onFocusWithin: (...args) => {
      setFocusWithin(true);
      props.onFocusWithin?.(...args);
    },
    onBlurWithin: (...args) => {
      setFocusWithin(false);
      props.onBlurWithin?.(...args);
    },
  });
  return { isFocusedWithin, focusWithinProps };
};

const useFocusAndFocusWithinState = (
  props: FocusProps & FocusWithinProps
): { isFocused: boolean; isFocusedWithin: boolean; focusProps: HTMLAttributes<HTMLElement> } => {
  const { isFocused, focusProps } = useFocusState(props);
  const { isFocusedWithin, focusWithinProps } = useFocusWithinState(props);

  const mergedFocusProps = mergeProps(focusProps, focusWithinProps);

  return { isFocused, isFocusedWithin, focusProps: mergedFocusProps };
};

export { useFocusState, useFocusWithinState, useFocusAndFocusWithinState };
