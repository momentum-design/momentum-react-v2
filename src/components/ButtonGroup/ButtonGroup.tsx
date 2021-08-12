import React, { FC } from 'react';

import { DEFAULTS, STYLE } from './ButtonGroup.constants';
import { Props } from './ButtonGroup.types';
import './ButtonGroup.style.scss';

const ButtonGroup: FC<Props> = (props: Props) => {
  let children = Array.isArray(props.children) ? [...props.children] : [props.children];

  children = children.reduce((newChildren, child, index) => {
    if (index !== 0) {
      newChildren.push(<div key={`separator-${index}`} className={STYLE.separator} />);
    }

    newChildren.push(child);

    return newChildren;
  }, []);

  const classes = props.className ? `${STYLE.wrapper} ${props.className}` : STYLE.wrapper;

  return (
    <div
      className={classes}
      data-round={props.round || DEFAULTS.ROUND}
      data-separation={props.separation || DEFAULTS.SEPARATION}
      data-spaced={props.spaced || DEFAULTS.SPACED}
    >
      {children}
    </div>
  );
};

export default ButtonGroup;
