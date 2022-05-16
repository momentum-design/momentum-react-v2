import React, { FC } from 'react';
import classnames from 'classnames';

import { STYLE } from './Chip.constants';
import { Props } from './Chip.types';
import './Chip.style.scss';

// TODO: Update JSDOC for this component.
/**
 * The Chip component.
 */
const Chip: FC<Props> = (props: Props) => {
  const { className, id, style } = props;

  // TODO: Implementation goes here.
  return <div className={classnames(className, STYLE.wrapper)} id={id} style={style} />;
};

export default Chip;
