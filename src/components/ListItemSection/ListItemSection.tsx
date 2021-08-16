import React, { FC } from 'react';
import classnames from 'classnames';

import './ListItemSection.style.scss';
import { Props } from './ListItemSection.types';
import { DEFAULTS, STYLE } from './ListItemSection.constants';

const ListItemSection: FC<Props> = (props: Props) => {
  const { className, children, position } = props;

  // Implementation goes here
  return (
    <div data-position={position} className={classnames(className, STYLE.wrapper)}>
      {children}
    </div>
  );
};

/**
 * TODO: Add description of component here.
 */

export default ListItemSection;
