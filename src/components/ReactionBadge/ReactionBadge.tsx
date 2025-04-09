import React, { forwardRef, RefObject } from 'react';
import classnames from 'classnames';
import { Button as MdcButton } from '@momentum-design/components/dist/react';

import { DEFAULTS, STYLE } from './ReactionBadge.constants';
import { Props } from './ReactionBadge.types';
import './ReactionBadge.style.scss';

const ReactionBadge = forwardRef((props: Props, providedRef: RefObject<HTMLButtonElement>) => {
  const { className, count, reacted, reaction, ...otherProps } = props;

  return (
    <MdcButton
      className={classnames(className, STYLE.wrapper)}
      data-count={count || DEFAULTS.COUNT}
      data-reacted={reacted || DEFAULTS.REACTED}
      ref={providedRef}
      size={24}
      variant="secondary"
      {...(otherProps as any)}
    >
      {reaction}
      <span className="reaction-badge-count">{count}</span>
    </MdcButton>
  );
});

ReactionBadge.displayName = 'ReactionBadge';

export default ReactionBadge;
