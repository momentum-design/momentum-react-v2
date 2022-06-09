import React, { FC } from 'react';
import classnames from 'classnames';

import { STYLE } from './ReactionPicker.constants';
import { Props } from './ReactionPicker.types';
import './ReactionPicker.style.scss';
import ButtonGroup from '../ButtonGroup';

const ReactionPicker: FC<Props> = (props: Props) => {
  const { children, className, id, style } = props;
  return (
    <ButtonGroup
      className={classnames(className, STYLE.wrapper)}
      id={id}
      round={true}
      style={style}
    >
      {children}
    </ButtonGroup>
  );
};

ReactionPicker.displayName = 'ReactionPicker';

export default ReactionPicker;
