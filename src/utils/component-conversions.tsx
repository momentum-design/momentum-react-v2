import React, { FC, isValidElement } from 'react';
import classNames from 'classnames';

export interface PrimativeConverterProps {
  /**
   * Item to be tested for conversion.
   */
  children;

  /**
   * Class to amend to this primative or component.
   */
  className?: string;
}

/**
 * Convert a primitive into a component if needed.
 *
 * @param props - React FC Props.
 * @param props.children - data value to be validated and wrapped into an element.
 * @returns - FC of provided child if needed.
 */
const PrimitiveConverter: FC<PrimativeConverterProps> = (props: PrimativeConverterProps) => {
  const { children, className } = props;
  const isElement = isValidElement(children);

  const addedProps: { className?: string } = {};

  if (className) {
    addedProps.className = isElement ? classNames(children.classNames, className) : className;
  }

  return isElement ? (
    React.cloneElement(children, { ...addedProps })
  ) : (
    <div {...addedProps}>{children}</div>
  );
};

export { PrimitiveConverter };
