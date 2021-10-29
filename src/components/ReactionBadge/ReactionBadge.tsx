import React, { forwardRef, RefObject } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './ReactionBadge.constants';
import { Props } from './ReactionBadge.types';
import './ReactionBadge.style.scss';
import ButtonPill from '../ButtonPill';

const ReactionBadge = forwardRef((props: Props, providedRef: RefObject<HTMLButtonElement>) => {
  const { className, count, id, reacted, reaction, style, ...otherProps } = props;

  return (
    <ButtonPill
      className={classnames(className, STYLE.wrapper)}
      data-count={count || DEFAULTS.COUNT}
      data-reacted={reacted || DEFAULTS.REACTED}
      ref={providedRef}
      id={id}
      size={20}
      style={style}
      {...otherProps}
    >
      {reaction}
      <span className="reaction-badge-count">{count}</span>
    </ButtonPill>
  );
});

ReactionBadge.displayName = 'ReactionBadge';

export default ReactionBadge;
