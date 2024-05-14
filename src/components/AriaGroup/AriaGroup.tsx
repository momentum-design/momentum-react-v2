import React, { FC} from 'react';

import { Props } from './AriaGroup.types';

/**
 * The AriaGroup component.
 */
const AriaGroup: FC<Props> = (props: Props) => {
  const {
    ariaLabel,
    ariaLabelledby,
    children,
    className,
    ...otherProps
  } = props;

  return (
    <div
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={className}
      role='group'
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default AriaGroup;
