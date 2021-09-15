import React, { FC } from 'react';
import classnames from 'classnames';
import ButtonCircle from '../ButtonCircle';

import { DEFAULTS, STYLE } from './ReactionButton.constants';
import { Props } from './ReactionButton.types';
import './ReactionButton.style.scss';
import Reaction from '../Reaction';

/**
 * Button within the ReactionPicker
 */
const ReactionButton: FC<Props> = (props: Props) => {
  const { className, id, name, reacted, reactionSize, size, style, ...otherProps } = props;

  return (
    <ButtonCircle
      className={classnames(className, STYLE.wrapper)}
      data-reacted={reacted || DEFAULTS.REACTED}
      id={id}
      size={size || 32}
      style={style}
      {...otherProps}
    >
      <Reaction name={name} size={reactionSize || 16} />
    </ButtonCircle>
  );
};

export default ReactionButton;
