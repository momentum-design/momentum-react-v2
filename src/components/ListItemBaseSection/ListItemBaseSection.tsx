import React, { FC } from 'react';

import './ListItemBaseSection.style.scss';
import { Props } from './ListItemBaseSection.types';

const ListItemBaseSection: FC<Props> = (props: Props) => {
  const { className, children, position, style, id, title } = props;

  return (
    <div data-position={position} className={className} style={style} title={title} id={id}>
      {children}
    </div>
  );
};

/**
 * Component that can be used inside ListItemBase to wrap content and display
 * it in a certain position.
 */

export default ListItemBaseSection;
