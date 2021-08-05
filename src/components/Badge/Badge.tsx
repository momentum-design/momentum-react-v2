import React, { forwardRef, useRef, FC, RefObject } from 'react';

import { DEFAULTS, STYLE } from './Badge.constants';
import { Props } from './Badge.types';
import './Badge.style.scss';

const Badge: FC<Props> = forwardRef((props: Props, providedRef: RefObject<HTMLDivElement>) => {
  const ref = providedRef || useRef();
  const { children } = props;

  return (
    <div className={`${STYLE.wrapper}`} ref={ref} data-size={props.size || DEFAULTS.SIZE}>
      {children}
    </div>
  );
});

Badge.displayName = 'Badge';

export default Badge;
