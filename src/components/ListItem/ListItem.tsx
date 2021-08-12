import React, { RefObject, forwardRef } from 'react';
import classnames from 'classnames';

import './ListItem.style.scss';
import { Props } from './ListItem.types';
import { DEFAULTS, STYLE } from './ListItem.constants';

const ListItem = (props: Props, ref: RefObject<HTMLDivElement>) => {
  const { className, children, ...rest } = props;

  // Implementation goes here
  return (
    <div ref={ref} {...rest} className={classnames(className, STYLE.wrapper)}>
      {children}
    </div>
  );
};

/**
 * TODO: Add description of component here.
 */

const _ListItem = forwardRef(ListItem);
_ListItem.displayName = 'ListItem';

export default _ListItem;
