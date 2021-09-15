import React, { FC } from 'react';
import classnames from 'classnames';

import { STYLE } from './ReactionButton.constants';
import { Props } from './ReactionButton.types';
import './ReactionButton.style.scss';

/**
 * TODO: Component description.
 */
const ReactionButton: FC<Props> = (props: Props) => {
  const { className, id, style } = props;

  // TODO: Implementation goes here.
  return <div className={classnames(className, STYLE.wrapper)} id={id} style={style} />;
};

export default ReactionButton;
