import React, { forwardRef, RefObject, useRef } from 'react';
import { Textarea as MdcTextarea } from '@momentum-design/components/dist/react';
import type { Textarea } from '@momentum-design/components';

import { Props } from './TextArea.types';

const TextArea = forwardRef((props: Props, providedRef: RefObject<Textarea>) => {
  const { onKeyDown, ...rest } = props;
  const internalRef = useRef();
  const ref = providedRef || internalRef;

  return <MdcTextarea {...rest} ref={ref} onKeyDown={onKeyDown} />;
});

TextArea.displayName = 'TextArea';
export default TextArea;
