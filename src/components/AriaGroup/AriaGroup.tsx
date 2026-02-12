import React, { FC } from 'react';

import { Props } from './AriaGroup.types';

/**
 * The AriaGroup component.
 * @deprecated Use the equivalent from momentum.design (NPM: `@momentum-design/components/dist/react`)
 */
const AriaGroup: FC<Props> = (props: Props) => {
  const { children, className, ...otherProps } = props;

  return (
    <div className={className} role="group" {...otherProps}>
      {children}
    </div>
  );
};

export default AriaGroup;
