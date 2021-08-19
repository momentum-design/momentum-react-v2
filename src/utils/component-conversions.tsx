import React, { FC } from 'react';

/**
 * Convert a primitive into a component if needed.
 *
 * @param props - React FC Props.
 * @param props.children - data value to be validated and wrapped into an element.
 * @returns - FC of provided child if needed.
 */
const PrimitiveConverter: FC<{ children }> = ({ children }: { children }) => {
  const type = typeof children;

  return type === 'object' || type === 'function' ? <>{children}</> : <div>{children}</div>;
};

export { PrimitiveConverter };
