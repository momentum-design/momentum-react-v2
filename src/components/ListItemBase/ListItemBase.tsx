import React, { RefObject, forwardRef, ReactNode } from 'react';
import classnames from 'classnames';

import './ListItemBase.style.scss';
import { Props } from './ListItemBase.types';
import { DEFAULTS, STYLE } from './ListItemBase.constants';
import ListItemBaseSection from '../ListItemBaseSection';
import { verifyTypes } from '../../helpers/verifyTypes';

//TODO: Implement multi-line
const ListItemBase = (props: Props, ref: RefObject<HTMLLIElement>) => {
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

  if (Array.isArray(children)) {
    if (children.length > 3) {
      console.warn('ListItemBase: This component can only have at most 3 sections inside.');
    } else {
      if (verifyTypes(children, ListItemBaseSection)) {
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
        console.warn(
          'ListItemBase: this component can only receive ListItemBaseSection as children.'
        );
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

const _ListItemBase = forwardRef(ListItemBase);
_ListItemBase.displayName = 'ListItemBase';

export default _ListItemBase;
