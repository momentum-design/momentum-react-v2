import React, { RefObject, forwardRef, ReactNode } from 'react';
import classnames from 'classnames';

import './ListItemBase.style.scss';
import { Props } from './ListItemBase.types';
import { DEFAULTS, SHAPES, SIZES, STYLE } from './ListItemBase.constants';
import ListItemBaseSection from '../ListItemBaseSection';
import { verifyTypes } from '../../helpers/verifyTypes';
import FocusRing from '../FocusRing';

//TODO: Implement multi-line
const ListItemBase = (props: Props, ref: RefObject<HTMLLIElement>) => {
  const {
    className,
    children,
    shape = DEFAULTS.SHAPE,
    size = DEFAULTS.SIZE(shape || DEFAULTS.SHAPE),
    isDisabled = DEFAULTS.IS_DISABLED,
    role = DEFAULTS.ROLE,
    ...rest
  } = props;

  let content: ReactNode, start: ReactNode, middle: ReactNode, end: ReactNode;

  if (shape === SHAPES.isPilled && size === SIZES[40]) {
    console.warn(
      'ListItemBase: This variation is against the design spec. Rounded List Items can only be size 32 or 50.'
    );
  }

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
    <FocusRing>
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
    </FocusRing>
  );
};

/**
 * List Item Base component that can be used inside Lists/Menus
 */

const _ListItemBase = forwardRef(ListItemBase);
_ListItemBase.displayName = 'ListItemBase';

export default _ListItemBase;
