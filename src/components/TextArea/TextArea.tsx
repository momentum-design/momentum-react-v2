import React, { forwardRef, RefObject, useRef } from 'react';
import { Textarea as MdcTextarea } from '@momentum-design/components/dist/react';
import type { Textarea } from '@momentum-design/components';
import classnames from 'classnames';

import { STYLE } from './TextArea.constants';
import { Props } from './TextArea.types';

const TextArea = forwardRef((props: Props, providedRef: RefObject<Textarea>) => {
  const { className, id, style, ...rest } = props;
  const internalRef = useRef();
  const ref = providedRef || internalRef;

  return (
    <MdcTextarea
      ref={ref}
      className={classnames(className, STYLE.wrapper)}
      id={id}
      style={style}
      {...rest}
    />
  );
});

TextArea.displayName = 'TextArea';
export default TextArea;
