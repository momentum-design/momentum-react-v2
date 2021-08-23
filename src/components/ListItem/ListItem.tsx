import React, { RefObject, forwardRef, ReactNode } from 'react';
import classnames from 'classnames';

import './ListItem.style.scss';
import { Props } from './ListItem.types';
import { DEFAULTS, STYLE } from './ListItem.constants';
import ListItemSection from '../ListItemSection';

//TODO: Implement multi-line
const ListItem = (props: Props, ref: RefObject<HTMLLIElement>) => {
  const {
    className,
    children,
    shape = DEFAULTS.SHAPE,
    size = DEFAULTS.SIZE,
    isDisabled = DEFAULTS.IS_DISABLED,
    role = DEFAULTS.ROLE,
    ...rest
  } = props;

  let content: ReactNode, start: ReactNode, middle: ReactNode, end: ReactNode;

  /**
   * Returns true if all children are the correct type, false otherwise
   * @param _children
   * @returns boolean
   */
  const verifyTypes = (_children: ReactNode) => {
    let flag = true;
    React.Children.forEach(_children, (child) => {
      if (
        React.isValidElement(child) &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (child as React.ReactElement<any>).type !== ListItemSection
      ) {
        flag = false;
      }
    });
    return flag;
  };

  if (Array.isArray(children)) {
    if (children.length > 3) {
      console.warn('ListItem: This component can only have at most 3 sections inside.');
    } else {
      if (verifyTypes(children)) {
        start = children[0];
        middle = children[1];
        end = children[2];
        content = (
          <>
            {start}
            {middle}
            {end}
          </>
        );
      } else {
        console.warn('ListItem: this component can only receive ListItemSection as children.');
      }
    }
  } else {
    content = children;
  }

  return (
    <li
      ref={ref}
      data-size={size}
      data-disabled={isDisabled}
      data-shape={shape}
      className={classnames(className, STYLE.wrapper)}
      role={role}
      {...rest}
    >
      {content}
    </li>
  );
};

/**
 * List Item component that can be used inside Lists/Menus
 */

const _ListItem = forwardRef(ListItem);
_ListItem.displayName = 'ListItem';

export default _ListItem;
