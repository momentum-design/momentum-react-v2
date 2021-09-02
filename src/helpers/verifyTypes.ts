import React, { FC, ReactNode } from 'react';

/**
 * Returns true if all children are the correct type, false otherwise
 * @param children
 * @param type the type to be checked
 * @returns boolean
 */
export const verifyTypes = <T extends unknown>(children: ReactNode, type: FC<T>): boolean => {
  if (React.Children.count(children) === 0) return false;

  let flag = true;
  React.Children.forEach(children, (child) => {
    if (
      React.isValidElement(child) &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (child as React.ReactElement<any>).type !== type
    ) {
      flag = false;
    }
  });
  return flag;
};
