import React, { FC, useRef } from 'react';
import classnames from 'classnames';

import { STYLE } from './ReactionPicker.constants';
import { Props } from './ReactionPicker.types';
import './ReactionPicker.style.scss';
import AriaToolbar from '../AriaToolbar';

const ReactionPicker: FC<Props> = (props: Props) => {
  const { children, className, id, style, ariaLabel, ...other } = props;

  return (
    <AriaToolbar
      ariaLabel={ariaLabel}
      className={classnames(className, STYLE.wrapper)}
      id={id}
      style={style}
      orientation="horizontal"
      {...other}
    >
      {children}
    </AriaToolbar>
  );
};

ReactionPicker.displayName = 'ReactionPicker';

export default ReactionPicker;
