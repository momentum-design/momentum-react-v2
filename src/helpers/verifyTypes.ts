import React, { FC, ReactNode } from 'react';
import ButtonSimple from '../components/ButtonSimple';
import ButtonCircle from '../components/ButtonCircle';
import ButtonHyperlink from '../components/ButtonHyperlink';
import ButtonPill from '../components/ButtonPill';

export const MRv2Buttons = [ButtonPill, ButtonCircle, ButtonSimple, ButtonHyperlink];

/**
 * Returns true if all children are the correct type, false otherwise
 * @param children
 * @param type the type to be checked
 * @returns boolean
 */
export const verifyTypes = <T extends unknown>(children: ReactNode, type: FC<T>): boolean => {
  if (React.Children.count(children) === 0) return false;
  return React.Children.toArray(children).every((child) => verifyType(child, type));
};

/**
 * Returns true if the element has the given type, false otherwise
 * @param element
 * @param type
 * @returns
 */
export const verifyType = <T extends unknown>(element: ReactNode, type: FC<T>): boolean => {
  return (
    React.isValidElement(element) &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (element as React.ReactElement<any>).type === type
  );
};

export const isMRv2Button = (element: ReactNode): boolean => {
  return MRv2Buttons.some((type) => verifyType(element, type));
};
