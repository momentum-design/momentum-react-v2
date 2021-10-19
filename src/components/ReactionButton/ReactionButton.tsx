import React, { FC } from 'react';
import classnames from 'classnames';
import ButtonCircle from '../ButtonCircle';

import { DEFAULTS, STYLE } from './ReactionButton.constants';
import { Props } from './ReactionButton.types';
import './ReactionButton.style.scss';

/**
 * Button within the ReactionPicker
 */
const ReactionButton: FC<Props> = (props: Props) => {
  const { className, children, reacted, ...otherProps } = props;
  return (
    <ButtonCircle
      className={classnames(className, STYLE.wrapper)}
      data-reacted={reacted || DEFAULTS.REACTED}
      size={DEFAULTS.SIZE}
      {...otherProps}
    >
      {children}
    </ButtonCircle>
  );
};

ReactionButton.displayName = 'ReactionButton';

export default ReactionButton;
