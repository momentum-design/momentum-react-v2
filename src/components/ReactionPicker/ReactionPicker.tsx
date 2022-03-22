import classnames from 'classnames';
import React, { FC } from 'react';

import ButtonGroup from 'components/ButtonGroup';

import { STYLE } from './ReactionPicker.constants';
import './ReactionPicker.style.scss';

import type { Props } from './ReactionPicker.types';

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
