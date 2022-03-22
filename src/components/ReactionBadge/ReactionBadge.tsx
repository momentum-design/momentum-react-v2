import classnames from 'classnames';
import React, { forwardRef, RefObject } from 'react';

import ButtonPill from 'components/ButtonPill';

import { DEFAULTS, STYLE } from './ReactionBadge.constants';
import './ReactionBadge.style.scss';

import type { Props } from './ReactionBadge.types';

const ReactionBadge = forwardRef((props: Props, providedRef: RefObject<HTMLButtonElement>) => {
  const { className, count, reacted, reaction, ...otherProps } = props;

  return (
    <ButtonPill
      className={classnames(className, STYLE.wrapper)}
      data-count={count || DEFAULTS.COUNT}
      data-reacted={reacted || DEFAULTS.REACTED}
      ref={providedRef}
      size={20}
      {...otherProps}
    >
      {reaction}
      <span className="reaction-badge-count">{count}</span>
    </ButtonPill>
  );
});

ReactionBadge.displayName = 'ReactionBadge';

export default ReactionBadge;
