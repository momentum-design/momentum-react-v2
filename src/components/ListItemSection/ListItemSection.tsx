import React, { FC } from 'react';

import './ListItemSection.style.scss';
import { Props } from './ListItemSection.types';

const ListItemSection: FC<Props> = (props: Props) => {
  const { className, children, position, style, id } = props;

  return (
    <div data-position={position} className={className} style={style} id={id}>
      {children}
    </div>
  );
};

/**
 * Component that can be used inside ListItem to wrap content and display
 * it in a certain position.
 */

export default ListItemSection;
