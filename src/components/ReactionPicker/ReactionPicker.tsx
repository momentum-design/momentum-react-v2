import React, { forwardRef, FC, RefObject, useRef } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './ReactionPicker.constants';
import { Props } from './ReactionPicker.types';
import './ReactionPicker.style.scss';
import ButtonGroup from '../ButtonGroup';

const ReactionPicker: FC<Props> = (props: Props) => {
  const { children, className, id, style } = props;

  // TODO: i need to enforce the shape of children to be able to correctly scale
  // the emojis. do we only want to allow SVG? or image? not sure
  return (
    <ButtonGroup
      className={classnames(className, STYLE.wrapper)}
      id={id}
      outline={true}
      round={true}
      size={36}
      style={style}
    >
      {children}
    </ButtonGroup>
  );
};

ReactionPicker.displayName = 'ReactionPicker';

export default ReactionPicker;
