import React, { forwardRef, RefObject } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './ReactionBadge.constants';
import { Props } from './ReactionBadge.types';
import './ReactionBadge.style.scss';
import ButtonPill from '../ButtonPill';
import { useCheckAriaLabel } from '../../utils/a11y';

const ReactionBadge = forwardRef((props: Props, providedRef: RefObject<HTMLButtonElement>) => {
  const { className, count, reacted, reaction, ...otherProps } = props;

  useCheckAriaLabel('ReactionBadge', props);

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
