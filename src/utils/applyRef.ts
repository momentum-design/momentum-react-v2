import { ForwardedRef } from 'react';

export const applyRef = (ref: ForwardedRef<HTMLElement>, node: HTMLElement): void => {
  if (!ref) {
    return;
  }

  if (typeof ref === 'function') {
    ref(node);
  } else if (Object.prototype.hasOwnProperty.call(ref, 'current')) {
    ref.current = node;
  }
};
