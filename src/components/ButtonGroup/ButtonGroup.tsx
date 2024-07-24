import React, { FC } from 'react';
import classNames from 'classnames';

import { DEFAULTS, STYLE, CHILD_OF } from './ButtonGroup.constants';
import { Props } from './ButtonGroup.types';

import './ButtonGroup.style.scss';

export interface CompoundProps {
  CHILD_PROPS: {
    [CHILD_OF.KEY]: typeof CHILD_OF.VALUE;
  };
}

const ButtonGroup: FC<Props> & CompoundProps = (props: Props) => {
  const {
    children,
    className,
    id,
    round,
    spaced,
    compressed,
    separator,
    style,
    role,
    orientation,
    ...rest
  } = props;

  return (
    <div
      className={classNames(STYLE.wrapper, className)}
      data-round={round || DEFAULTS.ROUND}
      data-spaced={spaced || DEFAULTS.SPACED}
      data-compressed={compressed || DEFAULTS.COMPRESSED}
      data-separator={separator || DEFAULTS.SEPARATOR}
      data-orientation={orientation || DEFAULTS.ORIENTATION}
      id={id}
      style={style}
      role={role}
      {...rest}
    >
      {children}
    </div>
  );
};

export default ButtonGroup;

ButtonGroup.CHILD_PROPS = {
  [CHILD_OF.KEY]: CHILD_OF.VALUE,
};
